import React from "react"
import { isNull, isEqual } from "lodash"
import { Row, Col, Card, Form, Radio } from "antd"
import SalaryCardResult from "./calcComponents/SalaryCardResult"
import { ButtonSubmit, FormLabel, Label, CalculatorInput, CalculatorSlider, UnderLine, CalculatorDatePicker } from "./styled"
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

    this.state = { form: { ...form }, tax: null, calculated: false }
  }

  /**
   * Car sell tax
   *
   * @returns {number|String}
   */
  get tax() {
    const {achievementDate, alienationDate, powerType, price, power} = this.state.form;

    let contractValue = price * 0.01
    let powerValue

    if (alienationDate && achievementDate && alienationDate.diff(achievementDate, "year") >= 1) {
      return 0
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

      this.setState({tax: this.tax}, () => {
        if (!this.state.calculated) {
          this.setState({calculated: true})
        }
      })
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(this.state.form, prevState.form) && this.state.calculated) {
      this.handleSubmit()
    }
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
                    <CalculatorDatePicker
                      onChange={date => this.setField("achievementDate", date)}
                      placeholder={null}
                      format="DD.MM.YYYY"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<Label>{lang.alienation}</Label>}>
                    <CalculatorDatePicker
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
                <CalculatorInput
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
                <CalculatorSlider
                  onChange={v => this.setField("price", v)}
                  value={form.price}
                  step={CAR_SELL_STEP}
                  min={CAR_SELL_MIN}
                  max={CAR_SELL_MAX}
                />
              </Form.Item>

              <Form.Item label={<Label>{lang.power}</Label>}>
                <CalculatorInput
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
          <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

          <UnderLine />

          <SalaryCardResult
            title={lang.tax_label}
            subtitle={tax === 0 ? lang.tax_body : ''}
            text={tax}
          />
        </Col>
      </Row>
    )
  }
}

export default CarSellCalculator
