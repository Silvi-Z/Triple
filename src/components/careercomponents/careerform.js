import React from "react"
import { Form, Input, Button, Checkbox } from "antd"
import { Col, Row } from "antd"
import { Upload, message } from "antd"
import {
  UploadOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons"
import styled from "styled-components"
import facebookImg from "../../assets/career/facebook.png"
import linkedinImg from "../../assets/career/linkedin.png"
import "../layout.css"

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

const ShareLabel = styled.h3`
  width: 50px;
  height: 15px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: right;
  color: #000000;
`
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

const SharedWrapperCol = styled(Col)`
  padding: 0 1%;
  display: flex;
  &:hover {
    cursor: pointer;
    color: red;
    a {
      fill: #da4567;
    }
  }
`

const Image = styled.img`
  height: 32px;
  width: 32px;
  margin-left: 19px;
`

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
      name="basic_career"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      noStyle="true"
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
            rules={[
              {
                required: true,
                message: "Խնդրում եմ լրացրեք այս դաշտը!",
              },
            ]}
          >
            <Upload {...fileprops}>
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
              style={{ width: "180px", height: "45px" }}
            >
              Ուղարկել
            </Button>
          </Form.Item>
        </Col>
        <SharedWrapperCol span={10}>
          <ShareLabel>Կիսվել</ShareLabel>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/TripleCArmenia/"
            target="_blank"
            rel="noopener"
          >
            {/* <FacebookOutlined
              style={{
                color: "#000000",
                fontSize: "32px",
                marginLeft: "19px",
              }}
            /> */}
            <Image src={facebookImg} />
          </a>
          <Image src={linkedinImg} />

          {/* <LinkedinOutlined
            style={{
              color: "#000000",
              fontSize: "32px",
              marginLeft: "19px",
            }}
          /> */}
        </SharedWrapperCol>
      </Row>
    </Form>
  )
}

export default Formfield
