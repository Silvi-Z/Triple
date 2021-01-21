import React from "react"
import moment from "moment"
import { isEmpty, isNull } from "lodash"
import { Card, Checkbox, Col, Form, Radio, Row } from "antd"
import {
  CalculatorDatePicker,
  CalculatorInput,
  FormItemLabel,
  ButtonSubmit,
  RadioLabel,
  UnderLine,
  FormLabel,
<<<<<<< HEAD
  Label,
=======
  Label, H1Styled, TextStyled, CalculatorsCard,
>>>>>>> news-page
} from "./styled"
import triple from "../../api/triple"
import Subsidy from "../../calculators/Subsidy"
import GrossSalaryTable from "./calcComponents/GrossSalaryTable"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import { workingDaysInRange } from "./utilities/vacation"

moment.locale("en", {
  week: {
    dow: 1,
  },
})

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
}

class SubsidyCalculator extends React.Component {
  handleSubmit = () => {
    const amount = this.calculator.calculate()
    const { pension, tax_field } = this.state.form

    Subsidy.schema.isValid(this.state.form).then(valid => {
      if (!valid) {
        this.setState({form: Subsidy.form})

        return
      }

      triple.post("/api/counter/salary", {
        from: 1,
        amount,
        pension,
        tax_field,
      }).then(res => {
        const {income_tax, salary} = res.data

        this.setState({result: {
            income_tax,
            subsidy: amount,
            pure_subsidy: salary
          }
        })
      })
    })
  }

  get amounts() {
    const { amount, start } = this.state.form
    const endMonth = start ? start.clone().add(11, "months") : null

    return start ? Array
      .from(moment.range(start, endMonth)
        .by("month"))
      .map(month => ({
        month: month.month(),
        year: month.year(),
        bonus: null,
        surcharge: null,
        salary: amount || null,
      }))
    : [{
        month: null,
        year: null,
        bonus: null,
        surcharge: null,
        salary: amount || null,
      }]
  }

  get isStatic() {
    return this.state.form.static
  }

  get isNotStatic() {
    return !this.state.form.static
  }

  get isTypeDisability() {
    return this.state.form.type === Subsidy.DISABILITY
  }

  get isTypeMaternity() {
    return this.state.form.type === Subsidy.MATERNITY
  }

  constructor(props) {
    super(props)

    this.state = {
      form: { ...Subsidy.form },
      result: { subsidy: null },
    }
    this.calculator = new Subsidy()
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  resetSchedule() {
    if (this.isTypeMaternity) {
      this.setField('schedule', 5)
    }
  }

  autocompleteDays() {
    const { start, end, schedule } = this.state.form

    if (isNull(start) || isNull(end)) {
      this.setState({ form: { ...this.state.form, days: null } })
    }

    if (start && end) {
      this.setField("days", workingDaysInRange({
        holidays: [],
        workdays: [],
        schedule: 5,
        start,
        end
      }).length)
    }
  }

  autocompleteEnd() {
    const { start, days, schedule } = this.state.form

    const weekends = schedule === 5 ? [0, 6] : [6]

    if (isEmpty(days)) {
      this.setField('end', null)
    }

    if (start && days) {
      const end = start.clone()

      for (let i = 1; i < days; i++) {
        if (weekends.includes(end.day())) i--

        end.add(1, "day")
      }

      this.setState({ form: { ...this.state.form, end } })
    }
  }

  render() {
    const { lang } = this.props
    const { form, result } = this.state

    this.calculator.setFields(form)

    return (
      <Row align="start" gutter={20}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <Row align="center" style={{ justifyContent: "space-between" }}>
<<<<<<< HEAD
            <FormLabel>{lang.title}</FormLabel>

            <FormLabel>{(new Date()).getFullYear()}թ.</FormLabel>
          </Row>

          <Card bordered={false}>
=======
            <div className="textSec">
              <H1Styled>{lang.title}</H1Styled>
              <TextStyled>{lang.paragraph}</TextStyled>
            </div>
          </Row>

          <CalculatorsCard bordered={false}>
>>>>>>> news-page
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >
              {/* type field */}
              <Form.Item label={lang.form.type} labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setField("type", e.target.value, this.resetSchedule)}
                  value={form.type}
                >
                  <Radio value={Subsidy.MATERNITY}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.maternity}</Label>}
                  </Radio>
                  <Radio value={Subsidy.DISABILITY}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.disability}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <FormItemLabel>{lang.form.dates}</FormItemLabel>

              {/* start-end dates fields */}
              <Row gutter={10} align="middle">
                <Form.Item style={{ marginRight: "25px" }} label={<Label>{lang.form.start}</Label>}>
                  <CalculatorDatePicker
                    onChange={date => this.setField("start", date, this.autocompleteDays)}
                    placeholder={lang.form.dates_placeholder}
                    value={form.start}
                    format="DD.MM.YYYY"
                    name="start"
                    size="large"
                  />
                </Form.Item>

                <Form.Item label={<Label>{lang.form.end}</Label>}>
                  <CalculatorDatePicker
                    onChange={date => this.setField("end", date, this.autocompleteDays)}
                    placeholder={lang.form.dates_placeholder}
                    value={form.end}
                    format="DD.MM.YYYY"
                    size="large"
                    name="end"
                  />
                </Form.Item>
              </Row>

              {/* days field */}
              <Form.Item label={<Label>{lang.form.days}</Label>}>
                <CalculatorInput
                  onChange={v => this.setField("days", v, this.autocompleteEnd)}
                  style={{ width: "54px" }}
                  value={form.days}
                  name="days"
                  size="large"
                  min={1}
                />
              </Form.Item>

              {/* work field */}
              <Form.Item labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setField("work", e.target.value)}
                  value={form.work}
                >
                  <Radio value={Subsidy.HIRED}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.hired}</Label>}
                  </Radio>
                  <Radio value={Subsidy.SELF_EMPLOYED}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.self}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>

              {/* tax field */}
              <Form.Item
                label={<Label style={{ fontSize: "16px" }}>{lang.form.tax}</Label>}
                labelCol={{ span: 24 }}
                name="tax_field"
              >
                <Radio.Group
                  onChange={e => this.setField("tax_field", e.target.value)}
                  value={form.tax_field}
                >
                  <Radio style={radioStyle} value={Subsidy.TAX_COMMON}>
                    <RadioLabel>{lang.form.tax_common}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={Subsidy.TAX_IT}>
                    <RadioLabel>{lang.form.tax_it}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={Subsidy.TAX_ENTERPRISE}>
                    <RadioLabel>{lang.form.tax_enterprise}</RadioLabel>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              {/* schedule field */}
              {this.isTypeDisability ? <Form.Item label={lang.form.schedule} labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setField("schedule", e.target.value)}
                  value={form.schedule}
                >
                  <Radio value={5}>
                    {<Label style={{ textTransform: "none" }}>{lang.form["five_days"]}</Label>}
                  </Radio>
                  <Radio value={6}>
                    {<Label style={{ textTransform: "none" }}>{lang.form["six_days"]}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item> : null}

              {/* amount input */}
              {this.isStatic ? <Form.Item label={<Label>{lang.form.amount}</Label>}>
                <CalculatorInput
                  formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  onChange={v => this.setField("amount", v)}
                  parser={v => v.replace(/\$\s?|(,*)/g, "")}
                  value={form.amount}
                  step={1000}
                  name="amount"
                  size="large"
                />
              </Form.Item> : null}

              {/* income input */}
              <Form.Item label={<Label>{lang.form.income}</Label>}>
                <CalculatorInput
                  formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  onChange={v => this.setField("income", v)}
                  parser={v => v.replace(/\$\s?|(,*)/g, "")}
                  value={form.income}
                  step={1000}
                  name="income"
                  size="large"
                />
              </Form.Item>

              {/* static field */}
              <Form.Item>
                <Checkbox
                  onChange={e => this.setField("static", e.target.checked)}
                  checked={form.static}
                >
                  <RadioLabel>{lang.form.static}</RadioLabel>
                </Checkbox>
              </Form.Item>

              {this.isNotStatic ? <GrossSalaryTable
                lang={lang.gross}
                items={this.amounts}
                onChange={avg => this.calculator.setAvg(avg)}
                setDate={date => this.setField("start", date)}
              /> : null}

              {/* Submit button */}
              <Form.Item style={{ marginTop: "50px" }}>
                <ButtonSubmit htmlType="submit" shape="round" size="large">
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
<<<<<<< HEAD
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
=======
          </CalculatorsCard>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="result">
>>>>>>> news-page
          <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

          <UnderLine />

          <CalculatorCardResult
            title={lang.result["subsidy_gov"]}
            text={result.subsidy}
          />

          <CalculatorCardResult
            title={lang.result["income_tax"]}
            text={result.income_tax}
          />

          <CalculatorCardResult
            title={lang.result["pure_subsidy"]}
            text={result.pure_subsidy}
          />

          {/*<CalculatorCardResult*/}
          {/*  title={lang.result["total_fee"]}*/}
          {/*  text={result.total_fee}*/}
          {/*/>*/}
          {/*<CalculatorCardResult*/}
          {/*  title={lang.result["pure_vacation_amount"]}*/}
          {/*  text={result.salary}*/}
          {/*/>*/}
        </Col>
      </Row>
    )
  }
}

export default SubsidyCalculator
