import * as Yup from "yup"

const CAR = 1
const VAN = 2
const TRUCK = 3
const MOTORCYCLE = 4
const WATER_VEHICLE = 5

class Vehicle {
  /**
   * Vehicle constructor
   *
   * @param {Number} vehicle
   * @param {Number} power
   * @param {Number} year
   */
  constructor({vehicle, power, year}) {
    this.vehicle = vehicle
    this.power = power
    this.year = year
  }

  /**
   * Vehicle form fields
   *
   * @type {{year: null|moment.Moment, power: null|number, vehicle: null|number}}
   */
  static form = {
    vehicle: null,
    year: null,
    power: null,
  }

  static schema = Yup.object().shape({
    vehicle: Yup.number().oneOf([CAR, VAN, TRUCK, MOTORCYCLE, WATER_VEHICLE]).required(),
    power: Yup.number().required(),
    year: Yup.number().required(),
  });

  /**
   * Array of available vehicle types
   *
   * @param {Object} lang
   * @return {{value: number, text: String}[]}
   */
  static vehicles(lang) {
    return [
      { value: CAR, text: lang.car },
      { value: VAN, text: lang.van },
      { value: TRUCK, text: lang.truck },
      { value: MOTORCYCLE, text: lang.motorcycle },
      { value: WATER_VEHICLE, text: lang.water_vehicle },
    ]
  }

  /**
   * Vehicle age
   *
   * @return {number}
   */
  get age() {
    return new Date().getFullYear() - this.year
  }

  get ageDiff() {
    return Math.max(0, this.age - 3)
  }

  /**
   * Tax price for 1 horsepower depended on vehicle type
   *
   * @return {null|number}
   */
  get price() {
    let price = 0

    if (this.vehicle === CAR) {
      if (this.power <= 120) {
        price = 200
      } else if (this.power <= 250) {
        price = 300
      } else {
        price = 500
      }
    }else if (this.vehicle === VAN) {
      price = this.power > 200 ? 200 : 100
    } else if (this.vehicle === TRUCK) {
      price = this.age < 20 ? this.power <= 200 ? 100 : 200 : 0
    } else if (this.vehicle === MOTORCYCLE) {
      price = 40
    } else if (this.vehicle === WATER_VEHICLE) {
      price = 150
    }

    return price
  }

  /**
   * Car overpower
   *
   * @return {number}
   */
  get overPower() {
    return this.vehicle === CAR ? Math.max(0, this.power - 150) : 0
  }

  /**
   * Amount for overpower
   *
   * @return {number}
   */
  get additionalAmount() {
    return this.overPower * 1000
  }

  get isAutomobile() {
    return (this.vehicle === CAR || this.vehicle === VAN || this.vehicle === TRUCK)
  }

  calculateTax() {
    let amount = this.power * this.price + this.additionalAmount
    let discount = this.ageDiff && this.isAutomobile
      ? ((amount * 0.1 * this.ageDiff) <= amount / 2)
        ? amount * 0.1 * this.ageDiff
        : amount / 2
      : 0

    return amount - discount
  }
}

export default Vehicle
