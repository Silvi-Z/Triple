import React from "react"
import ReactDOM from "react-dom"
import triple from "../../api/triple"
import { isEqual, pick } from "lodash"
import { InfoCircleTwoTone } from "@ant-design/icons"
import { Checkbox, Col, Form, Input, Radio, Row, Tooltip } from "antd"
import GrossSalaryTable from "./calcComponents/GrossSalaryTable"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import {
  ButtonSubmit,
  CalculatorDatePicker,
  CalculatorInput,
  CalculatorsCard,
  FormLabel,
  Label,
  RadioLabel,
  UnderLine,
} from "./styled"
import {
  PENSION_FIELD_NO,
  PENSION_FIELD_YES,
  PENSION_FIELD_YES_VOLUNTEER,
  SALARY_MIN,
  schema,
  TAX_FIELD_COMMON,
  TAX_FIELD_ENTERPRISE,
  TAX_FIELD_IT,
} from "./utilities/salary"
import { isHoliday, isWeekend } from "./utilities/vacation"

const radioStyle = {
  display: "block",
  lineHeight: "30px",
}
const form = {
  date_acceptance: null,
  date_release: null,
  working_schedule: 5,
  available_vacation_days: 20,
  total_vacation_days: null,
  used_vacation_days: null,
  unused_vacation_days: null,
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

  rowWidth = React.createRef()

  col = React.createRef()

  constructor(props) {
    super(props)

    this.state = {
      form: { ...form },
      result: {
        amount: 0,
        total_fee: 0,
        income_tax: 0,
        pension_fee: 0,
        stamp_fee: 0,
        salary: 0,
      },
      monthAvgSalary: 0,
      calculated: false,
      loading: false,
      valid: false,
    }

    this.holidays = []
    this.workdays = []
  }

  get rowElement() {
    return ReactDOM.findDOMNode(/**@type Element */this.row.current)
  }

  get rowElementOffsetTop() {
    return this.rowElement.getBoundingClientRect().top
  }

  get colElement() {
    return ReactDOM.findDOMNode(/**@type Element */this.col.current)
  }

  get totalVacationDays() {
    const { date_acceptance, date_release, available_vacation_days } = this.state.form

    if (date_acceptance && date_release && available_vacation_days) {
      return Math.round(date_release.diff(date_acceptance, "days") / 365 * available_vacation_days)
    } else {
      return undefined
    }

    return null
  }

  get restVacationDays() {
    const { used_vacation_days, unused_vacation_days } = this.state.form

    if (this.totalVacationDays && used_vacation_days) {
      return this.totalVacationDays - used_vacation_days
    } else if (unused_vacation_days) {
      return unused_vacation_days
    }

    return null
  }

  get avgDailySalary() {
    const { working_schedule, salary, static_salary } = this.state.form
    const workingDaysInMonth = working_schedule === 5 ? 21 : 25
    const { monthAvgSalary } = this.state

    if (static_salary) {
      if (salary) {
        return salary / workingDaysInMonth
      }

      return null

    } else {
      if (monthAvgSalary) {
        return monthAvgSalary / workingDaysInMonth
      }

      return null

    }


  }

  get amounts() {
    let items = []
    const { date_release, salary } = this.state.form

    if (!date_release) {
      items.push({
        year: null,
        month: null,
        bonus: null,
        salary: salary || null,
        surcharge: null,
      })

      return items
    }

    const momentStep = date_release.clone().subtract(1, "month")

    while (date_release.diff(momentStep, "months") <= 12) {
      items.push({
        month: momentStep.month(),
        year: momentStep.year(),
        salary: salary || null,
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
      .findDOMNode(/**@type Element */this.dateFromPicker.current)
      .querySelector("input")
  }

  get dateToInput() {
    return ReactDOM
      .findDOMNode(/**@type Element */this.dateToPicker.current)
      .querySelector("input")
  }

  fetchDays() {
    triple.get("/api/days")
      .then(res => {
        this.holidays = res.data.holidays
        this.workdays = res.data.workdays
      })
      .catch(err => console.log(err))
  }

  disabledAcceptanceDates = date => (this.state.form.date_release && (date.isSameOrAfter(this.state.form.date_release, "day")))

  disabledReleasedDates = date => (!this.state.form.date_acceptance || (date.isSameOrBefore(this.state.form.date_acceptance, "day")))

  setReleaseDate = date => this.setFormField("date_release", date.add(1, "month"))

  handleWindowScroll = () => {
    if (
      (window.scrollY + this.colElement.offsetHeight + this.rowElementOffsetTop) >=
      (this.rowElementOffsetTop + this.rowElement.offsetHeight)
    ) {
      this.colElement.classList.add("abs")
    } else {
      this.colElement.classList.remove("abs")
    }
    if (this.col.current.getBoundingClientRect().top <= 0) {
      this.col.current.classList.add("fixed")
      this.col.current.children[0].style.width = this.rowWidth.current.clientWidth * 33.3333333 / 100 - 20 + "px"
    } else {
      this.col.current.classList.remove("fixed")
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
    const { date_release } = this.state.form
    let data = { ...pick(form, Object.keys(schema.fields)), amount: this.amount }
    schema.isValid(data).then(valid => {
      if (!valid) {
        const result = {
          amount: 0,
          income_tax: 0,
          pension_fee: 0,
          salary: 0,
          stamp_fee: 0,
          total_fee: 0,
        }
        this.setState({ ...this.state, result: result })
      } else {
        data = {
          ...data,
          year: date_release.year(),
        }

        // this.setState({ loading: true })

        triple
          .post("/api/counter/salary", data, {
            params: {
              stamp: false,
            },
          })
          .then(res => {
            const result = { ...res.data, amount: this.amount }
            this.setState({ result: result, valid: false })
          })
          .then(() => {
            if (!this.state.calculated) this.setState({ calculated: true, valid: false })
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.setState({ loading: false, valid: false })
          })
      }
    }).catch(err => console.log(err))
  }

  setFormField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  setFormFields(fields) {
    this.setState({ form: { ...this.state.form, ...fields } })
  }

  calcVacationAmount = monthAvgSalary => this.setState({ monthAvgSalary })

  handleInputValue(e) {
    const inputValue = e.target.value
    const inputName = e.target.name
    const inputMaxVal = e.target.max
    const inputMinVal = e.target.min

    if (inputMaxVal && Number(inputValue) > Number(inputMaxVal)) {
      e.target.value = inputMaxVal
      return false
    } else if (inputMinVal && Number(inputValue) < Number(inputMinVal)) {
      e.target.value = inputMinVal
      return false
    } else {
      e.target.value = inputValue
    }

    this.setFormField(inputName, inputValue)
  }

  autoFillAvailableVacationDays() {
    const { working_schedule } = this.state.form

    if (working_schedule === 5) {
      this.setFormField("available_vacation_days", 20, this.autoFillUnusedVacationDays)
    } else if (working_schedule === 6) {
      this.setFormField("available_vacation_days", 24, this.autoFillUnusedVacationDays)
    }
  }

  autoFillUnusedVacationDays() {
    const { used_vacation_days } = this.state.form

    if (this.totalVacationDays && used_vacation_days) {
      this.setFormField("unused_vacation_days", this.totalVacationDays - used_vacation_days, this.onBlur)
    } else if (this.totalVacationDays && !used_vacation_days) {
      this.setFormField("unused_vacation_days", this.totalVacationDays, this.onBlur)
    }
  }

  autoFillTotalVacationDays() {
    const { date_release, date_acceptance, available_vacation_days, unused_vacation_days, used_vacation_days } = this.state.form
    if (date_release && date_acceptance) {
      if (!unused_vacation_days && !used_vacation_days) {
        this.setFormFields({
          total_vacation_days: Math.round(date_release.diff(date_acceptance, "days") / 365 * available_vacation_days),
          used_vacation_days: 0,
          unused_vacation_days: Math.round(date_release.diff(date_acceptance, "days") / 365 * available_vacation_days),
        })
      } else if (unused_vacation_days && !used_vacation_days) {
        this.setFormFields({
          total_vacation_days: Math.round(date_release.diff(date_acceptance, "days") / 365 * available_vacation_days),
          used_vacation_days: Math.round(date_release.diff(date_acceptance, "days") / 365 * available_vacation_days) - unused_vacation_days,
        })
      } else if (!unused_vacation_days && used_vacation_days) {
        this.setFormFields({
          total_vacation_days: Math.round(date_release.diff(date_acceptance, "days") / 365 * available_vacation_days),
          unused_vacation_days: Math.round(date_release.diff(date_acceptance, "days") / 365 * available_vacation_days) - used_vacation_days,
        })
      } else if (used_vacation_days && unused_vacation_days) {
        this.setFormFields({
          total_vacation_days: Math.round(date_release.diff(date_acceptance, "days") / 365 * available_vacation_days),
          unused_vacation_days: Math.round(date_release.diff(date_acceptance, "days") / 365 * available_vacation_days) - used_vacation_days,
        })
      }
    }
  }

  autoFillUsedVacationDays() {
    const { unused_vacation_days } = this.state.form

    if (this.totalVacationDays && unused_vacation_days) {
      this.setFormField("used_vacation_days", this.totalVacationDays - unused_vacation_days, this.autoFillUnusedVacationDays)
    } else if (this.totalVacationDays && !unused_vacation_days) {
      this.setFormField("used_vacation_days", this.totalVacationDays, this.onBlur)
    }
  }

  handlePickerRender(date, today, range) {
    const { form } = this.state

    const condition = range === "start"
      ? form.date_release && (date.isSameOrAfter(form.date_release, "day"))
      : !form.date_acceptance || (date.isSameOrBefore(form.date_acceptance, "day"))

    if (date.isSame(today, "day")) {
      return <div className={
        !condition
          ? "ant-picker-cell-inner ant-picker-cell-today"
          : "ant-picker-cell-inner"
      }>
        {date.format("D")}
        {this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        || this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
      </div>
    } else if (isHoliday(date, this.holidays)) {
      return <div className={
        !condition
          ? "ant-picker-cell-inner ant-picker-cell-holiday"
          : "ant-picker-cell-inner"
      }>
        {date.format("D")}
        {this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        || this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
      </div>
    } else if (isWeekend(date, form.working_schedule)) {
      return <div className={
        !condition
          ? "ant-picker-cell-inner ant-picker-cell-weekend"
          : "ant-picker-cell-inner"
      }>
        {date.format("D")}
        {this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        || this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
      </div>
    } else {
      return <div className="ant-picker-cell-inner">
        {date.format("D")}
        {this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        || this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
      </div>
    }
  }

  onBlur = () => {
    this.autoFillTotalVacationDays()
    this.setState(prevState => (
      { valid: true }
    ), this.state.calculated ? this.handleSubmit : null)
  }

  render() {
    const { form, result, loading, calculated } = this.state
    const { lang } = this.props

    return (
      <Row align="start" gutter={20} ref={this.rowWidth}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16} ref={this.row}>
          {/*<Row align="center" style={{ justifyContent: "space-between" }}>*/}
          {/*  <div className="textSec">*/}
          {/*    <H1Styled>{lang.title}</H1Styled>*/}
          {/*    <TextStyled>{lang.paragraph}</TextStyled>*/}
          {/*  </div>*/}

          {/*</Row>*/}

          <CalculatorsCard bordered={false}>
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >
              <Row align="middle">
                <Form.Item style={{ marginRight: "25px" }} label={<Label>{lang.form["acceptance"]}</Label>}>
                  <CalculatorDatePicker
                    onChange={date => this.setFormField("date_acceptance", date, this.onBlur)}
                    dateRender={(date, today) => this.handlePickerRender(date, today, "start")}
                    placeholder={lang.form["date_acceptance_placeholder"]}
                    disabledDate={this.disabledAcceptanceDates}
                    value={form.date_acceptance}
                    ref={this.dateFromPicker}
                    format="DD.MM.YYYY"
                    name="date_acceptance"
                    size="large"
                  />
                </Form.Item>
                <Form.Item label={<Label>{lang.form.release}</Label>}>
                  <CalculatorDatePicker
                    onChange={date => this.setFormField("date_release", date, this.onBlur)}
                    dateRender={(date, today) => this.handlePickerRender(date, today, "end")}
                    placeholder={lang.form["date_release_placeholder"]}
                    disabledDate={this.disabledReleasedDates}
                    value={form.date_release}
                    ref={this.dateToPicker}
                    format="DD.MM.YYYY"
                    name="date_release"
                    size="large"
                  />
                </Form.Item>
              </Row>

              <Form.Item label={<Label>{lang.form.working_schedule}</Label>} labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setFormField("working_schedule", e.target.value, this.autoFillAvailableVacationDays)}
                  value={form.working_schedule}
                >
                  <Radio value={5}>
                    {<Label style={{ textTransform: "none" }}>{lang.form["five_days"]}</Label>}
                  </Radio>
                  <Radio value={6}>
                    {<Label style={{ textTransform: "none" }}>{lang.form["six_days"]}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label={<Label style={{ textTransform: "none" }}>{lang.form.available_vacation_days}</Label>}>
                <CalculatorInput
                  onChange={v => this.setFormField("available_vacation_days", v)}
                  value={form.available_vacation_days}
                  style={{ width: "54px" }}
                  onBlur={this.onBlur}
                  min={SALARY_MIN}
                  name="available_vacation_days"
                  size="large"
                  type="number"
                />
              </Form.Item>

              <Form.Item label={<Label style={{ textTransform: "none" }}>{lang.form.total_vacation_days}</Label>}>
                <CalculatorInput
                  value={form.total_vacation_days}
                  style={{ width: "54px" }}
                  readOnly={true}
                  onBlur={this.onBlur}
                  min={0}
                  type="number"
                  size="large"
                />
              </Form.Item>

              <Form.Item label={<Label style={{ textTransform: "none" }}>{lang.form.used_vacation_days}</Label>}>
                <CalculatorInput
                  onChange={v => this.setFormField("used_vacation_days", v, this.autoFillUnusedVacationDays)}
                  value={form.used_vacation_days}
                  style={{ width: "54px" }}
                  onBlur={this.onBlur}
                  max={this.totalVacationDays}
                  min={0}
                  onInput={e => this.handleInputValue(e)}
                  name="used_vacation_days"
                  type="number"
                  size="large"
                />
              </Form.Item>

              <Form.Item label={
                <Label style={{ textTransform: "none" }}>
                  {lang.form.unused_vacation_days}
                  <Tooltip title="prompt text" color="black">
                    <InfoCircleTwoTone twoToneColor="#00B3C7" style={{ marginLeft: 5 }} />
                  </Tooltip>
                </Label>
              }>
                <Input
                  onChange={e => this.setFormField("unused_vacation_days", e.target.value, this.autoFillUsedVacationDays)}
                  value={form.unused_vacation_days}
                  style={{
                    border: "0.5px solid #555555",
                    background: "#FFFFFF",
                    borderRadius: "5px",
                    width: "54px",
                  }}
                  max={this.totalVacationDays}
                  onBlur={this.onBlur}
                  min={0}
                  onInput={e => this.handleInputValue(e)}
                  name="unused_vacation_days"
                  type="number"
                  size="large"
                />
              </Form.Item>

              {form.static_salary ?
                <Form.Item label={<Label>{lang.form.salary}</Label>}>
                  <CalculatorInput
                    formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={v => v.replace(/\$\s?|(,*)/g, "")}
                    onChange={v => this.setFormField("salary", v)}
                    value={form.salary}
                    min={SALARY_MIN}
                    step={1000}
                    name="salary"
                    size="large"
                  />
                </Form.Item>
                : null}

              <Form.Item>
                <Checkbox
                  onChange={e => this.setFormField("static_salary", e.target.checked, this.onBlur)}
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
                    onChange={this.calcVacationAmount}
                    onBlur={this.onBlur}
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
                    <RadioLabel>{lang.form["tax_common"]}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_IT}>
                    <RadioLabel>{lang.form["tax_it"]}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_ENTERPRISE}>
                    <RadioLabel>{lang.form["tax_enterprise"]}</RadioLabel>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label={<RadioLabel>{lang.form["pensioner"]}</RadioLabel>}
                labelCol={{ span: 24 }}
                name="pension"
              >
                <Radio.Group
                  onChange={e => this.setFormField("pension", e.target.value)}
                  value={form.pension}
                >
                  <Radio value={PENSION_FIELD_YES}>
                    <Label>{lang.form["yes"]}</Label>
                  </Radio>
                  <Radio value={PENSION_FIELD_YES_VOLUNTEER}>
                    <Label>{lang.form["yes_volunteer"]}</Label>
                  </Radio>
                  <Radio value={PENSION_FIELD_NO}>
                    <Label>{lang.form["no"]}</Label>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item style={{ marginTop: "50px" }}>
                <ButtonSubmit htmlType="submit" shape="round" size="large">
                  {lang.form["calculate"]}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </CalculatorsCard>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="result" ref={this.col}>
          <div>
            <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

            <UnderLine />

            <CalculatorCardResult
              title={lang.result["total_amount"]}
              text={calculated ? this.amount : 0}
              loading={loading}
            />

            <CalculatorCardResult
              title={lang.result["income_tax"]}
              text={result.income_tax}
              loading={loading}
              tooltip={form.tax_field === TAX_FIELD_ENTERPRISE ? "prompt text" : null}
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
              text={result.salary}
              loading={loading}
            />
          </div>
        </Col>
      </Row>
    )
  }

  componentDidMount() {
    this.dateFromInput.addEventListener("input", this.handlePickerInput)
    this.dateToInput.addEventListener("input", this.handlePickerInput)

    window.addEventListener("scroll", this.handleWindowScroll)

    this.fetchDays()
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleWindowScroll)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevState.form, this.state.form) && this.state.calculated) {
      this.handleSubmit()
    }
  }
}

export default FinalCalculator
