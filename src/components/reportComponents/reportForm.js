/*eslint-disable */
import React, { useState, useEffect, useRef } from "react"
import {
  Form,
  Input,
  Tooltip,
  Select,
  Row,
  Col,
  Button,
  Spin
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
      offset: 0,
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
      span: 14,
      offset: 0,
    },
    lg: {
      span: 16,
      offset: 0,
    },
    md: {
      span: 18,
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
  return dateString
}

const ColAddress = styled(Col)`
  /* margin-top: 3.1%;
  @media (min-width: 768px) {
    margin-top: 5.5%;
    margin-left: 3%;
  }*/
  @media (min-width: 1024px) {
    margin-left: 9%;
  }
  @media (min-width: 1170px) {
    margin-left: 2.5%;
  }
  @media (min-width: 1300px) {
    margin-left: 0.2%;
  }
  @media (min-width: 1600px) {
    margin-left: 0.2%;
  } 
`
const ReportPassportRow = styled(Row)`
  width: 48.6%;
  @media (min-width: 768px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    width: 75%;
  }
  @media (min-width: 1170px) {
    width: 66%;
  }
  @media (min-width: 1366px) {
    width: 59%;
  }
  @media (min-width: 1600px) {
    width: 51%;
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
    margin-top: 10px;
    width: 290px;
    border: solid 1px #009db8;
  }
  @media (min-width: 375px) {
    margin-top: 10px;
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
    margin-left: 0%;
  }
  @media (min-width: 375px) {
    width: 290px;
    border: solid 1px #009db8;
    margin-top: 3%;
    margin-left: 0%;
  }
  @media (min-width: 768px) {
    width: 216px;
    border: solid 1px #009db8;
    margin-left: 3%;
  }
  @media (min-width: 1366px) {
    margin-left: 2.9%;
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
    width: 290px;
    margin-bottom: 20px;
  }
  @media (min-width: 375px) {
    width: 290px;
    margin-bottom: 20px;
  }
`
const LabelSpan = styled.span`
  width: auto;
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
  @media (min-width: 320px) {
    width: 290px;
  }
  @media (min-width: 375px) {
    width: 290px;
  }
  @media (min-width: 1170px) {
    width: 390px;
  }
`
let FormsLastVAluesObj = {}
const RegistrationForm = ({
  closeForm1,
  setConfirm2,
  SetAllFieldsValues,
  allFieldsValues,
  fillform,
}) => {
  const [form] = Form.useForm()
  const [loading, toggleLoading] = useState(true)
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
      res.data.data.length === 0 ? setTin(null) : setTin(res.data.data.tin)
      res.data.data.length === 0
        ? (form.setFieldsValue({
          tin: null,
        }))
        : form.setFieldsValue({
          tin: res.data.data.tin,
        })
      toggleLoading(false)

    } catch (e) {
      console.log("Calculation error: ", e)
    }
  }
  /*onSubmiting === OnFinish => values === fieldsValues*/
  const onFinish = values => {
    let body = {
      ...values,
      birthday: values["birthday"].format("YYYY-MM-DD"),
      when: values["when"].format("YYYY-MM-DD"),
      tin: tin === null ? form.getFieldValue('tin') : tin,
      identity_document_type,
    }
    FormsLastVAluesObj = body
    console.log("Received values of form: ", body)
    console.log("ldkfksldmfksdmf", FormsLastVAluesObj)
    updateFieldsState(body)
    try {
      toggleLoading(true)
      const res = apiHelper
        .post("/api/reports/car_sales_credential_pdf_download", body, {
          // responseType: "arraybuffer",
          headers: {
            Accept: 'application/pdf',
            "Content-Type": "multipart/form-data",
          },
        })
        .then(response => {

          // const blob = new Blob([response.data], {
          //   type: "application/pdf",
          // })
          // FileSaver.saveAs(blob, "լիազորագիր.pdf")
          // setConfirm2(true)
          // closeForm1(false)
          // toggleLoading(false)
        })
    } catch (e) {
      console.log("Error: ", e)
    }
  }

  /*calls onfill func after clicking in form2js back button,and gives as a parapmetr FormsLastVAluesObj*/
  useEffect(() => {
    {
      fillform ? onFill(FormsLastVAluesObj) : null
    }
  }, []);

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

  const onFill = obj => {
    console.log(obj)
    form.setFieldsValue({
      full_name: obj.full_name,
      city: obj.city,
      address: obj.address,
      identity_document_type: obj.identity_document_type,
      passport_series: obj.passport_series,
      when: obj.when,
      given: obj.given,
      ID_card_number: obj.ID_card_number,
      psn: obj.psn,
      birthday: obj.birthday,
      tin: obj.tin,
      phone: obj.phone,
      email: obj.email,
    })
    toggleLoading(false)
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        tin: FormsLastVAluesObj.tin,
        full_name: FormsLastVAluesObj.full_name,
        city: FormsLastVAluesObj.city,
        address: FormsLastVAluesObj.address,
        identity_document_type: FormsLastVAluesObj.identity_document_type,
        passport_series: FormsLastVAluesObj.passport_series,
        when: FormsLastVAluesObj.when,
        given: FormsLastVAluesObj.given,
        ID_card_number: FormsLastVAluesObj.ID_card_number,
        psn: FormsLastVAluesObj.psn,
        birthday: FormsLastVAluesObj.birthday,
        tin: FormsLastVAluesObj.tin,
        phone: FormsLastVAluesObj.phone,
        email: FormsLastVAluesObj.email,
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
      <Row>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 8, offset: 0 }}
          lg={{ span: 5, offset: 0 }}
          xl={{ span: 5, offset: 0 }}
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
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 9, offset: 1 }}
          lg={{ span: 6 }}
          xl={{ span: 6 }}
          xxl={{ span: 6 }}
        >
          <Form.Item
            name="address"
            label={<LabelSpan> </LabelSpan>}
            rules={[
              { required: false, message: "Խնդրում ենք լրացնել նշված դաշտերը" },
            ]}
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
        label={<LabelSpan>ՀՎՀՀ</LabelSpan>}
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
          disabled={loading}
          type="primary"
          htmlType="submit"
          id="registerSubmit"
        >
          {loading ? <Spin /> : "Հաստատել"}
        </Button>
        {/* <a download href={`http://triple-c-api.algorithm.am/api/carSalesCredentialPdfDownload/${FormsLastVAluesObj.full_name}${"/"}${FormsLastVAluesObj.city}${"/"}${FormsLastVAluesObj.address}${"/"}${FormsLastVAluesObj.passport_series}${"/"}${FormsLastVAluesObj.given}${"/"}${FormsLastVAluesObj.when}${"/"}${FormsLastVAluesObj.birthday}${"/"}${FormsLastVAluesObj.psn}${"/"}${FormsLastVAluesObj.tin}${"/"}${FormsLastVAluesObj.phone}${"/"}${FormsLastVAluesObj.email}`}>
          dfdsfsdf
        </a> */}
      </Form.Item>
    </Form >
  )
}

export default RegistrationForm
