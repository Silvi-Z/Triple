import React from "react"
import moment from "moment"
import { isEmpty, isEqual, isNull } from "lodash"
import { Card, Checkbox, Col, Form, Radio, Row, Select ,Tooltip} from "antd"
import { InfoCircleTwoTone } from "@ant-design/icons";
import {
  ButtonSubmit,
  CalculatorDatePicker,
  CalculatorInput, CalculatorsCardWrapper,
  CalculatorSelect,
  FormLabel,
  Label,
  RadioLabel,
  UnderLine,
} from "./styled"
import triple from "../../api/triple"
import Subsidy from "../../calculators/Subsidy"
import GrossSalaryTable from "./calcComponents/GrossSalaryTable"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import { isHoliday, isWeekend, workingDaysInRangeForSubsidy } from "./utilities/vacation"
import { randomString } from "./utilities/tabel"

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

  get defaultDate() {
    const { year } = this.state.form

    return moment({ year })
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
        triple.post("/api/counter/salary", {
          from: 1,
          amount,
          pension,
          tax_field,
          stamp: false,
          year,
        }).then(res => {
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
      }
    })
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
    const { start, end, type, work } = this.state.form

    if (isNull(start) || isNull(end)) {
      this.setState({ form: { ...this.state.form, days: null } })
    }

    if (start && end) {
      const daysCount = workingDaysInRangeForSubsidy({
        holidays: [],
        workdays: [],
        schedule: 5,
        start: start.clone(),
        end: end.clone(),
        type,
        work,
      })
      this.setField("days", daysCount.length, this.changeYear)
    } else {
      this.changeYear()
    }
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

    const condition = range === "start"
      ? form.end && (date.isSameOrAfter(form.end, "day"))
      : !form.start || (date.isSameOrBefore(form.start, "day"))

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
    } else if (isWeekend(date, form.schedule)) {
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


  changeState = () => {
    this.setState({ valid: true })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevState.form, this.state.form) && this.state.calculated && this.state.valid) {
      this.handleSubmit()
    }
  }

  componentDidMount() {
    this.fetchDays()
    window.addEventListener("scroll", this.handleWindowScroll)
  }

  render() {
    const { lang } = this.props
    const { form, result, randomKey } = this.state

    this.calculator.setFields(form)

    return (
      <Row align="start" gutter={20} ref={this.rowWidth} className="fixElement">
        <CalculatorsCardWrapper span={24} xl={16} ref={this.row}>
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
                  <Radio value={Subsidy.MATERNITY}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.maternity}</Label>}
                  </Radio>
                  <Radio value={Subsidy.DISABILITY}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.disability}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>

              {/* start-end dates fields */}
              <Form.Item label={<Label>{lang.form.dates}</Label>} labelCol={{ span: 24 }}>
                <Row gutter={10} align="middle">
                  <Form.Item style={{ marginRight: "25px" }} label={<Label>{lang.form.start}</Label>}>
                    <CalculatorDatePicker
                      onChange={date => this.setField("start", date, this.autocompleteDays)}
                      dateRender={(date, today) => this.handlePickerRender(date, today, "start")}
                      defaultPickerValue={this.defaultDate}
                      placeholder={lang.form.dates_placeholder}
                      value={form.start}
                      key={randomKey}
                      onBlur={this.onBlur}
                      format="DD.MM.YYYY"
                      name="start"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item label={<Label>{lang.form.end}</Label>}>
                    <CalculatorDatePicker
                      onChange={date => this.setField("end", date, this.autocompleteDays)}
                      dateRender={(date, today) => this.handlePickerRender(date, today, "end")}
                      defaultPickerValue={this.defaultDate}
                      placeholder={lang.form.dates_placeholder}
                      value={form.end}
                      key={randomKey}
                      onBlur={this.onBlur}
                      format="DD.MM.YYYY"
                      size="large"
                      name="end"
                    />
                  </Form.Item>
                </Row>
              </Form.Item>

              {/* days field */}
              <Form.Item label={<Label>{lang.form.days}</Label>}>
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
                <Tooltip title="prompt text" color="black">
                  <InfoCircleTwoTone twoToneColor="#00B3C7" style={{marginLeft: 5}} />
                </Tooltip>
              </Form.Item>

              {/* work field */}
              <Form.Item labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setField("work", e.target.value, this.autocompleteDays)}
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
                  <Radio style={radioStyle} value={Subsidy.TAX_COMMON}>
                    <RadioLabel>{lang.form.tax_common}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={Subsidy.TAX_ENTERPRISE}>
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
                  <Radio style={radioStyle} value={Subsidy.TAX_COMMON}>
                    <RadioLabel>{lang.form.tax_common_for_self_employed}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={Subsidy.TAX_TURNOVER}>
                    <RadioLabel>{lang.form.tax_turnover_for_self_employed}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={Subsidy.TAX_IT}>
                    <RadioLabel>{lang.form.tax_enterprise}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={Subsidy.TAX_ENTERPRISE}>
                    <RadioLabel>{lang.form.tax_it}</RadioLabel>
                  </Radio>
                </Radio.Group>
              </Form.Item>
              }

              {/* schedule field */}
              {this.isTypeDisability && this.isWorkHired ?
                <Form.Item label={lang.form.schedule} labelCol={{ span: 24 }}>
                  <Radio.Group
                    onChange={e => this.setField("schedule", e.target.value, this.onBlur)}
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
              {
                this.isStatic ?
                  <Form.Item className={"subsidyAmount"} label={<Label>{this.changeAmountFieldTitle}</Label>}>
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
                  </Form.Item>
                  : null
              }

              {/* income input */}
              {this.isTypeMaternity &&
              <Form.Item label={<Label>{lang.form.income}</Label>}>
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
                <Tooltip title="prompt text" color="black">
                  <InfoCircleTwoTone twoToneColor="#00B3C7" style={{marginLeft: 5}} />
                </Tooltip>
              </Form.Item>
              }

              {/* static field */}
              {this.isWorkHired ?
                <Form.Item>
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
              <Form.Item style={{ marginTop: "50px" }}>
                <ButtonSubmit onClick={this.changeState} htmlType="submit" shape="round" size="large">
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </Card>
        </CalculatorsCardWrapper>

        <Col span={20} md={17} xl={8} sm={10} className="result" ref={this.col}>
          <div>
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

            <CalculatorCardResult
              title={lang.result["income_tax"]}
              text={result.income_tax}
              tooltip={this.isTaxEnterprise}
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
          </div>
        </Col>
      </Row>
    )
  }
}

export default SubsidyCalculator
