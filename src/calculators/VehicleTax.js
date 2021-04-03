import * as Yup from "yup"
import Vehicle from "./Vehicle"
import moment from "moment"

class VehicleTax extends Vehicle {
  /**
   * Vehicle form fields
   *
   * @type {{date: null|moment.Moment, power: null|number, type: null|number, taxType: number, estateType: null|number, estateValue: null|number}}
   */
  static form = {
    type: null,
    date: null,
    power: null,
    taxType: Vehicle.TAX_CAR,
    estateType: null,
    estateValue: null,
    year: moment().year(),
    powerType: Vehicle.HORSEPOWER,
  }

  static schema = Yup.object().shape({
    taxType: Yup.number().oneOf([Vehicle.TAX_CAR, Vehicle.TAX_REAL_ESTATE]).required(),

    type: Yup.number().nullable().when("taxType", {
      is: Vehicle.TAX_CAR,
      then: Yup.number().oneOf([
        Vehicle.CAR,
        Vehicle.VAN,
        Vehicle.TRUCK,
        Vehicle.MOTORCYCLE,
        Vehicle.WATER_VEHICLE,
      ]).required(),
    }),
    power: Yup.number().nullable().when("taxType", {
      is: Vehicle.TAX_CAR,
      then: Yup.number().required(),
    }),
    date: Yup.object().nullable().when("taxType", {
      is: Vehicle.TAX_CAR,
      then: Yup.object().required(),
    }),

    estateValue: Yup.number().nullable().when("taxType", {
      is: 2,
      then: Yup.number().required(),
    }),
    estateType: Yup.number().nullable().when("taxType", {
      is: 2,
      then: Yup.number().oneOf([
        Vehicle.RESIDENTIAL,
        Vehicle.PUBLIC_PRODUCTION,
        Vehicle.GARAGE,
        Vehicle.AGRICULTURAL,
        Vehicle.FORCONSTRUCTIONRESIDENTAL,
        Vehicle.FORCONSTRUCTIONPUBLIC,
        VehicleTax.INDUSTRY,
        VehicleTax.ENERGETIC,
        VehicleTax.OTHERLANDS,
        Vehicle.PRIVATEHOUSE,
        Vehicle.PUBLIC,
        Vehicle.PRODUCTION,
      ]).required(),
    }),
    year: Yup.number().when("taxType", {
      is: Vehicle.TAX_REAL_ESTATE,
      then: Yup.number().required(),
    }),
    powerType: Yup.number().oneOf([Vehicle.HORSEPOWER, Vehicle.KILOWATTS]).required(),

  })

  /**
   * Vehicle constructor
   *
   * @param {Number} type
   * @param {Number} power
   * @param {moment.Moment} date
   * @param {Number} taxType
   * @param {Number} estateType
   * @param {Number} estateValue
   * @param {Number} powerType
   * @param {Number} year
   */
  constructor({ type, date, power, taxType, estateType, estateValue, powerType, year }) {
    super({
      date,
      type,
      power,
      taxType,
      estateType,
      estateValue,
      year,
      powerType,
      price: null,
      capacity: null,
    })
    this.type = type
    this.year = year
  }

  /**
   * Tax price for 1 horsepower depended on vehicle type
   *
   * @return {null|number}
   */
  get powerPrice() {
    let price = 0

    if (this.type === Vehicle.CAR) {
      if (this.power <= 120) {
        price = 200
      } else if (this.power <= 250) {
        price = 300
      } else {
        price = 500
      }
    } else if (this.type === Vehicle.VAN) {
      price = this.power > 200 ? 200 : 100
    } else if (this.type === Vehicle.TRUCK) {
      price = this.age < 20 ? this.power <= 200 ? 100 : 200 : 0
    } else if (this.type === Vehicle.MOTORCYCLE) {
      price = 40
    } else if (this.type === Vehicle.WATER_VEHICLE) {
      price = 150
    }

    return price
  }

  /**
   * Amount for overpower
   * @return {number}
   */
  get additionalAmount() {
    return this.overPower * 1000
  }

  /**
   * Counting tax for residential estate
   * @returns {number}
   */
  get residentialTax() {
    let amount = this.estateValue
    let year = this.year
    let tax = 0

    if (year < 2021) {
      if (amount <= VehicleTax.RATELIMITS.threeMillion) {
        tax = 0
      } else if (amount > VehicleTax.RATELIMITS.threeMillion && amount <= VehicleTax.RATELIMITS.tenMillion) {
        tax = 100 + (amount - VehicleTax.RATELIMITS.threeMillion) * 0.1 / 100
      } else if (amount > VehicleTax.RATELIMITS.tenMillion && amount <= VehicleTax.RATELIMITS.twentyMillion) {
        tax = 7100 + (amount - VehicleTax.RATELIMITS.tenMillion) * 0.2 / 100
      } else if (amount > VehicleTax.RATELIMITS.twentyMillion && amount <= VehicleTax.RATELIMITS.thirtyMillion) {
        tax = 27100 + (amount - VehicleTax.RATELIMITS.twentyMillion) * 0.4 / 100
      } else if (amount > VehicleTax.RATELIMITS.thirtyMillion && amount <= VehicleTax.RATELIMITS.fortyMillion) {
        tax = 67100 + (amount - VehicleTax.RATELIMITS.thirtyMillion) * 0.6 / 100
      } else if (amount > VehicleTax.RATELIMITS.fortyMillion) {
        tax = 127100 + (amount - VehicleTax.RATELIMITS.fortyMillion) / 100
      }
    } else {
      if (amount <= VehicleTax.RATELIMITS.tenMillion) {
        tax = amount * 0.05 / 100
      } else if (amount > VehicleTax.RATELIMITS.tenMillion && amount <= VehicleTax.RATELIMITS.twentyFiveMillion) {
        tax = 5000 + (amount - VehicleTax.RATELIMITS.tenMillion) * 0.1 / 100
      } else if (amount > VehicleTax.RATELIMITS.twentyFiveMillion && amount <= VehicleTax.RATELIMITS.fortySevenMillion) {
        tax = 20000 + (amount - VehicleTax.RATELIMITS.twentyFiveMillion) * 0.2 / 100
      } else if (amount > VehicleTax.RATELIMITS.fortySevenMillion && amount <= VehicleTax.RATELIMITS.seventyFiveMillion) {
        tax = 64000 + (amount - VehicleTax.RATELIMITS.fortySevenMillion) * 0.4 / 100
      } else if (amount > VehicleTax.RATELIMITS.seventyFiveMillion && amount <= VehicleTax.RATELIMITS.hundredMillion) {
        tax = 176000 + (amount - VehicleTax.RATELIMITS.seventyFiveMillion) * 0.6 / 100
      } else if (amount > VehicleTax.RATELIMITS.hundredMillion && amount <= VehicleTax.RATELIMITS.twoHundredMillion) {
        tax = 326000 + (amount - VehicleTax.RATELIMITS.hundredMillion) / 100
      } else if (amount > VehicleTax.RATELIMITS.twoHundredMillion) {
        tax = 1326000 + (amount - VehicleTax.RATELIMITS.twoHundredMillion) * 1.5 / 100
      }
    }

    return tax
  }

  /**
   * Counting tax for residential estate
   * @returns {number}
   */
  get privateHouseTax() {
    let amount = this.estateValue
    let tax = 0

    if (amount <= VehicleTax.RATELIMITS.sevenMillion) {
      tax = amount * 0.05 / 100
    } else if (amount > VehicleTax.RATELIMITS.sevenMillion && amount <= VehicleTax.RATELIMITS.twentyThreeMillion) {
      tax = 3500 + (amount - VehicleTax.RATELIMITS.sevenMillion) * 0.1 / 100
    } else if (amount > VehicleTax.RATELIMITS.twentyThreeMillion && amount <= VehicleTax.RATELIMITS.fiftyMillion) {
      tax = 19500 + (amount - VehicleTax.RATELIMITS.twentyThreeMillion) * 0.2 / 100
    } else if (amount > VehicleTax.RATELIMITS.fiftyMillion && amount <= VehicleTax.RATELIMITS.eightyFiveMillion) {
      tax = 73500 + (amount - VehicleTax.RATELIMITS.fiftyMillion) * 0.4 / 100
    } else if (amount > VehicleTax.RATELIMITS.eightyFiveMillion && amount <= VehicleTax.RATELIMITS.hundredTwentyMillion) {
      tax = 213500 + (amount - VehicleTax.RATELIMITS.eightyFiveMillion) * 0.6 / 100
    } else if (amount > VehicleTax.RATELIMITS.hundredTwentyMillion && amount <= VehicleTax.RATELIMITS.twoHundredMillion) {
      tax = 423500 + (amount - VehicleTax.RATELIMITS.hundredTwentyMillion) / 100
    } else if (amount > VehicleTax.RATELIMITS.twoHundredMillion) {
      tax = 1223500 + (amount - VehicleTax.RATELIMITS.twoHundredMillion) * 1.5 / 100
    }

    return tax
  }


  /**
   * Counting amount for real estate tax
   * @returns {number}
   */
  get estateAmount() {
    let amount
    if (this.estateType === VehicleTax.RESIDENTIAL) {
      amount = this.residentialTax
    } else if (this.estateType === VehicleTax.PUBLIC_PRODUCTION || this.estateType === Vehicle.PUBLIC) {
      amount = this.estateValue * 0.3 / 100
    } else if (this.estateType === VehicleTax.GARAGE) {
      amount = this.estateValue * 0.2 / 100
    } else if (this.estateType === VehicleTax.AGRICULTURAL) {
      amount = this.estateValue * 15 / 100
    } else if (this.estateType === VehicleTax.FORCONSTRUCTIONRESIDENTAL) {
      amount = this.estateValue * 0.6 / 100
    } else if (this.estateType === VehicleTax.FORCONSTRUCTIONPUBLIC || this.estateType === VehicleTax.OTHERLANDS) {
      amount = this.estateValue / 100
    } else if (this.estateType === VehicleTax.INDUSTRY || this.estateType === Vehicle.PRODUCTION) {
      amount = this.estateValue * 0.25 / 100
    } else if (this.estateType === VehicleTax.ENERGETIC) {
      amount = this.estateValue * 0.5 / 100
    } else if (this.estateType === Vehicle.PRIVATEHOUSE) {
      amount = this.privateHouseTax
    }

    return Math.round(amount)
  }

  /**
   * Car overpower
   *
   * @return {number}
   */
  get overPower() {
    return this.type === Vehicle.CAR ? Math.max(0, this.powerCount - 150) : 0
  }

  /**
   * Power for calculate depending on power type
   *
   * @returns {*}
   */
  get powerCount() {
    return this.powerType === Vehicle.KILOWATTS ? (this.power * Vehicle.COEFFICIENT) : this.power
  }

  /**
   * Get field value
   *
   * @param {String} field
   * @return {*}
   */
  getField(field) {
    if (this.fields.hasOwnProperty(field))
      return this.fields[field]

    throw Error(`${field} field not exists.`)
  }

  /**
   * Set Subsidy form fields
   *
   * @param {Object} fields
   */
  setFields(fields) {
    if (Object.keys(fields).every(field => Object.keys(Vehicle.form).includes(field)))
      this.fields = Object.assign({}, this.fields, fields)
    else
      throw Error("Incorrect fields passed.")
  }

  /**
   * calculate amount of tax
   *
   * @return {number}
   */
  calculate() {
    let amount
    if (this.taxType === Vehicle.TAX_CAR) {
      amount = this.powerPrice * this.powerCount + this.additionalAmount
      let discount = this.ageGt(2) && this.isAutomobile
        ? ((amount * 0.1 * this.ageGt(2)) <= amount / 2)
          ? amount * 0.1 * this.ageGt(2)
          : amount / 2
        : 0
      amount = amount - discount
    } else if (this.taxType === Vehicle.TAX_REAL_ESTATE) {
      amount = this.estateAmount
    }

    return amount
  }
}

export default VehicleTax
