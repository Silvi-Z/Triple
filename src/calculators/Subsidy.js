import * as Yup from "yup"
import Salary from "./Salary"
import moment from "moment"

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
    year: moment().year(),
  }

  // TODO : define validation rules
  static schema = Yup.object().shape({
    tax_field: Yup.number().oneOf([Subsidy.TAX_COMMON, Subsidy.TAX_IT, Subsidy.TAX_ENTERPRISE, Subsidy.TAX_TURNOVER]).required(),
    pension: Yup.number().oneOf([Salary.PENSION_NO, Salary.PENSION_YES, Salary.PENSION_YES_VOLUNTEER]).required(),
    type: Yup.number().oneOf([this.DISABILITY, this.MATERNITY]).required(),
    work: Yup.number().oneOf([this.HIRED, this.SELF_EMPLOYED]).required(),
    static: Yup.boolean().oneOf([true, false]).required(),
    schedule: Yup.number().oneOf([5, 6]).required(),
    amount: Yup.number().nullable()/*.test("amount",
      function(item) {
        if (this.parent.tax_field === Subsidy.TAX_ENTERPRISE && item > 12) {
          return false
        } else if (this.parent.tax_field === Subsidy.TAX_TURNOVER && this.parent.work === Subsidy.SELF_EMPLOYED && item > (12 * 5000)) {
          return false
        } else {
          return item
        }
      },
    )*/.when("static", {
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

  get minSalaryAmount() {
    return this.fields.year >= 2021 ? Salary.MINWITHTAXSINCE2021 : Salary.MINWITHTAXBEFORE2021
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
  get avgMonthSalaryForHired() {
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
    if (this.fields.work === Subsidy.SELF_EMPLOYED) {
      return (this.selfEmployedAmount / 30.4)
    } else if (this.fields.work === Subsidy.HIRED) {
      return (this.hiredAmount / this.monthlyDaysCount)
    }

  }

  get selfEmployedAmount() {
    if (this.fields.type === Subsidy.MATERNITY) {
      return this.compareMaternityForSelfEmployed
    } else if (this.fields.type === Subsidy.DISABILITY) {
      return this.compareDisabilityForSelfEmployed
    }
  }

  /**
   *
   * Count amount for hired employee
   *
   * @returns {number}
   */
  get hiredAmount() {
    if (this.fields.type === Subsidy.MATERNITY) {
      return this.compareMaternityForHired
    } else if (this.fields.type === Subsidy.DISABILITY) {
      return this.compareDisabilityForHired
    }
  }

  /**
   * Setting days for counting daily salary
   * @returns {number}
   */
  get monthlyDaysCount() {
    if (this.fields.type === Subsidy.MATERNITY) {
      return 30.4
    } else if (this.fields.type === Subsidy.DISABILITY) {
      return this.fields.schedule === 5 ? 21 : 25
    }
  }

  /**
   * Average day salary
   *
   * @return {number}
   */
  get avgDailySalary() {
    return this.compareAvgMonthly
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
   * Compare maternity subsidy limit for hired employee
   * @returns {number}
   */
  get compareMaternityForHired() {
    let avg = this.avgMonthSalaryForHired

    if (this.fields.tax_field === Subsidy.TAX_ENTERPRISE) {
      avg = this.isSalaryStatic
        ? ((this.fields.amount * Math.ceil(this.minSalaryAmount / 2)) + (this.fields.income || 0)) / 12
        : (this.avg + (this.fields.income || 0)) / 12

      if (avg > this.minSalaryAmount * 15) {
        avg = this.minSalaryAmount * 15
      } else if (avg < this.minSalaryAmount * 50 / 100) {
        avg = this.minSalaryAmount * 50 / 100
      }

      return avg
    } else {
      if (avg < Math.ceil(this.minSalaryAmount / 2)) {
        return Math.ceil(this.minSalaryAmount / 2)
      } else if (avg > this.minSalaryAmount * 15) {
        return this.minSalaryAmount * 15
      } else {
        return avg
      }
    }

  }

  /**
   * Compare maternity subsidy limit for self employed employee
   * @returns {number}
   */
  get compareMaternityForSelfEmployed() {
    let avg
    let { tax_field } = this.fields

    if (tax_field === Subsidy.TAX_COMMON || tax_field === Subsidy.TAX_IT) {
      avg = this.isSalaryStatic
        ? (this.fields.amount + (this.fields.income || 0)) / 12
        : (this.avg + (this.fields.income || 0)) / 12

      if (avg > this.minSalaryAmount * 5) {
        avg = this.minSalaryAmount * 5
      } else if (avg < this.minSalaryAmount * 50 / 100) {
        avg = Math.ceil(this.minSalaryAmount * 50 / 100)
      }

      return avg

    } else if (tax_field === Subsidy.TAX_TURNOVER) {
      avg = this.isSalaryStatic
        ? ((this.fields.amount / 5000) * Math.ceil(this.minSalaryAmount / 2) + (this.fields.income || 0)) / 12
        : (this.avg + (this.fields.income || 0)) / 12

      if (avg > this.minSalaryAmount * 5) {
        avg = this.minSalaryAmount * 5
      } else if (avg < this.minSalaryAmount * 50 / 100) {
        avg = Math.ceil(this.minSalaryAmount * 50 / 100)
      }

      return avg

    } else if (tax_field === Subsidy.TAX_ENTERPRISE) {
      avg = this.isSalaryStatic
        ? ((this.fields.amount * Math.ceil(this.minSalaryAmount / 2)) + (this.fields.income || 0)) / 12
        : (this.avg + (this.fields.income || 0)) / 12

      if (avg > this.minSalaryAmount * 5) {
        avg = this.minSalaryAmount * 5
      } else if (avg < this.minSalaryAmount * 50 / 100) {
        avg = Math.ceil(this.minSalaryAmount * 50 / 100)
      }

      return avg
    }
  }

  /**
   * Compare disability subsidy limit for self employed employee
   * @returns {number}
   */
  get compareDisabilityForSelfEmployed() {
    let avg
    let { tax_field } = this.fields

    if (tax_field === Subsidy.TAX_COMMON || tax_field === Subsidy.TAX_IT) {
      avg = this.isSalaryStatic
        ? (this.fields.amount + (this.fields.income || 0)) / 12 * 80 / 100
        : (this.avg + (this.fields.income || 0)) / 12 * 80 / 100

      if (avg > this.minSalaryAmount * 5) {
        avg = this.minSalaryAmount * 5
      }
      return avg

    } else if (tax_field === Subsidy.TAX_TURNOVER) {
      avg = this.isSalaryStatic
        ? ((this.fields.amount / 5000) * Math.ceil(this.minSalaryAmount / 2) + (this.fields.income || 0)) / 12 * 80 / 100
        : (this.avg + (this.fields.income || 0)) / 12 * 80 / 100

      if (avg > this.minSalaryAmount * 5) {
        avg = this.minSalaryAmount * 5
      }

      return avg

    } else if (tax_field === Subsidy.TAX_ENTERPRISE) {
      avg = 0

      return avg
    }
  }

  /**
   * Compare disability subsidy limit  for hired employee
   * @returns {number}
   */
  get compareDisabilityForHired() {
    let avg = this.avgMonthSalaryForHired * 80 / 100
    if (this.fields.tax_field === Subsidy.TAX_ENTERPRISE) {
      avg = this.isSalaryStatic
        ? ((this.fields.amount * Math.ceil(this.minSalaryAmount / 2)) + (this.fields.income || 0)) / 12 * 80 / 100
        : (this.avg + ((this.fields.income || 0) / 12)) * 80 / 100

      if (avg > this.minSalaryAmount * 10) {
        avg = this.minSalaryAmount * 10
      }

      return avg
    } else {
      if (avg > this.minSalaryAmount * 10) {
        return this.minSalaryAmount * 10
      } else {
        return avg
      }
    }
  }

  get daysForCalculate() {
    if (this.fields.type === Subsidy.DISABILITY && this.fields.work === Subsidy.HIRED) {
      return (this.fields.days - 1)
    } else {
      return this.fields.days
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
    return (this.avgDailySalary * this.daysForCalculate)
  }
}

export default Subsidy
