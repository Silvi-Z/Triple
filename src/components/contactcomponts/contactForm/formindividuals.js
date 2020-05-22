/*eslint-disable */
import React, { useState } from "react"
import { Form, Input, Button, Row, Col } from "antd"
import { Upload } from "antd"
import { apiHelper } from "../../../helpers/apiHelper"
import uploadImage from "../../../assets/upload2.svg"
import CareerModal from "../contactModal/contactModal"
import { Arealabel, UploadImg, StyledForm } from "./formStyle"
//input styled custom with id in layout css #basic_username*/
import "../../layout.css"
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}
const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a validate email!",
    number: "Not a validate number!",
  },
  number: {
    range: "Must be between ${min} and ${max}",
  },
}
const Formfield = () => {
  const [form] = Form.useForm()
  const [modalVisible, setmodalVisible] = useState(false)
  const [loading, toggleLoading] = useState(false)
  /*Ant Upload component has a defualt action prop,wich was triggered when user clicked to upload button,
  to disable mentioned action, use dummyRequest with customRequest prop
  */
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok")
    }, 0)
  }

  const handleOk = e => {
    setmodalVisible(false)
    form.resetFields()
  }

  const onFinish = async values => {
    const UploadFormData = new FormData()
    UploadFormData.append("full_name", values.username)
    UploadFormData.append("email", values.email)
    UploadFormData.append("message", values.textarea)
    UploadFormData.append("title", values.title)
    UploadFormData.append("file", values.file[0].originFileObj)
    try {
      toggleLoading(true)
      const res = await apiHelper
        .post("/api/send_email/contact_us", UploadFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => {
          toggleLoading(false)
          setmodalVisible(true)
        })
    } catch (e) {
      console.log("Error: ", e)
      toggleLoading(false)
    }
  }

  return (
    <StyledForm
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      form={form}
      onFinish={onFinish}
      id="formcontact"
    >
      <Row>
        <Col
          lg={{ span: 24 }}
          xl={{ span: 24 }}
          xxl={{ span: 24 }}
          md={{ span: 12 }}
          sm={{ span: 23 }}
          xs={{ span: 23 }}
        >
          <StyledForm.Item
            label="Անուն / Ազգանուն ( Կազմակերպության անվանում )"
            name="username"
            rules={[
              {
                required: true,
                message: "Խնդրում եմ լրացրեք այս դաշտը!",
              },
            ]}
            style={{ marginBottom: "3px" }}
          >
            <Input style={{ width: "100%" }} />
          </StyledForm.Item>
        </Col>
        <Col
          lg={{ span: 24, offset: 0 }}
          xl={{ span: 24, offset: 0 }}
          xxl={{ span: 24, offset: 0 }}
          md={{ span: 11, offset: 1 }}
          sm={{ span: 23 }}
          xs={{ span: 23 }}
        >
          <StyledForm.Item
            name="email"
            label="Էլ․ հասցե"
            rules={[
              {
                type: "email",
                required: true,
                message: "Խնդրում եմ լրացրեք այս դաշտը!",
              },
            ]}
            style={{ marginBottom: "3px" }}
          >
            <Input size="large" style={{ width: "100%" }} />
          </StyledForm.Item>
        </Col>
        <Col lg={{ span: 24 }} xxl={{ span: 24 }} xl={{ span: 24 }}>
          <StyledForm.Item
            label="Կցել ֆայլը"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Խնդրում եմ լրացրեք այս դաշտը!",
              },
            ]}
            style={{ marginBottom: "3px" }}
          >
            <Upload
              accept=".jpeg,.png,.jpg,.doc,.pdf,.docx,.xlsx"
              customRequest={dummyRequest}
            >
              <Button size="large" id="uploadbutton">
                <UploadImg src={uploadImage} />
              </Button>
            </Upload>
          </StyledForm.Item>
        </Col>
        <Col
          xxl={{ span: 24 }}
          xl={{ span: 24, offset: 0 }}
          lg={{ span: 24 }}
          md={{ span: 24 }}
        >
          <StyledForm.Item
            label="Վերնագիր"
            name="title"
            rules={[
              {
                required: true,
                message: "Խնդրում եմ լրացրեք այս դաշտը!",
              },
            ]}
            style={{ marginBottom: "3px" }}
          >
            <Input size="large" />
          </StyledForm.Item>
        </Col>
        <Col
          xxl={{ span: 22 }}
          xl={{ span: 24 }}
          lg={{ span: 24 }}
          sm={{ span: 23 }}
          xs={{ span: 23 }}
        >
          <Arealabel>Ձեր հաղորդագրությունը</Arealabel>
          <StyledForm.Item
            label="Ձեր հաղորդագրությունը"
            name="textarea"
            noStyle="false"
            rules={[
              {
                required: false,
                message: "",
              },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }} />
          </StyledForm.Item>
        </Col>
      </Row>
      <StyledForm.Item>
        <Button
          type="primary"
          htmlType="submit"
          id="submitbotton"
          loading={loading}
        >
          Ուղարկել
        </Button>
      </StyledForm.Item>
      <CareerModal handleOk={handleOk} modalVisible={modalVisible} />
    </StyledForm>
  )
}

export default Formfield
