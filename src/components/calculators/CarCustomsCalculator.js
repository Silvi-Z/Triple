import React from "react"
import moment from "moment"
import { Card, Col, Form, Radio, Row } from "antd"
import { ButtonSubmit, CalculatorDatePicker, CalculatorInput, FormLabel, Label, UnderLine, } from "./styled"
import { calculate, COUNTRY_EEU, COUNTRY_THIRD, PERSON_LEGAL, PERSON_PHYSICAL } from "./utilities/carcutom"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"

moment.locale('ru')

const form = {
  imported: COUNTRY_THIRD,
  person: PERSON_PHYSICAL,
  date: null,
  capacity: null,
  price: null,
}

class CarCustomsCalculator extends React.Component {
  handleSubmit = () => {
    const result = calculate(this.state.form)

    this.setState({result: {...result}, calculated: true})
  }

  constructor(props) {
    super(props)

    this.state = { form: { ...form }, result: {fee: null, tax: null, vat: null}, calculated: false }
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  render() {
    const { lang } = this.props
    const { form, result } = this.state

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
          <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

          <UnderLine />

          <CalculatorCardResult
            title={lang.result.fee}
            text={result.fee}
          />

          { result.vat ? <CalculatorCardResult
            title={lang.result.vat}
            text={result.vat}
          /> : null}

          { result.tax ? <CalculatorCardResult
              title={lang.result.tax}
              text={result.tax}
            /> : null}
        </Col>
      </Row>
    )
  }
}

export default CarCustomsCalculator
