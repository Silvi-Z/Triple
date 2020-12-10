import * as Yup from "yup"

export const SALARY_MIN = 1;
export const SALARY_MAX = 5000000;
export const SALARY_STEP = 1000;

export const PENSION_FIELD_NO = 0;
export const PENSION_FIELD_YES = 1;
export const PENSION_FIELD_YES_VOLUNTEER = 2;

export const TAX_FIELD_IT = 3;
export const TAX_FIELD_COMMON = 1;
export const TAX_FIELD_ENTERPRISE = 2;

export const BY_FIELD_DATE = 1
export const BY_FIELD_TABLE = 0

export const schema = Yup.object().shape({
  from: Yup.number().oneOf([1, 2]).required(),
  amount: Yup.number().required().min(1),
  pension: Yup.number().oneOf([PENSION_FIELD_NO, PENSION_FIELD_YES, PENSION_FIELD_YES_VOLUNTEER]).required(),
  tax_field: Yup.number().oneOf([TAX_FIELD_IT, TAX_FIELD_COMMON, TAX_FIELD_ENTERPRISE]).required(),
});

export const schemaBy = Yup.object().shape({
  by: Yup.number().oneOf([BY_FIELD_DATE, BY_FIELD_TABLE]).required(),
  from: Yup.number().oneOf([1, 2]).required(),
  schedule: Yup.number().oneOf([5, 6]).required(),
  amount: Yup.number().min(1).when('by', {
    is: BY_FIELD_TABLE,
    then: Yup.number().nullable(),
    otherwise: Yup.number().required()
  }),
  date_from: Yup.date().nullable().when('by', {
    is: BY_FIELD_DATE,
    then: Yup.date().required()
  }),
  date_to: Yup.date().nullable().when('by', {
    is: BY_FIELD_DATE,
    then: Yup.date().required()
  }),
  pension: Yup.number().oneOf([PENSION_FIELD_NO, PENSION_FIELD_YES, PENSION_FIELD_YES_VOLUNTEER]).required(),
  tax_field: Yup.number().oneOf([TAX_FIELD_IT, TAX_FIELD_COMMON, TAX_FIELD_ENTERPRISE]).required().label('tax field'),
  employees: Yup.array().of(Yup.object().shape({
    amount: Yup.number().required().label('Employee salary amount')
  })).when('by', {
    is: BY_FIELD_TABLE,
    then: Yup.array().required(),
  })
})
