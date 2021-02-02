import * as Yup from "yup"

class Vehicle {
  /**
   *
   * @type {number}
   */
  static TAX_CAR = 1

  /**
   *
   * @type {number}
   */
  static TAX_REAL_ESTATE = 2

  /**
   * @type {number}
   */
  static CAR = 1

  /**
   * @type {number}
   */
  static VAN = 2

  /**
   * @type {number}
   */
  static TRUCK = 3

  /**
   * @type {number}
   */
  static MOTORCYCLE = 4

  /**
   * @type {number}
   */
  static WATER_VEHICLE = 5

  /**
   *
   * @type {number}
   */
  static RESIDENTIAL = 1

  /**
   *
   * @type {number}
   */
  static PUBLIC_PRODUCTION = 2

  /**
   *
   * @type {number}
   */
  static GARAGE = 3

  /**
   * @type {number}
   */
  static KILOWATTS = 2

  /**
   * @type {number}
   */
  static HORSEPOWER = 1

  static RATELIMITS = {
    threeMillion: 3000000,
    tenMillion: 10000000,
    twentyMillion: 20000000,
    thirtyMillion: 30000000,
    fortyMillion: 40000000,
  }

  /**
   * Vehicle form fields
   *
   * @type {Object}
   */
  static form = {}

  /**
   * validation schema
   *
   * @type {Yup}
   */
  static schema = Yup.object().shape({})

  /**
   * Vehicle constructor
   *
   * @param {Object} vehicle
   * @param {Number|null} vehicle.type
   * @param {Number|null} vehicle.price
   * @param {Number|null} vehicle.capacity
   * @param {Number|null} vehicle.power
   * @param {Number|null} vehicle.powerType
   * @param {moment.Moment|null} vehicle.date
   */
  constructor({
                date,
                type,
                power,
                price,
                capacity,
                powerType,
                estateValue,
                taxType,
                estateType,
              }) {
    this.date = date || null
    this.type = type || null
    this.power = power || null
    this.price = price || null
    this.estateValue = estateValue || null
    this.estateType = estateType || null
    this.taxType = taxType || Vehicle.TAX_CAR
    this.capacity = capacity || null
    this.powerType = powerType || Vehicle.HORSEPOWER
  }

  /**
   * Vehicle age
   *
   * @return {number}
   */
  get age() {
    return new Date().getFullYear() - this.date.year()
  }

  /**
   * is vehicle automobile
   *
   * @return {boolean}
   */
  get isAutomobile() {
    return this.type && (this.type === Vehicle.CAR || this.type === Vehicle.VAN || this.type === Vehicle.TRUCK)
  }

  /**
   * Array of available vehicle types
   *
   * @param {Object} lang
   * @return {{value: number, text: String}[]}
   */
  static types(lang) {
    return [
      { value: Vehicle.CAR, text: lang.car },
      { value: Vehicle.VAN, text: lang.van },
      { value: Vehicle.TRUCK, text: lang.truck },
      { value: Vehicle.MOTORCYCLE, text: lang.motorcycle },
      { value: Vehicle.WATER_VEHICLE, text: lang.water_vehicle },
    ]
  }

  /**
   * Array of available vehicle types
   *
   * @param {Object} lang
   * @return {{value: number, text: String}[]}
   */
  static estateTypes(lang) {
    return [
      { value: Vehicle.RESIDENTIAL, text: lang.residential },
      { value: Vehicle.PUBLIC_PRODUCTION, text: lang.public_production },
      { value: Vehicle.GARAGE, text: lang.garage },
    ]
  }

  /**
   * Generate Array of years
   *
   * @param {Number} to
   * @return {Number[]}
   */
  static years(to) {
    let years = []

    for (let i = new Date().getFullYear(); i >= to; i--) years.push(i)

    return years
  }

  /**
   * Age differance depend on value
   *
   * @param value
   * @return {number}
   */
  ageGt(value) {
    return Math.max(0, this.age - value)
  }
}

export default Vehicle
