import React from "react"
import { isEqual } from "lodash"
import { Col, Divider, Form, Radio, Row, Tooltip } from "antd"
import { InfoCircleTwoTone } from "@ant-design/icons"
import {
  ButtonSubmit,
  CalculatorDatePicker,
  CalculatorInput,
  CalculatorsCard,
  CalculatorsCardWrapper,
  FormLabel,
  Label,
  RadioElementsWrapper,
  RowWrapper,
  SvgWrapper,
  UnderLine,
} from "./styled"
import VehicleCustoms from "../../calculators/VehicleCustoms"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import triple from "../../api/triple"
import { isHoliday, isWeekend } from "./utilities/vacation"
import ReactDOM from "react-dom"
import Svg from "../../assets/note.svg"

const firstRadioButtonStyles = {
  borderTopLeftRadius: "5px",
  borderBottomLeftRadius: "5px",
}
const lastRadioButtonStyles = {
  borderTopRightRadius: "5px",
  borderBottomRightRadius: "5px",
}

class CarCustomsCalculator extends React.Component {
  top = React.createRef()

  dateFromPicker = React.createRef()

  handleSubmit = () => {
    const { form, rates, check, width } = this.state
    VehicleCustoms.schema
      .validate(form)
      .then(() => {
        const calculator = new VehicleCustoms(form, rates)
        const result = calculator.calculate()

        this.setState({ result: { ...result }, calculated: true })
      })
      .catch(err => {
        this.setState({
          result: { fee: null, tax: null, vat: null },
          calculated: false,
        })
      })
      .finally(() => {
        if (check && width) {
          this.top.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
        }
        this.setState((prevState) => ({
          ...prevState,
          check: false,
        }))
      })
  }

  checkValue() {
    this.setState((prevState) => ({
      ...prevState,
      check: true,
    }))
  }

  reset = field => {
    const { form } = this.state

    if (form.hasOwnProperty(field))
      this.setField(field, VehicleCustoms.form[field])
  }

  constructor(props) {
    super(props)
    this.state = {
      check: false,
      width: typeof window !="undefined" && window.innerWidth <=768,
      form: { ...VehicleCustoms.form },
      result: { fee: null, tax: null, vat: null },
      rates: {},
      calculated: false,
    }
    this.holidays = []
    this.workdays = []
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  fetchDays() {
    triple.get("/api/days")
      .then(res => {
        this.holidays = res.data.holidays
        this.workdays = res.data.workdays
      })
      .catch(err => console.log(err))
  }

  getCBARates() {
    if (this.state.rates.length) return

    const rates = {}
    const config = { params: { filters: ["USD", "EUR"] } }

    triple.get("/api/rates/last", config)
      .then(res => {
        Object.values(res.data.rates).forEach(rate => rates[rate["ISO"]] = Number(rate["Rate"]))

        this.setState({ rates })
      })
      .catch(err => console.log(err))
  }

  handlePickerRender(date, today, range) {
    const { form } = this.state
    const { locale } = this.props

    const condition = range === "start"
      && form.date && (date.isSameOrAfter(form.date, "day"))

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
    } else if (isWeekend(date, 5)) {
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

  handleDateFromInput = e => {
    const { value } = e.target

    if (!value) {
      this.setField("date", null)
      this.dateFromPicker.current.blur()
    }
  }

  componentDidMount() {
    this.getCBARates()
    this.fetchDays()

    this.dateFromPicker.current && ReactDOM
      .findDOMNode(/** @type Element */this.dateFromPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateFromInput)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevState.form, this.state.form) && this.state.calculated) {
      this.handleSubmit()
    }

    this.dateFromPicker.current && ReactDOM
      .findDOMNode(/** @type Element */this.dateFromPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateFromInput)
  }

  componentWillUnmount() {
    this.dateFromPicker.current && ReactDOM
      .findDOMNode(/** @type Element */this.dateFromPicker.current)
      .querySelector("input")
      .removeEventListener("input", this.handleDateFromInput)
  }

  render() {
    const { lang } = this.props
    const { form, result, rates, calculated } = this.state

    return (
      <Row align="start" gutter={{ xl: 20 }}>
        <CalculatorsCardWrapper span={24} xl={16}>

          <CalculatorsCard bordered={false} style={{ marginTop: "30px" }}>
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >
              <RowWrapper>
                <Radio.Group
                  onChange={e => this.setField("person", e.target.value, () => this.reset("costs"))}
                  value={form.person}
                >
                  <Radio value={VehicleCustoms.PERSON_PHYSICAL}>
                    <Label style={{ textTransform: "none" }}>{lang.form["person_physical"]}</Label>
                  </Radio>
                  <Radio value={VehicleCustoms.PERSON_LEGAL}>
                    <Label style={{ textTransform: "none" }}>{lang.form["person_legal"]}</Label>
                  </Radio>
                </Radio.Group>
              </RowWrapper>

              <RowWrapper label={<Label>{lang.form.year}</Label>}>
                <CalculatorDatePicker
                  onChange={date => this.setField("date", date)}
                  dateRender={(date, today) => this.handlePickerRender(date, today, "start")}
                  value={form.date}
                  placeholder={null}
                  name={"date"}
                  ref={this.dateFromPicker}
                  allowClear={true}
                  size="large"
                />
              </RowWrapper>
              <RadioElementsWrapper>
              <RowWrapper className="radioElements" label={<Label>{lang.form.price}</Label>}>
                <CalculatorInput
                  formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={v => v.replace(/\$\s?|(,*)/g, "")}
                  onChange={v => this.setField("price", v)}
                  value={form.price}
                  size="large"
                />
              </RowWrapper>
                <Radio.Group
                  onChange={e => this.setField("currency", e.target.value)}
                  style={{ marginBottom:"25px", display:"flex", alignItems:"center"}}
                  value={form.currency}
                  buttonStyle="solid"
                  size="large"
                >
                  <Radio style={firstRadioButtonStyles} value="AMD">
                    <strong>&#1423;</strong>
                  </Radio>
                  <Radio value="USD">
                    <strong>&#36;</strong>
                  </Radio>
                  <Radio style={lastRadioButtonStyles} value="EUR">
                    <strong>&#8364;</strong>
                  </Radio>
                </Radio.Group>
              </RadioElementsWrapper>


              {form.person === VehicleCustoms.PERSON_LEGAL ?
                <RowWrapper label={<Label>{lang.form.costs}
                  <Tooltip title="prompt text" color="black">
                    <SvgWrapper style={{backgroundImage: `url(${Svg})`}} />
                  </Tooltip></Label>}>
                  <CalculatorInput
                    formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={v => v.replace(/\$\s?|(,*)/g, "")}
                    onChange={v => this.setField("costs", v)}
                    value={form.costs}
                    size="large"
                  />
                </RowWrapper>
                : null}

              <RowWrapper label={<Label>{lang.form.capacity}</Label>}>
                <CalculatorInput
                  onChange={v => this.setField("capacity", v)}
                  value={form.capacity}
                  min={0}
                  size="large"
                />
              </RowWrapper>

              <Form.Item style={{ marginTop: "20px" }}>
                <ButtonSubmit
                  htmlType="submit"
                  shape="round"
                  size="large"
                  onClick={()=>this.checkValue()}
                >
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </CalculatorsCard>
        </CalculatorsCardWrapper>
        <Col span={20} xl={8} className="result carCustomsResult" ref={this.top}>
          <Row>
            <Col md={12} span={24} xl={24}>
              <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

              <UnderLine />

              {Object.keys(result).map(key =>
                <CalculatorCardResult
                  title={lang.result[key]}
                  key={key}
                  text={
                    <>
                      {(calculated && result[key] && result[key].hasOwnProperty(form.currency)) ?
                        <span>
                      <span
                        className="currency-symbol"
                        dangerouslySetInnerHTML={{ __html: result[key][form.currency].sym }}
                      />
                          {result[key][form.currency].amount}
                          <br />
                    </span>
                        : null}

                      {(calculated && result[key].hasOwnProperty(form.currency) && form.currency !== "AMD") ?
                        <span>
                      <span
                        className="currency-symbol"
                        dangerouslySetInnerHTML={{ __html: "&#1423;" }}
                      />
                          {result[key]["AMD"].amount}
                    </span>
                        : null}
                    </>
                  }
                />,
              )}
            </Col>

            <Col md={12} span={24} xl={24} className="currencyResult">
              <p className="calculator-result-label">{lang.result.currency}</p>

              <UnderLine />

              <CalculatorCardResult style={{ padding: "15px" }}>
                {Object.keys(rates).map((currency, c) => (
                  <Row align="center" key={`currency-${currency}`}>
                    <Col span={12} className="currency">
                  <span
                    className="c-label sym"
                    dangerouslySetInnerHTML={{ __html: `${(currency === "EUR" ? "&#8364;" : "&#36;")}` }}
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
        </Col>
      </Row>
    )
  }

}

export default CarCustomsCalculator
