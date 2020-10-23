import React from "react"
import moment from "moment"
import { isEqual } from "lodash"
import { Row, Col, Card, Form, Radio, Space, Select } from "antd"
import { ButtonSubmit, CalculatorDatePicker, CalculatorInput, CalculatorSelect, FormLabel, Label, UnderLine } from "./styled"
import { euroTo, calculate, currencies, COUNTRY_EEU, COUNTRY_THIRD, PERSON_LEGAL, PERSON_PHYSICAL } from "./utilities/carcutom"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import triple from "../../api/triple"

moment.locale('ru')

const firstRadioButtonStyles = {
  borderTopLeftRadius: "5px",
  borderBottomLeftRadius: "5px"
}
const lastRadioButtonStyles = {
  borderTopRightRadius: "5px",
  borderBottomRightRadius: "5px"
}
const form = {
  imported: COUNTRY_THIRD,
  person: PERSON_PHYSICAL,
  currency: 'EUR',
  date: null,
  capacity: null,
  price: null,
}

class CarCustomsCalculator extends React.Component {
  handleSubmit = () => {
    const { form, rates } = this.state

    const result = calculate(form, rates)

    this.setState({result: {...result}, calculated: true})
  }

  constructor(props) {
    super(props)

    this.state = {
      form: { ...form },
      result: {fee: null, tax: null, vat: null},
      rates: {},
      convert: "EUR",
      calculated: false
    }
  }

  get convertedResult() {
    const { convert, rates } = this.state
    const { fee, tax, vat } = this.state.result

    return {
      fee: euroTo({amount: fee, currency: convert}, rates),
      tax: euroTo({amount: tax, currency: convert}, rates),
      vat: euroTo({amount: vat, currency: convert}, rates),
    }
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  getCBARates() {
    if (this.state.rates.length) return

    const rates = {}
    const config = { params: { filters: ['USD', 'EUR'] } }

    triple.get('/api/rates/last', config)
      .then(res => {
        Object.values(res.data.rates).forEach(rate => rates[rate["ISO"]] = Number(rate["Rate"]))

        this.setState({rates})
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getCBARates()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(prevState.form, this.state.form) && this.state.calculated) {
      this.handleSubmit();
    }
  }

  render() {
    const { lang } = this.props
    const { form, result, convert } = this.state

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
              <Form.Item>
                <Radio.Group
                  onChange={e => this.setField("imported", e.target.value)}
                  value={form.imported}
                >
                  <Radio value={COUNTRY_EEU}>
                    <Label style={{ textTransform: "none" }}>{lang.form.imported_eeu}</Label>
                  </Radio>
                  <Radio value={COUNTRY_THIRD}>
                    <Label style={{ textTransform: "none" }}>{lang.form.imported_third}</Label>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Radio.Group
                  onChange={e => this.setField("person", e.target.value)}
                  value={form.person}
                >
                  <Radio value={PERSON_PHYSICAL}>
                    <Label style={{ textTransform: "none" }}>{lang.form.person_physical}</Label>
                  </Radio>
                  <Radio value={PERSON_LEGAL}>
                    <Label style={{ textTransform: "none" }}>{lang.form.person_legal}</Label>
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
                  formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={v => this.setField("price", v)}
                  value={form.price}
                  size="large"
                />

                <Radio.Group
                  onChange={e => this.setField('currency', e.target.value)}
                  style={{ marginLeft: '10px'}}
                  value={form.currency}
                  buttonStyle="solid"
                  size="large"
                >
                  <Radio.Button style={firstRadioButtonStyles} value="EUR">
                    <strong>&#8364;</strong>
                  </Radio.Button>
                  <Radio.Button value="USD">
                    <strong>&#36;</strong>
                  </Radio.Button>
                  <Radio.Button style={lastRadioButtonStyles} value="AMD">
                    <strong>&#1423;</strong>
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item label={<Label>{lang.form.capacity}</Label>}>
                <CalculatorInput
                  onChange={v => this.setField("capacity", v)}
                  value={form.capacity}
                  min={0}
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <ButtonSubmit htmlType="submit" shape="round" size="large">
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <FormLabel style={{ margin: 0 }}>
            <Space align="center">
              {lang.result.title}

              <CalculatorSelect
                size="large"
                value={convert}
                onChange={value => this.setState({ convert: value })}
              >
                {currencies.map(currency=> (
                  <Select.Option value={currency.value} key={`currency-${currency.value}`}>
                    <span dangerouslySetInnerHTML={{__html: `${currency.text + ' ' + currency.sym}`}}/>
                  </Select.Option>
                ))}
              </CalculatorSelect>
            </Space>
          </FormLabel>

          <UnderLine />

          <CalculatorCardResult
            title={lang.result.fee}
            text={this.convertedResult.fee}
          />

          { result.vat ? <CalculatorCardResult
            title={lang.result.vat}
            text={this.convertedResult.vat}
          /> : null}

          <CalculatorCardResult
            title={lang.result.tax}
            text={this.convertedResult.tax}
          />
        </Col>
      </Row>
    )
  }
}

export default CarCustomsCalculator
