import React from "react"
import { isEqual, isNull } from "lodash"
import { Col, Form, Radio, Row } from "antd"
import VehicleSell from "../../calculators/VehicleSell"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import {
  ButtonSubmit,
  CalculatorDatePicker,
  CalculatorInput,
  CalculatorsCard,
  CalculatorsCardWrapper,
  CurrencySymbol,
  FormLabel,
  Label,
  UnderLine,
  RowWrapper, RadioElementsWrapper,
} from "./styled"
import { isHoliday, isWeekend } from "./utilities/vacation"
import triple from "../../api/triple"
import moment from "moment"
import { randomString } from "./utilities/tabel"
import ReactDOM from "react-dom"



class CarSellCalculator extends React.Component {

  dateToPicker = React.createRef()

  dateFromPicker = React.createRef()

  constructor(props) {
    super(props)

    this.state = {
      form: { ...VehicleSell.form },
      tax: null,
      calculated: false,
      randomKey: randomString(),
    }
    this.holidays = []
    this.workdays = []
  }

  get text() {
    const { tax } = this.state

    if (isNull(tax)) {
      return ""
    }

    return tax > 0 ? tax : "text"
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

  fetchDays() {
    triple.get("/api/days")
      .then(res => {
        this.holidays = res.data.holidays
        this.workdays = res.data.workdays
      })
      .catch(err => console.log(err))
  }

  handleSubmit = () => {
    const { form } = this.state

    VehicleSell.schema.isValid(form).then(valid => {
      if (!valid) {
        this.setState({ tax: null })

        return
      }

      const calculator = new VehicleSell(form)
      const tax = calculator.calculate()

      this.setState({ tax }, () => {
        if (!this.state.calculated) {
          this.setState({ calculated: true })
        }
      })
    })
  }

  handlePickerRender(date, today, range) {
    const { form } = this.state
    const { locale } = this.props

    const condition = range === "start"
      && form.date && (date.isSameOrAfter(form.date, "day"))

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
        !condition
          ? "ant-picker-cell-inner ant-picker-cell-holiday"
          : "ant-picker-cell-inner"
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
        !condition
          ? "ant-picker-cell-inner ant-picker-cell-weekend"
          : "ant-picker-cell-inner"
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

  get defaultToDate() {
    const { achievementDate } = this.state.form

    return achievementDate ? moment(achievementDate) : null
  }

  handleDateFromInput = e => {
    const { value } = e.target

    if (!value) {
      this.setField("achievementDate", null)
      this.dateFromPicker.current.blur()
    }
  }

  handleDateToInput = e => {
    const { value } = e.target

    if (!value) {
      this.setField("alienationDate", null)
      this.dateToPicker.current.blur()
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(this.state.form, prevState.form) && this.state.calculated) {
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
    const { form, tax, randomKey } = this.state
    const { lang } = this.props

    return (
      <Row align="start" >
        <CalculatorsCardWrapper span={24} xl={16} gutter={20}>
          {/*<Row align="center" style={{justifyContent: 'space-between'}}>*/}
          {/*  <div className="textSec">*/}
          {/*    <H1Styled>{lang.title}</H1Styled>*/}
          {/*    <TextStyled>{lang.paragraph}</TextStyled>*/}
          {/*  </div>*/}
          {/*</Row>*/}

          <CalculatorsCard bordered={false} className="calculatorsCard">
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >
              <Row align="middle">
                <RowWrapper style={{ marginRight: "25px" }} label={<Label>{lang.achievement}</Label>}>
                  <CalculatorDatePicker
                    dateRender={(date, today) => this.handlePickerRender(date, today, "start")}
                    onChange={date => this.setField("achievementDate", date)}
                    placeholder={null}
                    key={randomKey}
                    format="DD.MM.YYYY"
                    size="large"
                    name="achievementDate"
                    ref={this.dateFromPicker}
                    allowClear={true}
                    defaultVaolue={form.achievementDate}
                    value={form.achievementDate}
                  />
                </RowWrapper>
                <RowWrapper label={<Label>{lang.alienation}</Label>}>
                  <CalculatorDatePicker
                    onChange={date => this.setField("alienationDate", date)}
                    dateRender={(date, today) => this.handlePickerRender(date, today, "end")}
                    disabledDate={d => !form.achievementDate || (d.isSameOrBefore(form.achievementDate, "day"))}
                    placeholder={null}
                    key={randomKey}
                    defaultPickerValue={this.defaultToDate}
                    ref={this.dateToPicker}
                    format="DD.MM.YYYY"
                    size="large"
                    name="alienationDate"
                    allowClear={true}
                    defaultVaolue={form.alienationDate}
                    value={form.alienationDate}
                  />
                </RowWrapper>

              </Row>
              <Row>
                <RowWrapper label={<Label>{lang.price}</Label>}>
                  <CalculatorInput
                    formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={v => v.replace(/\$\s?|(,*)/g, "")}
                    onChange={v => this.setField("price", v)}
                    value={form.price}
                    min={VehicleSell.MIN_PRICE}
                    size="large"
                  />
                  <CurrencySymbol>&#1423;</CurrencySymbol>
                </RowWrapper>
                <RadioElementsWrapper>
                  <RowWrapper className="radioElements" label={<Label>{lang.power}</Label>}>
                    <CalculatorInput
                      onChange={v => this.setField("power", v)}
                      style={{ marginRight: "10px" }}
                      value={form.power}
                      max={2000}
                      min={1}
                      size="large"
                      type="number"
                    />
                  </RowWrapper>
                  <Radio.Group
                    onChange={e => this.setField("powerType", e.target.value)}
                    value={form.powerType}
                  >
                    <Radio value={VehicleSell.HORSEPOWER}>
                      <Label style={{ textTransform: "none" }}>{lang.horsepower}</Label>
                    </Radio>
                    <Radio value={VehicleSell.KILOWATTS}>
                      <Label style={{ textTransform: "none" }}>{lang.kilowatts}</Label>
                    </Radio>
                  </Radio.Group>
                </RadioElementsWrapper>
              </Row>


              <Form.Item style={{ marginTop: "20px" }}>
                <ButtonSubmit
                  htmlType="submit"
                  shape="round"
                  size="large"
                >
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </CalculatorsCard>
        </CalculatorsCardWrapper>

        <Col span={20} xl={8} sm={10} className="result">
          <div className="sellResult carSell">
            <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

            <UnderLine />

            <CalculatorCardResult
              title={lang.tax_label}
              subtitle={tax === 0 ? lang.tax_body : ""}
              text={tax}
            />
          </div>
        </Col>
      </Row>
    )
  }
}

export default CarSellCalculator
