import React from "react"
import moment from "moment"
import { isEmpty, isEqual, isNull } from "lodash"
import { Card, Checkbox, Col, Form, Radio, Row, Select, Tooltip } from "antd"
import {
  ButtonSubmit,
  CalculatorDatePicker,
  CalculatorInput,
  CalculatorsCardWrapper,
  CalculatorSelect,
  FormLabel,
  Label,
  RadioLabel,
  RowWrapper,
  SvgWrapper,
  UnderLine,
} from "./styled"
import triple from "../../api/triple"
import Subsidy from "../../calculators/Subsidy"
import GrossSalaryTable from "./calcComponents/GrossSalaryTable"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import { isHoliday, isWeekend, workingDaysInRangeForSubsidy } from "./utilities/vacation"
import { randomString } from "./utilities/tabel"
import Svg from "../../assets/note.svg"
import ReactDOM from "react-dom"

moment.locale("en", {
  week: {
    dow: 1,
  },
})

const radioStyle = {
  display: "block",
  lineHeight: "30px",
}

class SubsidyCalculator extends React.Component {
  col = React.createRef()

  row = React.createRef()

  rowWidth = React.createRef()

  dateToPicker = React.createRef()

  dateFromPicker = React.createRef()

  constructor(props) {
    super(props)

    this.state = {
      form: { ...Subsidy.form },
      result: {
        income_tax: 0,
        subsidy: 0,
        subsidy_gov: 0,
        subsidy_emp: 0,
        pure_subsidy: 0,
      },
      calculated: false,
      valid: false,
      randomKey: randomString(),
      check: false,
      width: typeof window != "undefined" && window.innerWidth <= 768,
    }
    this.calculator = new Subsidy()
    this.availableYears = [2019, 2020, 2021]
    this.holidays = []
    this.workdays = []
  }

  get amounts() {
    const { amount, start } = this.state.form
    const endMonth = start ? moment(start).subtract(12, "months") : null

    return start ? Array
        .from(moment.range(endMonth, moment(start).subtract(1, "months"))
          .by("month"))
        .reverse()
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

  get isWorkSelfEmployed() {
    return this.state.form.work === Subsidy.SELF_EMPLOYED
  }

  get isWorkHired() {
    return this.state.form.work === Subsidy.HIRED
  }

  get isTaxCommon() {
    return this.state.form.tax_field === Subsidy.TAX_COMMON
  }

  get isTaxTurnover() {
    return this.state.form.tax_field === Subsidy.TAX_TURNOVER
  }

  get isTaxIt() {
    return this.state.form.tax_field === Subsidy.TAX_IT
  }

  get isTaxEnterprise() {
    return this.state.form.tax_field === Subsidy.TAX_ENTERPRISE
  }

  get changeAmountFieldTitle() {
    if (this.isWorkSelfEmployed) {
      if (this.isTaxCommon || this.isTaxIt) {
        return this.props.lang.form.amount_self_common
      } else if (this.isTaxTurnover) {
        return this.props.lang.form.amount_self_turnover
      } else if (this.isTaxEnterprise) {
        return this.props.lang.form.amount_self_enterprise
      } else {
        return this.props.lang.form.amount
      }
    } else {
      if (this.isWorkHired && this.isTaxEnterprise) {
        return this.props.lang.form.amount_self_enterprise
      } else {
        return this.props.lang.form.amount
      }
    }
  }
  get changeAmountFieldNote() {
    if (this.isWorkSelfEmployed) {
      if (this.isTaxCommon || this.isTaxIt) {
        return this.props.lang.form.amount_self_common_note
      } else if (this.isTaxTurnover) {
        return this.props.lang.form.amount_self_turnover_note
      } else if (this.isTaxEnterprise) {
        return this.props.lang.form.amount_self_enterprise_note
      } else {
        return this.props.lang.form.amount_note
      }
    } else {
      if (this.isWorkHired && this.isTaxEnterprise) {
        return this.props.lang.form.amount_self_enterprise
      } else {
        return this.props.lang.form.amount_note
      }
    }
  }

  get amountMaxValue() {
    if (this.isTaxEnterprise) {
      return 12
    } else if (this.isTypeDisability && this.isWorkSelfEmployed && this.isTaxTurnover) {
      return (12 * 5000)
    } else {
      return undefined
    }
  }

  fetchDays() {
    triple.get("/api/days")
      .then(res => {
        this.holidays = res.data.holidays
        this.workdays = res.data.workdays
      })
      .catch(err => console.log(err))
  }

  handleSubmit = () => {
    const amount = this.calculator.calculate()
    const { check, width } = this.state
    let { pension, tax_field, days, type, year } = this.state.form
    tax_field = tax_field === Subsidy.TAX_IT ? Subsidy.TAX_COMMON : tax_field

    Subsidy.schema.isValid(this.state.form).then(valid => {
      if (!valid) return

      if (this.isTypeDisability && this.isWorkSelfEmployed && this.isTaxEnterprise) {
        this.setState({
          result: {
            income_tax: 0,
            subsidy: 0,
            subsidy_gov: 0,
            subsidy_emp: 0,
            pure_subsidy: 0,
          },
          calculated: true,
          valid: false,
        })
      } else {
        const data = this.isTypeDisability && this.isTaxEnterprise ? {
          from: 1,
          amount,
          pension,
          tax_field,
          stamp: false,
          no_income: "yes",
          year,
        } : {
          from: 1,
          amount,
          pension,
          tax_field,
          stamp: false,
          year,
        }

        triple.post("/api/counter/salary", data).then(res => {
          const { income_tax, salary, stamp_fee } = res.data

          if (this.isWorkHired) {
            const subsidy_emp = type === 2 ? ((salary + income_tax + stamp_fee) / (days - 1)) * 5 : 0
            const subsidy_gov = type === 2 ? ((salary + income_tax + stamp_fee) - subsidy_emp) : (salary + income_tax + stamp_fee)
            this.setState({
              result: {
                income_tax: Math.round(income_tax),
                subsidy: Math.round(amount),
                subsidy_gov: Math.round(subsidy_gov),
                subsidy_emp: Math.round(subsidy_emp),
                pure_subsidy: Math.round(salary + stamp_fee),
              },
              calculated: true,
              valid: false,
            })
          } else {
            this.setState({
              result: {
                income_tax: Math.round(income_tax),
                subsidy: Math.round(amount),
                subsidy_gov: Math.round(income_tax + salary),
                subsidy_emp: 0,
                pure_subsidy: Math.round(salary + stamp_fee),
              },
              calculated: true,
              valid: false,
            })
          }
        })
          .finally(() => {
            if (check && width) {
              this.col.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
            }
            this.setState((prevState) => ({
              ...prevState,
              check: false,
            }))
          })
      }
    })
  }

  checkValue() {
    this.setState((prevState) => ({
      ...prevState,
      check: true,
    }))
  }

  setField(name, value, cb) {
    this.setState((prevState) => ({
      ...prevState,
      randomKey: randomString(),
      form: {
        ...prevState.form,
        [name]: value,
      },
    }), cb)
  }

  setFields(fields, cb) {
    this.setState({ form: { ...this.state.form, ...fields } }, cb)
  }

  resetSchedule() {
    this.autocompleteDays()
    if (this.isTypeMaternity) {
      this.setField("schedule", 5)
      this.autocompleteDays()
    }
    this.onBlur()
  }

  autocompleteDays() {
    const { start, end, type, work, schedule, days } = this.state.form

    if (!days) {
      if (isNull(start) || isNull(end)) {
        this.setState({ form: { ...this.state.form, days: null } })
      }

      if (start && end) {
        const daysCount = workingDaysInRangeForSubsidy({
          holidays: this.holidays,
          workdays: this.workdays,
          schedule,
          start: start.clone(),
          end: end.clone(),
          type,
          work,
        })
        this.setField("days", daysCount.length, this.changeYear)
        this.onBlur()
      } else {
        this.changeYear()
        this.onBlur()
      }
    }
    this.onBlur()
  }

  changeYear() {
    const { start, end } = this.state.form
    if (this.isTypeMaternity && start) {
      this.setField("year", start.year(), this.onBlur)
    } else if (this.isTypeDisability && end) {
      this.setField("year", end.year(), this.onBlur)
    }
  }

  changeDates() {
    const fields = {
      start: null,
      end: null,
    }
    this.setFields(fields, this.onBlur)
  }

  autocompleteEnd() {
    const { start, days, schedule } = this.state.form

    const weekends = schedule === 5 ? [0, 6] : [6]

    if (isEmpty(days)) {
      this.setField("end", null)
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

  onBlur = () => {
    this.setState(prevState => (
      { valid: true }
    ), this.state.calculated ? this.handleSubmit : null)
  }

  get defaultDate() {
    const { year } = this.state.form

    return moment({ year })
  }

  get defaultToDate() {
    const { start, year } = this.state.form

    return start ? moment(start) : moment({ year })
  }

  handleInputValue(e) {
    let inputValue = e.target.value
    const inputName = e.target.name
    const inputMaxVal = e.target.max
    const inputMinVal = e.target.min

    if (Number(inputValue) > Number(inputMaxVal)) {
      e.target.value = inputMaxVal
      return false
    } else if (Number(inputValue) < Number(inputMinVal)) {
      e.target.value = inputMinVal
      return false
    } else {
      e.target.value = inputValue
    }

    this.setField(inputName, inputValue)
  }

  handlePickerRender(date, today, range) {
    const { form } = this.state
    const { locale } = this.props

    // const condition = range === "start"
    //   ? form.end && (date.isSameOrAfter(form.end, "day"))
    //   : !form.start || (date.isSameOrBefore(form.start, "day"))

    if (date.isSame(today, "day")) {
      return <div className={
        // !condition
        "ant-picker-cell-inner ant-picker-cell-today"
        // : "ant-picker-cell-inner"
      }>
        {date.format("D")}
        {locale === "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
        {locale === "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
      </div>
    } else if (isHoliday(date, this.holidays)) {
      return <div className={
        // !condition
        "ant-picker-cell-inner ant-picker-cell-holiday"
        // : "ant-picker-cell-inner"
      }>
        {date.format("D")}
        {locale === "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
        {locale === "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
      </div>
    } else if (isWeekend(date, form.schedule)) {
      return <div className={
        // !condition
        "ant-picker-cell-inner ant-picker-cell-weekend"
        // : "ant-picker-cell-inner"
      }>
        {date.format("D")}
        {locale === "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
        {locale === "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
      </div>
    } else {
      return <div className="ant-picker-cell-inner">
        {date.format("D")}
        {locale === "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
        {locale === "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
      </div>
    }
  }


  changeState = () => {
    this.setState({ valid: true })
    this.checkValue()
  }

  handleDateFromInput = e => {
    const { value } = e.target

    if (!value) {
      this.setField("start", null, this.autocompleteDays)
      this.dateFromPicker.current.blur()
    }
  }

  handleDateToInput = e => {
    const { value } = e.target

    if (!value) {
      this.setField("end", null, this.autocompleteDays)
      this.dateToPicker.current.blur()
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevState.form, this.state.form) && this.state.calculated && this.state.valid) {
      this.handleSubmit()
    }

    this.dateFromPicker.current && ReactDOM
      .findDOMNode(/** @type Element */this.dateFromPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateFromInput)

    this.dateToPicker.current && ReactDOM
      .findDOMNode(/** @type Element */this.dateToPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateToInput)
  }

  componentDidMount() {
    this.fetchDays()
    window.addEventListener("scroll", this.handleWindowScroll)

    this.dateFromPicker.current && ReactDOM
      .findDOMNode(/** @type Element */this.dateFromPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateFromInput)

    this.dateToPicker.current && ReactDOM
      .findDOMNode(/** @type Element */this.dateToPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateToInput)
  }

  componentWillUnmount() {
    this.dateFromPicker.current && ReactDOM
      .findDOMNode(/** @type Element */this.dateFromPicker.current)
      .querySelector("input")
      .removeEventListener("input", this.handleDateFromInput)

    this.dateToPicker.current && ReactDOM
      .findDOMNode(/** @type Element */this.dateToPicker.current)
      .querySelector("input")
      .removeEventListener("input", this.handleDateToInput)
  }

  handleDateToDisabled = d => {
    const { start } = this.state.form

    if (start) {
      return d.isSameOrBefore(start, "day")
    }
  }

  render() {
    const { lang } = this.props
    const { form, result, randomKey } = this.state

    this.calculator.setFields(form)

    return (
      <Row align="start" gutter={20} ref={this.rowWidth} className="fixElement rowWrapper">
        <CalculatorsCardWrapper className="subsidyWrapper" span={24} xl={16} ref={this.row}>
          <Card bordered={false}>
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >

              <Form.Item style={{ display: "flex" }}>
                <CalculatorSelect
                  size="large"
                  value={form.year}
                  className={"yearSelect"}
                  onBlur={this.onBlur}
                  style={{ maxWidth: "424px", width: "90px" }}
                  onChange={value => this.setField("year", value, this.changeDates)}
                >
                  {this.availableYears.map(year =>
                    <Select.Option value={year} key={`vehicle-${year}`}>
                      {year}
                    </Select.Option>,
                  )}
                </CalculatorSelect>
              </Form.Item>

              {/* type field */}
              <Form.Item label={<Label>{lang.form.type}</Label>} labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setField("type", e.target.value, this.resetSchedule)}
                  value={form.type}
                >
                  <Radio className="inlineElements" value={Subsidy.MATERNITY}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.maternity}</Label>}
                  </Radio>
                  <Radio className="inlineElements" value={Subsidy.DISABILITY}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.disability}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>

              {/* start-end dates fields */}
              <Form.Item label={<Label style={{marginBottom:'25px'}}>{lang.form.dates}</Label>} labelCol={{ span: 24 }}>
                <Row gutter={10} className="startEndInputs">
                  <RowWrapper style={{ marginRight: "25px" }} label={<Label>{lang.form.start}</Label>}>
                    <CalculatorDatePicker
                      onChange={date => this.setField("start", date, this.autocompleteDays)}
                      dateRender={(date, today) => this.handlePickerRender(date, today, "start")}
                      defaultPickerValue={this.defaultDate}
                      placeholder={lang.form.dates_placeholder}
                      value={form.start}
                      ref={this.dateFromPicker}
                      key={randomKey}
                      onBlur={this.onBlur}
                      format="DD.MM.YYYY"
                      name="start"
                      size="large"
                    />
                  </RowWrapper>

                  <RowWrapper label={<Label>{lang.form.end}</Label>}>
                    <CalculatorDatePicker
                      onChange={date => this.setField("end", date, this.autocompleteDays)}
                      dateRender={(date, today) => this.handlePickerRender(date, today, "end")}
                      defaultPickerValue={this.defaultToDate}
                      disabledDate={this.handleDateToDisabled}
                      placeholder={lang.form.dates_placeholder}
                      ref={this.dateToPicker}
                      value={form.end}
                      key={randomKey}
                      onBlur={this.onBlur}
                      format="DD.MM.YYYY"
                      size="large"
                      name="end"
                    />
                  </RowWrapper>
                </Row>
              </Form.Item>

              {/* days field */}
              <RowWrapper label={<Label>
                <Tooltip className="tooltip" trigger={'click'} title={lang.form.days_note} color="black">
                  {lang.form.days}
                  <SvgWrapper style={{ backgroundImage: `url(${Svg})` }} />
                </Tooltip></Label>}>
                <CalculatorInput
                  onChange={v => this.setField("days", v, this.autocompleteEnd)}
                  style={{ width: "54px" }}
                  value={form.days}
                  onInput={e => this.handleInputValue(e)}
                  name="days"
                  onBlur={this.onBlur}
                  size="large"
                  min={1}
                  max={180}
                />
              </RowWrapper>

              {/* work field */}
              <Form.Item labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setField("work", e.target.value, this.autocompleteDays)}
                  value={form.work}
                >
                  <Radio className="inlineElements" value={Subsidy.HIRED}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.hired}</Label>}
                  </Radio>
                  <Radio className="inlineElements" value={Subsidy.SELF_EMPLOYED}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.self}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {/* tax field */}

              {this.isWorkHired &&
              <Form.Item
                label={<Label style={{ fontSize: "16px" }}>{lang.form.tax}</Label>}
                labelCol={{ span: 24 }}
                name="tax_field"
              >
                <Radio.Group
                  onChange={e => this.setField("tax_field", e.target.value, this.onBlur)}
                  value={form.tax_field}
                >
                  <Radio className="inlineElements" style={radioStyle} value={Subsidy.TAX_COMMON}>
                    <RadioLabel>{lang.form.tax_common}</RadioLabel>
                  </Radio>
                  <Radio className="inlineElements" style={radioStyle} value={Subsidy.TAX_IT}>
                    <RadioLabel>{lang.form.tax_enterprise}</RadioLabel>
                  </Radio>
                  <Radio className="inlineElements" style={radioStyle} value={Subsidy.TAX_ENTERPRISE}>
                    <RadioLabel>{lang.form.tax_it}</RadioLabel>
                  </Radio>
                </Radio.Group>
              </Form.Item>
              }

              {this.isWorkSelfEmployed &&
              <Form.Item
                label={<Label style={{ fontSize: "16px" }}>{lang.form.tax}</Label>}
                labelCol={{ span: 24 }}
                name="tax_field"
              >
                <Radio.Group
                  onChange={e => this.setField("tax_field", e.target.value, this.onBlur)}
                  value={form.tax_field}
                >
                  <Radio className="inlineElements" style={radioStyle} value={Subsidy.TAX_COMMON}>
                    <RadioLabel>{lang.form.tax_common_for_self_employed}</RadioLabel>
                  </Radio>
                  <Radio className="inlineElements" style={radioStyle} value={Subsidy.TAX_TURNOVER}>
                    <RadioLabel>{lang.form.tax_turnover_for_self_employed}</RadioLabel>
                  </Radio>
                  <Radio className="inlineElements" style={radioStyle} value={Subsidy.TAX_ENTERPRISE}>
                    <RadioLabel>{lang.form.tax_it}</RadioLabel>
                  </Radio>
                </Radio.Group>
              </Form.Item>
              }

              {/* schedule field */}
              {this.isTypeDisability && this.isWorkHired ?
                <Form.Item label={lang.form.schedule} labelCol={{ span: 24 }}>
                  <Radio.Group
                    style={{ display: "flex" }}
                    onChange={e => this.setField("schedule", e.target.value, this.autocompleteDays)}
                    value={form.schedule}
                  >
                    <Radio value={5} className="inlineElements">
                      {<Label style={{ textTransform: "none" }}>{lang.form["five_days"]}</Label>}
                    </Radio>
                    <Radio value={6} className="inlineElements">
                      {<Label style={{ textTransform: "none" }}>{lang.form["six_days"]}</Label>}
                    </Radio>
                  </Radio.Group>
                </Form.Item> : null}

              {/* amount input */}
              {
                this.isStatic ?
                  <RowWrapper className={"subsidyAmount"} label={<Label>
                    <Tooltip className="tooltip" trigger={'click'} title={this.changeAmountFieldNote} color="black">
                      {this.changeAmountFieldTitle}
                      <SvgWrapper style={{ backgroundImage: `url(${Svg})` }} />
                    </Tooltip></Label>}>
                    <CalculatorInput
                      formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      onChange={v => this.setField("amount", v)}
                      parser={v => v.replace(/\$\s?|(,*)/g, "")}
                      value={form.amount}
                      onBlur={this.onBlur}
                      max={this.amountMaxValue}
                      step={1000}
                      name="amount"
                      size="large"
                    />
                  </RowWrapper>
                  : null
              }

              {/* income input */}
              {this.isTypeMaternity &&
              <RowWrapper label={<Label>
                <Tooltip className="tooltip" trigger={'click'} title={lang.form.income_note} color="black">
                  {lang.form.income}
                  <SvgWrapper style={{ backgroundImage: `url(${Svg})` }} />
                </Tooltip></Label>}>
                <CalculatorInput
                  formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  onChange={v => this.setField("income", v)}
                  parser={v => v.replace(/\$\s?|(,*)/g, "")}
                  value={form.income}
                  onBlur={this.onBlur}
                  step={1000}
                  name="income"
                  size="large"
                />

              </RowWrapper>
              }

              {/* static field */}
              {this.isWorkHired ?
                <Form.Item className="inlineElements">
                  <Checkbox
                    onChange={e => this.setField("static", e.target.checked)}
                    checked={form.static}
                  >
                    <RadioLabel>{lang.form.static}</RadioLabel>
                  </Checkbox>
                </Form.Item>
                :
                null}


              {this.isNotStatic ? <GrossSalaryTable
                lang={lang.gross}
                items={this.amounts}
                onBlur={this.onBlur}
                onChange={avg => this.calculator.setAvg(avg)}
                setDate={date => this.setField("start", date)}
              /> : null}

              {/* Submit button */}
              <Form.Item style={{ marginTop: "20px" }}>
                <ButtonSubmit onClick={this.changeState} htmlType="submit" shape="round" size="large">
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </Card>
        </CalculatorsCardWrapper>

        <Col span={20} xl={8} className="result" ref={this.col}>
          <Row>
            <Col md={12} span={24} xl={24}>
              <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

              <UnderLine />

              <CalculatorCardResult
                title={lang.result["all_pure_subsidy"]}
                text={result.subsidy}
              />

              <CalculatorCardResult
                title={lang.result["subsidy_emp"]}
                text={result.subsidy_emp}
              />

              <CalculatorCardResult
                title={lang.result["subsidy_gov"]}
                text={result.subsidy_gov}
              />
            </Col>
            <Col md={12} span={24} xl={24}>
              <CalculatorCardResult
                title={lang.result["income_tax"]}
                text={result.income_tax}
                tooltip={this.isTaxEnterprise}
              />

              <CalculatorCardResult
                title={lang.result["pure_subsidy"]}
                text={result.pure_subsidy}
              />
            </Col>

            {/*<CalculatorCardResult*/}
            {/*  title={lang.result["total_fee"]}*/}
            {/*  text={result.total_fee}*/}
            {/*/>*/}
            {/*<CalculatorCardResult*/}
            {/*  title={lang.result["pure_vacation_amount"]}*/}
            {/*  text={result.salary}*/}
            {/*/>*/}
          </Row>
        </Col>
      </Row>
    )
  }
}

export default SubsidyCalculator
