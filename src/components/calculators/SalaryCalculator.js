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
  CalculatorSelect,
  FormLabel,
  H1Styled,
  Label,
  RadioButton,
  RadioGroup,
  RadioLabel,
  TextStyled,
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
  display: "block",
  height: "30px",
  lineHeight: "30px",
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
  daysInput = React.createRef()

  dateToPicker = React.createRef()

  dateFromPicker = React.createRef()

  dateToPickerKey = randomString()

  dateFromPickerKey = randomString()

  constructor(props) {
    super(props)

    this.state = {
      calculated: 0,
      loading: false,
      form: { ...form },
      employees: [],
      result: {},
      excel: [],
    }
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
    const { date_from } = this.state.form

    return isNull(date_from) ? date_from : moment(date_from)
  }

  get dateToValue() {
    const { date_to } = this.state.form

    return isNull(date_to) ? date_to : moment(date_to)
  }

  handleSubmit = async () => {
    this.setState({ loading: true })

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

    if (!valid) return

    by ? await this.calculateByTable() : await this.calculateByDate(avgWorkingDays)
  }

  handleByFieldChange = () => {
    const { form } = this.state

    const state = !form.by
      ? { form: { ...form, from: 1 }, result: {}, calculated: 0 }
      : { result: {}, calculated: 0 }

    this.setState(state)
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
      </div>
    } else if (isHoliday(date, this.holidays)) {
      return <div className={
        !condition
          ? "ant-picker-cell-inner ant-picker-cell-holiday"
          : "ant-picker-cell-inner"
      }>
        {date.format("D")}
      </div>
    } else if (isWeekend(date, schedule)) {
      return <div className={
        !condition
          ? "ant-picker-cell-inner ant-picker-cell-weekend"
          : "ant-picker-cell-inner"
      }>
        {date.format("D")}
      </div>
    } else {
      return <div className="ant-picker-cell-inner">{date.format("D")}</div>
    }
  }

  handleDateFromChange = date => {
    const fields = !date ? { date_from: date, date_to: date } : { date_from: date.format("YYYY-MM-DD") }
    if (!date) this.dateFromPickerKey = randomString()

    this.setFields(fields, () => {
      this.dateToPickerKey = randomString()

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
      return d.isSameOrAfter(date_to, "day") && !d.isSame(date_to, "month")
    } else {
      return d && d.year() !== year
    }
  }

  handleDateToDisabled = d => {
    const { date_from, year } = this.state.form

    if (date_from) {
      return d.isBefore(date_from, "day")
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
    })
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
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  setFields(fields, cb) {
    this.setState({ form: { ...this.state.form, ...fields } }, cb)
  }

  setDateField(name, date) {
    date = isNull(date) ? date : date.format("YYYY-MM-DD")

    this.setField(name, date, this.autocompleteWorkingDays)
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
  }

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
    this.setState({ loading: true })

    const { from, pension, tax_field, schedule, date_from, date_to, amount, year } = this.state.form
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
    })

    const result = Object.assign({}, res.data, { gross_salary })

    this.setState({ result, loading: false, calculated: 1 })
  }

  async calculateByTable() {
    let { form } = this.state
    const res = await triple.post("/api/counter/salary", form)
    this.setState({ result: res.data, loading: false, calculated: 2 })
  }

  fetchDays() {
    triple.get("/api/days").then(res => {
      this.holidays = res.data.holidays
      this.workdays = res.data.workdays
    }).catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchDays()

    this.dateFromPicker.current &&
    ReactDOM
      .findDOMNode(/** @type Element */this.dateFromPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateFromInput)

    this.dateToPicker.current &&
    ReactDOM
      .findDOMNode(/** @type Element */this.dateToPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateToInput)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.autoCalculate(prevState)
  }

  render() {
    const { langText } = this.props
    const { form, result, loading } = this.state

    console.log(form)

    return (
      <>
        <Row align="start" gutter={20}>
          <Col span={16}>
            <div className="textSec">
              <H1Styled>{langText.title}</H1Styled>
              <TextStyled>{langText.paragraph}</TextStyled>
            </div>

            <CalculatorsCard bordered={false}>
              <Form onFinish={this.handleSubmit} initialValues={form} layout="horizontal" colon={false}>
                <RadioGroup
                  onChange={(e) => this.setField("from", e.target.value)}
                  value={form.from}
                  size="large"
                >
                  <Row align="middle" justify="start" gutter={[10, 10]} style={{
                    width: "100%",
                    flexDirection: form.from === 2 ? "row-reverse" : "row",
                  }}>
                    <Col span={11}>
                      <RadioButton value={1} size="large">
                        {langText["dirty_salary_button"]}
                      </RadioButton>
                    </Col>
                    <Col span={2} style={{ textAlign: "center" }}>
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
                    <Col span={11}>
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
                    <Radio value={BY_FIELD_DATE}>
                      {<Label style={{ textTransform: "none" }}>{langText.form["by_date"]}</Label>}
                    </Radio>
                    <Radio value={BY_FIELD_TABLE}>
                      {<Label style={{ textTransform: "none" }}>{langText.form["by_table"]}</Label>}
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                {form.by ?
                  <>
                    <Form.Item>
                      <CalculatorSelect
                        size="large"
                        className={'yearSelect'}
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

                    <Form.Item label={<Label>{langText["salary_label"]}</Label>} name="amount">
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
                        step={SALARY_STEP}
                        min={SALARY_MIN}
                        name="amount"
                        size="large"
                      />
                    </Form.Item>
                  </>
                  :
                  <>
                    <Form.Item>
                      <CalculatorSelect
                        size="large"
                        value={form.year}
                        className={'yearSelect'}
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

                    <Row gutter={10} align="middle">
                      <Form.Item style={{ marginRight: "25px" }} label={<Label>{langText.form.start}</Label>}>
                        <CalculatorDatePicker
                          dateRender={(date, today) => this.handlePickerRender(date, today, "start")}
                          disabledDate={this.handleDateFromDisabled}
                          onChange={this.handleDateFromChange}
                          value={this.dateFromValue}
                          key={this.dateFromPickerKey}
                          ref={this.dateFromPicker}
                          placeholder={null}
                          format="DD.MM.YYYY"
                          name="date_from"
                          size="large"
                        />
                      </Form.Item>
                      <Form.Item label={<Label>{langText.form.end}</Label>}>
                        <CalculatorDatePicker
                          dateRender={(date, today) => this.handlePickerRender(date, today, "end")}
                          defaultPickerValue={this.dateFromValue}
                          disabledDate={this.handleDateToDisabled}
                          onChange={this.handleDateToChange}
                          value={this.dateToValue}
                          key={this.dateToPickerKey}
                          ref={this.dateToPicker}
                          placeholder={null}
                          format="DD.MM.YYYY"
                          name="date_to"
                          size="large"
                        />
                      </Form.Item>
                    </Row>

                    <Form.Item label={<Label>{langText.form.working_days}</Label>}>
                      <CalculatorInput
                        onChange={v => this.setField("working_days", v, this.autocompleteVacationDateTo)}
                        value={form.working_days}
                        style={{ width: "54px" }}
                        ref={this.daysInput}
                        max={this.maxWorkingDays}
                        min={1}
                        name="working_days"
                        type="number"
                        size="large"
                      />
                    </Form.Item>

                    {/* schedule field */}
                    <Form.Item label={langText.form.working_schedule} labelCol={{ span: 24 }}>
                      <Radio.Group
                        onChange={e => this.setField("schedule", e.target.value, this.autocompleteWorkingDays)}
                        value={form.schedule}
                      >
                        <Radio value={5}>
                          {<Label style={{ textTransform: "none" }}>{langText.form["five_days"]}</Label>}
                        </Radio>
                        <Radio value={6}>
                          {<Label style={{ textTransform: "none" }}>{langText.form["six_days"]}</Label>}
                        </Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item label={<Label>{langText["salary_label"]}</Label>} name="amount">
                      <CalculatorInput
                        formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={v => v.replace(/\$\s?|(,*)/g, "")}
                        onChange={v => this.setField("amount", v)}
                        value={form.amount}
                        step={SALARY_STEP}
                        min={SALARY_MIN}
                        name="amount"
                        size="large"
                      />
                    </Form.Item>
                  </>
                }

                <Form.Item label={<Label style={{ fontSize: "16px" }}>{langText["tax_label"]}</Label>}
                           labelCol={{ span: 24 }} name="tax_field">
                  <Radio.Group
                    onChange={(e) => this.setField("tax_field", e.target.value)}
                    value={form.tax_field}
                  >
                    <Radio style={radioStyle} value={TAX_FIELD_COMMON}>
                      <RadioLabel>{langText["tax_label_common"]}</RadioLabel>
                    </Radio>
                    <Radio style={radioStyle} value={TAX_FIELD_IT}>
                      <RadioLabel>{langText["tax_label_it"]}</RadioLabel>
                    </Radio>
                    <Radio style={radioStyle} value={TAX_FIELD_ENTERPRISE}>
                      <RadioLabel>{langText["tax_label_enterprise"]}</RadioLabel>
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label={<RadioLabel>{langText["pensioner_label"]}</RadioLabel>} name="pension">
                  <Radio.Group
                    onChange={(e) => this.setField("pension", e.target.value)}
                    value={form.pension}
                  >
                    <Radio value={PENSION_FIELD_YES}>
                      <Label>{langText["yes"]}</Label>
                    </Radio>
                    <Radio value={PENSION_FIELD_YES_VOLUNTEER}>
                      <Label>{langText["yes_volunteer"]}</Label>
                    </Radio>
                    <Radio value={PENSION_FIELD_NO}>
                      <Label>{langText["no"]}</Label>
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item style={{ marginTop: "50px" }}>
                  <ButtonSubmit
                    htmlType="submit"
                    shape="round"
                    size="large"
                  >
                    {langText["count_button"]}
                  </ButtonSubmit>
                </Form.Item>
              </Form>
            </CalculatorsCard>
          </Col>
          <Col span={8} className="result">
            <FormLabel style={{ margin: 0 }}>{langText.result_title}</FormLabel>

            <UnderLine />
            {result.gross_salary &&
            <CalculatorCardResult
              title={langText.gross_salary}
              text={result.gross_salary}
              loading={loading}
              tooltip
            />
            }

            <CalculatorCardResult
              title={langText["income_tax_label"]}
              text={result.income_tax}
              loading={loading}
              tooltip={form.tax_field === TAX_FIELD_ENTERPRISE ? "prompt text" : null}
            />
            <CalculatorCardResult
              title={langText["pension_paymet_label"]}
              text={result.pension_fee}
              loading={loading}
              tooltip
            />
            <CalculatorCardResult
              title={langText["stamp_duty_label"]}
              text={result.stamp_fee}
              loading={loading}
              tooltip
            />
            <CalculatorCardResult
              title={langText["general_storage_label"]}
              text={result.total_fee}
              loading={loading}
            />

            <CalculatorCardResult
              title={form.from === 1 ? langText["dirty_to_clean_salary"] : langText["clean_dirty_to_salary"]}
              text={result.salary}
              loading={loading}
            />

          </Col>
        </Row>
      </>
    )
  }

}

export default SalaryCalculator
