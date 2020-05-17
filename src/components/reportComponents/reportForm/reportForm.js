/*eslint-disable */
import React, { useState, useEffect, useRef } from "react"
import { Form, Input, Tooltip, Select, Row, Col, Button, Spin } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { apiHelper } from "../../../helpers/apiHelper"
import FileSaver from "file-saver"
//styled inputs with layout.css
import "../../layout.css"
import {
  ColAddress,
  ReportPassportRow,
  DatePickerCustom,
  SelectCustom,
  PassportButton,
  IdButton,
  SubmitSpan,
  LabelSpan,
} from "./reportFormStyle.js"
import { getActiveElement } from "formik"
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

const RegistrationForm = ({
  closeForm1,
  setConfirm2,
  SetAllFieldsValues,
  allFieldsValues,
  fillform,
}) => {
  const [form] = Form.useForm()
  const [loading, toggleLoading] = useState(false)
  const [checkPassport, setcheckPassport] = useState(0)
  const [checkId, setcheckId] = useState(1)
  const [identity_document_type, setidentity_document_type] = useState(0)
  const [tin, setTin] = useState(" ")
  const [FieldValuesObj, setFieldValuesObj] = useState({})
  let prevState = {}
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
      toggleLoading(true)
      let res = await apiHelper.post("/api/getTin", body)
      res.data.data.length === 0 ? setTin(null) : setTin(res.data.data.tin)
      res.data.data.length === 0
        ? form.setFieldsValue({
          tin: null,
        })
        : form.setFieldsValue({
          tin: res.data.data.tin,
        })
      toggleLoading(false)
    } catch (e) {
      console.log("Calculation error: ", e)
    }
  }
  /*onSubmiting === OnFinish => values === fieldsValues*/
  const onFinish = e => {
    let values = form.getFieldsValue("register")
    let body
    values.hasOwnProperty("when")
      ? ((body = {
        ...values,
        birthday: values["birthday"].format("YYYY-MM-DD"),
        when: values["when"].format("YYYY-MM-DD"),
        tin: tin === null ? form.getFieldValue("tin") : tin,
        phone: "+" + values["phone"],
        identity_document_type,
      }),
        setFieldValuesObj({ ...body }))
      : ((body = {
        ...values,
        birthday: values["birthday"].format("YYYY-MM-DD"),
        tin: tin === null ? form.getFieldValue("tin") : tin,
        phone: "+" + values["phone"],
        identity_document_type,
      }),
        delete body["passport_series"],
        delete body["given"],
        delete body["when"],
        setFieldValuesObj({ ...body }))

    console.log("Received values of form: ", body)
    prevState = body
    console.log("Received values of prevstate: ", prevState)
    try {
      toggleLoading(true)
      if (body.hasOwnProperty("when")) {
        const res = apiHelper
          .get(
            "http://triple-c-api.algorithm.am/api/carSalesCredentialPdfDownload?full_name=" +
            body.full_name +
            "&city=" +
            body.city +
            "&address=" +
            body.address +
            "&passport_series=" +
            body.passport_series +
            "&given=" +
            body.given +
            "&when=" +
            body.when +
            "&birthday=" +
            body.birthday +
            "&psn=" +
            body.psn +
            "&tin=" +
            body.tin +
            "&phone=" +
            body.phone +
            "&email=" +
            body.email +
            "&identity_document_type=" +
            body.identity_document_type
          )
          .then(
            response => {
              console.log(response)
              updateFieldsState(body)
              toggleLoading(false)
              let RequestHref =
                "http://triple-c-api.algorithm.am/api/carSalesCredentialPdfDownload?full_name=" +
                body.full_name +
                "&city=" +
                body.city +
                "&address=" +
                body.address +
                "&passport_series=" +
                body.passport_series +
                "&given=" +
                body.given +
                "&when=" +
                body.when +
                "&birthday=" +
                body.birthday +
                "&psn=" +
                body.psn +
                "&tin=" +
                body.tin +
                "&phone=" +
                body.phone +
                "&email=" +
                body.email +
                "&identity_document_type=" +
                body.identity_document_type
              document.location.href = RequestHref
              goNextPage()
            },
            rejected => {
              console.log(Object.keys(rejected.response.data.errors))
              let chekedErrors = Object.keys(rejected.response.data.errors)
              for (let i = 0; i < chekedErrors.length; i++) {
                if (chekedErrors[i] === "passport_series") {
                  alert(
                    "Ձեր կողմից նշված «Անձնագրի սերիա» դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    passport_series: null,
                  })
                } else if (chekedErrors[i] === "when") {
                  alert(
                    "Ձեր կողմից նշված «Տրված է» դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    passport_series: null,
                  })
                } else if (chekedErrors[i] === "When") {
                  alert(
                    "Ձեր կողմից նշված «Երբ» դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    passport_series: null,
                  })
                } else if (chekedErrors[i] === "psn") {
                  alert(
                    "Ձեր կողմից նշված « ՀԾՀ » դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    psn: null,
                  })
                } else if (chekedErrors[i] === "tin") {
                  alert(
                    "Ձեր կողմից նշված « ՀՎՀՀ » դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    tin: null,
                  })
                } else if (chekedErrors[i] === "phone") {
                  alert(
                    "Ձեր կողմից նշված « Հեռախոսահամար » դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    phone: null,
                  })
                } else if (chekedErrors[i] === "email") {
                  alert(
                    "Ձեր կողմից նշված « Էլ. Հասցե » դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    email: null,
                  })
                }
              }
            }
          )
      } else {
        const res = apiHelper
          .get(
            "http://triple-c-api.algorithm.am/api/carSalesCredentialPdfDownload?full_name=" +
            body.full_name +
            "&city=" +
            body.city +
            "&address=" +
            body.address +
            "&ID_card_number=" +
            body.ID_card_number +
            "&birthday=" +
            body.birthday +
            "&psn=" +
            body.psn +
            "&tin=" +
            body.tin +
            "&phone=" +
            body.phone +
            "&email=" +
            body.email +
            "&identity_document_type=" +
            body.identity_document_type
          )
          .then(
            response => {
              console.log("PROMISE ", response)
              updateFieldsState(body)
              // goNextPage()
              let RequestHref =
                "http://triple-c-api.algorithm.am/api/carSalesCredentialPdfDownload?full_name=" +
                body.full_name +
                "&city=" +
                body.city +
                "&address=" +
                body.address +
                "&ID_card_number=" +
                body.ID_card_number +
                "&birthday=" +
                body.birthday +
                "&psn=" +
                body.psn +
                "&tin=" +
                body.tin +
                "&phone=" +
                body.phone +
                "&email=" +
                body.email +
                "&identity_document_type=" +
                body.identity_document_type
              document.location.href = RequestHref
              goNextPage()
            },
            rejected => {
              console.log(Object.keys(rejected.response.data.errors))
              let chekedErrors = Object.keys(rejected.response.data.errors)
              for (let i = 0; i < chekedErrors.length; i++) {
                if (chekedErrors[i] === "ID_card_number") {
                  alert(
                    "Ձեր կողմից նշված «Նույնականացման քարտ» դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    ID_card_number: null,
                  })
                } else if (chekedErrors[i] === "psn") {
                  alert(
                    "Ձեր կողմից նշված « ՀԾՀ » դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    psn: null,
                  })
                } else if (chekedErrors[i] === "tin") {
                  alert(
                    "Ձեր կողմից նշված « ՀՎՀՀ » դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    tin: null,
                  })
                } else if (chekedErrors[i] === "phone") {
                  alert(
                    "Ձեր կողմից նշված « Հեռախոսահամար » դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    phone: null,
                  })
                } else if (chekedErrors[i] === "email") {
                  alert(
                    "Ձեր կողմից նշված « Էլ. Հասցե » դաշտի թվերը արդեն գրանցված են խնդրում եմ նորից գրել թվերը"
                  )
                  form.setFieldsValue({
                    email: null,
                  })
                }
              }
            }
          )
      }
    } catch (e) {
      console.log("Error: ", e.response)
    }
  }

  const goNextPage = () => {
    setConfirm2(true)
    closeForm1()
    toggleLoading(false)
  }

  /*calls onfill func after clicking in form2js back button,and gives as a parapmetr FieldValuesObj*/
  useEffect(() => {
    fillform ? onFill(prevState) : null
  }, [])

  const openPassport = () => {
    setcheckPassport(0)
    setcheckId(1)
    setidentity_document_type(0)
  }
  const openId = () => {
    setcheckPassport(1)
    setcheckId(0)
    setidentity_document_type(1)
  }

  const onFill = obj => {
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
    <React.Fragment>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          tin: FieldValuesObj.tin,
          full_name: FieldValuesObj.full_name,
          city: FieldValuesObj.city,
          address: FieldValuesObj.address,
          identity_document_type: FieldValuesObj.identity_document_type,
          passport_series: FieldValuesObj.passport_series,
          when: FieldValuesObj.when,
          given: FieldValuesObj.given,
          ID_card_number: FieldValuesObj.ID_card_number,
          psn: FieldValuesObj.psn,
          birthday: FieldValuesObj.birthday,
          tin: FieldValuesObj.tin,
          phone: FieldValuesObj.phone,
          email: FieldValuesObj.email,
          prefix: "+374",
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
            xs={{ span: 21, offset: 0 }}
            sm={{ span: 20, offset: 0 }}
            md={{ span: 8, offset: 0 }}
            lg={{ span: 5, offset: 0 }}
            xl={{ span: 5, offset: 0 }}
            xxl={{ span: 3, offset: 0 }}
          >
            <Form.Item
              name="city"
              label={<LabelSpan>Բնակության վայրի հասցե</LabelSpan>}
              rules={[
                {
                  required: true,
                  message: "Խնդրում ենք լրացնել նշված դաշտերը",
                },
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
            sm={{ span: 23 }}
            md={{ span: 9, offset: 1 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}
          >
            <Form.Item
              name="address"
              label={<LabelSpan> </LabelSpan>}
              rules={[
                {
                  required: false,
                  message: "Խնդրում ենք լրացնել նշված դաշտերը",
                },
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
            type={checkPassport === 0 ? "primary" : "default"}
            onClick={() => openPassport()}
          >
            Անձնագիր
          </PassportButton>
          <IdButton
            type={checkId === 1 ? "default" : "primary"}
            onClick={() => openId()}
          >
            Նույնականացման քարտ
          </IdButton>
        </Form.Item>
        {checkPassport === 0 ? (
          <ReportPassportRow>
            <Col xs={18} sm={18} md={6} lg={6} xl={6} xxl={5}>
              <Form.Item
                name="passport_series"
                label={<LabelSpan>Անձնագրի սերիա</LabelSpan>}
                rules={[
                  {
                    required: true,
                    message:
                      "Խնդրում ենք լրացնել նշված դաշտերը այն պետք է պարունակի 9 նիշ",
                    whitespace: true,
                    max: 9,
                    len: 9,
                    min: 9,
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
                    message:
                      "Խնդրում ենք լրացնել նշված դաշտը, այն պետք է պարունակի 3 թիվ",
                    whitespace: true,
                    max: 3,
                    len: 3,
                    min: 3,
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
                      message:
                        "Խնդրում ենք լրացնել նշված դաշտերը, այն պետք է պարունակի 9 նիշ",
                      whitespace: true,
                      max: 9,
                      len: 9,
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>
          )}
        <Form.Item
          name="birthday"
          label={<LabelSpan>Ծննդյան օր/ամիս/տարեթիվ</LabelSpan>}
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
              message:
                "Խնդրում ենք լրացնել նշված դաշտը, այն պետք է պարունակի 10 նիշ",
              whitespace: true,
              max: 10,
              len: 10,
            },
          ]}
        >
          <Input type="number" onChange={CheckPsn} />
        </Form.Item>
        <Form.Item
          name="tin"
          label={<LabelSpan>ՀՎՀՀ</LabelSpan>}
          rules={[
            {
              required: tin === null ? true : false,
              message:
                "Ձեր նշած ՀԾՀ–ին համապատասխան ՀՎՀՀ չի գտնվել, խնդրում ենք լրացնել այն մուտքագրելով 8 նիշ",
              whitespace: tin === null ? true : false,
              max: 8,
              len: 8,
              min: 8,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="phone"
          label={<LabelSpan>Հեռախոսահամար</LabelSpan>}
          rules={[
            {
              required: true,
              message:
                "Խնդրում ենք լրացնել նշված դաշտը համարը պետք է սկսվի +374 թվային կոդով",
              pattern: /^(\+|374)[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/,
              max: 11,
              len: 11,
              min: 11,
            },
          ]}
        >
          <Input placeholder=" +374 000000" type="number" />
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
            // disabled={loading}
            loading={loading}
            type="primary"
            htmlType="submit"
            id="registerSubmit"
          >
            Հաստատել
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  )
}
export default RegistrationForm
