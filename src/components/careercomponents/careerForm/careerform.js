/*eslint-disable */
import React, { useState } from "react"
import { Form, Input, Button, Col, Row, Upload, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { apiHelper } from "../../../helpers/apiHelper"
import CareerModal from "../careerModal/careerModal"
import "../../layout.css"
import {
  ShareLabel,
  SharedWrapperCol,
  FaceLink,
  LinkedinLink,
  FacebookIcon,
  LinkdinIcon,
} from "./formStyle"
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

  const handleOk = e => {
    setmodalVisible(false)
    form.resetFields()
  }
  /*Ant Upload component has a defualt action prop,wich was triggered when user clicked to upload button,
  to disable mentioned action, use dummyRequest with customRequest prop
  */
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok")
    }, 0)
  }

  const onFinish = async values => {
    let UploadFormData = new FormData()
    UploadFormData.append("message", values.textarea)
    UploadFormData.append("file", values.file[0].originFileObj)
    try {
      toggleLoading(true)
      const res = await apiHelper
        .post("api/send_email/senior_accountant", UploadFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          res => {
            console.log(res)
            toggleLoading(false)
            setmodalVisible(true)
          },
          reject => {
            console.log(reject.response)
            toggleLoading(false)
          }
        )
    } catch (e) {
      console.log(e.response)
      toggleLoading(false)
    }
  }

  return (
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
      <Row>
        <Col span={10} xl={10} lg={10} md={10} xs={24}>
          <Form.Item
            label="Վերբեռնել CV * "
            name="file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Խնդրում եմ լրացրեք այս դաշտը!",
              },
            ]}
          >
            <Upload
              accept=".jpeg,.png,.jpg,.doc,.pdf,.docx,.xlsx"
              customRequest={dummyRequest}
            >
              <Button id="careeruploadbutton">
                <UploadOutlined
                  style={{
                    color: "#009db8",
                    fontSize: "20px",
                  }}
                />
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col
          span={8}
          xl={8}
          lg={8}
          md={8}
          xs={{ span: 24, offset: 0 }}
          id="careersubmitcol"
        >
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "180px", height: "45px" }}
            >
              Ուղարկել
            </Button>
          </Form.Item>
        </Col>
        <SharedWrapperCol span={10}>
          <ShareLabel>Կիսվել</ShareLabel>
          <FaceLink
            href="https://www.facebook.com/sharer/sharer.php?u=http://triple-c.algorithm.am/career/"
            target="_blank"
            rel="noopener"
          >
            <FacebookIcon />
          </FaceLink>
          <LinkedinLink
            href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/TripleCArmenia/"
            target="_blank"
            rel="noopener"
          >
            <LinkdinIcon />
          </LinkedinLink>
        </SharedWrapperCol>
      </Row>
      <CareerModal handleOk={handleOk} modalVisible={modalVisible} />
    </Form>
  )
}

export default Formfield
