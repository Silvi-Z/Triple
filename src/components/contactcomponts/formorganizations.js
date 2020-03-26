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
        label="Կազմակերպության անվանում *"
        name="companyname"
        rules={[
          {
            required: true,
            message: "Խնդրում եմ լրացրեք այս դաշտը!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Անուն / Ազգանուն *"
        name="username"
        rules={[
          {
            required: true,
            message: "Խնդրում եմ լրացրեք այս դաշտը!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["user", "email"]}
        label="Էլ․ հասցե"
        rules={[{ type: "email", required: true }]}
      >
        <Input />
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
      >
        <Upload {...fileprops} lg={24}>
          <Button>
            <UploadOutlined />
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
        <Input />
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
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Ուղարկել
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Formfield
