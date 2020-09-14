import React, { useState } from "react"
import * as Yup from "yup"
import { useFormik } from "formik"
import styled from "styled-components";
import { Row, Col, Form, Card, Radio, Button, InputNumber, Typography, Spin, Divider } from "antd"
import { apiHelper } from "../../helpers/apiHelper"
import SalaryCardResult from "./calcComponents/SalaryCardResult"

const { Text } = Typography;

const FormLabel = styled.h3`
  font-family: Arial AMU;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.15px;
  color: #000000;
  margin-bottom: 15px;
`;

const RadioGroup = styled(Radio.Group)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-bottom: 25px;
`;

const RadioButton = styled(Radio.Button)`
  font-weight: bold;
  text-align: center;
  border-radius: 5px;
  width: 100%;
  height: 50px !important;
  border-color: #555555 !important;
  &.ant-radio-button-wrapper {
    line-height: 50px;
  }
  &.ant-radio-button-wrapper-checked {
    border-radius: 5px !important;
  } 
`;

const SalaryInput = styled(InputNumber)`
  background: #FFFFFF;
  border: 0.5px solid #555555;
  box-sizing: border-box;
  border-radius: 5px !important;
  width: 136px;
`;

const Label = styled(Text)`
  font-style: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.15px;
  text-transform: uppercase;
  color: #000000;
  font-weight: bold;
`;

const RadioLabel = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.15px;
  color: #000000;
`;

const ButtonSubmit = styled(Button)`
  background: #1C1D21;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 0.15px;
  text-transform: uppercase;
  color: #FFFFFF;
  width: 260px;
  height: 50px;
  &:hover:enabled {
    color: #FFFFFF !important;
    background: #1C1D21 !important;
    border-color: #1C1D21 !important;
  }
`;

const UnderLine = styled(Divider)`
  margin: 5px 0 15px!important;
  border-top: 1px solid #000000;
`;

const initialValues = {
  from: 1,
  amount: 0,
  pension: true,
  tax_field: 1,
};

const validationSchema = Yup.object().shape({
  from: Yup.number().oneOf([1, 2]).required(),
  amount: Yup.number().required().min(40000),
  pension: Yup.bool().required(),
  tax_field: Yup.number().oneOf([1, 2, 3]).required(),
});

const SalaryCalculator = ({ langText }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    total_fee: 0,
    income_tax: 0,
    pension_fee: 0,
    stamp_fee: 0,
    salary: 0
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    isInitialValid: false,
    onSubmit: async values => {
      setLoading(true);

      try {
        const res = await apiHelper.post("/api/counter/salary", values)
        setResult(res.data);
      } catch (e) {
        console.log("Calculation error: ", e)
      }
      setLoading(false)
    },
  });

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <Row align="middle" gutter={20}>
      <Col span={16}>
        <FormLabel>{langText.title}</FormLabel>

        <Card bordered={false} loading={loading}>
          <Form onFinish={formik.handleSubmit} initialValues={initialValues} layout="horizontal" colon={false}>
            <Row align="middle" gutter={[10,10]}>
              <RadioGroup
                onChange={(e) => formik.setFieldValue("from", e.target.value)}
                value={formik.values.from}
                size="large"
              >
                <Col span={11}>
                  <RadioButton value={1} onChange={(e) => formik.setFieldValue("pension", e.target.value)} size="large">
                    {langText.dirty_salary_button}
                  </RadioButton>
                </Col>
                <Col span={2} style={{textAlign: 'center'}}>
                  <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.32 6L0 10L5.32 14V11H14.6667V9H5.32V6ZM24 4L18.68 0V3H9.33333V5H18.68V8L24 4Z" fill="#00B3C7"/>
                  </svg>
                </Col>
                <Col span={11}>
                  <RadioButton value={2} onChange={(e) => formik.setFieldValue("pension", e.target.value)} size="large">
                    {langText.clean_salary_button}
                  </RadioButton>
                </Col>
              </RadioGroup>
            </Row>

            <Form.Item label={<Label>{langText.salary_label}</Label>} name="amount">
              <SalaryInput
                onChange={v => formik.setFieldValue("amount", v)}
                value={formik.values.amount}
                min={0}
                name="amount"
                size="large"
                type="number"
              />
            </Form.Item>

            <Form.Item label={<RadioLabel>{langText.pensioner_label}</RadioLabel>} name="pension">
              <Radio.Group
                onChange={(e) => formik.setFieldValue("pension", e.target.value)}
                value={formik.values.pension}
              >
                <Radio value={true}>
                  <Label>{langText.yes_button}</Label>
                </Radio>
                <Radio value={false}>
                  <Label>{langText.no_button}</Label>
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label={<Label style={{fontSize: '16px'}}>{langText.tax_label}</Label>} labelCol={{ span: 24 }} name="tax_field">
              <Radio.Group
                onChange={(e) => formik.setFieldValue("tax_field", e.target.value)}
                value={formik.values.tax_field}
              >
                <Radio style={radioStyle} value={1}>
                  <RadioLabel>{langText.tax_label_common}</RadioLabel>
                </Radio>
                <Radio style={radioStyle} value={2}>
                  <RadioLabel>{langText.tax_label_enterprise}</RadioLabel>
                </Radio>
                <Radio style={radioStyle} value={3}>
                  <RadioLabel>{langText.tax_label_it}</RadioLabel>
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <ButtonSubmit
                disabled={loading || !formik.isValid}
                htmlType="submit"
                shape="round"
                size="large"
              >
                {loading ? <Spin /> : langText.count_button}
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
        />
        <SalaryCardResult
          title={langText.income_tax_label}
          text={result.income_tax}
          tooltip
        />
        <SalaryCardResult
          title={langText.pension_paymet_label}
          text={result.pension_fee}
          tooltip
        />
        <SalaryCardResult
          title={langText.stamp_duty_label}
          text={result.stamp_fee}
        />
        <SalaryCardResult
          title={langText.general_storage_label}
          text={result.total_fee}
        />
      </Col>
    </Row>
  )
}

export default SalaryCalculator;
