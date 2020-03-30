import React from "react"
import { Form, Input, Button, Checkbox } from "antd"
import { Upload, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"

const fileprops = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
}

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
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

const Formfield = () => {
  const onFinish = values => {
    console.log("Success:", values)
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Անուն / Ազգանուն"
        name="username"
        rules={[
          {
            required: true,
            message: "Խնդրում եմ լրացրեք այս դաշտը!",
          },
        ]}
      >
        <Input style={{ width: "400px", height: "38px" }} size="large" />
      </Form.Item>

      <Form.Item
        name={["user", "email"]}
        label="Էլ․ հասցե"
        rules={[{ type: "email", required: true }]}
      >
        <Input style={{ width: "400px", height: "38px" }} size="large" />
      </Form.Item>

      <Form.Item
        label="Կցել ֆայլը *"
        name="file"
        rules={[
          {
            required: true,
            message: "Խնդրում եմ լրացրեք այս դաշտը!",
          },
        ]}
        span={24}
      >
        <Upload {...fileprops} span={24}>
          <Button
            style={{ width: "400px", height: "38px", textAlign: "right" }}
            size="large"
          >
            <UploadOutlined
              style={{
                color: "#009db8",
                fontSize: "20px",
              }}
            />
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Վերնագիր *"
        name="title"
        rules={[
          {
            required: true,
            message: "Խնդրում եմ լրացրեք այս դաշտը!",
          },
        ]}
      >
        <Input style={{ width: "400px", height: "38px" }} size="large" />
      </Form.Item>

      <Form.Item
        label="Ձեր հաղորդագրությունը"
        name="textarea"
        rules={[
          {
            required: false,
            message: "",
          },
        ]}
        style={{ width: "600px", height: "80px" }}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "180px", height: "46px" }}
        >
          Ուղարկել
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Formfield
