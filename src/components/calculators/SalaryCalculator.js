import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Row, Col, Form, Card, Radio } from "antd";
import triple from "../../api/triple";
import SalaryCardResult from "./calcComponents/SalaryCardResult";
import {
  schema,
  SALARY_MIN, SALARY_MAX, SALARY_STEP,
  TAX_FIELD_IT, TAX_FIELD_COMMON, TAX_FIELD_ENTERPRISE,
  PENSION_FIELD_YES, PENSION_FIELD_YES_VOLUNTEER, PENSION_FIELD_NO,
} from "./utilities/salary"
import {
  Label,
  FormLabel,
  UnderLine,
  RadioGroup,
  RadioLabel,
  RadioButton,
  CalculatorInput,
  CalculatorSlider,
  ButtonSubmit,
} from "./styled"

const initialValues = {
  from: 1,
  amount: 0,
  pension: PENSION_FIELD_YES,
  tax_field: TAX_FIELD_COMMON,
};

const SalaryCalculator = ({ langText }) => {
  const [result, setResult] = useState({
    total_fee: 0,
    income_tax: 0,
    pension_fee: 0,
    stamp_fee: 0,
    salary: 0
  })
  const [loading, setLoading] = useState(false)
  const [calculated, setCalculated] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnMount: true,
    isInitialValid: false,
    onSubmit: async values => {
      setLoading(true)

      try {
        const res = await triple.post("/api/counter/salary", values);

        if (!calculated) setCalculated(true)

        setResult(res.data);
      } catch (e) {
        console.log("Calculation error: ", e)
      } finally {
        setLoading(false)
      }
    },
  });

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  useEffect(() => {
    if (calculated) formik.handleSubmit()
  }, [formik.values])

  return (
    <Row align="start" gutter={20}>
      <Col span={16}>
        <Row align="center" style={{justifyContent: 'space-between'}}>
          <FormLabel>{langText.title}</FormLabel>

          <FormLabel>{(new Date()).getFullYear()}թ.</FormLabel>
        </Row>

        <Card bordered={false}>
          <Form onFinish={formik.handleSubmit} initialValues={initialValues} layout="horizontal" colon={false}>
            <Row align="middle" gutter={[10,10]}>
              <RadioGroup
                onChange={(e) => formik.setFieldValue("from", e.target.value)}
                value={formik.values.from}
                style={{ flexDirection: formik.values.from === 2 ? "row-reverse" : "row" }}
                size="large"
              >
                <Col span={11}>
                  <RadioButton value={1} size="large">
                    {langText.dirty_salary_button}
                  </RadioButton>
                </Col>
                <Col span={2} style={{textAlign: 'center'}}>
                  <svg
                    fill="none"
                    width="30"
                    height="49"
                    viewBox="0 0 24 14"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => formik.setFieldValue("from", formik.values.from === 2 ? 1 : 2)}
                  >
                    <path d="M5.32 6L0 10L5.32 14V11H14.6667V9H5.32V6ZM24 4L18.68 0V3H9.33333V5H18.68V8L24 4Z" fill="#00B3C7"/>
                  </svg>
                </Col>
                <Col span={11}>
                  <RadioButton value={2} size="large">
                    {langText.clean_salary_button}
                  </RadioButton>
                </Col>
              </RadioGroup>
            </Row>

            <Form.Item label={<Label>{langText.salary_label}</Label>} name="amount">
              <CalculatorInput
                onChange={v => formik.setFieldValue("amount", v)}
                value={formik.values.amount}
                min={SALARY_MIN}
                name="amount"
                size="large"
                type="number"
              />
            </Form.Item>

            <Form.Item name="amount">
              <CalculatorSlider
                onChange={v => formik.setFieldValue("amount", v)}
                value={formik.values.amount}
                step={SALARY_STEP}
                min={SALARY_MIN}
                max={SALARY_MAX}
                name="amount"
              />
            </Form.Item>

            <Form.Item label={<Label style={{fontSize: '16px'}}>{langText.tax_label}</Label>} labelCol={{ span: 24 }} name="tax_field">
              <Radio.Group
                onChange={(e) => formik.setFieldValue("tax_field", e.target.value)}
                value={formik.values.tax_field}
              >
                <Radio style={radioStyle} value={TAX_FIELD_COMMON}>
                  <RadioLabel>{langText.tax_label_common}</RadioLabel>
                </Radio>
                <Radio style={radioStyle} value={TAX_FIELD_IT}>
                  <RadioLabel>{langText.tax_label_it}</RadioLabel>
                </Radio>
                <Radio style={radioStyle} value={TAX_FIELD_ENTERPRISE}>
                  <RadioLabel>{langText.tax_label_enterprise}</RadioLabel>
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label={<RadioLabel>{langText.pensioner_label}</RadioLabel>} name="pension">
              <Radio.Group
                onChange={(e) => formik.setFieldValue("pension", e.target.value)}
                value={formik.values.pension}
              >
                <Radio value={PENSION_FIELD_YES}>
                  <Label>{langText.yes}</Label>
                </Radio>
                <Radio value={PENSION_FIELD_YES_VOLUNTEER}>
                  <Label>{langText.yes_volunteer}</Label>
                </Radio>
                <Radio value={PENSION_FIELD_NO}>
                  <Label>{langText.no}</Label>
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <ButtonSubmit
                disabled={!formik.isValid}
                htmlType="submit"
                shape="round"
                size="large"
              >
                {langText.count_button}
              </ButtonSubmit>
            </Form.Item>
          </Form>
        </Card>
      </Col>

      <Col span={8}>
        <FormLabel style={{margin: 0}}>{langText.result_title}</FormLabel>

        <UnderLine/>

        <SalaryCardResult
          title={formik.values.from === 1 ? langText.dirty_to_clean_salary : langText.clean_dirty_to_salary}
          text={result.salary}
          loading={loading}
        />
        <SalaryCardResult
          title={langText.income_tax_label}
          text={result.income_tax}
          loading={loading}
          tooltip
        />
        <SalaryCardResult
          title={langText.pension_paymet_label}
          text={result.pension_fee}
          loading={loading}
          tooltip
        />
        <SalaryCardResult
          title={langText.stamp_duty_label}
          text={result.stamp_fee}
          loading={loading}
        />
        <SalaryCardResult
          title={langText.general_storage_label}
          text={result.total_fee}
          loading={loading}
        />
      </Col>
    </Row>
  )
};

export default SalaryCalculator;
