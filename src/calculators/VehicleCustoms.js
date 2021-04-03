import * as Yup from "yup"
import moment from "moment"
import Vehicle from "./Vehicle"

class VehicleCustoms extends Vehicle {
  /**
   * @type {number}
   */
  static PERSON_LEGAL = 0
  /**
   * @type {number}
   */
  static PERSON_PHYSICAL = 1
  /**
   * @type {number}
   */
  static COUNTRY_EEU = 0
  /**
   * @type {number}
   */
  static COUNTRY_THIRD = 1

  /**
   * currencies names, iso, symbol
   *
   * @type {[{sym: string, text: string, value: string}, {sym: string, text: string, value: string}, {sym: string, text: string, value: string}]}
   */
  static currencies = [
    { text: "AMD", value: "AMD", sym: "&#1423;" },
    { text: "USD", value: "USD", sym: "&#36;" },
    { text: "EUR", value: "EUR", sym: "&#8364;" },
  ]

  /**
   * Currency symbols by currency ISO name
   *
   * @type {{EUR: string, USD: string, AMD: string}}
   */
  static symbols = {
    'AMD': '&#1423;',
    'USD': '&#36;',
    'EUR': '&#8364;',
  }

  /**
   * Calculator form fields
   *
   * @type {{date: null, costs: null, person: number, price: null, imported: number, currency: string, capacity: null}}
   */
  static form = {
    imported: VehicleCustoms.COUNTRY_THIRD,
    person: VehicleCustoms.PERSON_PHYSICAL,
    currency: "EUR",
    capacity: null,
    price: null,
    costs: null,
    date: null,
  }

  /**
   * Calculator validation schema
   *
   * @type {Object}
   */
  static schema = Yup.object().shape({
    imported: Yup.number().oneOf([VehicleCustoms.COUNTRY_EEU, VehicleCustoms.COUNTRY_THIRD]).required(),
    person: Yup.number().oneOf([VehicleCustoms.PERSON_LEGAL, VehicleCustoms.PERSON_PHYSICAL]).required(),
    currency: Yup.string().oneOf(Object.keys(VehicleCustoms.symbols)).required(),
    costs: Yup.number().nullable().when('person', {
      is: VehicleCustoms.PERSON_LEGAL,
      then: Yup.number(),
    }),
    capacity: Yup.number().required(),
    price: Yup.number().required(),
    date: Yup.date().required(),
  })

  /**
   * VehicleCustoms constructor
   *
   * @param {Number} imported
   * @param {Number} person
   * @param {moment.Moment} date
   * @param {Number} capacity
   * @param {Number} price
   * @param {Number|null} costs
   * @param {String} currency
   * @param {{String: Number}} rates
   */
  constructor({
    imported,
    capacity,
    currency,
    person,
    costs,
    price,
    date,
  }, rates)
  {
    super({
      powerType: null,
      power: null,
      type: null,
      capacity,
      price,
      date,
    })

    this.costs = costs || 0
    this.person = person
    this.imported = imported
    this.currency = currency
    this.rates = rates || {}
  }

  /**
   * Vehicle age by day of given date
   *
   * @return {number}
   */
  get age() {
    return Math.ceil(moment().diff(this.date, 'years', true))
  }

  /**
   * price converted to euro
   *
   * @return {Number}
   */
  get priceEuro() {
    switch (this.currency) {
      case "AMD":
        return this.price / this.rates["EUR"]
      case "USD":
        return this.price * this.rates[this.currency] / this.rates["EUR"]
      default:
        return this.price
    }
  }

  /**
   * is person physical
   *
   * @return {boolean}
   */
  get personIsPhysical() {
    return this.person === VehicleCustoms.PERSON_PHYSICAL
  }

  /**
   * is person legal
   *
   * @return {boolean}
   */
  get personIsLegal() {
    return this.person === VehicleCustoms.PERSON_LEGAL
  }

  /**
   * is car imported from EEU
   *
   * @return {boolean}
   */
  get importedFromEEU() {
    return this.imported === VehicleCustoms.COUNTRY_EEU
  }

  /**
   * is car imported from third country
   *
   * @return {boolean}
   */
  get importedFromTHIRD() {
    return this.imported === VehicleCustoms.COUNTRY_THIRD
  }

  /**
   * Customs value in EUR
   *
   * @return {Number}
   */
  get customsPrice() {
    const price = this.price + this.costs

    switch (this.currency) {
      case "AMD":
        return price / this.rates["EUR"]
      case "USD":
        return price * this.rates[this.currency] / this.rates["EUR"]
      default:
        return price
    }
  }

  /**
   * Converts given amount of euros to given currency
   *
   * @param {Number} amount
   */
  euroToCurrency(amount) {
    switch (this.currency) {
      case 'AMD':
        return Math.round(amount * this.rates['EUR'])
      case 'USD':
        return Math.round(amount * this.rates['EUR'] / this.rates['USD'])
      default:
        return Math.round(amount)
    }
  }

  /**
   * Formatted result
   *
   * @param {{tax: Number, vat: Number, fee: Number}} result
   * @return {{vat: {[String]: {amount: Number, sym: String}}, tax: {[String]: {amount: Number, sym: String}}, fee: {[String]: {amount: Number, sym: String}}}}
   */
  formatResult(result) {
    const sym = VehicleCustoms.symbols[this.currency]
    const res = {}

    Object.keys(result).forEach(key => {
      res[key] = {
        [this.currency]: {
          amount: this.euroToCurrency(result[key]),
          sym
        },
        'AMD': {
          amount: Math.round(result[key] * this.rates['EUR']),
          sym: VehicleCustoms.symbols['AMD']
        }
      }
    })

    return res
  }

  /**
   * Makes Vehicle customs calculations
   *
   * @return {{vat: {String?: {amount: Number, sym: String}}, tax: {String?: {amount: Number, sym: String}}, fee: {String?: {amount: Number, sym: String}}}}
   */
  calculate() {
    let _coefficient = {}, res = { fee: 0, tax: 0, vat: 0 }

    // getting ecology coefficient
    if (this.age + 1 <= 5) {
      _coefficient.ecology = 0
    } else if (this.age + 1 > 5 && this.age + 1 <= 10) {
      _coefficient.ecology = 0.02
    } else if (this.age + 1 > 10 && this.age + 1 <= 15) {
      _coefficient.ecology = 0.10
    } else {
      _coefficient.ecology = 0.20
    }

    if (this.importedFromEEU && this.personIsPhysical) {
      res.tax = Math.round(_coefficient.ecology * this.priceEuro)
    }

    if (this.importedFromEEU && this.personIsLegal) {
      _coefficient.vat = 0.20

      res.vat = this.priceEuro * _coefficient.vat
    }

    if (this.importedFromTHIRD && this.personIsPhysical) {
      if (this.age <= 3) {
        if (this.priceEuro <= 8500) {
          _coefficient.percentage = 0.54
          _coefficient.price = 2.5
        } else if (this.priceEuro > 8500 && this.priceEuro <= 16700) {
          _coefficient.percentage = 0.48
          _coefficient.price = 3.5
        } else if (this.priceEuro > 16700 && this.priceEuro <= 42300) {
          _coefficient.percentage = 0.48
          _coefficient.price = 5.5
        } else if (this.priceEuro > 42300 && this.priceEuro <= 84500) {
          _coefficient.percentage = 0.48
          _coefficient.price = 7.5
        } else if (this.priceEuro > 84500 && this.priceEuro <= 169000) {
          _coefficient.percentage = 0.48
          _coefficient.price = 15
        } else {
          _coefficient.percentage = 0.48
          _coefficient.price = 20
        }
      } else if (this.age > 3 && this.age <= 5) {
        if (this.capacity <= 1000) {
          _coefficient.price = 1.5
        } else if (this.capacity > 1000 && this.capacity <= 1500) {
          _coefficient.price = 1.7
        } else if (this.capacity > 1500 && this.capacity <= 1800) {
          _coefficient.price = 2.5
        } else if (this.capacity > 1800 && this.capacity <= 2300) {
          _coefficient.price = 2.7
        } else if (this.capacity > 2300 && this.capacity <= 3000) {
          _coefficient.price = 3
        } else {
          _coefficient.price = 3.6
        }
      } else {
        if (this.capacity <= 1000) {
          _coefficient.price = 3
        } else if (this.capacity > 1000 && this.capacity <= 1500) {
          _coefficient.price = 3.2
        } else if (this.capacity > 1500 && this.capacity <= 1800) {
          _coefficient.price = 3.5
        } else if (this.capacity > 1800 && this.capacity <= 2300) {
          _coefficient.price = 4.8
        } else if (this.capacity > 2300 && this.capacity <= 3000) {
          _coefficient.price = 5
        } else {
          _coefficient.price = 5.7
        }
      }

      res.fee = _coefficient.hasOwnProperty("percentage")
        ? Math.round(Math.max(_coefficient.percentage * this.priceEuro, _coefficient.price * this.capacity))
        : Math.round(_coefficient.price * this.capacity)
      res.tax = Math.round(_coefficient.ecology * this.priceEuro)
    }

    /*
    * fee - մաքսատուրք
    * tax - բնապահպանական հարկ
    * vat - ԱԱՀ
    */
    if (this.importedFromTHIRD && this.personIsLegal) {
      if (this.age <= 3) {
        _coefficient.percentage = this.capacity <= 2800 ? 0.15 : 0.125
      } else if (this.age > 3 && this.age <= 7) {
        _coefficient.percentage = 0.2

        if (this.capacity <= 1000) {
          _coefficient.price = 0.36
        } else if (this.capacity > 1000 && this.capacity <= 1500) {
          _coefficient.price = 0.4
        } else if (this.capacity > 1500 && this.capacity <= 1800) {
          _coefficient.price = 0.36
        } else if (this.capacity > 1800 && this.capacity <= 3000) {
          _coefficient.price = 0.44
        } else {
          _coefficient.price = 0.8
        }
      } else {
        if (this.capacity <= 1000) {
          _coefficient.price = 1.4
        } else if (this.capacity > 1000 && this.capacity <= 1500) {
          _coefficient.price = 1.5
        } else if (this.capacity > 1500 && this.capacity <= 1800) {
          _coefficient.price = 1.6
        } else if (this.capacity > 1800 && this.capacity <= 3000) {
          _coefficient.price = 2.2
        } else {
          _coefficient.price = 3.2
        }
      }

      if (_coefficient.hasOwnProperty('percentage') && !_coefficient.hasOwnProperty('price')) {
        res.fee = Math.round(this.customsPrice * _coefficient.percentage)
      } else if (_coefficient.hasOwnProperty('percentage') && _coefficient.hasOwnProperty('price')) {
        res.fee = Math.round(Math.max(this.customsPrice * _coefficient.percentage, this.capacity * _coefficient.price))
      } else if (!_coefficient.hasOwnProperty('percentage') && _coefficient.hasOwnProperty('price')) {
        res.fee = Math.round(this.capacity * _coefficient.price)
      }

      res.vat = Math.round((res.fee + this.customsPrice) * 0.2)
      res.tax = Math.round(_coefficient.ecology * this.customsPrice)
      res.total = res.fee + res.vat
    }

    return this.formatResult(res)
  }
}

export default VehicleCustoms
