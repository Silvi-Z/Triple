import * as Yup from "yup"

class Currency {
  /**
   * @type {number}
   */
  static USD = "USD"

  /**
   * @type {number}
   */
  static AMD = "AMD"

  /**
   *
   * @type {number}
   */
  static RUB = "RUB"

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
  static schema = Yup.object().shape({
    amount: Yup.number().nullable().when("amount_right", {
      is: null,
      then: Yup.number().required(),
    }),
    amount_right: Yup.number().nullable(),
    date: Yup.string().required(),
    from: Yup.string().oneOf([Currency.USD, Currency.AMD]).test(
      "from",
      function(item) {
        if (this.parent.to === item) {
          return false
        } else {
          return (item)
        }
      }).required(),
    to: Yup.string().oneOf([Currency.USD, Currency.AMD]).test(
      "to",
      function(item) {
        if (this.parent.from === item) {
          return false
        } else {
          return (item)
        }
      }).required(),
  })

  /**
   * Vehicle constructor
   *
   * @param {Object} vehicle
   * @param {Number|null} currency.amount
   * @param {Number|null} currency.amount_right
   * @param {Number|null} currency.date
   * @param {Number|null} currency.from
   * @param {Number|null} currency.to
   */
  constructor({
                amount,
                amount_right,
                date,
                from,
                to,
              }) {
    this.date = date || null
    this.amount = amount || null
    this.amount_right = amount_right || null
    this.from = from || null
    this.to = to || null
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
      { value: Currency.AMD, text: lang.amd },
      { value: Currency.USD, text: lang.usd },
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

export default Currency
