import React from "react"
import { isEqual } from "lodash"
import { Row, Col, Card, Form, Radio, Divider } from "antd"
import {
  ButtonSubmit,
  CalculatorDatePicker,
  CalculatorInput, CalculatorsCard,
  FormLabel,
  H1Styled,
  Label,
  TextStyled,
  UnderLine,
} from "./styled"
import VehicleCustoms from "../../calculators/VehicleCustoms"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import triple from "../../api/triple"

const firstRadioButtonStyles = {
  borderTopLeftRadius: "5px",
  borderBottomLeftRadius: "5px",
}
const lastRadioButtonStyles = {
  borderTopRightRadius: "5px",
  borderBottomRightRadius: "5px",
}

class CarCustomsCalculator extends React.Component {

  handleSubmit = () => {
    const { form, rates } = this.state
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
          calculated: false
        })

        console.log(err)
      });
  }

  reset = field => {
    const { form } = this.state

    if (form.hasOwnProperty(field))
      this.setField(field, VehicleCustoms.form[field])
  }

  constructor(props) {
    super(props)
    this.state = {
      form: { ...VehicleCustoms.form },
      result: { fee: null, tax: null, vat: null },
      rates: {},
      calculated: false,
    }
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
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

  componentDidMount() {
    this.getCBARates()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevState.form, this.state.form) && this.state.calculated) {
      this.handleSubmit()
    }
  }

  render() {
    const { lang } = this.props
    const { form, result, rates, calculated } = this.state

    return (
      <Row align="start" gutter={20}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <Row align="center" style={{ justifyContent: "space-between" }}>
            <div className="textSec">
              <H1Styled>{lang.title}</H1Styled>
              <TextStyled>{lang.paragraph}</TextStyled>
            </div>
          </Row>

          <CalculatorsCard bordered={false} style={{marginTop: '30px'}}>
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >
              {/*<Form.Item>*/}
              {/*  <Radio.Group*/}
              {/*    onChange={e => this.setField("imported", e.target.value)}*/}
              {/*    value={form.imported}*/}
              {/*  >*/}
              {/*    <Radio value={VehicleCustoms.COUNTRY_EEU}>*/}
              {/*      <Label style={{ textTransform: "none" }}>{lang.form["imported_eeu"]}</Label>*/}
              {/*    </Radio>*/}
              {/*    <Radio value={VehicleCustoms.COUNTRY_THIRD}>*/}
              {/*      <Label style={{ textTransform: "none" }}>{lang.form["imported_third"]}</Label>*/}
              {/*    </Radio>*/}
              {/*  </Radio.Group>*/}
              {/*</Form.Item>*/}

              <Form.Item>
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
              </Form.Item>

              <Form.Item label={<Label>{lang.form.year}</Label>}>
                <CalculatorDatePicker
                  onChange={date => this.setField("date", date)}
                  value={form.date}
                  placeholder={null}
                  allowClear={true}
                  format="DD.MM.YYYY"
                  size="large"
                />
              </Form.Item>

              <Form.Item label={<Label>{lang.form.price}</Label>}>
                <CalculatorInput
                  formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={v => v.replace(/\$\s?|(,*)/g, "")}
                  onChange={v => this.setField("price", v)}
                  value={form.price}
                  size="large"
                />

                <Radio.Group
                  onChange={e => this.setField("currency", e.target.value)}
                  style={{ marginLeft: "10px" }}
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
              </Form.Item>

              {form.person === VehicleCustoms.PERSON_LEGAL ?
                <Form.Item label={<Label>{lang.form.costs}</Label>}>
                  <CalculatorInput
                    formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={v => v.replace(/\$\s?|(,*)/g, "")}
                    onChange={v => this.setField("costs", v)}
                    value={form.costs}
                    size="large"
                  />
                </Form.Item>
              : null}

              <Form.Item label={<Label>{lang.form.capacity}</Label>}>
                <CalculatorInput
                  onChange={v => this.setField("capacity", v)}
                  value={form.capacity}
                  min={0}
                  size="large"
                />
              </Form.Item>

              <Form.Item style={{marginTop: '50px'}}>
                <ButtonSubmit htmlType="submit" shape="round" size="large">
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </CalculatorsCard>
        </Col>
        {console.log(this.props)}
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="result">
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
                    </span>
                  : null}

                  {(calculated && result[key].hasOwnProperty(form.currency) && form.currency !== 'AMD') ?
                    <span>
                      <span
                        className="currency-symbol"
                        style={{marginLeft: '14px'}}
                        dangerouslySetInnerHTML={{__html: '&#1423;'}}
                      />
                      {result[key]['AMD'].amount}
                    </span>
                  : null }
                </>
              }
            />,
          )}

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
    )
  }

}

export default CarCustomsCalculator
