import {
  PENSION_FIELD_YES_VOLUNTEER,
  PENSION_FIELD_NO,
  TAX_FIELD_COMMON,
  TAX_FIELD_IT,
} from "../components/calculators/utilities/salary"

function isInt(n){
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}

export class Salary {
  /**
   * Calculate min amount for salary input
   *
   * @param {number} taxField
   * @param {number} pensionField
   * @return {number}
   */
  static minAmount(taxField, pensionField) {
    const taxRate = Salary.taxRate(taxField)
    const pensionRate = Salary.pensionRate(pensionField)

    return Math.ceil(Salary.min(taxRate, pensionRate))
  }

  static min(taxRate, pensionRate, stamp = 1000) {
    if (isFloat(taxRate) && isFloat(pensionRate))
      return -stamp / (taxRate + pensionRate - 1)
    else if (isFloat(taxRate) && isInt(pensionRate))
      return (-stamp - pensionRate) / (taxRate - 1)
    else if (isInt(taxRate) &&  isFloat(pensionRate))
      return (-stamp - taxRate) / (pensionRate - 1)
    else if (isInt(taxRate) && isInt(pensionRate))
      return stamp + taxRate + pensionRate
    else
      return 0
  }

  static taxRate(taxField) {
    let tax

    if (taxField === TAX_FIELD_COMMON) {
      tax = 0.23;
    } else if (taxField === TAX_FIELD_IT) {
      tax = 0.1;
    } else {
      tax = 5000;
    }

    return tax
  }

  static pensionRate(pensionField) {
    if (pensionField === PENSION_FIELD_NO) {
      return 0;
    } else if (pensionField === PENSION_FIELD_YES_VOLUNTEER) {
      return 0.05
    } else {
      return 0.025;
    }
  }
}
