import React from "react"
import moment from "moment"
import { isEqual } from "lodash"
import { Card, Col, Form, Row, Select } from "antd"
import { CalculatorDatePicker, CalculatorSelect, CalculatorInput, ButtonSubmit, FormLabel, UnderLine, Label } from "./styled"
import Vehicle from "../../calculators/Vehicle"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"

class CarTaxCalculator extends React.Component {
  get yearValue() {
    const { year } = this.state.form

    year ? moment({year}) : null
  }

  constructor(props) {
    super(props)

    this.state = { form: { ...Vehicle.form }, tax: null, calculated: false }
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  handleSubmit = () => Vehicle.schema.isValid(this.state.form).then(valid => {
    if (!valid) {
      this.setState({tax: null, calculator: false})

      return
    }

    const calculator = new Vehicle(this.state.form)

    this.setState({
      tax: calculator.calculateTax(),
      calculated: true
    })
  })

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevState.form, this.state.form) && this.state.calculated) {
      this.handleSubmit()
    }
  }

  render() {
    const { lang } = this.props
    const { form, tax } = this.state

    return (
      <Row align="start" gutter={20}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
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
              <Form.Item label={<Label>{lang.form.vehicle.title}</Label>}>
                <CalculatorSelect
                  size="large"
                  value={form.vehicle}
                  style={{maxWidth:'424px'}}
                  onChange={value => this.setField("vehicle", value)}
                >
                  {Vehicle.vehicles(lang.form.vehicle).map(vehicle =>
                    <Select.Option value={vehicle.value} key={`vehicle-${vehicle.value}`}>
                      {vehicle.text}
                    </Select.Option>
                  )}
                </CalculatorSelect>
              </Form.Item>

              <Form.Item label={<Label>{lang.form.year}</Label>}>
                <CalculatorDatePicker
                  onChange={date => this.setField("year", date ? +date.format('YYYY') : date)}
                  value={this.yearValue}
                  placeholder={null}
                  picker="year"
                  size="large"
                />
              </Form.Item>

              <Form.Item label={<Label>{lang.form.power}</Label>}>
                <CalculatorInput
                  onChange={v => this.setField("power", v)}
                  style={{ marginRight: "10px" }}
                  value={form.power}
                  max={2000}
                  min={1}
                  size="large"
                  type="number"
                />

                <Label style={{ textTransform: "none" }}>
                  {lang.form.horsepower}
                </Label>
              </Form.Item>

              <Form.Item>
                <ButtonSubmit
                  htmlType="submit"
                  shape="round"
                  size="large"
                >
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

          <UnderLine />

          <CalculatorCardResult
            title={lang.result.tax}
            text={tax}
          />
        </Col>
      </Row>
    )
  }
}

export default CarTaxCalculator
