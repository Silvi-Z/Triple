import React, { useState, useEffect } from "react"
import { UploadOutlined } from "@ant-design/icons"
import { Form, Input, Button, Col, Row, Upload } from "antd"
import { SubmitButton } from "../careerDroping/dropStyle"
import CareerModal from "../careerModal/careerModal"
import triple from "../../../api/triple"

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 12,
  },
}



const Formfield = ({
                     formlangtext,
                     lang,
                   }) => {
  const [form] = Form.useForm()
  const [modalVisible, setmodalVisible] = useState(false)
  const [loading, toggleLoading] = useState(false)
  const [uploadFile , setUploadFile] = useState(null)

  const handleOk = e => {
    setmodalVisible(false)
    form.resetFields()
  }
  const normFile = e => {
    if (Array.isArray(e)) {
      return e
    }
    setUploadFile(e.file.name)
    return e && e.fileList
  }
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok")
    }, 0)
  }

  const onFinish = async values => {
    console.log("values", values)
    let UploadFormData = new FormData()
    UploadFormData.append("message", values.textarea)
    UploadFormData.append("email", values.email)
    UploadFormData.append("file", values.file[0].originFileObj)
    try {
      toggleLoading(true)
      const res = await triple
        .post("api/send_email/senior_accountant", UploadFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          res => {
            toggleLoading(false)
            setmodalVisible(true)
          },
          reject => {
            toggleLoading(false)
          },
        )
    } catch (e) {
      toggleLoading(false)
    }

  }

  return (
    <>
      <Form
        {...layout}
        name="basic_career"
        initialValues={{
          remember: true,
        }}
        form={form}
        onFinish={onFinish}
        nostyle="true"
      >
        <Form.Item
          label={formlangtext.textare_label}
          name="textarea"
          rules={[
            {
              required: false,
              message: "",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label={formlangtext.email_label}
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message:
                lang === "en"
                  ? "Please fill in the fields provided"
                  : lang === "ru"
                  ? "Пожалуйста, заполните необходимые поля"
                  : "Խնդրում ենք լրացնել նշված դաշտերը",
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Row>
          <Col span={10} xl={24} lg={10} md={10} xs={24}>
            <Form.Item
              label={formlangtext.file_label}
              name="file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message:
                    lang === "en"
                      ? "Please fill in the fields provided"
                      : lang === "ru"
                      ? "Пожалуйста, заполните необходимые поля"
                      : "Խնդրում ենք լրացնել նշված դաշտերը",
                },
              ]}
            >
              <Upload
                accept=".jpeg,.png,.jpg,.doc,.pdf,.docx,.xlsx"
                customRequest={dummyRequest}
              >
                <Button id="careeruploadbutton">
                  <span className="uploadFileName">{uploadFile}</span>
                  <UploadOutlined style={{ verticalAlign: "bottom", color: "#000000", fontSize: "20px" }}/>
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col
            span={24}
            id="careersubmitcol"
          >
            <Form.Item {...tailLayout}>
              <SubmitButton
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                {formlangtext.send_button}
              </SubmitButton>
            </Form.Item>
          </Col>
        </Row>
        <CareerModal handleOk={handleOk} modalVisible={modalVisible} />
      </Form>
    </>
  )
}

export default Formfield
