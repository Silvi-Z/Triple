import React from "react"
import { Upload, message } from "antd"
import styled from "styled-components"
import { Form, Input, Button, Row, Col } from "antd"
import uploadImage from "../../../assets/upload2.svg"
import { Arealabel, UploadImg } from "../contactMainStyle"

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
    span: 24,
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
      id="formcontact"
    >
      <Row>
        <Col
          lg={{ span: 11 }}
          xxl={{ span: 11 }}
          xl={{ span: 11 }}
          md={{ span: 11 }}
          xs={24}>
          <Form.Item
            label="Կազմակերպության անվանում"
            name="username"
            rules={[
              {
                required: true,
                message: "Խնդրում եմ լրացրեք այս դաշտը!",
              },
            ]}
            style={{ marginBottom: "3px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col
          span={11}
          xxl={{ span: 11, offset: 2 }}
          lg={{ span: 11, offset: 1 }}
          xl={{ span: 11, offset: 1 }}
          md={{ span: 11, offset: 1 }}
          xs={{ span: 11, offset: 0 }}
          offset={1}
        >
          <Form.Item
            name={["user", "email"]}
            label="Անուն / Ազգանուն"
            rules={[{ type: "email", required: true, message: "Խնդրում եմ լրացրեք այս դաշտը!", }]}
            style={{ marginBottom: "3px" }}
          >
            <Input size="large" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          lg={{ span: 11 }}
          xxl={{ span: 11 }}
          xl={{ span: 11 }}
          md={{ span: 11 }}
          xs={24}>
          <Form.Item
            label="Էլ հասցե"
            name="username"
            rules={[{ type: "email", required: true, message: "Խնդրում եմ լրացրեք այս դաշտը!", }]}
            style={{ marginBottom: "3px" }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col
          span={11}
          xxl={{ span: 11, offset: 2 }}
          lg={{ span: 11, offset: 1 }}
          xl={{ span: 11, offset: 1 }}
          md={{ span: 11, offset: 1 }}
          xs={{ span: 11, offset: 0 }}
          offset={1}
        >
          <Form.Item
            label="Կցել ֆայլը"
            name="file"
            rules={[
              {
                required: true,
                message: "Խնդրում եմ լրացրեք այս դաշտը!",
              },
            ]}
            style={{ marginBottom: "3px" }}
          >
            <Upload {...fileprops}>
              <Button size="large" id="uploadbuttoncompany">
                <UploadImg src={uploadImage} />
              </Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
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
      </Form.Item>
      <Arealabel>Ձեր հաղորդագրությունը</Arealabel>
      <Form.Item
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
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 4 }} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" id="submitbotton">
          Ուղարկել
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Formfield
