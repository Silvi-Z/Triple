import React from "react"
import moment from "moment"
import { isEqual, isNull } from "lodash"
import { Col, Divider, Form, Row, Select } from "antd"
import {
  ButtonSubmit,
  CalculatorDatePicker,
  CalculatorInput,
  CalculatorsCard,
  CalculatorSelect,
  FormLabel,
  Label,
  UnderLine,
} from "./styled"
import triple from "../../api/triple"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import { isHoliday, isWeekend } from "./utilities/vacation"
import { randomString } from "./utilities/tabel"
import Currency from "../../calculators/Currency"

const form = {
  amount: null,
  amount_right: null,
  date: moment().format("YYYY-MM-DD"),
  from: Currency.AMD,
  to: Currency.USD,
}

class CurrencyCalculator extends React.Component {

  dateFromPickerKey = randomString()

  dateFromPicker = React.createRef()

  constructor(props) {
    super(props)

    this.year = moment().year()
    this.state = {
      form: { ...form },
      rates: {},
      changedAmount: true,
      calculated: false,
      valid: false,
    }
    this.holidays = []
    this.workdays = []

  }

  get dateFromValue() {
    const { date } = this.state.form

    return isNull(date) ? date : moment(date)
  }

  getCBARates() {
    if (this.state.rates.length) return

    const rates = {}
    const config = { params: { filters: ["USD", "EUR", "RUB", "GEL", "GBP", "CNY"] } }

    triple.get("/api/rates/last", config)
      .then(res => {
        Object.values(res.data.rates).forEach(rate => rates[rate["ISO"]] = Number(rate["Rate"]))

        this.setState({ rates })
      })
      .catch(err => console.log(err))
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
    } else if (isWeekend(date, 5)) {
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

  handleDateFromDisabled = d => {
    return d.isAfter(moment())
  }

  handleDateFromInput = e => {
    const { value } = e.target

    if (!value) {
      this.handleDateFromChange(null)
      this.dateFromPicker.current.blur()
    }
  }

  handleDateFromChange = date => {
    const fields = !date ? { date: date } : { date: date.format("YYYY-MM-DD") }
    if (!date) this.dateFromPickerKey = randomString()

    this.setFields(fields, () => {
      this.dateToPickerKey = randomString()

    })
    this.state.valid && this.setState({ calculated: true })
  }

  setFields(fields, cb) {
    this.setState({ form: { ...this.state.form, ...fields } }, cb)
  }

  setField(name, value, cb) {
    if (name === "amount") {
      this.setState(prevState => (
        {
          form: { ...prevState.form, [name]: value },
          changedAmount: true,
        }
      ), cb)
    } else if (name === "amount_right") {
      this.setState(prevState => (
        {
          form: { ...prevState.form, [name]: value },
          changedAmount: false,
        }
      ), cb)
    } else {
      this.setState(prevState => (
        {
          form: { ...prevState.form, [name]: value },
        }
      ), cb)
    }
  }

  checkSelectedValue = (name, value) => {
    if (name === "from") {
      if (value === this.state.form.to) {
        this.setField("to", this.state.form.from)
        this.setField("from", value)
      } else {
        this.setField("from", value)
      }
    } else if (name === "to") {
      if (value === this.state.form.from) {
        this.setField("from", this.state.form.to)
        this.setField("to", value)
      } else {
        this.setField("to", value)
      }
    }
    this.setState({ calculated: true })
  }

  handleSubmit = () => {
    const { form, changedAmount } = this.state

    Currency.schema.isValid(form).then(valid => {
      if (!valid) return

      // this.setState({ loading: true })

      triple
        .get(`api/rates/byDate?amount=${changedAmount ? form.amount : form.amount_right}&date=${form.date}&from=${changedAmount ? form.from : form.to}&to=${changedAmount ? form.to : form.from}`)
        .then(res => {
          if (changedAmount) {
            this.setState({
              form: { ...this.state.form, amount_right: parseFloat(res.data.result).toFixed(4) },
              calculated: false,
            })
          } else if (!changedAmount) {
            this.setState({
              form: { ...this.state.form, amount: parseFloat(res.data.result).toFixed(4) },
              calculated: false,
            })
          }
        })
        .then(() => {
          this.setState({ calculated: false })
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.setState({ loading: false, calculated: false })

          document.body.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        })
    }).catch(err => console.log(err))
  }

  onBlur = () => {
    if (this.state.valid) {
      this.handleSubmit()
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevState.form, this.state.form) && this.state.calculated && this.state.valid) {
      this.handleSubmit()
    }
  }

  componentDidMount() {
    this.getCBARates()
    this.fetchDays()
  }

  changeState = () => {
    this.setState({ valid: true })
  }

  render() {
    const { lang } = this.props
    const { form, rates } = this.state

    return (
      <Row align="start" gutter={20}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          {/*<Row align="center" style={{ justifyContent: "space-between" }}>*/}
          {/*  <div className="textSec">*/}
          {/*    <H1Styled>{lang.title}</H1Styled>*/}
          {/*    <TextStyled>{lang.paragraph}</TextStyled>*/}
          {/*  </div>*/}
          {/*</Row>*/}
          <CalculatorsCard bordered={false} className={"calendarBody"}>
            <Form onFinish={this.handleSubmit} initialValues={form} layout="horizontal" colon={false}>
              <Form.Item>
                <CalculatorDatePicker
                  dateRender={(date, today) => this.handlePickerRender(date, today, "start")}
                  disabledDate={this.handleDateFromDisabled}
                  onChange={this.handleDateFromChange}
                  value={this.dateFromValue}
                  key={this.dateFromPickerKey}
                  ref={this.dateFromPicker}
                  placeholder={null}
                  className={"currencyDate"}
                  format="DD.MM.YYYY"
                  name="date"
                  size="large"
                />

                <Label style={{ textTransform: "none" }}>
                  {lang.form.date}
                </Label>
              </Form.Item>

              <Row gutter={12} align="middle">
                <Col span={10}>
                  <Form.Item className={"currencyField"}>
                    <CalculatorInput
                      onChange={v => this.setField("amount", v)}
                      value={form.amount}
                      min={0}
                      className={"currencyInput"}
                      size="large"
                      step='any'
                      onBlur={this.onBlur}
                      type="number"
                    />
                    <CalculatorSelect
                      size="large"
                      className={"currencySelect"}
                      value={form.from}
                      style={{ maxWidth: "424px" }}
                      onChange={value => this.checkSelectedValue("from", value)}
                    >
                      {Currency.types(lang.currency).map(currency =>
                        <Select.Option value={currency.value}
                                       key={`currency-${currency.value}`}>
                          {currency.text}
                        </Select.Option>,
                      )}
                    </CalculatorSelect>
                  </Form.Item>
                </Col>
                <Col span={2} style={{ textAlign: "center" }}>
                  <Form.Item className={"currencyField"}>
                    <svg
                      fill="none"
                      width="30"
                      height="49"
                      viewBox="0 0 24 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5.32 6L0 10L5.32 14V11H14.6667V9H5.32V6ZM24 4L18.68 0V3H9.33333V5H18.68V8L24 4Z"
                            fill="#00B3C7" />
                    </svg>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item className={"currencyField"}>
                    <CalculatorInput
                      onChange={v => this.setField("amount_right", v)}
                      value={form.amount_right}
                      min={0}
                      step='any'
                      className={"currencyInput"}
                      size="large"
                      onBlur={this.onBlur}
                      type="number"
                    />
                    <CalculatorSelect
                      size="large"
                      className={"currencySelect"}
                      value={form.to}
                      style={{ maxWidth: "424px" }}
                      onChange={value => this.checkSelectedValue("to", value)}
                    >
                      {Currency.types(lang.currency).map(currency =>
                        <Select.Option value={currency.value}
                                       key={`currency-${currency.value}`}>
                          {currency.text}
                        </Select.Option>,
                      )}
                    </CalculatorSelect>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item style={{ marginTop: "50px" }}>
                <ButtonSubmit
                  onClick={this.changeState}
                  htmlType="submit"
                  shape="round"
                  size="large"
                >
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>

            </Form>

          </CalculatorsCard>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="result">
          <FormLabel style={{ margin: 0 }}>{lang.result.currency}</FormLabel>

          <UnderLine />

          <CalculatorCardResult style={{ padding: "15px" }}>
            {Object.keys(rates).map((currency, c) => (
              <Row align="center" key={`currency-${currency}`}>
                <Col span={12} className="currency">
                  <span
                    className="c-label sym"
                    dangerouslySetInnerHTML={{
                      __html: `${(currency === "EUR" && "&#8364;"
                        || currency === "USD" && "&#36;"
                        || currency === "GBP" && "&#163;"
                        || currency === "RUB" && "&#8381;"
                        || currency === "GEL" && "&#8382;"
                        || currency === "CNY" && "&#20803;"
                      )}`,
                    }}
                  />

                  <span className="c-label">{currency}</span>
                </Col>
                <Col span={12} className="currency">
                  <span className="c-text">{rates[currency]}</span>
                </Col>
                {c < Object.keys(rates).length - 1 ?
                  <Divider style={{ margin: "10px 0", border: "1px solid #555555" }} />
                  : null}
              </Row>
            ))}
          </CalculatorCardResult>
        </Col>
      </Row>
    )
  }
}

export default CurrencyCalculator
