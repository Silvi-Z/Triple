import React from "react"
import { isNull } from "lodash"
import { Row, Col, Card, Form, Radio } from "antd"
import SalaryCardResult from "./calcComponents/SalaryCardResult"
import { ButtonSubmit, FormLabel, Label, SalaryInput, SalarySlider, VacationDatePicker } from "./styled"
import { schema, ENGINE_HORSEPOWER, ENGINE_KILOWATTS, CAR_SELL_MIN, CAR_SELL_MAX, CAR_SELL_STEP } from "./utilities/carsell"

const form = {
  achievementDate: null,
  alienationDate: null,
  price: null,
  power: null,
  powerType: ENGINE_HORSEPOWER
}

class CarSellCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { form: { ...form }, tax: null }
  }

  get tax() {
    const {achievementDate, alienationDate, powerType, price, power} = this.state.form;

    let contractValue = price * 0.01
    let powerValue

    if (achievementDate.diff(alienationDate, 'year')) {
      return 0;
    }

    if (powerType === ENGINE_HORSEPOWER) {
      powerValue = power * 150;
    }

    if (powerType === ENGINE_KILOWATTS) {
      powerValue = power * 1.36
    }

    return contractValue > powerValue ? contractValue : powerValue;
  }

  get text() {
    const { tax } = this.state;

    if (isNull(tax)) {
      return ''
    }

    return tax > 0 ? tax : 'text'
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  handleSubmit = () => {
    const { form } = this.state;

    schema.isValid(form).then(valid => {
      if (!valid) return

      this.setState({tax: this.tax})
    })
  }

  render() {
    const { form, tax } = this.state;
    const { lang } = this.props;

    return (
      <Row align="start" gutter={20}>
        <Col span={16}>
          <Row align="center" style={{justifyContent: 'space-between'}}>
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
              <Row gutter={10} align="middle">
                <Col span={12}>
                  <Form.Item label={<Label>{lang.achievement}</Label>}>
                    <VacationDatePicker
                      onChange={date => this.setField("achievementDate", date)}
                      placeholder={null}
                      format="DD.MM.YYYY"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<Label>{lang.alienation}</Label>}>
                    <VacationDatePicker
                      onChange={date => this.setField("alienationDate", date)}
                      disabledDate={d => !form.achievementDate || (d.isSameOrBefore(form.achievementDate, "day"))}
                      placeholder={null}
                      format="DD.MM.YYYY"
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label={<Label>{lang.price}</Label>}>
                <SalaryInput
                  ormatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={v => this.setField("price", v)}
                  value={form.price}
                  min={CAR_SELL_MIN}
                  size="large"
                  type="number"
                />
              </Form.Item>

              <Form.Item>
                <SalarySlider
                  onChange={v => this.setField("price", v)}
                  value={form.price}
                  step={CAR_SELL_STEP}
                  min={CAR_SELL_MIN}
                  max={CAR_SELL_MAX}
                />
              </Form.Item>

              <Form.Item label={<Label>{lang.power}</Label>}>
                <SalaryInput
                  onChange={v => this.setField("power", v)}
                  style={{marginRight: "10px"}}
                  value={form.power}
                  max={2000}
                  min={1}
                  size="large"
                  type="number"
                />

                <Radio.Group
                  onChange={e => this.setField("powerType", e.target.value)}
                  value={form.powerType}
                >
                  <Radio value={ENGINE_HORSEPOWER}>
                    <Label style={{textTransform: "none"}}>{lang.horsepower}</Label>
                  </Radio>
                  <Radio value={ENGINE_KILOWATTS}>
                    <Label style={{textTransform: "none"}}>{lang.kilowatts}</Label>
                  </Radio>
                </Radio.Group>
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

        <Col span={8}>
          <SalaryCardResult
            title={lang.tax_label}
            text={tax > 0 ? tax : 'text'}
          />
        </Col>
      </Row>
    )
  }
}

export default CarSellCalculator