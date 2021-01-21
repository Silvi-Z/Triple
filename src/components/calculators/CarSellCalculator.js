import React from "react"
import { isNull, isEqual } from "lodash"
import { Row, Col, Card, Form, Radio } from "antd"
import VehicleSell from "../../calculators/VehicleSell"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
<<<<<<< HEAD
import { ButtonSubmit, FormLabel, Label, CalculatorInput, UnderLine, CalculatorDatePicker } from "./styled"
=======
import {
  ButtonSubmit,
  FormLabel,
  Label,
  CalculatorInput,
  UnderLine,
  CalculatorDatePicker,
  H1Styled,
  TextStyled, CalculatorsCard,
} from "./styled"
>>>>>>> news-page


class CarSellCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { form: { ...VehicleSell.form }, tax: null, calculated: false }
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

    VehicleSell.schema.isValid(form).then(valid => {
      if (!valid) {
        this.setState({tax: null})

        return
      }
<<<<<<< HEAD

      const calculator = new VehicleSell(form)
      const tax = calculator.calculate()

=======

      const calculator = new VehicleSell(form)
      const tax = calculator.calculate()

>>>>>>> news-page
      this.setState({tax}, () => {
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
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <Row align="center" style={{justifyContent: 'space-between'}}>
            <div className="textSec">
              <H1Styled>{lang.title}</H1Styled>
              <TextStyled>{lang.paragraph}</TextStyled>
            </div>
          </Row>

          <CalculatorsCard bordered={false} className="calculatorsCard">
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >
              <Row gutter={10} align="middle">
                <Form.Item style={{marginRight: '25px'}} label={<Label>{lang.achievement}</Label>}>
                  <CalculatorDatePicker
                    onChange={date => this.setField("achievementDate", date)}
                    placeholder={null}
                    format="DD.MM.YYYY"
                    size="large"
                  />
                </Form.Item>
                <Form.Item label={<Label>{lang.alienation}</Label>}>
                  <CalculatorDatePicker
                    onChange={date => this.setField("alienationDate", date)}
                    disabledDate={d => !form.achievementDate || (d.isSameOrBefore(form.achievementDate, "day"))}
                    placeholder={null}
                    format="DD.MM.YYYY"
                    size="large"
                  />
                </Form.Item>
              </Row>

              <Form.Item label={<Label>{lang.price}</Label>}>
                <CalculatorInput
                  formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={v => v.replace(/\$\s?|(,*)/g, '')}
                  onChange={v => this.setField("price", v)}
                  value={form.price}
                  min={VehicleSell.MIN_PRICE}
                  size="large"
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
                  <Radio value={VehicleSell.HORSEPOWER}>
                    <Label style={{textTransform: "none"}}>{lang.horsepower}</Label>
                  </Radio>
                  <Radio value={VehicleSell.KILOWATTS}>
                    <Label style={{textTransform: "none"}}>{lang.kilowatts}</Label>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item style={{marginTop: '50px'}}>
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
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="result">
          <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

          <UnderLine />

          <CalculatorCardResult
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
