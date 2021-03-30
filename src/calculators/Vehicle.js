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
  static COEFFICIENT = 1.36

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
  static AGRICULTURAL = 4

  /**
   *
   * @type {number}
   */
  static FORCONSTRUCTIONRESIDENTAL = 5

  /**
   *
   * @type {number}
   */
  static FORCONSTRUCTIONPUBLIC = 6

  /**
   *
   * @type {number}
   */
  static INDUSTRY = 7

  /**
   *
   * @type {number}
   */
  static ENERGETIC = 8

  /**
   *
   * @type {number}
   */
  static OTHERLANDS = 9

  /**
   *
   * @type {number}
   */
  static PRIVATEHOUSE = 10

  /**
   *
   * @type {number}
   */
  static PUBLIC = 11

  /**
   *
   * @type {number}
   */
  static PRODUCTION = 12

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
    sevenMillion: 7000000,
    tenMillion: 10000000,
    twentyMillion: 20000000,
    twentyThreeMillion: 23000000,
    twentyFiveMillion: 25000000,
    thirtyMillion: 30000000,
    fortyMillion: 40000000,
    fiftyMillion: 50000000,
    fortySevenMillion: 47000000,
    seventyFiveMillion: 75000000,
    eightyFiveMillion: 85000000,
    hundredMillion: 100000000,
    hundredTwentyMillion: 120000000,
    twoHundredMillion: 200000000,
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
                year,
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
    this.year = year
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
    return this.type && (this.type === Vehicle.CAR || this.type === Vehicle.VAN || this.type === Vehicle.TRUCK || this.type === Vehicle.MOTORCYCLE || this.type === Vehicle.WATER_VEHICLE)
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
  static estateTypes(lang, year) {
    if (year < 2021) {
      return [
        { value: Vehicle.RESIDENTIAL, text: lang.residential },
        { value: Vehicle.PUBLIC_PRODUCTION, text: lang.public_production },
        { value: Vehicle.GARAGE, text: lang.garage },
      ]
    } else {
      return [
        { value: Vehicle.GARAGE, text: lang.garage },
        { value: Vehicle.AGRICULTURAL, text: lang.agricultural },
        { value: Vehicle.PRODUCTION, text: lang.production },
        { value: Vehicle.PRIVATEHOUSE, text: lang.privateHouse },
        { value: Vehicle.PUBLIC, text: lang.public },
        { value: Vehicle.FORCONSTRUCTIONRESIDENTAL, text: lang.forConstructionResidental },
        { value: Vehicle.FORCONSTRUCTIONPUBLIC, text: lang.forConstructionPublic },
        { value: Vehicle.INDUSTRY, text: lang.industry },
        { value: Vehicle.ENERGETIC, text: lang.energetic },
        { value: Vehicle.OTHERLANDS, text: lang.otherLands },
      ]
    }
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
