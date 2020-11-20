import React from "react"
import ReactDOM from "react-dom"
import moment from "moment"
import triple from "../../api/triple"
import { pick, isNull, isEmpty, isEqual } from "lodash"
import { Row, Col, Card, Form, Radio, Checkbox } from "antd"
import GrossSalaryTable from "./calcComponents/GrossSalaryTable"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import {
  Label,
  UnderLine,
  FormLabel,
  RadioLabel,
  CalculatorInput,
  ButtonSubmit,
  CalculatorDatePicker,
} from "./styled"
import {
  schema,
  SALARY_MIN,
  TAX_FIELD_COMMON, TAX_FIELD_ENTERPRISE, TAX_FIELD_IT,
  PENSION_FIELD_NO, PENSION_FIELD_YES, PENSION_FIELD_YES_VOLUNTEER,
} from "./utilities/salary"
import { holidays } from "./utilities/vacation"

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
  dateFromPicker = React.createRef()

  dateToPicker = React.createRef()

  row = React.createRef()

  col = React.createRef()

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
      calculated: false,
    }
  }

  get rowElement() {
    return ReactDOM.findDOMNode(this.row.current)
  }

  get rowElementOffsetTop() {
    return this.rowElement.getBoundingClientRect().top
  }

  get colElement() {
    return ReactDOM.findDOMNode(this.col.current)
  }

  get dateFromInput() {
    return ReactDOM
      .findDOMNode(this.dateFromPicker.current)
      .querySelector("input")
  }

  get dateToInput() {
    return ReactDOM
      .findDOMNode(this.dateToPicker.current)
      .querySelector("input")
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

  get amounts() {
    const { amount, date_from } = this.state.form
    const momentFrom = moment(date_from)
    let items = []

    if (!date_from) {
      items.push({
        month: null,
        year: null,
        salary: amount || null,
        bonus: null,
        surcharge: null,
      })

      return items
    }

    while (moment(date_from).diff(momentFrom, "months") < 12) {
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
        if (weekends.includes(momentFrom.day()) || holidays.includes(momentFrom.format('YYYY-MM-DD'))) {
          i--
        }

        momentFrom.add(1, "day")
      }

      date_to = momentFrom.format("YYYY-MM-DD")

      this.setState({ form: { ...this.state.form, date_to } })
    }
  }

  autocompleteVacationDays() {
    const { date_from, date_to, working_schedule } = this.state.form

    const weekends = working_schedule === 5 ? [0, 6] : [6]

    let vacation_days = 1, momentFrom = moment(date_from)

    if (isNull(date_to) || isNull(date_from)) {
      this.setState({ form: { ...this.state.form, vacation_days: null } })
    }

    if (date_from && date_to) {
      while (momentFrom.isSameOrBefore(date_to)) {
        if (!weekends.includes(momentFrom.day()) && !holidays.includes(momentFrom.format('YYYY-MM-DD'))) {
          vacation_days++
        }

        momentFrom.add(1, "day")
      }

      this.setState({ form: { ...this.state.form, vacation_days } })
    }
  }

  setDateField(name, date) {
    date = isNull(date) ? date : date.format("YYYY-MM-DD")

    this.setField(name, date, this.autocompleteVacationDays)
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  calcVacationAmount = monthAvgSalary => this.setState({ monthAvgSalary })

  setFromDate = date => this.setDateField("date_from", date)

  handleWindowScroll = e => {
    if (
      (window.scrollY + this.colElement.offsetHeight + this.rowElementOffsetTop) >=
      (this.rowElementOffsetTop + this.rowElement.offsetHeight)
    ) {
      this.colElement.classList.add('abs')
    } else {
      this.colElement.classList.remove('abs')
    }
  }

  handlePickerInput = e => {
    const { value, name } = e.target

    if (!value) {
      this.setDateField(name, null)

      name === "date_from"
        ? this.dateFromPicker.current.blur()
        : this.dateFromPicker.current.blur()
    }
  }

  handleSubmit = () => {
    const { form } = this.state
    const data = { ...pick(form, Object.keys(schema.fields)), amount: this.vacationSalary }

    schema.isValid(data).then(valid => {
      if (!valid) return

      triple
        .post("/api/counter/salary", data, {
          params: {
            stamp: false,
          },
        })
        .then(res => this.setState({ result: res.data }))
        .then(() => {
          if (!this.state.calculated) this.setState({ calculated: true })
        })
        .catch(err => console.log(err))
    })
  }

  componentDidMount() {
    this.dateFromInput.addEventListener("input", this.handlePickerInput)
    this.dateToInput.addEventListener("input", this.handlePickerInput)

    window.addEventListener('scroll', this.handleWindowScroll)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevState.form, this.state.form) && this.state.calculated) {
      this.handleSubmit()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll)
  }

  render() {
    const { form, result } = this.state
    const { lang } = this.props
    const width =  (typeof window !== `undefined`)
      ? document.documentElement.clientWidth : 992

    return (
      <Row align="start" gutter={20} ref={this.row}>
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
              <Row gutter={10} align="middle">
                <Col span={12}>
                  <Form.Item label={<Label>{lang.start}</Label>}>
                    <CalculatorDatePicker
                      disabledDate={d => form.date_to && (d.isSameOrAfter(form.date_to, "day"))}
                      onChange={date => this.setDateField("date_from", date)}
                      placeholder={lang.date_from_placeholder}
                      value={this.dateFromValue}
                      ref={this.dateFromPicker}
                      inputReadOnly={false}
                      format="DD.MM.YYYY"
                      name="date_from"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<Label>{lang.end}</Label>}>
                    <CalculatorDatePicker
                      onChange={date => this.setDateField("date_to", date)}
                      disabledDate={d => !form.date_from || (d.isSameOrBefore(form.date_from, "day"))}
                      placeholder={lang.date_from_placeholder}
                      value={this.dateToValue}
                      ref={this.dateToPicker}
                      format="DD.MM.YYYY"
                      name="date_to"
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label={<Label>{lang.vacation_days}</Label>}>
                <CalculatorInput
                  onChange={v => this.setField("vacation_days", v, this.autocompleteVacationDateTo)}
                  value={form.vacation_days}
                  style={{ width: "54px" }}
                  min={1}
                  name="vacation_days"
                  type="number"
                  size="large"
                />
              </Form.Item>

              <Form.Item label={<Label>{lang.working_schedule}</Label>} labelCol={{ span: 24 }}>
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
                <CalculatorInput
                  formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={v => this.setField("amount", v)}
                  value={form.amount}
                  min={SALARY_MIN}
                  name="amount"
                  size="large"
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
                <GrossSalaryTable
                  lang={lang}
                  items={this.amounts}
                  onChange={this.calcVacationAmount}
                  setDate={this.setFromDate}
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
                <ButtonSubmit htmlType="submit" shape="round" size="large">
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} ref={this.col} className={width >= 992 ? 'calculator-result':'' }>
          <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

          <UnderLine />

          <CalculatorCardResult
            title={lang.result["gross_vacation_amount"]}
            text={this.vacationSalary}
          />

          <CalculatorCardResult
            title={lang.result["income_tax"]}
            text={result.income_tax}
          />

          <CalculatorCardResult
            title={lang.result["pension_fee"]}
            text={result.pension_fee}
          />

          <CalculatorCardResult
            title={lang.result["total_fee"]}
            text={result.total_fee}
          />
          <CalculatorCardResult
            title={lang.result["pure_vacation_amount"]}
            text={result.salary}
          />
        </Col>
      </Row>
    )
  }
}

export default VacationCalculator
