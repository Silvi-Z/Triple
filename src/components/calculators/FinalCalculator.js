import React from "react"
import triple from "../../api/triple"
import { isEqual, pick } from "lodash"
import { Row, Col, Card, Form, Radio, Checkbox } from "antd"
import GrossSalaryTable from "./calcComponents/GrossSalaryTable"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import {
  Label,
  FormLabel,
  UnderLine,
  RadioLabel,
  ButtonSubmit,
  CalculatorInput,
  CalculatorSlider,
  CalculatorDatePicker,
} from "./styled"
import {
  schema,
  SALARY_MAX,
  SALARY_MIN,
  SALARY_STEP,
  TAX_FIELD_IT,
  TAX_FIELD_COMMON,
  TAX_FIELD_ENTERPRISE,
  PENSION_FIELD_NO,
  PENSION_FIELD_YES,
  PENSION_FIELD_YES_VOLUNTEER,
} from "./utilities/salary"
import ReactDOM from "react-dom"

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
}
const form = {
  date_acceptance: null,
  date_release: null,
  working_schedule: 5,
  available_vacation_days: 20,
  total_vacation_days: null,
  used_vacation_days: null,
  from: 1,
  salary: null,
  pension: PENSION_FIELD_YES,
  static_salary: true,
  tax_field: TAX_FIELD_COMMON,
}

class FinalCalculator extends React.Component {
  dateFromPicker = React.createRef()

  dateToPicker = React.createRef()

  row = React.createRef()

  col = React.createRef()

  disabledAcceptanceDates = date => (this.state.form.date_release && (date.isSameOrAfter(this.state.form.date_release, "day")))

  disabledReleasedDates = date => (!this.state.form.date_acceptance || (date.isSameOrBefore(this.state.form.date_acceptance, "day")))

  setReleaseDate = date => this.setFormField("date_release", date.add(1, "month"))

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
      this.setFormField(name, null)

      name === "date_acceptance"
        ? this.dateFromPicker.current.blur()
        : this.dateFromPicker.current.blur()
    }
  }

  handleSubmit = () => {
    const { form } = this.state
    const data = { ...pick(form, Object.keys(schema.fields)), amount: this.amount }

    schema.isValid(data).then(valid => {
      if (!valid) return

      this.setState({ loading: true })

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
        .finally(() => this.setState({ loading: false }))
    })
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

  get totalVacationDays() {
    const { date_acceptance, date_release, available_vacation_days } = this.state.form

    if (date_acceptance && date_release && available_vacation_days) {
      return Math.round(date_release.diff(date_acceptance, "days") / 365 * available_vacation_days)
    }

    return null
  }

  get restVacationDays() {
    const { used_vacation_days } = this.state.form

    if (this.totalVacationDays && used_vacation_days) {
      return this.totalVacationDays - used_vacation_days
    }

    return null
  }

  get avgDailySalary() {
    const { working_schedule, salary } = this.state.form
    const workingDaysInMonth = working_schedule === 5 ? 21 : 25

    if (salary) {
      return salary / workingDaysInMonth
    }

    return null
  }

  get amounts() {
    let items = []
    const { date_release } = this.state.form

    if (!date_release) {
      items.push({
        year: null,
        month: null,
        bonus: null,
        salary: null,
        surcharge: null,
      })

      return items
    }

    const momentStep = date_release.clone().subtract(1, "month")

    while (date_release.diff(momentStep, "months") <= 12) {
      items.push({
        month: momentStep.month(),
        year: momentStep.year(),
        salary: null,
        bonus: null,
        surcharge: null,
      })

      momentStep.subtract(1, "month")
    }

    return items
  }

  get amount() {
    if (this.avgDailySalary && this.restVacationDays) {
      return Math.round(this.avgDailySalary * this.restVacationDays)
    }

    return null
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

  constructor(props) {
    super(props)

    this.state = {
      form: { ...form },
      result: {
        total_fee: 0,
        income_tax: 0,
        pension_fee: 0,
        stamp_fee: 0,
        salary: 0,
      },
      calculated: false,
      loading: false,
    }
  }

  setFormField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  autoFillAvailableVacationDays() {
    const { working_schedule } = this.state.form

    if (working_schedule === 5) {
      this.setFormField("available_vacation_days", 20)
    } else if (working_schedule === 6) {
      this.setFormField("available_vacation_days", 24)
    }
  }

  render() {
    const { form, result, loading, calculated } = this.state
    const { lang } = this.props

    return (
      <Row align="start" gutter={20}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16} ref={this.row}>
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
                <Col span={10}>
                  <Form.Item label={<Label>{lang.form.acceptance}</Label>}>
                    <CalculatorDatePicker
                      onChange={date => this.setFormField("date_acceptance", date)}
                      placeholder={lang.form.date_acceptance_placeholder}
                      disabledDate={this.disabledAcceptanceDates}
                      value={form.date_acceptance}
                      ref={this.dateFromPicker}
                      format="DD.MM.YYYY"
                      name="date_acceptance"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label={<Label>{lang.form.release}</Label>}>
                    <CalculatorDatePicker
                      onChange={date => this.setFormField("date_release", date)}
                      placeholder={lang.form.date_release_placeholder}
                      disabledDate={this.disabledReleasedDates}
                      value={form.date_release}
                      ref={this.dateToPicker}
                      format="DD.MM.YYYY"
                      name="date_release"
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label={lang.form.working_schedule} labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setFormField("working_schedule", e.target.value, this.autoFillAvailableVacationDays)}
                  value={form.working_schedule}
                >
                  <Radio value={5}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.five_days}</Label>}
                  </Radio>
                  <Radio value={6}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.six_days}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label={<Label style={{ textTransform: "none" }}>{lang.form.available_vacation_days}</Label>}>
                <CalculatorInput
                  onChange={v => this.setFormField("available_vacation_days", v)}
                  value={form.available_vacation_days}
                  style={{ width: "54px" }}
                  min={SALARY_MIN}
                  name="available_vacation_days"
                  size="large"
                  type="number"
                />
              </Form.Item>

              <Form.Item label={<Label style={{ textTransform: "none" }}>{lang.form.total_vacation_days}</Label>}>
                <CalculatorInput
                  value={this.totalVacationDays}
                  style={{ width: "54px" }}
                  min={SALARY_MIN}
                  readOnly={true}
                  type="number"
                  size="large"
                />
              </Form.Item>

              <Form.Item label={<Label style={{ textTransform: "none" }}>{lang.form.used_vacation_days}</Label>}>
                <CalculatorInput
                  onChange={v => this.setFormField("used_vacation_days", v)}
                  value={form.used_vacation_days}
                  style={{ width: "54px" }}
                  min={SALARY_MIN}
                  name="used_vacation_days"
                  type="number"
                  size="large"
                />
              </Form.Item>

              {form.static_salary ?
                <>
                  <Form.Item label={<Label>{lang.form.salary}</Label>}>
                    <CalculatorInput
                      onChange={v => this.setFormField("salary", v)}
                      value={form.salary}
                      min={SALARY_MIN}
                      type="number"
                      name="salary"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item>
                    <CalculatorSlider
                      onChange={v => this.setFormField("salary", v)}
                      value={form.salary}
                      step={SALARY_STEP}
                      min={SALARY_MIN}
                      max={SALARY_MAX}
                      name="salary"
                    />
                  </Form.Item>
                </>
                : null}

              <Form.Item>
                <Checkbox
                  onChange={e => this.setFormField("static_salary", e.target.checked)}
                  checked={form.static_salary}
                >
                  <RadioLabel>{lang.form.static_salary}</RadioLabel>
                </Checkbox>
              </Form.Item>

              {
                !form.static_salary
                  ? <GrossSalaryTable
                    lang={lang.table}
                    items={this.amounts}
                    setDate={this.setReleaseDate}
                    onChange={value => this.setFormField("salary", value)}
                  />
                  : null
              }

              <Form.Item
                label={<Label style={{ fontSize: "16px" }}>{lang.form.tax}</Label>}
                labelCol={{ span: 24 }}
                name="tax_field"
              >
                <Radio.Group
                  onChange={e => this.setFormField("tax_field", e.target.value)}
                  value={form.tax_field}
                >
                  <Radio style={radioStyle} value={TAX_FIELD_COMMON}>
                    <RadioLabel>{lang.form.tax_common}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_IT}>
                    <RadioLabel>{lang.form.tax_it}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_ENTERPRISE}>
                    <RadioLabel>{lang.form.tax_enterprise}</RadioLabel>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label={<RadioLabel>{lang.form.pensioner}</RadioLabel>}
                labelCol={{ span: 24 }}
                name="pension"
              >
                <Radio.Group
                  onChange={e => this.setFormField("pension", e.target.value)}
                  value={form.pension}
                >
                  <Radio value={PENSION_FIELD_YES}>
                    <Label>{lang.form.yes}</Label>
                  </Radio>
                  <Radio value={PENSION_FIELD_YES_VOLUNTEER}>
                    <Label>{lang.form.yes_volunteer}</Label>
                  </Radio>
                  <Radio value={PENSION_FIELD_NO}>
                    <Label>{lang.form.no}</Label>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <ButtonSubmit htmlType="submit" shape="round" size="large">
                  {lang.form.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} ref={this.col} className="calculator-result">
          <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

          <UnderLine />

          <CalculatorCardResult
            title={lang.result["total_amount"]}
            text={result.salary}
            loading={loading}
          />

          <CalculatorCardResult
            title={lang.result["income_tax"]}
            text={result.income_tax}
            loading={loading}
          />

          <CalculatorCardResult
            title={lang.result["pension_fee"]}
            text={result.pension_fee}
            loading={loading}
          />

          <CalculatorCardResult
            title={lang.result["total_fee"]}
            text={result.total_fee}
            loading={loading}
          />
          <CalculatorCardResult
            title={lang.result["net_amount"]}
            text={calculated ? this.amount : 0}
            loading={loading}
          />
        </Col>
      </Row>
    )
  }

  componentDidMount() {
    this.dateFromInput.addEventListener("input", this.handlePickerInput)
    this.dateToInput.addEventListener("input", this.handlePickerInput)

    window.addEventListener('scroll', this.handleWindowScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevState.form, this.state.form) && this.state.calculated) {
      this.handleSubmit()
    }
  }
}

export default FinalCalculator
