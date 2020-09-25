import * as Yup from "yup"

export const SALARY_MIN = 0;
export const SALARY_MAX = 5000000;
export const SALARY_STEP = 10000;

export const PENSION_FIELD_NO = 0;
export const PENSION_FIELD_YES = 1;
export const PENSION_FIELD_YES_VOLUNTEER = 2;

export const TAX_FIELD_IT = 3;
export const TAX_FIELD_COMMON = 1;
export const TAX_FIELD_ENTERPRISE = 2;

export const schema = Yup.object().shape({
  from: Yup.number().oneOf([1, 2]).required(),
  amount: Yup.number().required().min(1),
  pension: Yup.number().oneOf([PENSION_FIELD_NO, PENSION_FIELD_YES, PENSION_FIELD_YES_VOLUNTEER]).required(),
  tax_field: Yup.number().oneOf([TAX_FIELD_IT, TAX_FIELD_COMMON, TAX_FIELD_ENTERPRISE]).required(),
});
