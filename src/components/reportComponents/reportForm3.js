import React from "react"
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    UploadOutlined,
} from "@ant-design/icons"
import styled from "styled-components"
import { Form, Button, Upload, Row, Col } from "antd"
import UploadImage from '../../assets/upload2.svg'
import PropTypes from "prop-types"

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 },
}

const normFile = e => {
    console.log("Upload event:", e)
    if (Array.isArray(e)) {
        return e
    }
    return e && e.fileList
}

const UploadWrapper = styled.img`
    width:20px;
    height:20px;
`
const CustomButton = styled(Button)`
  width: 448px;
  height: 40px;
  border: solid 1px #009db8;
  background-color: #ffffff;
  padding-top: 1.7%;
  display: flex;
  justify-content: space-between;
`

const H6Styled = styled.h6`
  width: 319px;
  height: 31px;
  font-family: ArialAMU;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`

function ReportForm3(props) {
    const onFinish = values => {
        console.log("Received values of form: ", values)
    }
    return (
        <Row gutter={[10, 25]}>
            <Col span={24}>
                <H6Styled>Խնդրում ենք վերբեռնել համապատասխան փաստաթղթերը</H6Styled>
            </Col>
            <Col span={24}>
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        ["input-number"]: 3,
                        ["checkbox-group"]: ["A", "B"],
                        rate: 3.5,
                    }}
                >
                    <Form.Item
                        name="upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="passport" action="/upload.do" listType="picture">
                            <CustomButton>
                                <span>Անձնագիր</span><UploadWrapper src={UploadImage} />
                            </CustomButton>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="carconract" action="/upload.do" listType="picture">
                            <CustomButton>
                                <span>Ավտոմեքենայի առք ու վաճառքի պայմանագիր</span><UploadWrapper src={UploadImage} />
                            </CustomButton>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="authorize" action="/upload.do" listType="picture">
                            <CustomButton>
                                <span>Լիազորագիր</span><UploadWrapper src={UploadImage} />
                            </CustomButton>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
                        <Button type="primary" htmlType="submit" id="registerSubmit" >
                            Հաստատել
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

ReportForm3.propTypes = {}

export default ReportForm3
