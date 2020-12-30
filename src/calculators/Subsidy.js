import * as Yup from "yup"
import Salary from "./Salary"

class Subsidy extends Salary {
  static HIRED = 1

  static SELF_EMPLOYED = 2

  static MATERNITY = 1

  static DISABILITY = 2

  static form = {
    tax_field: Subsidy.TAX_COMMON,
    pension: Subsidy.PENSION_NO,
    type: Subsidy.MATERNITY,
    work: Subsidy.HIRED,
    schedule: 5,
    static: true,
    amount: null,
    income: null,
    start: null,
    days: null,
    end: null
  }

  // TODO : define validation rules
  static schema = Yup.object().shape({

  })

  /**
   * Subsidy constructor
   */
  constructor() {
    super()

    this.avg = null
    this.fields = Subsidy.form
  }

  /**
   * Setting 12 months average amount
   *
   * @param {Number} avg
   */
  setAvg(avg) {
    this.avg = avg
  }

  /**
   * was salary static at last 12 months
   *
   * @return {Boolean}
   */
  get isSalaryStatic() {
    return this.fields.static
  }

  /**
   * Average month salary
   *
   * @return {number}
   */
  get avgMonthSalary() {
    const avg = this.isSalaryStatic
      ? this.fields.amount + Math.round((this.fields.income || 0) / 12)
      : this.avg + Math.round((this.fields.income || 0) / 12)

    if (avg > Salary.MIN * 15) {
      return Math.round(Salary.MIN * 15)
    } else if (avg < Salary.MIN * 0.5) {
      return Math.round(Salary.MIN * 0.5)
    } else {
      return Math.round(avg)
    }
  }

  /**
   * Average day salary
   *
   * @return {number}
   */
  get avgDailySalary() {
    return Math.round(this.avgMonthSalary / 30.4)
  }

  /**
   * Is calculating for disability
   *
   * @return {boolean}
   */
  get isTypeDisability() {
    return this.fields.type === Subsidy.DISABILITY
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
    if (Object.keys(fields).every(field => Object.keys(Subsidy.form).includes(field)))
      this.fields = Object.assign({}, this.fields, fields)
    else
      throw Error('Incorrect fields passed.')
  }

  /**
   * Calculate subsidy amount
   *
   * @return {number}
   */
  calculate() {
    return this.avgDailySalary * this.fields.days
  }
}

export default Subsidy
