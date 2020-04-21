import React from "react"
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    UploadOutlined,
} from "@ant-design/icons"
import styled from "styled-components"
import { apiHelper } from "../../helpers/apiHelper"
import { Form, Button, Upload, Row, Col } from "antd"
import UploadImage from "../../assets/upload2.svg"
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
  width: 20px;
  height: 20px;
`
const CustomButton = styled(Button)`
  width: 448px;
  height: 40px;
  border: solid 1px #009db8;
  background-color: #ffffff;
  padding-top: 1.7%;
  display: flex;
  justify-content: space-between;
  span {
    width: 208px;
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
  }
  @media (min-width: 320px) {
    width: 290px;
    border: solid 1px #009db8;
    padding-top: 3.7%;
    span {
      width: 208px;
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
    }
  }
  @media (min-width: 375px) {
    width: 290px;
    border: solid 1px #009db8;
    padding-top: 3.7%;
    span {
      width: 208px;
      height: 41px;
      font-family: ArialAMU;
      font-size: 11px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #000000;
    }
  }
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
const NavigateWrapper = styled.div`
  width: 180px;
  display: flex;
  justify-content: space-between;
`
const NavigateBackButton = styled(Button)`
  width: 90px;
  height: 20px;
  border: solid 0px;
  display: flex;
  padding-left: 0;
  justify-content: space-between;
  background-color: rgba(255, 0, 0, 0);
  &:hover {
    background-color: rgba(255, 0, 0, 0);
    cursor: pointer;
  }
`
const NavigateForwardButton = styled(Button)`
  width: 90px;
  height: 20px;
  border: solid 0px;
  display: flex;
  padding-right: 0;
  justify-content: space-between;
  background-color: rgba(255, 0, 0, 0);
  &:hover {
    background-color: rgba(255, 0, 0, 0);
    cursor: pointer;
  }
`
const BackSpan = styled.span`
  height: 12px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #009db8;
`
const ForwardSpan = styled.span`
  height: 12px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #009db8;
`
function ReportForm3({ AllFieldsValues, setConfirm2, setConfirm3 }) {
    console.log(AllFieldsValues)
    // const onFinish = values => {
    //     console.log("Received values of form: ", values)
    //     setConfirm2(false)
    //     setConfirm3(true)
    // }
    const onFinish = async values => {
        let body = {
            ...AllFieldsValues,
            passport_file: values.passport_file[0],
            car_purchase_file: values.car_purchase_file[0],
            credentials_file: values.credentials_file[0]
        }
        console.log("Received values of form: ", body)
        try {
            const res = await apiHelper.post(
                "/api/reports/car_sales_credential",
                body,
                {
                    headers: {
                        Accept: "application/pdf",
                        "Content-Type": 'multipart/form-data',
                    }
                }
            ).then(response => {
                console.log(response)
                setConfirm2(false)
                setConfirm3(true)
            });
            // setConfirm2(true)
            // closeForm1(false)
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    const goBack = () => {
        backButton(true)
    }
    const goForward = () => {
        setConfirm2(false)
        setConfirm3(true)
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
                        name="passport_file"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="passport" action="/upload.do" listType="picture">
                            <CustomButton>
                                <span>Անձնագիր</span>
                                <UploadWrapper src={UploadImage} />
                            </CustomButton>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="car_purchase_file"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="car_purchase_file" action="/upload.do" listType="picture">
                            <CustomButton>
                                <span>Ավտոմեքենայի առք ու վաճառքի պայմանագիր</span>
                                <UploadWrapper src={UploadImage} />
                            </CustomButton>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="credentials_file"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="credentials_file" action="/upload.do" listType="picture">
                            <CustomButton>
                                <span>Լիազորագիր</span>
                                <UploadWrapper src={UploadImage} />
                            </CustomButton>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
                        <Button type="primary" htmlType="submit" id="registerSubmit">
                            Հաստատել
            </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={24}>
                <NavigateWrapper>
                    <NavigateBackButton onClick={goBack}>
                        <ArrowLeftOutlined style={{ color: "#009db8", fontSize: "15px" }} />
                        <BackSpan>Հետ</BackSpan>
                    </NavigateBackButton>
                    <NavigateForwardButton onClick={goForward}>
                        <ForwardSpan>Առաջ</ForwardSpan>
                        <ArrowRightOutlined
                            style={{ color: "#009db8", fontSize: "15px" }}
                        />
                    </NavigateForwardButton>
                </NavigateWrapper>
            </Col>
        </Row>
    )
}

ReportForm3.propTypes = {}

export default ReportForm3
