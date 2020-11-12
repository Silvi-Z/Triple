import React, { useState } from "react"
import { Form, Button, Upload } from "antd"
import triple from "../../../api/triple"
import CareerModal from "../contactModal/contactModal"
import { StyledForm } from "./formStyle"
//input styled custom with id in layout css #basic_username*/
import "../../layout.css"
import {
  InputElement,
  InputWrapper,
  UploadOutlinedSpan,
  UploadOutlined
} from "../contactMainStyle"
import { SubmitButton } from "../../careercomponents/careerDroping/dropStyle"
import UploadIcon from "../../../assets/footericons/brandIcons/white_upload.svg"
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
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
const Formfield = ({ langtext, lang }) => {
  const [form] = Form.useForm()
  const [modalVisible, setmodalVisible] = useState(false)
  const [loading, toggleLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
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
    form.resetFields();
    setSelectedFile(null);
  }


  const normFile = e => {
    setSelectedFile(e.file);
    if (Array.isArray(e)) {
      console.log(e)
      return e
    }
    console.log(e)
    return e && [e.file]
  }

  const onFinish = async values => {
    const UploadFormData = new FormData()
    UploadFormData.append("full_name", values.username)
    UploadFormData.append("email", values.email)
    UploadFormData.append("message", values.textarea)
    UploadFormData.append("title", values.title)
    if (selectedFile) {
      UploadFormData.append("file",values.file[0].originFileObj)
    }
    try {
      toggleLoading(true)
      const res = await triple
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
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      form={form}
      onFinish={onFinish}
      id="formcontact"
    >
      <>
        <InputWrapper class="input_wrapper">
          <StyledForm.Item
            name="username"
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
            style={{ color: "white", marginBottom: "3px" }}
          >
            <InputElement
              name="username"
              placeholder={`${langtext.name_label_first} ${langtext.name_label_second}`}
              style={{ width: "100%" }}
            />
          </StyledForm.Item>
        </InputWrapper>
        <InputWrapper >
          <StyledForm.Item
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
            style={{ marginBottom: "3px" }}
          >
            <InputElement placeholder={langtext.email_label} name="email" size="large" style={{ width: "100%" }} />
          </StyledForm.Item>
        </InputWrapper>
        <InputWrapper>
          <StyledForm.Item
            name="file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: false,
                message:
                  lang === "en"
                    ? "Please fill in the fields provided"
                    : lang === "ru"
                    ? "Пожалуйста, заполните необходимые поля"
                    : "Խնդրում ենք լրացնել նշված դաշտերը",
              },
            ]}
            style={{ marginBottom: "3px" }}
          >
            <Upload
              accept=".jpeg,.png,.jpg,.doc,.pdf,.docx,.xlsx"
              customRequest={dummyRequest}
            >
              <Button size="large" id="uploadbutton">
                <UploadOutlinedSpan>{selectedFile ? selectedFile.name : langtext.file_label}</UploadOutlinedSpan>
                <UploadOutlined />
              </Button>
            </Upload>
          </StyledForm.Item>
        </InputWrapper>
        <InputWrapper>
          <StyledForm.Item
            name="title"
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
            style={{ marginBottom: "3px" }}
          >
            <InputElement name="title" placeholder={langtext.title_label} size="large" />
          </StyledForm.Item>

        </InputWrapper>
        <InputWrapper  >
          <StyledForm.Item
            name="textarea"
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
            <InputElement name="textarea" placeholder={langtext.textare_label} size="large"/>
          </StyledForm.Item>
        </InputWrapper>
      </>
      <StyledForm.Item>
        <SubmitButton
          className="submit_button_style"
          type="primary"
          htmlType="submit"
          loading={loading}
          color={true}
        >
          {langtext.send_button}
        </SubmitButton>
      </StyledForm.Item>
      <CareerModal handleOk={handleOk} modalVisible={modalVisible} />
    </StyledForm>
  )
}

export default Formfield
