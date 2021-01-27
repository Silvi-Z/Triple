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
    end: null,
  }

  // TODO : define validation rules
  static schema = Yup.object().shape({
    tax_field: Yup.number().oneOf([Subsidy.TAX_COMMON, Subsidy.TAX_IT, Subsidy.TAX_ENTERPRISE]).required(),
    pension: Yup.number().oneOf([Salary.PENSION_NO, Salary.PENSION_YES, Salary.PENSION_YES_VOLUNTEER]).required(),
    type: Yup.number().oneOf([this.DISABILITY, this.MATERNITY]).required(),
    work: Yup.number().oneOf([this.HIRED, this.SELF_EMPLOYED]).required(),
    static: Yup.boolean().oneOf([true, false]).required(),
    schedule: Yup.number().oneOf([5, 6]).required(),
    amount: Yup.number().nullable().when("static", {
      is: true,
      then: Yup.number().required(),
    }),
    income: Yup.number().nullable(),
    start: Yup.date().nullable().when("days", {
      is: null,
      then: Yup.date().required(),
    }),
    end: Yup.date().nullable().when("days", {
      is: null,
      then: Yup.date().required(),

    }),
    days: Yup.number().required(),
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
      ? this.fields.amount + ((this.fields.income || 0) / 12)
      : this.avg + ((this.fields.income || 0) / 12)

    return (avg)
  }

  /**
   * Compare month average salary limit
   *
   * @returns {number}
   */
  get compareAvgMonthly() {
    if (this.fields.type === 1) {
      return this.compareMaternity
    } else if (this.fields.type === 2) {
      return this.compareDisability
    }
  }

  /**
   * Setting days for counting daily salary
   * @returns {number}
   */
  get monthlyDaysCount() {
    if (this.fields.type === 1) {
      return 30.4
    } else if (this.fields.type === 2) {
      return this.fields.schedule === 5 ? 21 : 25
    }
  }

  /**
   * Average day salary
   *
   * @return {number}
   */
  get avgDailySalary() {
    return (this.compareAvgMonthly / this.monthlyDaysCount)
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
   * Compare maternity subsidy limit
   * @returns {number}
   */
  get compareMaternity() {
    let avg = this.avgMonthSalary
    if (avg < Salary.MATERNITY_SUBSIDY_MIN) {
      return Salary.MATERNITY_SUBSIDY_MIN
    } else if (avg > Salary.MATERNITY_SUBSIDY_MAX) {
      return Salary.MATERNITY_SUBSIDY_MAX
    } else {
      return avg
    }
  }

  /**
   * Compare disability subsidy limit
   * @returns {number}
   */
  get compareDisability() {
    let avg = this.avgMonthSalary * 0.8
    if (avg > Salary.DISABILITY_SUBSIDY_MAX) {
      return Salary.DISABILITY_SUBSIDY_MAX
    } else {
      return avg
    }
  }

  get daysForCalculate() {
    if (this.fields.type === 1) {
      return this.fields.days
    } else if (this.fields.type === 2) {
      return (this.fields.days - 1)
    }
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
      throw Error("Incorrect fields passed.")
  }

  /**
   * Calculate subsidy amount
   *
   * @return {number}
   */
  calculate() {
    return Math.round(this.avgDailySalary * this.daysForCalculate)
  }
}

export default Subsidy
