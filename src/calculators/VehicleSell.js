import * as Yup from "yup"
import Vehicle from "./Vehicle"

class VehicleSell extends Vehicle {
  static MIN_PRICE = 0

  static form = {
    achievementDate: null,
    alienationDate: null,
    price: null,
    power: null,
    powerType: Vehicle.HORSEPOWER
  }

  static schema = Yup.object().shape({
    achievementDate: Yup.date().required(),
    alienationDate: Yup.date().required(),
    price: Yup.number().required(),
    power: Yup.number().required(),
    powerType: Yup.number().oneOf([Vehicle.HORSEPOWER, Vehicle.KILOWATTS]).required(),
  })

  /**
   * Vehicle Sell constructor
   *
   * @param {moment.Moment} achievementDate
   * @param {moment.Moment} alienationDate
   * @param {Number} price
   * @param {Number} power
   * @param {Number} powerType
   */
  constructor({
    achievementDate,
    alienationDate,
    powerType,
    power,
    price,
  }) {
    super({
      capacity: null,
      date: null,
      type: null,
      powerType,
      power,
      price,
    })

    this.achievementDate = achievementDate
    this.alienationDate = alienationDate
  }

  /**
   * is vehicle power type horsepower
   *
   * @return {boolean}
   */
  get isHorsepower() {
    return this.powerType === Vehicle.HORSEPOWER
  }

  /**
   * is vehicle power type kilowatts
   *
   * @return {boolean}
   */
  get isKilowatts() {
    return this.powerType === Vehicle.KILOWATTS
  }

  /**
   * The period of vehicle buying & selling dates
   *
   * @return {number}
   */
  get buyingSellingPeriod() {
    return Math.ceil(
      this.alienationDate.diff(this.achievementDate, 'year', true)
    )
  }

  /**
   * Calculate tax
   *
   * @return {null|number}
   */
  calculate() {
    let contractValue = this.price * 0.01
    let powerValue

    if (this.buyingSellingPeriod >= 1) {
      return 0
    }

    if (this.isHorsepower) {
      powerValue = this.power * 150;

      const tax = contractValue > powerValue ? contractValue : powerValue;

      return Math.round(tax)
    }

    if (this.isKilowatts) {
      return Math.ceil(this.power * 1.36)
    }

    return null
  }
}

export default VehicleSell
