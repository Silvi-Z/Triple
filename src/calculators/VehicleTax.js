import * as Yup from "yup"
import Vehicle from "./Vehicle"

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
      ]).required(),
    }),

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
   */
  constructor({ type, date, power, taxType, estateType, estateValue }) {
    super({
      date,
      type,
      power,
      taxType,
      estateType,
      estateValue,
      price: null,
      capacity: null,
      powerType: null,
    })

    this.type = type
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
   *
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
    let tax = 0
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
    } else if (this.estateType === VehicleTax.PUBLIC_PRODUCTION) {
      amount = this.estateValue * 0.3 / 100
    } else if (this.estateType === VehicleTax.GARAGE) {
      amount = this.estateValue * 0.2 / 100
    }

    return Math.round(amount)
  }

  /**
   * Car overpower
   *
   * @return {number}
   */
  get overPower() {
    return this.type === Vehicle.CAR ? Math.max(0, this.power - 150) : 0
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
      amount = this.powerPrice * this.power + this.additionalAmount
      let discount = this.ageGt(3) && this.isAutomobile
        ? ((amount * 0.1 * this.ageGt(3)) <= amount / 2)
          ? amount * 0.1 * this.ageGt(3)
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
