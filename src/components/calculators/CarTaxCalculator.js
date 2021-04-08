import React from "react"
import { isEqual } from "lodash"
import { Col, Form, Radio, Row, Select } from "antd"
import {
  ButtonSubmit,
  CalculatorDatePicker,
  CalculatorInput,
  CalculatorsCard,
  CalculatorsCardWrapper,
  CalculatorSelect,
  FormLabel,
  Label, RadioElementsWrapper, RowWrapper,
  UnderLine,
} from "./styled"
import VehicleTax from "../../calculators/VehicleTax"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import VehicleSell from "../../calculators/VehicleSell"
import ReactDOM from "react-dom"

class CarTaxCalculator extends React.Component {

  dateFromPicker = React.createRef()

  top = React.createRef()

  constructor(props) {
    super(props)

    this.state = {
      form: { ...VehicleTax.form },
      tax: null,
      calculated: false,
      check: false,
      width: typeof window !="undefined" && window.innerWidth <=768
    }
    this.availableYears = [2019, 2020, 2021]
  }

  get isTypeCar() {
    return this.state.form.taxType === VehicleTax.TAX_CAR
  }

  get isTypeRealEstate() {
    return this.state.form.taxType === VehicleTax.TAX_REAL_ESTATE
  }

  get isTypeRealEstate() {
    return this.state.form.taxType === VehicleTax.TAX_REAL_ESTATE
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
    this.props.getTaxType(this.state.form.taxType)
  }

  handleSubmit = () => VehicleTax.schema.isValid(this.state.form).then(valid => {
    if (!valid) {
      this.setState({ tax: null, calculator: false })

      return
    }

    const calculator = new VehicleTax(this.state.form)

    this.setState({
      tax: calculator.calculate(),
      calculated: true,
    })
  }).finally(() => {
    const { check, width} = this.state
    if(check && width){
      this.top.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    }
    this.setState((prevState) => ({
      ...prevState,
      check: false,
    }))
  })

  checkValue() {
    this.setState((prevState) => ({
      ...prevState,
      check: true,
    }))
  }

  changeTaxType() {
    const { estateType } = this.state.form
    if (estateType) {
      this.setField("estateType", null)
    }
  }

  handleDateFromInput = e => {
    const { value } = e.target

    if (!value) {
      this.setField("date", null)
      this.dateFromPicker.current.blur()
    }
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

  componentDidMount() {
    const { lang, getTitle } = this.props
    getTitle(lang.title)

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
    const { form, tax } = this.state

    return (
      <Row align="start" className="fixElement">
        <CalculatorsCardWrapper span={24} xl={16}>
          <CalculatorsCard bordered={false}>
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >

              {this.isTypeRealEstate &&
              <Form.Item style={{ display: "flex" }}>
                <CalculatorSelect
                  size="large"
                  value={form.year}
                  className={"yearSelect"}
                  onBlur={this.onBlur}
                  style={{ maxWidth: "424px", width: "90px" }}
                  onChange={value => this.setField("year", value, this.changeTaxType)}
                >
                  {this.availableYears.map(year =>
                    <Select.Option value={year} key={`vehicle-${year}`}>
                      {year}
                    </Select.Option>,
                  )}
                </CalculatorSelect>
              </Form.Item>
              }

              {/* type field */}
              <Form.Item label={<Label>{lang.form.type}</Label>} labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setField("taxType", e.target.value)}
                  value={form.taxType}
                >
                  <Radio className="inlineElements" value={VehicleTax.TAX_CAR}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.car}</Label>}
                  </Radio>
                  <Radio className="inlineElements" value={VehicleTax.TAX_REAL_ESTATE}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.realEstate}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>

              {this.isTypeCar ?
                <>
                  <Form.Item label={<Label>{lang.form.vehicle.title}</Label>}>
                    <CalculatorSelect
                      size="large"
                      value={form.type}
                      style={{ maxWidth: "400px" }}
                      onChange={value => this.setField("type", value)}
                    >
                      {VehicleTax.types(lang.form.vehicle).map(vehicle =>
                        <Select.Option value={vehicle.value} key={`vehicle-${vehicle.value}`}>
                          {vehicle.text}
                        </Select.Option>,
                      )}
                    </CalculatorSelect>
                  </Form.Item>

                  <RowWrapper label={<Label>{lang.form.year}</Label>}>
                    <CalculatorDatePicker
                      onChange={date => this.setField("date", date)}
                      value={form.date}
                      name={"date"}
                      ref={this.dateFromPicker}
                      placeholder={null}
                      picker="year"
                      size="large"
                    />
                  </RowWrapper>
                  <RadioElementsWrapper>
                    <RowWrapper className="radioElements" label={<Label>{lang.form.power}</Label>}>
                      <CalculatorInput
                        onChange={v => this.setField("power", v)}
                        style={{ marginRight: "10px" }}
                        value={form.power}
                        min={1}
                        size="large"
                        type="number"
                      />
                    </RowWrapper>
                    <Radio.Group
                      onChange={e => this.setField("powerType", e.target.value)}
                      value={form.powerType}
                      style={{marginBottom:"25px", display:"flex", alignItems:"center"}}
                    >
                      <Radio className="inlineElements" value={VehicleSell.HORSEPOWER}>
                        <Label style={{ textTransform: "none" }}>{lang.form.horsepower}</Label>
                      </Radio>
                      <Radio className="inlineElements" value={VehicleSell.KILOWATTS}>
                        <Label style={{ textTransform: "none" }}>{lang.form.kilowatts}</Label>
                      </Radio>
                    </Radio.Group>

                  </RadioElementsWrapper>
                </>
                : null
              }

              {this.isTypeRealEstate ?
                <>
                  <Form.Item label={<Label>{lang.form.estate.title}</Label>}>
                    <CalculatorSelect
                      size="large"
                      value={form.estateType}
                      style={{ maxWidth: "400px" }}
                      onChange={value => this.setField("estateType", value)}
                    >
                      {VehicleTax.estateTypes(lang.form.estate, form.year).map(vehicle =>
                        <Select.Option value={vehicle.value} key={`vehicle-${vehicle.value}`}>
                          {vehicle.text}
                        </Select.Option>,
                      )}
                    </CalculatorSelect>
                  </Form.Item>

                  <Form.Item label={<Label>{lang.form.estate.cadastralValue}</Label>}>
                    <CalculatorInput
                      onChange={v => this.setField("estateValue", v)}
                      style={{ marginRight: "10px" }}
                      value={form.estateValue}
                      min={1}
                      size="large"
                      type="number"
                    />
                  </Form.Item>
                </>
                : null}

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
        <Col span={20} xl={8} sm={10} className="result" ref={this.top}>
          <div className="taxResult carTax">
            <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

            <UnderLine />

            <CalculatorCardResult
              title={lang.result.tax}
              text={Math.round(tax)}
            />
          </div>
        </Col>
      </Row>
    )
  }
}

export default CarTaxCalculator
