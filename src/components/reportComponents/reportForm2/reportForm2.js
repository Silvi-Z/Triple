import React, { useState } from "react"
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { apiHelper } from "../../../helpers/apiHelper"
import { Form, Button, Upload, Row, Col } from "antd"
import UploadImage from "../../../assets/upload2.svg"
import {
  UploadWrapper,
  CustomButton,
  H6Styled,
  NavigateWrapper,
  NavigateBackButton,
  NavigateForwardButton,
  BackSpan,
  ForwardSpan,
} from "./reportForm2Style.js"

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
}

const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}
// const props = {
//   name: 'file',
//   action: '//jsonplaceholder.typicode.com/posts/',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       let reader = new FileReader();
//       reader.onload = (e) => {
//         console.log(e.target.result);
//       }
//       reader.readAsText(info.file[0].originFileObj);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

function ReportForm2({
  AllFieldsValues,
  setConfirm2,
  setConfirm3,
  backButton,
  setfillform,
  setCurrent_tracking_number,
  setResetForm,
  current_tracking_number,
}) {
  const [loading, toggleLoading] = useState(false)

  const onFinish = async values => {
    console.log(values.credentials_file[0])
    let UploadFormData = new FormData()
    UploadFormData.append("full_name", AllFieldsValues.full_name)
    UploadFormData.append("city", AllFieldsValues.city)
    UploadFormData.append("address", AllFieldsValues.address)
    UploadFormData.append("birthday", AllFieldsValues.birthday)
    UploadFormData.append("tin", AllFieldsValues.tin)
    UploadFormData.append("psn", AllFieldsValues.psn)
    UploadFormData.append("phone", AllFieldsValues.phone)
    UploadFormData.append("email", AllFieldsValues.email)
    UploadFormData.append(
      "identity_document_type",
      AllFieldsValues.identity_document_type
    )
    UploadFormData.append(
      "passport_file",
      values.passport_file[0].originFileObj
    )
    UploadFormData.append(
      "car_purchase_file",
      values.car_purchase_file[0].originFileObj
    )
    UploadFormData.append(
      "credentials_file",
      values.credentials_file[0].originFileObj
    )
    if (AllFieldsValues.hasOwnProperty("when")) {
      UploadFormData.append("passport_series", AllFieldsValues.passport_series)
      UploadFormData.append("when", AllFieldsValues.when)
      UploadFormData.append("given", AllFieldsValues.given)
    } else {
      UploadFormData.append("ID_card_number", AllFieldsValues.ID_card_number)
    }
    try {
      toggleLoading(true)
      const res = await apiHelper
        .post("/api/reports/car_sales_credential", UploadFormData, {
          headers: {
            Accept: 'application/json',
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          res => {
            setConfirm2(false)
            setConfirm3(true)
            setCurrent_tracking_number(res.data.data.order_number)
            toggleLoading(false)
            setResetForm(true)
          },
          reject => {
            console.log(reject.response)
            toggleLoading(false)
          }
        )
    } catch (e) {
      console.log("Error: ", e)
      toggleLoading(false)
    }
  }

  const goBack = () => {
    backButton()
    setfillform(true)
  }
  const goForward = () => {
    setConfirm2(false)
    setConfirm3(true)
  }

  return (
    <Row gutter={[10, 25]}>
      <Col span={24}>
        <H6Styled>Խնդրում ենք վերբեռնել համապատասխան փաստաթղթերը</H6Styled>
      </Col>
      <Col span={24}>
        <Form
          name="validate_other"
          {...formItemLayout}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="passport_file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Խնդրում ենք լրացնել նշված դաշտերը",
              },
            ]}
          >
            <Upload>
              <CustomButton>
                <span>Անձնագիր</span>
                <UploadWrapper src={UploadImage} />
              </CustomButton>
            </Upload>
          </Form.Item>
          <Form.Item
            name="car_purchase_file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Խնդրում ենք լրացնել նշված դաշտերը",
              },
            ]}
          >
            <Upload>
              <CustomButton>
                <span>Ավտոմեքենայի առք ու վաճառքի պայմանագիր</span>
                <UploadWrapper src={UploadImage} />
              </CustomButton>
            </Upload>
          </Form.Item>
          <Form.Item
            name="credentials_file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Խնդրում ենք լրացնել նշված դաշտերը",
              },
            ]}
          >
            <Upload>
              <CustomButton>
                <span>Լիազորագիր</span>
                <UploadWrapper src={UploadImage} />
              </CustomButton>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              id="registerSubmit"
              loading={loading}
            >
              Հաստատել
            </Button>
          </Form.Item>
          <NavigateWrapper>
            <NavigateBackButton onClick={goBack}>
              <ArrowLeftOutlined style={{ color: "#009db8", fontSize: "15px" }} />
              <BackSpan>Հետ</BackSpan>
            </NavigateBackButton>
            <NavigateForwardButton htmlType="submit">
              <ForwardSpan>Առաջ</ForwardSpan>
              <ArrowRightOutlined
                style={{ color: "#009db8", fontSize: "15px" }}
              />
            </NavigateForwardButton>
          </NavigateWrapper>
        </Form>
      </Col>
      <Col span={24}>

      </Col>
    </Row>
  )
}

ReportForm2.propTypes = {}

export default ReportForm2
