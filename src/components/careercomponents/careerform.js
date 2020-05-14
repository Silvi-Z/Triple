/*eslint-disable */
import React, { useState } from "react"
import {
  Form,
  Input,
  Button,
  Checkbox,
  Col,
  Row,
  Upload,
  message,
} from "antd"
import {
  UploadOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons"
import { apiHelper } from "../../helpers/apiHelper"
import styled from "styled-components"
import CareerModal from "./careerModal"
import FbIcon from "../../assets/career/facebook.png"
import FbBlackIcon from "../../assets/career/facebookBlack.svg"
import LinkdinIcon from "../../assets/career/linkedin.png"
import LinkedinBlueIcon from "../../assets/career/linkedinBlue.svg"
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
  justify-content: end;

  /* @media (min-width: 375px) {
    a {
      display: contents;
      color: #da4567;
    }
  } */
`
const FaceLink = styled.a`
  color: black;
  font-size: 32px;
  margin-left: 19px;
  margin-top: -4%;
  &:hover {
    cursor: pointer;
    color: #009db8;
  }
`
const LinkedinLink = styled.a`
  color: black;
  font-size: 32px;
  margin-left: 19px;
  margin-top: -4%;
  &:hover {
    cursor: pointer;
    color: #009db8;
  }
`
const Image = styled.img`
  height: 32px;
  width: 32px;
  margin-left: 19px;
  &:hover {
    cursor: pointer;
    height: 52px;
    width: 52px;
  }
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
  const [form] = Form.useForm();
  const [modalVisible, setmodalVisible] = useState(false)

  const showModal = () => {
    setmodalVisible(true)
  };

  const handleOk = e => {
    console.log(e);
    setmodalVisible(false)
    form.resetFields();
  };

  const handleCancel = e => {
    setmodalVisible(false)
  };

  const onFinish = async values => {
    const UploadFormData = new FormData()
    UploadFormData.append("message", values.textarea)
    let passport = new Blob([values.file[0]], { type: "text/xml" })
    UploadFormData.append("file", passport)
    console.log("Success:", values)
    try {
      const res = await apiHelper
        .post("api/send_email/senior_accountant", UploadFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => {
          console.log(res)
          setmodalVisible(true)
        })
    } catch (e) {
      console.log("Error: ", e)
    }
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
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
            rules={[
              {
                required: true,
                message: "Խնդրում եմ լրացրեք այս դաշտը!",
              },
            ]}
          >
            <Upload>
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
          <FaceLink
            href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/TripleCArmenia/"
            target="_blank"
            rel="noopener"
          >
            <Image src={FbIcon} />
          </FaceLink>
          <LinkedinLink
            href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/TripleCArmenia/"
            target="_blank"
            rel="noopener"
          >
            <Image src={LinkdinIcon} />
          </LinkedinLink>
        </SharedWrapperCol>
      </Row>
      <CareerModal
        handleOk={handleOk} modalVisible={modalVisible} />
    </Form>
  )
}

export default Formfield
