import React from "react"
import triple from "../../api/triple"
import { cloneDeep, isNull, isEqual } from "lodash"
import MortgageTable from "./calcComponents/MortgageTable"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import { Row, Col, Card, Form, Radio, Checkbox } from "antd"
import { SALARY_TYPE_NET, SALARY_TYPE_REGISTERED } from "./utilities/mortgage"
import { ButtonSubmit, FormLabel, Label, RadioLabel, CalculatorInput, UnderLine } from "./styled"
import {
  SALARY_MIN,
  TAX_FIELD_COMMON, TAX_FIELD_ENTERPRISE, TAX_FIELD_IT,
  PENSION_FIELD_NO, PENSION_FIELD_YES, PENSION_FIELD_YES_VOLUNTEER, schema,
} from "./utilities/salary"

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
  pension: PENSION_FIELD_YES
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
      calculated: false,
      loading: false,
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

    return quarterTax > interest_amount ? interest_amount : Math.round(quarterTax);
  }

  quarterTotalTax(percent) {
    const { items } = this.state

    const tax = items.reduce((t ,item) => t + (((item.salary || 0) + (item.bonus || 0) + (item.surcharge || 0)) * percent), 0)

    return Math.round(tax)
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  setLoading(loading) {
    this.setState({loading})
  }

  setItemField = ({ name, value, i }) => {
    let items = cloneDeep(this.state.items)
      items[i][name] = value

    this.setState({ items })
  }

  handleSubmit = async () => {
    const { salary_type, tax_field, pension, static_salary, amount, interest_amount } = this.state.form;
    let { items } = this.state;

    const a = static_salary
      ? amount
      : items.reduce((t ,item) => t + Math.round(( (item.salary || 0) + (item.bonus || 0) + (item.surcharge || 0) )), 0)

    if (salary_type === SALARY_TYPE_NET) {
      const data = {
        from: salary_type,
        amount: a,
        tax_field,
        pension
      }
      const valid = await schema.isValid(data)

      if (valid) {
        this.setLoading(true)

        try {
          const res = await triple.post("/api/counter/salary", data);
          let { income_tax } = res.data

          if (static_salary || tax_field === TAX_FIELD_ENTERPRISE) {
            income_tax = income_tax * 3
          }

          let tax = income_tax > interest_amount ? interest_amount : income_tax
            tax = Math.round(tax)

          this.setState({ tax }, () => {
            if (!this.state.calculated) {
              this.setState({calculated: true})
            }
          })
        } catch (e) {
          console.log(e)
        } finally {
          this.setLoading(false)

          document.body.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
        }
      }
    } else {
      this.setState({tax: this.backIncomeTax}, () => {
        if (!this.state.calculated) {
          this.setState({calculated: true})
        }

        document.body.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((!isEqual(this.state.form, prevState.form) || !isEqual(this.state.items, prevState.items)) && this.state.calculated) {
      this.handleSubmit()
    }
  }

  render() {
    const { form, items, tax, loading } = this.state
    const { lang } = this.props

    return (
      <Row align="start" gutter={20}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
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
              <Form.Item label={<Label style={{ fontSize: "16px" }}>{lang["salary_type_label"]}</Label>} labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setField("salary_type", e.target.value)}
                  value={form.salary_type}
                >
                  <Radio value={SALARY_TYPE_REGISTERED}>
                    <Label>{lang["dirty_salary"]}</Label>
                  </Radio>
                  <Radio value={SALARY_TYPE_NET}>
                    <Label>{lang["clean_salary"]}</Label>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Checkbox
                  onChange={e => this.setField("static_salary", e.target.checked)}
                  checked={form.static_salary}
                >
                  <RadioLabel>{lang["static_salary_label"]}</RadioLabel>
                </Checkbox>
              </Form.Item>

              {!form.static_salary ?
                <MortgageTable
                  lang={lang}
                  items={items}
                  onChange={this.setItemField}
                />
                : null}

              {form.static_salary ?
                <Form.Item label={<Label>{lang["salary_label"]}</Label>} name="amount">
                  <CalculatorInput
                    formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={v => v.replace(/\$\s?|(,*)/g, '')}
                    onChange={v => this.setField("amount", v)}
                    value={form.amount}
                    min={SALARY_MIN}
                    name="amount"
                    size="large"
                  />
                </Form.Item>
              : null}

              <Form.Item label={<Label>{lang["interest_amount_label"]}</Label>} name="interest_amount">
                <CalculatorInput
                  onChange={v => this.setField("interest_amount", v)}
                  value={form.interest_amount}
                  name="interest_amount"
                  type="number"
                  size="large"
                />
              </Form.Item>

              <Form.Item label={<Label style={{ fontSize: "16px" }}>{lang["tax_label"]}</Label>} labelCol={{ span: 24 }} name="tax_field">
                <Radio.Group
                  onChange={e => this.setField("tax_field", e.target.value)}
                  value={form.tax_field}
                >
                  <Radio style={radioStyle} value={TAX_FIELD_COMMON}>
                    <RadioLabel>{lang["tax_label_common"]}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_IT}>
                    <RadioLabel>{lang["tax_label_it"]}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_ENTERPRISE}>
                    <RadioLabel>{lang["tax_label_enterprise"]}</RadioLabel>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              {form.salary_type === SALARY_TYPE_NET ?
                <Form.Item
                  label={<RadioLabel>{lang["pensioner_label"]}</RadioLabel>}
                  labelCol={{ span: 24 }}
                  name="pension"
                >
                  <Radio.Group
                    onChange={e => this.setField("pension", e.target.value)}
                    value={form.pension}
                  >
                    <Radio value={PENSION_FIELD_YES}>
                      <Label>{lang["yes"]}</Label>
                    </Radio>
                    <Radio value={PENSION_FIELD_YES_VOLUNTEER}>
                      <Label>{lang["yes_volunteer"]}</Label>
                    </Radio>
                    <Radio value={PENSION_FIELD_NO}>
                      <Label>{lang["no"]}</Label>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              : null}

              <Form.Item>
                <ButtonSubmit
                  loading={loading}
                  disabled={loading}
                  htmlType="submit"
                  shape="round"
                  size="large"
                >
                  {lang["calculate"]}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <FormLabel style={{margin: 0}}>{lang.result.title}</FormLabel>

          <UnderLine/>

          <CalculatorCardResult
            tooltip={form.tax_field === TAX_FIELD_ENTERPRISE ? 'prompt text': null}
            title={lang.result["income_tax_back"]}
            loading={loading}
            text={tax}
          />
        </Col>
      </Row>
    )
  }
}

export default MortgageCalculator
