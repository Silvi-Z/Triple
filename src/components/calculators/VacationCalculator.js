import React from "react"
import moment from "moment"
import triple from "../../api/triple"
import { pick, isNull, isEmpty } from "lodash"
import VacationTable from "./calcComponents/VacationTable"
import { Row, Col, Card, Form, Radio, Checkbox } from "antd"
import { ButtonSubmit, FormLabel, Label, SalarySlider, RadioLabel, SalaryInput, UnderLine, VacationDatePicker } from "./styled"
import {
  schema,
  SALARY_MAX, SALARY_MIN, SALARY_STEP,
  TAX_FIELD_COMMON, TAX_FIELD_ENTERPRISE, TAX_FIELD_IT,
  PENSION_FIELD_NO, PENSION_FIELD_YES, PENSION_FIELD_YES_VOLUNTEER,
} from "./utilities/salary"
import SalaryCardResult from "./calcComponents/SalaryCardResult"

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
}
const initialValues = {
  date_to: null,
  date_from: null,
  vacation_days: null,
  working_schedule: 5,
  from: 1,
  amount: null,
  pension: PENSION_FIELD_YES,
  static_salary: true,
  tax_field: TAX_FIELD_COMMON,
}

class VacationCalculator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: { ...initialValues },
      result: {
        total_fee: 0,
        income_tax: 0,
        pension_fee: 0,
        stamp_fee: 0,
        salary: 0,
      },
      monthAvgSalary: 0,
    }
  }

  get vacationSalary() {
    const { monthAvgSalary } = this.state
    const { amount, vacation_days, static_salary, working_schedule } = this.state.form
    const workingDaysInMonth = working_schedule === 5 ? 21 : 25

    if ((vacation_days && amount) || (vacation_days && monthAvgSalary)) {
      const vacationSalary = static_salary
        ? amount / workingDaysInMonth * vacation_days
        : monthAvgSalary / workingDaysInMonth * vacation_days

      return Math.round(vacationSalary)
    }
    return 0
  }

  get dateFromValue() {
    const { form } = this.state

    return isNull(form.date_from) ? form.date_from : moment(form.date_from)
  }

  get dateToValue() {
    const { form } = this.state

    return isNull(form.date_to) ? form.date_to : moment(form.date_to)
  }

  get fromDate() {
    return this.state.form.date_from
  }

  get amounts() {
    const { amount, date_from } = this.state.form
    const momentFrom = moment(date_from).subtract(1, "month")
    let items = []

    if (!date_from) {
      return items
    }

    while (moment(date_from).diff(momentFrom, "months") <= 12) {
      items.push({
        month: momentFrom.month(),
        year: momentFrom.year(),
        salary: amount || null,
        bonus: null,
        surcharge: null,
      })

      momentFrom.subtract(1, "month")
    }

    return items
  }

  autocompleteVacationDays() {
    const { date_from, date_to, working_schedule } = this.state.form

    const weekends = working_schedule === 5 ? [0, 6] : [6]

    let vacation_days = 0, momentFrom = moment(date_from)

    if (isNull(date_to)) {
      this.setState({form: { ...this.state.form, vacation_days: null}})
    }

    if (date_from && date_to) {
      while (momentFrom.isSameOrBefore(date_to)) {
        if (!weekends.includes(momentFrom.day())) {
          vacation_days++
        }

        momentFrom.add(1, "day")
      }

      this.setState({ form: { ...this.state.form, vacation_days } })
    }
  }

  autocompleteVacationDateTo() {
    const { date_from, vacation_days, working_schedule } = this.state.form
    const weekends = working_schedule === 5 ? [0, 6] : [6]
    const momentFrom = moment(date_from)
    let date_to = null

    if (isEmpty(vacation_days)) {
      this.setState({ form: { ...this.state.form, date_to } })
    }

    if (date_from && vacation_days) {
      for (let i = 1; i < vacation_days; i++) {
        if (weekends.includes(momentFrom.day())) {
          i--
        }

        momentFrom.add(1, "day")
      }

      date_to = momentFrom.format("YYYY-MM-DD")

      this.setState({ form: { ...this.state.form, date_to } })
    }
  }

  setDateField(name, date) {
    date = isNull(date) ? date : date.format("YYYY-MM-DD");

    this.setField(name, date, this.autocompleteVacationDays)
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  calcVacationAmount = monthAvgSalary => this.setState({ monthAvgSalary })

  handleSubmit = () => {
    const { form } = this.state
    const data = { ...pick(form, Object.keys(schema.fields)), amount: this.vacationSalary }

    schema.isValid(data)
      .then(valid => {
        if (!valid) return

        triple.post("/api/counter/salary", data, {
          params: {
            stamp: false,
          },
        })
          .then(res => this.setState({ result: res.data }))
          .catch(err => console.log(err));
      })
  }

  render() {
    const { form, result } = this.state
    const { lang } = this.props

    return (
      <Row align="start" gutter={20}>
        <Col span={16}>
          <Row align="center" style={{justifyContent: 'space-between'}}>
            <FormLabel>{lang.title}</FormLabel>

            <FormLabel>{(new Date()).getFullYear()}</FormLabel>
          </Row>

          <Card bordered={false}>
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >
              <Row gutter={10} align="middle">
                <Col span={10}>
                  <Form.Item label={<Label>{lang.start}</Label>}>
                    <VacationDatePicker
                      onChange={date => this.setDateField("date_from", date)}
                      placeholder={lang.date_from_placeholder}
                      value={this.dateFromValue}
                      format="DD.MM.YYYY"
                      name="date_from"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label={<Label>{lang.end}</Label>}>
                    <VacationDatePicker
                      onChange={date => this.setDateField("date_to", date)}
                      disabledDate={d => !this.fromDate || (d.isSameOrBefore(this.fromDate, "day"))}
                      placeholder={lang.date_from_placeholder}
                      value={this.dateToValue}
                      format="DD.MM.YYYY"
                      name="date_to"
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label={<Label>{lang.vacation_days}</Label>}>
                <SalaryInput
                  onChange={v => this.setField("vacation_days", v, this.autocompleteVacationDateTo)}
                  value={form.vacation_days}
                  style={{ width: "54px" }}
                  min={1}
                  name="vacation_days"
                  type="number"
                  size="large"
                />
              </Form.Item>

              <Form.Item label={lang.working_schedule} labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setField("working_schedule", e.target.value, this.autocompleteVacationDays)}
                  value={form.working_schedule}
                >
                  <Radio value={5}>
                    {<Label style={{ textTransform: "none" }}>{lang.five_days}</Label>}
                  </Radio>
                  <Radio value={6}>
                    {<Label style={{ textTransform: "none" }}>{lang.six_days}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label={<Label>{lang.salary_label}</Label>}>
                <SalaryInput
                  onChange={v => this.setField("amount", v)}
                  value={form.amount}
                  min={SALARY_MIN}
                  name="amount"
                  size="large"
                  type="number"
                />
              </Form.Item>

              <Form.Item>
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

              {!form.static_salary ?
                <VacationTable
                  lang={lang}
                  items={this.amounts}
                  onChange={this.calcVacationAmount}
                />
                : null}

              <Form.Item
                label={<Label style={{ fontSize: "16px" }}>{lang.tax_label}</Label>}
                labelCol={{ span: 24 }}
                name="tax_field"
              >
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

              <Form.Item
                label={<RadioLabel>{lang.pensioner_label}</RadioLabel>}
                labelCol={{ span: 24 }}
                name="pension"
              >
                <Radio.Group
                  onChange={e => this.setField("pension", e.target.value)}
                  value={form.pension}
                >
                  <Radio value={PENSION_FIELD_YES}>
                    <Label>{lang.yes}</Label>
                  </Radio>
                  <Radio value={PENSION_FIELD_YES_VOLUNTEER}>
                    <Label>{lang.yes_volunteer}</Label>
                  </Radio>
                  <Radio value={PENSION_FIELD_NO}>
                    <Label>{lang.no}</Label>
                  </Radio>
                </Radio.Group>
              </Form.Item>

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
          <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

          <UnderLine />

          {Object.keys(lang.result).map(key => {
            let text = result[key]

            if (key === 'title') return;

            if (key === "gross_vacation_amount") text = this.vacationSalary

            if (key === "pure_vacation_amount") text = result.salary

            return (
              <SalaryCardResult
                title={lang.result[key]}
                text={text}
                key={key}
              />
            )
          })}
        </Col>
      </Row>
    )
  }
}

export default VacationCalculator
