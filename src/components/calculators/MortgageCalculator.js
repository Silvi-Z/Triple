import React from "react"
import { cloneDeep, isNull } from "lodash"
import MortgageTable from "./calcComponents/MortgageTable"
import SalaryCardResult from "./calcComponents/SalaryCardResult"
import { Card, Checkbox, Col, Form, Radio, Row } from "antd"
import { SALARY_TYPE_NET, SALARY_TYPE_REGISTERED } from "./utilities/mortgage"
import { ButtonSubmit, FormLabel, Label, RadioLabel, SalaryInput, SalarySlider, UnderLine } from "./styled"
import { SALARY_MAX, SALARY_MIN, SALARY_STEP, TAX_FIELD_COMMON, TAX_FIELD_ENTERPRISE, TAX_FIELD_IT } from "./utilities/salary"

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
}

const form = {
  amount: null,
  interest_amount: null,
  static_salary: true,
  salary_type: SALARY_TYPE_REGISTERED,
  tax_field: TAX_FIELD_COMMON,
}

class MortgageCalculator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: { ...form },
      items: [
        {month: 0, salary: null, surcharge: null, bonus: null},
        {month: 1, salary: null, surcharge: null, bonus: null},
        {month: 2, salary: null, surcharge: null, bonus: null}
      ],
      tax: null
    }
  }

  get backIncomeTax() {
    const { amount, interest_amount, static_salary, tax_field } = this.state.form

    if (!interest_amount)
      return null;

    let percent, quarterTax

    switch (tax_field) {
      case TAX_FIELD_COMMON: percent = 0.23
        break
      case TAX_FIELD_IT: percent = 0.1
        break
      default: percent = null
    }

    if (!isNull(percent)) {
      if (static_salary) {
        quarterTax = (amount || 0) * percent * 3
      } else {
        quarterTax = this.quarterTotalTax(percent)
      }
    } else {
      quarterTax = 5000 * 3;
    }

    return quarterTax > interest_amount ? interest_amount : quarterTax;
  }

  quarterTotalTax(percent) {
    const { items } = this.state

    return items.reduce((t ,item) => t + (((item.salary || 0) + (item.bonus || 0) + (item.surcharge || 0)) * percent), 0)
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  setItemField = ({ name, value, i }) => {
    let items = cloneDeep(this.state.items)
      items[i][name] = value

    this.setState({ items })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.backIncomeTax)
  }

  render() {
    const { form, items } = this.state
    const { lang } = this.props

    return (
      <Row align="start" gutter={20}>
        <Col span={16}>
          <Row align="center" style={{ justifyContent: "space-between" }}>
            <FormLabel>{lang.title}</FormLabel>

            <FormLabel>{(new Date()).getFullYear()}թ.</FormLabel>
          </Row>

          <Card bordered={false}>
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >
              <Form.Item label={<Label style={{ fontSize: "16px" }}>{lang.salary_type_label}</Label>} labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setField("salary_type", e.target.value)}
                  value={form.salary_type}
                >
                  <Radio value={SALARY_TYPE_REGISTERED}>
                    <Label>{lang.dirty_salary}</Label>
                  </Radio>
                  <Radio value={SALARY_TYPE_NET}>
                    <Label>{lang.clean_salary}</Label>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label={<Label>{lang.salary_label}</Label>} name="amount">
                <SalaryInput
                  onChange={v => this.setField("amount", v)}
                  value={form.amount}
                  min={SALARY_MIN}
                  name="amount"
                  size="large"
                  type="number"
                />
              </Form.Item>

              <Form.Item name="amount">
                <SalarySlider
                  onChange={v => this.setField("amount", v)}
                  value={form.amount}
                  step={SALARY_STEP}
                  min={SALARY_MIN}
                  max={SALARY_MAX}
                  name="amount"
                />
              </Form.Item>

              <Form.Item>
                <Checkbox
                  onChange={e => this.setField("static_salary", e.target.checked)}
                  checked={form.static_salary}
                >
                  <RadioLabel>{lang.static_salary_label}</RadioLabel>
                </Checkbox>
              </Form.Item>

              <Form.Item label={<Label style={{ fontSize: "16px" }}>{lang.tax_label}</Label>} labelCol={{ span: 24 }} name="tax_field">
                <Radio.Group
                  onChange={e => this.setField("tax_field", e.target.value)}
                  value={form.tax_field}
                >
                  <Radio style={radioStyle} value={TAX_FIELD_COMMON}>
                    <RadioLabel>{lang.tax_label_common}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_IT}>
                    <RadioLabel>{lang.tax_label_it}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_ENTERPRISE}>
                    <RadioLabel>{lang.tax_label_enterprise}</RadioLabel>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label={<Label>{lang.interest_amount_label}</Label>} name="interest_amount">
                <SalaryInput
                  onChange={v => this.setField("interest_amount", v)}
                  value={form.interest_amount}
                  name="interest_amount"
                  type="number"
                  size="large"
                />
              </Form.Item>

              {!form.static_salary ?
                <MortgageTable
                  lang={lang}
                  items={items}
                  onChange={this.setItemField}
                />
              : null}

              <Form.Item>
                <ButtonSubmit
                  htmlType="submit"
                  shape="round"
                  size="large"
                >
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8}>
          <FormLabel style={{margin: 0}}>{lang.result.title}</FormLabel>

          <UnderLine/>

          <SalaryCardResult
            title={lang.result.income_tax_back}
            text={this.backIncomeTax}
          />
        </Col>
      </Row>
    )
  }
}

export default MortgageCalculator