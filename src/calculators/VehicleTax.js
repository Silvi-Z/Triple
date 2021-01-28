import * as Yup from "yup"
import Vehicle from "./Vehicle"

class VehicleTax extends Vehicle {
  /**
   * Vehicle form fields
   *
   * @type {{date: null|moment.Moment, power: null|number, type: null|number}}
   */
  static form = {
    type: null,
    date: null,
    power: null,
  }

  static schema = Yup.object().shape({
    type: Yup.number().oneOf([
      Vehicle.CAR,
      Vehicle.VAN,
      Vehicle.TRUCK,
      Vehicle.MOTORCYCLE,
      Vehicle.WATER_VEHICLE
    ]).required(),
    power: Yup.number().required(),
    date: Yup.object().required(),
  });

  /**
   * Vehicle constructor
   *
   * @param {Number} type
   * @param {Number} power
   * @param {moment.Moment} date
   */
  constructor({type, date, power}) {
    super({
      date,
      type,
      power,
      price: null,
      capacity: null,
      powerType: null
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
   * Car overpower
   *
   * @return {number}
   */
  get overPower() {
    return this.type === Vehicle.CAR ? Math.max(0, this.power - 150) : 0
  }

  /**
   * calculate amount of tax
   *
   * @return {number}
   */
  calculate() {
    let amount = this.powerPrice * this.power + this.additionalAmount
    let discount = this.ageGt(3) && this.isAutomobile
      ? ((amount * 0.1 * this.ageGt(3)) <= amount / 2)
        ? amount * 0.1 * this.ageGt(3)
        : amount / 2
      : 0

    return amount - discount
  }
}

export default VehicleTax
