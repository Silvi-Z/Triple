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
  Spin,
  InputNumber,
} from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { DatePicker } from "antd"
import * as Yup from "yup"
import { apiHelper } from "../../helpers/apiHelper"
import axios from "axios"
import FileSaver from "file-saver"
//styled inputs with layout.css
import "../layout.css"
import styled from "styled-components"

const { Option } = Select

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
      span: 8,
      offset: 0,
    },
    xl: {
      span: 12,
      offset: 0,
    },
    lg: {
      span: 10,
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

function getDate(date, dateString) {
  console.log(dateString)
}

const ColAddress = styled(Col)`
  margin-top: 3.1%;
  @media (min-width: 768px) {
    margin-top: 5.5%;
    margin-left: 3%;
  }
  @media (min-width: 1024px) {
    margin-top: 4%;
    margin-left: 1%;
  }
  @media (min-width: 1170px) {
    margin-top: 3.6%;
    margin-left: 2.5%;
  }
  @media (min-width: 1300px) {
    margin-top: 3.2%;
    margin-left: 1%;
  }
  @media (min-width: 1500px) {
    margin-top: 3%;
    margin-left: 1%;
  }
  @media (min-width: 1600px) {
    margin-top: 2.3%;
    margin-left: 1%;
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
  @media (min-width: 1500px) {
    width: 44.6%;
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
    width: 142px;
    border: solid 1px #009db8;
  }
`
const SelectCustom = styled(Select)`
  width: 216px;
  border: solid 1px #009db8;
  background: white;
  @media (min-width: 320px) {
    width: 138px;
    border: solid 1px #009db8;
  }
  @media (min-width: 375px) {
    width: 138px;
    border: solid 1px #009db8;
  }
  @media (min-width: 1300px) {
    width: 200px;
    border: solid 1px #009db8;
  }
  @media (min-width: 1600px) {
    width: 216px;
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
  margin-left: 2.7%;
  @media (min-width: 320px) {
    width: 290px;
    border: solid 1px #009db8;
    margin-top: 3%;
  }
  @media (min-width: 375px) {
    width: 290px;
    border: solid 1px #009db8;
    margin-top: 3%;
  }
  @media (min-width: 768px) {
    width: 216px;
    border: solid 1px #009db8;
  }
  @media (min-width: 1366px) {
    margin-left: 2.6%;
  }
  @media (min-width: 1900px) {
    margin-left: 2.6%;
  }
`
const SubmitSpan = styled.span`
  width: 408px;
  height: 31px;
  font-family: ArialAMU;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media (min-width: 320px) {
    margin-bottom: 5%;
  }
  @media (min-width: 375px) {
    width: 400px;
    margin-bottom: 10%;
  }

`
const LabelSpan = styled.span`
  height: 14px;
  font-family: ArialAMU;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`
const RegistrationForm = ({
  closeForm1,
  setConfirm2,
  SetAllFieldsValues,
  allFieldsValues,
}) => {
  const [form] = Form.useForm()
  const [loading, toggleLoading] = useState(false)
  const [checkPassport, setcheckPassport] = useState("0")
  const [checkId, setcheckId] = useState("1")
  const [identity_document_type, setidentity_document_type] = useState("0")
  const [tin, setTin] = useState(" ")

  /*Updating parent state*/
  const updateFieldsState = obj => {
    SetAllFieldsValues({ ...allFieldsValues, ...obj })
  }
  /*get Tin from Api according to Psn*/
  const CheckPsn = async e => {
    let body = {
      psn: e.target.value,
    }
    try {
      let res = await apiHelper.post("/api/getTin", body)
      console.log("Response: ", res)
      res.data.data.length === 0 ? setTin(null) : setTin(res.data.data.tin)
      let tinInput = document.getElementById("register_tin")
      res.data.data.length === 0
        ? (tinInput.value = null)
        : (tinInput.value = res.data.data.tin)
      console.log(tinInput.value)
    } catch (e) {
      console.log("Calculation error: ", e)
    }
  }
  /*onSubmiting === OnFinish => values === fieldsValues*/
  const onFinish = async values => {
    console.log("hjbjhbhj")
    let body = {
      ...values,
      birthday: values["birthday"].format("YYYY-MM-DD"),
      when: values["when"].format("YYYY-MM-DD"),
      tin: tin,
      identity_document_type,
    }
    console.log("Received values of form: ", body)
    updateFieldsState(body)
    try {
      toggleLoading(true)
      const res = await apiHelper
        .post("/api/reports/car_sales_credential_pdf_download", body, {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/pdf",
          },
        })
        .then(response => {
          const blob = new Blob([response.data], {
            type: "application/pdf",
          })
          FileSaver.saveAs(blob, "լիազորագիր.pdf")
          setConfirm2(true)
          closeForm1(false)
          toggleLoading(false)
        })
    } catch (e) {
      console.log("Error: ", e)
    }
  }

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

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        tin: tin,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="full_name"
        label={<LabelSpan>Անուն / Ազգանուն</LabelSpan>}
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
      <Row style={{width: "100%"}}>
        <Col
          xs={{ span: 21, offset: 0 }}
          sm={{ span: 22, offset: 0 }}
          md={{ span: 6, offset: 0 }}
          lg={{ span: 4, offset: 0 }}
          xl={{ span: 4, offset: 0 }}
          xxl={{ span: 3, offset: 0 }}
        >
          <Form.Item
            name="city"
            label={<LabelSpan>Բնակության վայրի հասցե</LabelSpan>}
            rules={[
              { required: true, message: "Խնդրում ենք լրացնել նշված դաշտերը" },
            ]}
          >
            <SelectCustom size="large" placeholder="Երևան" bordered={false}>
              <Option value="Երևան">Երևան</Option>
              <Option value="Շիրակ">Շիրակ</Option>
              <Option value="Արագածոտն">Արագածոտն</Option>
              <Option value="Արարատ">Արարատ</Option>
              <Option value="Գեղարքունիք">Գեղարքունիք</Option>
              <Option value="Լոռի">Լոռի</Option>
              <Option value="Կոտայք">Կոտայք</Option>
              <Option value="Սյունիք">Սյունիք</Option>
              <Option value="Վայոց ձոր">Վայոց ձոր</Option>
              <Option value="Տավուշ">Տավուշ</Option>
            </SelectCustom>
          </Form.Item>
        </Col>
        <ColAddress
          xs={{ span: 21 }}
          sm={{ span: 22 }}
          md={{ span: 6 }}
          lg={{ span: 5 }}
          xl={{ span: 5 }}
          xxl={{ span: 4 }}
        >
          <Form.Item
            name="address"
            label=" "
            rules={[
              { required: true, message: "Խնդրում ենք լրացնել նշված դաշտերը" },
            ]}
            noStyle
          >
            <Input />
          </Form.Item>
        </ColAddress>
      </Row>
      <Form.Item
        {...tailFormButtonLayout}
        label={<LabelSpan>Ընտրել անձը հաստատող փաստաթղթի տեսակը</LabelSpan>}
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
              label={<LabelSpan>Անձնագրի սերիա</LabelSpan>}
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
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={5}>
            <Form.Item
              name="given"
              label={<LabelSpan>Տրված է ում կողմից</LabelSpan>}
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
              label={<LabelSpan>Երբ</LabelSpan>}
              rules={[
                {
                  required: true,
                  message: "Խնդրում ենք լրացնել նշված դաշտերը",
                },
              ]}
            >
              <DatePickerCustom
                onChange={getDate}
                placeholder="Դեկտեմբեր 25, 1995 23:15:30"
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
                label={<LabelSpan>Նույնականացման քարտ</LabelSpan>}
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
        label={<LabelSpan>Ծննդյան օր/ամսի/տարեթիվ</LabelSpan>}
        rules={[
          { required: true, message: "Խնդրում ենք լրացնել նշված դաշտերը" },
        ]}
      >
        <DatePickerCustom
          onChange={getDate}
          placeholder="Դեկտեմբեր 25, 1995 23:15:30"
          format="DD-MM-YYYY"
        />
      </Form.Item>
      <Form.Item
        name="psn"
        label={<LabelSpan>ՀԾՀ</LabelSpan>}
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
        label={<LabelSpan>ՀՎՀՀ *</LabelSpan>}
        rules={[
          {
            required: tin === null ? true : false,
            message:
              "Ձեր նշած ՀԾՀին համապատասխան ՀՎՀՀ չի գտնվել, խնդրում ենք լրացնել այն",
            whitespace: tin === null ? true : false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label={<LabelSpan>Հեռախոսահամար</LabelSpan>}
        rules={[
          {
            required: true,
            message: "Խնդրում ենք լրացնել նշված դաշտերը",
          },
        ]}
      >
        <Input placeholder="+374 93 00 00 00" />
      </Form.Item>
      <Form.Item
        name="email"
        label={
          <span>
            Էլ. Հասցե &nbsp;
            <Tooltip title="Խնդրում ենք լրացնել ակտիվ էլ․ հասցե։ Հետագա զարգացումների մասին տեղեկացվելու եք էլ․ հասցեի միջոցով։">
              <QuestionCircleOutlined style={{ color: "#009db8" }} />
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
      <Form.Item
        label={
          <SubmitSpan>
            Հաստատել կոճակը սեղմելուց հետո լիազորագիրը կներբեռնվի։ Խնդրում ենք
            ստորագրել և վերբեռնել հաջորդ քայլում։
          </SubmitSpan>
        }
        {...tailFormItemLayout}
      >
        <Button
          disabled={loading || tin === " "}
          type="primary"
          htmlType="submit"
          id="registerSubmit"
        >
          {loading ? <Spin /> : "Հաստատել"}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegistrationForm
