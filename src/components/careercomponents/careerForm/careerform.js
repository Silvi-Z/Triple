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




const Formfield = ({
                      data,
                     formlangtext,
                     lang,
                   }) => {
  const [form] = Form.useForm()
  const [modalVisible, setmodalVisible] = useState(false)
  const [disabled, toggleDisabled] = useState(false)
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
    let UploadFormData = new FormData()
    UploadFormData.append("title", data[`title_${lang}`])
    UploadFormData.append("message", values.textarea)
    UploadFormData.append("email", values.email)
    UploadFormData.append("file", values.file[0].originFileObj)
    try {
      toggleDisabled(true)
      const res = await triple
        .post("api/send_email/senior_accountant", UploadFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          res => {
            toggleDisabled(false)
            setmodalVisible(true)
          },
          reject => {
            toggleDisabled(false)
          },
        )
    } catch (e) {
      toggleDisabled(false)
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
            id="careersubmitcol"
          >
            <Form.Item>
              <SubmitButton
                type="primary"
                htmlType="submit"
                disabled={false}
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
