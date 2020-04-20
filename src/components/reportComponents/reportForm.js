/*eslint-disable */
import React, { useState } from "react"
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  InputNumber,
} from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { DatePicker } from "antd"
import * as Yup from "yup"
import { apiHelper } from "../../helpers/apiHelper"
//styled inputs with layout.css
import "../layout.css"
import styled from "styled-components"

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
]

const formItemLayout = {
  labelCol: {
    xxl: { span: 24 },
    xl: { span: 24 },
    lg: { span: 24 },
    xs: { span: 24 },
    md: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xxl: {
      span: 24,
      offset: 0,
    },
    lg: {
      span: 24,
      offset: 0,
    },
    md: {
      span: 24,
      offset: 0,
    },
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 8,
    },
  },
}
const tailFormButtonLayout = {
  wrapperCol: {
    xxl: {
      span: 24,
      offset: 0,
    },
    lg: {
      span: 24,
      offset: 0,
    },
    md: {
      span: 24,
      offset: 0,
    },
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
}
const validationSchema = Yup.object().shape({
  price: Yup.number()
    .required()
    .min(40000),
  bonus_price: Yup.number().transform(value => {
    if (value === 0 || value >= 1000) {
      return value
    } else {
      return null
    }
  }),
})
function getDate(date, dateString) {
  console.log(dateString)
}
const ColDistrict = styled(Col)`
  margin-top: 3.1%;
  @media (min-width: 320px) {
    margin-top: 14%;
  }
  @media (min-width: 375px) {
    margin-top: 12%;
  }
  @media (min-width: 768px) {
    margin-top: 5.5%;
    margin-left: 1%;
  }
  @media (max-width: 1024px) {
    margin-top: 4%;
    margin-left: 1%;
  }
  @media (min-width: 1170px) {
    margin-top: 3.7%;
    margin-left: 1%;
  }
  @media (min-width: 1300px) {
    margin-top: 3.3%;
    margin-left: 1%;
  }
  @media (min-width: 1600px) {
    margin-top: 2.3%;
    margin-left: 0.5%;
  }
`
const ColAddress = styled(Col)`
  margin-top: 3.1%;
  @media (min-width: 768px) {
    margin-top: 5.5%;
    margin-left: 3%;
  }
  @media (min-width: 1024px) {
    margin-top: 4%;
    margin-left: 3%;
  }
  @media (min-width: 1170px) {
    margin-top: 3.7%;
    margin-left: 1%;
  }
  @media (min-width: 1300px) {
    margin-top: 3.3%;
    margin-left: 6%;
  }
  @media (min-width: 1600px) {
    margin-top: 2.3%;
    margin-left: 3.2%;
  }
`
const ReportPassportRow = styled(Row)`
  width: 48.6%;
  @media (min-width: 768px) {
    width: 82.5%;
  }
  @media (min-width: 1024px) {
    width: 62%;
  }
  @media (min-width: 1170px) {
    width: 54%;
  }
  @media (min-width: 1366px) {
    width: 48.6%;
  }
  @media (min-width: 1600px) {
    width: 44%;
  }
`
const DatePickerCustom = styled(DatePicker)`
  width: 142px;
  height: 40px;
  border: solid 1px #009db8;
  @media (min-width: 320px) {
    width: 290px;
    border: solid 1px #009db8;
  }
  @media (min-width: 375px) {
    width: 290px;
    border: solid 1px #009db8;
  }
  @media (min-width: 768px) {
    width:  142px;
    border: solid 1px #009db8;
  }
`
const SelectCustom = styled(Select)`
  width: 116px;
  border: solid 1px #009db8;
  @media (min-width: 320px) {
    width: 138px;
    border: solid 1px #009db8;
  }
  @media (min-width: 375px) {
    width: 138px;
    border: solid 1px #009db8;
  }
  @media (min-width: 1300px) {
    width: 116px;
    border: solid 1px #009db8;
  }
  @media (min-width: 1600px) {
    width: 116px;
    border: solid 1px #009db8;
  }
`
const PassportButton = styled(Button)`
  height: 40px;
  
  @media (min-width: 320px) {
    width: 290px;
    border: solid 1px #009db8;
  }
  @media (min-width: 375px) {
    width: 290px;
    border: solid 1px #009db8;
  }
  @media (min-width: 768px) {
    width: 216px;
    border: solid 1px #009db8;
  }
`
const IdButton = styled(Button)`
  width: 216px;
  height: 40px;
  margin-top: 0.3%;
  margin-left: 1.1%;
  @media (min-width: 320px) {
    width: 290px;
    border: solid 1px #009db8;
  }
  @media (min-width: 375px) {
    width: 290px;
    border: solid 1px #009db8;
  }
  @media (min-width: 768px) {
    width: 216px;
    border: solid 1px #009db8;
  }
`
const RegistrationForm = ({ closeForm1, setConfirm2 }) => {
  const [form] = Form.useForm()
  const CheckPsn = async e => {
    let body = {
      psn: e.target.value,
    }
    try {
      let res = await apiHelper.post("/api/getTin", body)
      console.log("Response: ", res.data.data.tin)
      setTin(res.data.data.tin)
      let a = document.getElementById("register_tin")
      a.value = res.data.data.tin
      console.log(a)
    } catch (e) {
      console.log("Calculation error: ", e)
    }
  }

  const onFinish = async values => {
    let body = {
      ...values,
      birthday: values["birthday"].format("YYYY-MM-DD"),
      when: values["when"].format("YYYY-MM-DD"),
      tin: tin,
      identity_document_type,
    }
    console.log("Received values of form: ", body)
    try {
      const res = await apiHelper.post(
        "/api/reports/car_sales_credential_pdf_download",
        body
      )
      setConfirm2(true)
      closeForm1(false)
      console.log("Response: ", res)
    } catch (e) {
      console.log("Error: ", e)
    }
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">Երևան</Option>
        <Option value="87">Կենտրոն</Option>
      </Select>
    </Form.Item>
  )

  const [autoCompleteResult, setAutoCompleteResult] = useState([])
  const [checkPassport, setcheckPassport] = useState("0")
  const [checkId, setcheckId] = useState("1")
  const [identity_document_type, setidentity_document_type] = useState("0")
  const [tin, setTin] = useState("0")

  const openPassport = () => {
    setcheckPassport("0")
    setcheckId("1")
    setidentity_document_type("0")
  }
  const openId = () => {
    setcheckPassport("1")
    setcheckId("0")
    setidentity_document_type("1")
  }

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([])
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map(domain => `${value}${domain}`)
      )
    }
  }

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }))

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        tin: tin,
        prefix: "86",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="full_name"
        label="Անուն / Ազգանուն"
        rules={[
          {
            required: true,
            message: "Խնդրում ենք լրացնել նշված դաշտերը",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Row>
        <Col
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 10, offset: 0 }}
          md={{ span: 5, offset: 0 }}
          lg={{ span: 3, offset: 0 }}
          xl={{ span: 3, offset: 0 }}
          xxl={{ span: 2, offset: 0 }}
        >
          <Form.Item
            name="city"
            label="Բնակության հասցե"
            rules={[
              { required: true, message: "Խնդրում ենք լրացնել նշված դաշտերը" },
            ]}
          >
            <SelectCustom size="large" placeholder="Երևան">
              <Option value="Երևան">Երևան</Option>
              <Option value="Կենտրոն">Կենտրոն</Option>
            </SelectCustom>
          </Form.Item>
        </Col>
        <ColDistrict
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 10, offset: 0 }}
          md={{ span: 4, offset: 0 }}
          lg={{ span: 3, offset: 0 }}
          xl={{ span: 1, offset: 0 }}
          xxl={{ span: 1, offset: 0 }}
        >
          <Form.Item
            name="district"
            label=" "
            rules={[{ required: true, message: "Please input your Adress!" }]}
            noStyle
          >
            <SelectCustom size="large" placeholder="Կենտրոն">
              <Option value="Երևան">Երևան</Option>
              <Option value="Կենտրոն">Կենտրոն</Option>
            </SelectCustom>
          </Form.Item>
        </ColDistrict>
        <ColAddress
          xs={{ span: 24 }}
          sm={{ span: 22 }}
          md={{ span: 6 }}
          lg={{ span: 4 }}
          xl={{ span: 4 }}
          xxl={{ span: 3 }}
        >
          <Form.Item
            name="address"
            label=" "
            rules={[
              { required: true, message: "Խնդրում ենք լրացնել նշված դաշտերը" },
            ]}
            noStyle
          >
            <Input style={{ width: "80%" }} size="large" />
          </Form.Item>
        </ColAddress>
      </Row>
      <Form.Item
        {...tailFormButtonLayout}
        style={{ display: "flex" }}
        label="Ընտրել անձը հաստատող փաստաթղթի տեսակը"
      >
        <PassportButton
          type={checkPassport === "0" ? "primary" : "default"}
          onClick={() => openPassport()}
        >
          Անձնագիր
        </PassportButton>
        <IdButton
          type={checkId === "1" ? "default" : "primary"}
          onClick={() => openId()}
        >
          Նույնականացման քարտ
        </IdButton>
      </Form.Item>
      {checkPassport === "0" ? (
        <ReportPassportRow>
          <Col xs={18} sm={18} md={6} lg={6} xl={6} xxl={5}>
            <Form.Item
              name="passport_series"
              label={<span>Անձնագրի սերիա</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your right number!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={5}>
            <Form.Item
              name="given"
              label={<span>Տրված է ում կողմից</span>}
              rules={[
                {
                  required: true,
                  message: "Խնդրում ենք լրացնել նշված դաշտերը",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8} lg={6} xl={6} xxl={5}>
            <Form.Item
              name="when"
              label="Երբ"
              rules={[
                {
                  required: true,
                  message: "Խնդրում ենք լրացնել նշված դաշտերը",
                },
              ]}
            >
              <DatePickerCustom
                onChange={getDate}
                placeholder={new Date("December 25, 1995 23:15:30")}
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
        </ReportPassportRow>
      ) : (
          <Row>
            <Col lg={8}>
              <Form.Item
                name="ID_card_number"
                label={<span>Նույնականացման քարտ թվեր</span>}
                rules={[
                  {
                    required: true,
                    message: "Խնդրում ենք լրացնել նշված դաշտերը",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        )}
      <Form.Item
        name="birthday"
        label="Ծննդյան օր/ամսի/տարեթիվ"
        rules={[
          { required: true, message: "Խնդրում ենք լրացնել նշված դաշտերը" },
        ]}
      >
        <DatePickerCustom
          onChange={getDate}
          placeholder={new Date("December 25, 1995 23:15:30")}
          format="DD-MM-YYYY"
        />
      </Form.Item>
      <Form.Item
        name="psn"
        label={<span>ՀԾՀ</span>}
        rules={[
          {
            required: true,
            message: "Խնդրում ենք լրացնել նշված դաշտերը",
            whitespace: true,
          },
        ]}
      >
        <Input onChange={CheckPsn} />
      </Form.Item>
      <Form.Item
        name="tin"
        label={<span>ՀՎՀՀ</span>}
        rules={[
          {
            required: true,
            message: "Խնդրում ենք լրացնել նշված դաշտերը",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Հեռախոսահամար"
        rules={[
          {
            required: true,
            message: "Խնդրում ենք լրացնել նշված դաշտերը",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label={
          <span>
            Email&nbsp;
            <Tooltip title="Խնդրում ենք լրացնել ակտիվ էլ․ հասցե։ Հետագա զարգացումների մասին տեղեկացվելու եք էլ․ հասցեի միջոցով։">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            type: "email",
            message: "Խնդրում ենք ճիշտ լրացնել նշված դաշտերը",
          },
          {
            required: true,
            message: "Խնդրում ենք լրացնել նշված դաշտերը",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" id="registerSubmit">
          Հաստատել
        </Button>
      </Form.Item>
      {/* <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                "The two passwords that you entered do not match!"
                            )
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item> */}

      {/* <Form.Item
                name="residence"
                label="Habitual Residence"
                rules={[
                    {
                        type: "array",
                        required: true,
                        message: "Please select your habitual residence!",
                    },
                ]}
            >
                <Cascader options={residences} />
            </Form.Item> */}
      {/* <Form.Item
                name="website"
                label="Website"
                rules={[{ required: true, message: "Please input website!" }]}
            >
                <AutoComplete
                    options={websiteOptions}
                    onChange={onWebsiteChange}
                    placeholder="website"
                >
                    <Input />
                </AutoComplete>
            </Form.Item> */}

      {/* <Form.Item
                label="Captcha"
                extra="We must make sure that your are a human."
            >
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name="captcha"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the captcha you got!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Button>Get captcha</Button>
                    </Col>
                </Row>
            </Form.Item> */}

      {/* <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject("Should accept agreement"),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item> */}
    </Form>
  )
}

export default RegistrationForm
