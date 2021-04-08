import React from "react"
import { Col, Form, Radio, Row, Select } from "antd"
import ReactDOM from "react-dom"
import triple from "../../api/triple"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import {
  ButtonSubmit,
  CalculatorDatePicker,
  CalculatorInput,
  CalculatorsCard,
  CalculatorsCardWrapper,
  CalculatorSelect,
  FormLabel,
  Label,
  RadioButton,
  RadioGroup,
  RadioLabel,
  RowWrapper,
  UnderLine,
} from "./styled"
import {
  BY_FIELD_DATE,
  BY_FIELD_TABLE,
  PENSION_FIELD_NO,
  PENSION_FIELD_YES,
  PENSION_FIELD_YES_VOLUNTEER,
  SALARY_MIN,
  SALARY_STEP,
  schemaBy,
  TAX_FIELD_COMMON,
  TAX_FIELD_ENTERPRISE,
  TAX_FIELD_IT,
} from "./utilities/salary"
import { randomString } from "./utilities/tabel"
import { endDate, isHoliday, isWeekend, workingDaysInMonth, workingDaysInRange } from "./utilities/vacation"
import moment from "moment"
import { isEqual, isNull } from "lodash"

const radioStyle = {
  display: "flex",
  lineHeight: "30px",
  margin: "15px 0 0 0",
}

const form = {
  by: 1,
  schedule: 5,
  date_to: null,
  date_from: null,
  year: moment().year(),
  working_days: null,
  from: 1,
  amount: null,
  pension: PENSION_FIELD_YES,
  tax_field: TAX_FIELD_COMMON,
}

const availableYears = [2019, 2020, 2021]

class SalaryCalculator extends React.Component {

  formRef = React.createRef()

  daysInput = React.createRef()

  top = React.createRef()

  distance = React.createRef()

  calcCard = React.createRef()

  dateToPicker = React.createRef()

  dateFromPicker = React.createRef()

  constructor(props) {
    super(props)

    this.state = {
      calculated: 0,
      loading: false,
      form: { ...form },
      employees: [],
      valid: false,
      result: {
        income_tax: 0,
        pension_fee: 0,
        salary: 0,
        stamp_fee: 0,
        total_fee: 0,
      },
      excel: [],
      note: false,
      randomKey: randomString(),
      check: false,
      width: typeof window != "undefined" && window.innerWidth <= 768,
    }
    this.locale = this.props.locale
    this.holidays = []
    this.workdays = []
  }

  get calculatingByTable() {
    return (this.state.form.by === BY_FIELD_TABLE)
  }

  get calculatingByDate() {
    return (this.state.form.by === BY_FIELD_DATE)
  }

  get calculatedByTable() {
    return this.state.calculated === 2
  }

  get calculatedByDate() {
    return this.state.calculated === 1
  }

  get maxWorkingDays() {
    const { date_from, schedule } = this.state.form

    return workingDaysInRange({
      start: date_from ? moment(date_from) : moment().startOf("month"),
      end: date_from ? moment(date_from).endOf("month") : moment().endOf("month"),
      workdays: this.workdays,
      holidays: this.holidays,
      schedule,
    }).length
  }

  get dateFromValue() {
    const { date_from, year } = this.state.form

    return isNull(date_from) ? date_from : moment(date_from)

    // return !isNull(date_from) ? moment(date_from) : moment({ year })
  }

  get dateToDefaultValue() {
    const { date_from, year } = this.state.form

    // return isNull(date_from) ? date_from : moment(date_from)

    return !isNull(date_from) ? moment(date_from) : moment({ year })
  }

  get dateToValue() {
    const { date_to } = this.state.form

    return isNull(date_to) ? date_to : moment(date_to)

  }

  handleSubmit = async () => {
    const { by, schedule, date_from } = this.state.form
    const avgWorkingDays = workingDaysInMonth({
      workdays: this.workdays,
      holidays: this.holidays,
      date: moment(date_from),
      schedule,
    }).length

    const valid = await schemaBy.isValid({ ...this.state.form })

    schemaBy.validate({ ...this.state.form }).catch(function(err) {
      console.log(err)
    })

    if (!valid) {
      this.setState({ loading: false, valid: false })
      this.setState({ note:false})
    } else {
      this.setState({ note:true})
      by ? await this.calculateByTable() : await this.calculateByDate(avgWorkingDays)
    }
  }

  onBlur = () => {
    this.setState(prevState => (
      { valid: true }
    ), this.state.calculated ? this.handleSubmit : null)
  }

  handleByFieldChange = () => {
    const { form } = this.state

    this.props.getSalaryType(form.by)

    const state = !form.by
      ? {
        form: { ...form, from: 1 }, result: {
          income_tax: 0,
          pension_fee: 0,
          salary: 0,
          stamp_fee: 0,
          total_fee: 0,
        }, calculated: 1,
      }
      : {
        result: {
          income_tax: 0,
          pension_fee: 0,
          salary: 0,
          stamp_fee: 0,
          total_fee: 0,
        }, calculated: 1,
      }

    this.setState(state)
    this.onBlur()
  }

  /**
   * Render picker calendar cells by weekends & holidays
   *
   * @param {moment.Moment} date
   * @param {moment.Moment} today
   * @param {String} range - can be 'start' or 'end'
   * @return {JSX.Element}
   */
  handlePickerRender = (date, today, range) => {
    const { schedule } = this.state.form
    const { locale } = this.props

    const condition = range === "start"
      ? this.handleDateFromDisabled(date)
      : this.handleDateToDisabled(date)

    if (date.isSame(today, "day")) {
      return <div className={
        !condition
          ? "ant-picker-cell-inner ant-picker-cell-today"
          : "ant-picker-cell-inner"
      }>
        {date.format("D")}
        {locale === "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}</span>
                </span>
        }
        {locale !== "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}</span>
                </span>
        }
        {locale === "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}</span>
                </span>
        }
        {locale !== "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}</span>
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
        {locale === "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}</span>
                </span>
        }
        {locale !== "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}</span>
                </span>
        }
        {locale === "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}</span>
                </span>
        }
        {locale !== "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}</span>
                </span>
        }
      </div>
    } else if (isWeekend(date, schedule)) {
      return <div className={
        !condition
          ? "ant-picker-cell-inner ant-picker-cell-weekend"
          : "ant-picker-cell-inner"
      }>
        {date.format("D")}
        {locale === "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}</span>
                </span>
        }
        {locale !== "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}</span>
                </span>
        }
        {locale === "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}</span>
                </span>
        }
        {locale !== "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}</span>
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
          <span className="day_title_context">{this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}</span>
                </span>
        }
        {locale !== "arm" && this.workdays.length > 0
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}</span>
                </span>
        }
        {locale === "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}</span>
                </span>
        }
        {locale !== "arm" && this.holidays.length > 0
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
          <span className="day_title_context">{this.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}</span>
                </span>
        }
      </div>
    }
  }

  handleDateFromChange = date => {
    const fields = !date ? { date_from: date, date_to: date } : { date_from: date.format("YYYY-MM-DD") }
    this.setFields(fields, () => {
      this.autocompleteWorkingDays()
    })
  }

  handleDateToChange = date => {
    date = isNull(date) ? date : date.format("YYYY-MM-DD")

    this.setField("date_to", date, () => this.autocompleteWorkingDays())
  }

  handleDateFromDisabled = d => {
    const { date_to, year } = this.state.form

    if (date_to) {
      return d.isSameOrAfter(date_to, "day")
    } else {
      return d && d.year() !== year
    }
  }

  handleDateToDisabled = d => {
    const { date_from, year } = this.state.form

    if (date_from) {
      return d.isSameOrBefore(date_from, "day")
    } else {
      return d && d.year() !== year
    }
  }

  changeRange = () => {
    const { date_from, date_to, year } = this.state.form

    const diff = date_from ? moment(date_from).year() - year : moment(date_to).year() - year

    this.setFields({
      date_from: date_from ? moment(date_from).subtract(diff, "years").format("YYYY-MM-DD") : null,
      date_to: date_to ? moment(date_to).subtract(diff, "years").format("YYYY-MM-DD") : null,
    }, this.onBlur)
  }

  handleDateFromInput = e => {
    const { value } = e.target

    if (!value) {
      this.handleDateFromChange(null)
      this.dateFromPicker.current.blur()
    }
  }

  handleDateToInput = e => {
    const { value } = e.target

    if (!value) {
      this.handleDateToChange(null)
      this.dateToPicker.current.blur()
    }
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

  // setDateField(name, date) {
  //   date = isNull(date) ? date : date.format("YYYY-MM-DD")

  // this.setField(name, date, this.autocompleteWorkingDays)
  // if ((name === 'date_from') && date) {
  //   this.setField(name, date, () => {
  //     if (!this.state.form.date_to) {
  //       this.setField("date_to", date, () => {
  //         this.setField('date_to', null)
  //       })
  //     } else {
  //       this.autocompleteWorkingDays()
  //     }
  //   })
  // } else if ((name === 'date_from') && !date) {
  //   this.setField(name, moment().format("YYYY-MM-DD"), () => {
  //     this.setField(name, null, () => {
  //       this.setField('date_to', moment().format("YYYY-MM-DD"), () => {
  //         this.setState({ form: { ...this.state.form, date_to : null , working_days: null} })
  //       })
  //     })
  //   })
  // } else {
  //   this.setField(name, date, this.autocompleteWorkingDays)
  // }
  // }

  autocompleteVacationDateTo() {
    const { date_from, working_days, schedule } = this.state.form

    if (!working_days) {
      this.setField("date_to", null)
    }

    if (date_from && working_days) {
      const days = (working_days > this.maxWorkingDays) ? this.maxWorkingDays : working_days
      const date_to = endDate(moment(date_from), days, schedule, this.holidays, this.workdays).format("YYYY-MM-DD")

      this.setField("date_to", date_to)
    }
  }

  get setWorkingDays() {
    const { date_from, date_to, schedule } = this.state.form

    if (date_from && date_to) {
      const working_days = workingDaysInRange({
        start: moment(date_from),
        end: moment(date_to),
        workdays: this.workdays,
        holidays: this.holidays,
        schedule,
      }).length

      return working_days
    }
  }

  autocompleteWorkingDays() {
    const { date_from, date_to, schedule } = this.state.form

    this.daysInput.current.blur()

    if (!date_to || !date_from) {
      this.setField("working_days", null)
    }

    if (date_from && date_to) {
      const working_days = workingDaysInRange({
        start: moment(date_from),
        end: moment(date_to),
        workdays: this.workdays,
        holidays: this.holidays,
        schedule,
      }).length

      this.setField("working_days", working_days)
    }
  }

  get defaultDate() {
    const { date_from, year } = this.state.form

    return date_from ? moment(date_from) : moment({ year })
  }

  autoCalculate(prevState) {
    const prevFormByTable = { ...prevState.form, employees: [...prevState.employees] }
    const formByTable = { ...this.state.form, employees: [...this.state.employees] }

    if (
      (!isEqual(prevState.form, this.state.form) && this.calculatingByDate && this.calculatedByDate) ||
      (!isEqual(prevFormByTable, formByTable) && this.calculatingByTable && this.calculatedByTable)
    ) {
      this.handleSubmit().then(() => console.log("auto calculated"))
    }
  }

  async calculateByDate(avgWorkingDays) {
    const { from, pension, tax_field, schedule, date_from, date_to, amount, year } = this.state.form
    let { check, width } = this.state
    const workingDays = workingDaysInRange({
      start: moment(date_from),
      end: moment(date_to),
      workdays: this.workdays,
      holidays: this.holidays,
      schedule,
    })

    const gross_salary = Math.round(amount / avgWorkingDays * workingDays.length)

    const res = await triple.post("/api/counter/salary", {
      from,
      pension,
      tax_field,
      year,
      amount: gross_salary,
    }).finally(() => {
      if (check && width) {
        this.top.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }
      this.setState((prevState) => ({
        ...prevState,
        check: false,
      }))
    })

    const result = Object.assign({}, res.data, { gross_salary })

    this.setState({ result, loading: false, calculated: 1, valid: false })
  }

  async calculateByTable() {
    let { form, check, width } = this.state
    const res = await triple.post("/api/counter/salary", form)
      .finally(() => {
        if (check && width) {
          this.top.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
        }
        this.setState((prevState) => ({
          ...prevState,
          check: false,
        }))
      })
    this.setState({ result: res.data, loading: false, calculated: 2 })
  }

  fetchDays() {
    triple.get("/api/days").then(res => {
      this.holidays = res.data.holidays
      this.workdays = res.data.workdays
    }).catch(err => console.log(err))
  }

  checkValue() {
    this.setState((prevState) => ({
      ...prevState,
      check: true,
    }))
  }

  // keyDown = (event) => {
  //   let value = event.target.value
  //   let name = event.target.name
  //   console.log(value)
  //   if (value.length <= 1) {
  //     this.setField(name, null)
  //   }
  // }

  componentDidMount() {

    this.fetchDays()

    this.dateFromPicker.current && ReactDOM
      .findDOMNode(/** @type Element */this.dateFromPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateFromInput)

    this.dateToPicker.current && ReactDOM
      .findDOMNode(/** @type Element */this.dateToPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateToInput)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.autoCalculate(prevState)

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

  render() {
    const { langText } = this.props
    const { form, result, loading, randomKey, calculated, note } = this.state

    return (
      <>
        <Row ref={this.distance} align="start" gutter={20} className="rowWrapper">
          <CalculatorsCardWrapper span={24} xl={16}>
            <CalculatorsCard ref={this.calcCard} bordered={false}>
              <Form.Item style={{ display: "flex" }}>
                <CalculatorSelect
                  size="large"
                  className={"yearSelect"}
                  value={form.year}
                  style={{ maxWidth: "424px", width: "90px" }}
                  onChange={value => this.setField("year", value, this.changeRange)}
                >
                  {availableYears.map(year =>
                    <Select.Option value={year} key={`vehicle-${year}`}>
                      {year}
                    </Select.Option>,
                  )}
                </CalculatorSelect>
              </Form.Item>
              <Form onFinish={this.handleSubmit} initialValues={form} layout="horizontal" colon={false}>
                <RadioGroup
                  onChange={(e) => this.setField("from", e.target.value, this.onBlur)}
                  value={form.from}
                  size="large"
                >
                  <Row align="middle" justify="start" style={{
                    width: "100%",
                    flexDirection: form.from === 2 ? "row-reverse" : "row",
                    flexWrap: "wrap",
                  }}>
                    <Col span={24} md={11}>
                      <RadioButton value={1} size="large">
                        {langText["dirty_salary_button"]}
                      </RadioButton>
                    </Col>
                    <Col span={24} md={2} style={{ textAlign: "center" }}>
                      <svg
                        fill="none"
                        width="30"
                        height="49"
                        viewBox="0 0 24 14"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => this.setField("from", form.from === 2 ? 1 : 2)}
                      >
                        <path d="M5.32 6L0 10L5.32 14V11H14.6667V9H5.32V6ZM24 4L18.68 0V3H9.33333V5H18.68V8L24 4Z"
                              fill="#00B3C7" />
                      </svg>
                    </Col>
                    <Col span={24} md={11}>
                      <RadioButton value={2} size="large">
                        {langText["clean_salary_button"]}
                      </RadioButton>
                    </Col>
                  </Row>
                </RadioGroup>
                <Form.Item>
                  <Radio.Group
                    onChange={e => this.setField("by", e.target.value, this.handleByFieldChange)}
                    value={form.by}
                  >
                    <Radio className="inlineElements" value={BY_FIELD_DATE}>
                      {<Label style={{ textTransform: "none" }}>{langText.form["by_date"]}</Label>}
                    </Radio>
                    <Radio className="inlineElements" value={BY_FIELD_TABLE}>
                      {<Label style={{ textTransform: "none" }}>{langText.form["by_table"]}</Label>}
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                {form.by ?
                  <>
                    <RowWrapper label={<Label>{langText["salary_label"]}</Label>} name="amount">
                      <CalculatorInput
                        formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={v => v.replace(/\$\s?|(,*)/g, "")}
                        onChange={v => this.setField("amount", v)}
                        value={form.amount}
                        suffix={true}
                        suffixIcon={
                          <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.295 4.5L3 2.02767L0.705 4.5L-3.32702e-08 3.73887L3 0.5L6 3.73887L5.295 4.5Z"
                                  fill="black" />
                          </svg>
                        }
                        onBlur={this.onBlur}
                        step={SALARY_STEP}
                        min={SALARY_MIN}
                        name="amount"
                        size="large"
                      />
                    </RowWrapper>
                  </>
                  :
                  <>
                    <Row gutter={10} align="middle">
                      <RowWrapper style={{ marginRight: "25px" }} label={<Label>{langText.form.start}</Label>}>
                        <CalculatorDatePicker
                          dateRender={(date, today) => this.handlePickerRender(date, today, "start")}
                          disabledDate={this.handleDateFromDisabled}
                          onChange={this.handleDateFromChange}
                          value={this.dateFromValue}
                          allowClear={true}
                          defaultPickerValue={this.defaultDate}
                          key={randomKey}
                          ref={this.dateFromPicker}
                          onBlur={this.onBlur}
                          placeholder={null}
                          format="DD.MM.YYYY"
                          name="date_from"
                          size="large"
                        />
                      </RowWrapper>
                      <RowWrapper label={<Label>{langText.form.end}</Label>}>
                        <CalculatorDatePicker
                          dateRender={(date, today) => this.handlePickerRender(date, today, "end")}
                          defaultPickerValue={this.defaultDate}
                          disabledDate={this.handleDateToDisabled}
                          onChange={this.handleDateToChange}
                          allowClear={true}
                          value={this.dateToValue}
                          key={randomKey}
                          onBlur={this.onBlur}
                          ref={this.dateToPicker}
                          placeholder={null}
                          format="DD.MM.YYYY"
                          name="date_to"
                          size="large"
                        />
                      </RowWrapper>
                    </Row>

                    <RowWrapper label={<Label>{langText.form.working_days}</Label>}>
                      <CalculatorInput
                        onChange={v => this.setField("working_days", v, this.autocompleteVacationDateTo)}
                        value={this.setWorkingDays}
                        style={{ width: "54px" }}
                        ref={this.daysInput}
                        max={this.maxWorkingDays}
                        onBlur={this.onBlur}
                        min={1}
                        name="working_days"
                        type="number"
                        size="large"
                      />
                    </RowWrapper>

                    {/* schedule field */}
                    <Form.Item label={langText.form.working_schedule} labelCol={{ span: 24 }}>
                      <Radio.Group
                        onChange={e => this.setField("schedule", e.target.value, this.autocompleteWorkingDays)}
                        value={form.schedule}
                      >
                        <Radio className="inlineElements" value={5}>
                          {<Label style={{ textTransform: "none" }}>{langText.form["five_days"]}</Label>}
                        </Radio>
                        <Radio className="inlineElements" value={6}>
                          {<Label style={{ textTransform: "none" }}>{langText.form["six_days"]}</Label>}
                        </Radio>
                      </Radio.Group>
                    </Form.Item>

                    <RowWrapper label={<Label>{langText["salary_label"]}</Label>} name="amount">
                      <CalculatorInput
                        formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={v => v.replace(/\$\s?|(,*)/g, "")}
                        onChange={v => this.setField("amount", v)}
                        value={form.amount}
                        step={SALARY_STEP}
                        onBlur={this.onBlur}
                        min={SALARY_MIN}
                        name="amount"
                        size="large"
                      />
                    </RowWrapper>
                  </>
                }

                <Form.Item label={<Label style={{ fontSize: "16px" }}>{langText["tax_label"]}</Label>}
                           labelCol={{ span: 24 }} name="tax_field">
                  <Radio.Group
                    onChange={(e) => this.setField("tax_field", e.target.value, this.onBlur)}
                    value={form.tax_field}
                  >
                    <Radio className="inlineElements" style={radioStyle} value={TAX_FIELD_COMMON}>
                      <RadioLabel>{langText["tax_label_common"]}</RadioLabel>
                    </Radio>
                    <Radio className="inlineElements" style={radioStyle} value={TAX_FIELD_IT}>
                      <RadioLabel>{langText["tax_label_it"]}</RadioLabel>
                    </Radio>
                    <Radio className="inlineElements" style={radioStyle} value={TAX_FIELD_ENTERPRISE}>
                      <RadioLabel>{langText["tax_label_enterprise"]}</RadioLabel>
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item className="nonWrap" label={<RadioLabel>{langText["pensioner_label"]}</RadioLabel>}
                           name="pension">
                  <Radio.Group
                    onChange={(e) => this.setField("pension", e.target.value, this.onBlur)}
                    value={form.pension}
                  >
                    <Radio className="inlineElements" value={PENSION_FIELD_YES}>
                      <Label>{langText["yes"]}</Label>
                    </Radio>
                    <Radio className="inlineElements" value={PENSION_FIELD_YES_VOLUNTEER}>
                      <Label>{langText["yes"]}</Label>
                      <Label className="volunteer">{langText["yes_volunteer"]}</Label>
                    </Radio>
                    <Radio className="inlineElements" value={PENSION_FIELD_NO}>
                      <Label>{langText["no"]}</Label>
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item style={{ marginTop: "46px" }}>
                  <ButtonSubmit
                    htmlType="submit"
                    shape="round"
                    size="large"
                    onClick={() => this.checkValue()}
                  >
                    {langText["count_button"]}
                  </ButtonSubmit>
                </Form.Item>
              </Form>
            </CalculatorsCard>
          </CalculatorsCardWrapper>
          <Col span={24} xl={8} className="result" ref={this.top}>
            <Row>
              <Col md={10} span={22} xl={24}>
                <FormLabel style={{ margin: 0 }}>{langText.result_title}</FormLabel>

                <UnderLine />
                {result.gross_salary &&
                <CalculatorCardResult
                  title={langText.gross_salary}
                  text={result.gross_salary}
                  loading={loading}
                />}
                <CalculatorCardResult
                  title={form.from === 1 ? langText["dirty_to_clean_salary"] : langText["clean_dirty_to_salary"]}
                  text={result.salary}
                  loading={loading}
                />
                <CalculatorCardResult
                  title={langText["income_tax_label"]}
                  text={result.income_tax}
                  loading={loading}
                  tooltip={form.tax_field === TAX_FIELD_ENTERPRISE ? "prompt text" : null}
                  note={langText["income_tax_label_note"]}
                />
                <CalculatorCardResult
                  title={langText["pension_paymet_label"]}
                  text={result.pension_fee}
                  loading={loading}
                  tooltip={false}
                />
              </Col>
              <Col md={10} span={22} xl={24}>
                <CalculatorCardResult
                  title={langText["stamp_duty_label"]}
                  text={result.stamp_fee}
                  note={langText["stamp_duty_label_note"]}
                  loading={loading}
                  tooltip={ note && result.stamp_fee <= 0}
                />
                <CalculatorCardResult
                  title={langText["general_storage_label"]}
                  text={result.total_fee}
                  loading={loading}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }

}

export default SalaryCalculator
