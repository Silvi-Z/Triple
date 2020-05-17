import React, { useState } from "react"
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
} from "@ant-design/icons"
import { apiHelper } from "../../../helpers/apiHelper"
import { Form, Button, Upload, Row, Col } from "antd"
import UploadImage from "../../../assets/upload2.svg"
import {
    UploadWrapper,
    CustomButton,
    H6Styled,
    NavigateWrapper,
    NavigateBackButton,
    NavigateForwardButton,
    BackSpan,
    ForwardSpan,
} from "./reportForm2Style.js"
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

function ReportForm3({
    AllFieldsValues,
    setConfirm2,
    setConfirm3,
    backButton,
    setfillform,
    setCurrent_tracking_number,
    current_tracking_number,
}) {
    const [loading, toggleLoading] = useState(false)

    const onFinish = async values => {
        const UploadFormData = new FormData()
        if (AllFieldsValues.hasOwnProperty("when")) {
            UploadFormData.append("full_name", AllFieldsValues.full_name)
            UploadFormData.append("city", AllFieldsValues.city)
            UploadFormData.append("address", AllFieldsValues.address)
            UploadFormData.append(
                "identity_document_type",
                AllFieldsValues.identity_document_type
            )
            UploadFormData.append("passport_series", AllFieldsValues.passport_series)
            UploadFormData.append("when", AllFieldsValues.when)
            UploadFormData.append("given", AllFieldsValues.given)
            UploadFormData.append("birthday", AllFieldsValues.birthday)
            UploadFormData.append("tin", AllFieldsValues.tin)
            UploadFormData.append("psn", AllFieldsValues.psn)
            UploadFormData.append("phone", AllFieldsValues.phone)
            UploadFormData.append("email", AllFieldsValues.email)
            let passport = new Blob([values.passport_file[0]], { type: "text/xml" })
            UploadFormData.append("passport_file", passport)
            let car_purchase = new Blob([values.car_purchase_file[0]], {
                type: "text/xml",
            })
            UploadFormData.append("car_purchase_file", car_purchase)
            let credentials = new Blob([values.credentials_file[0]], {
                type: "text/xml",
            })
            UploadFormData.append("credentials_file", credentials)
        } else {
            UploadFormData.append("full_name", AllFieldsValues.full_name)
            UploadFormData.append("city", AllFieldsValues.city)
            // UploadFormData.append("district", AllFieldsValues.district)
            UploadFormData.append("address", AllFieldsValues.address)
            UploadFormData.append(
                "identity_document_type",
                AllFieldsValues.identity_document_type
            )
            UploadFormData.append("ID_card_number", AllFieldsValues.ID_card_number)
            UploadFormData.append("birthday", AllFieldsValues.birthday)
            UploadFormData.append("tin", AllFieldsValues.tin)
            UploadFormData.append("psn", AllFieldsValues.psn)
            UploadFormData.append("phone", AllFieldsValues.phone)
            UploadFormData.append("email", AllFieldsValues.email)
            let passport = new Blob([values.passport_file[0]], { type: "text/xml" })
            UploadFormData.append("passport_file", passport)
            let car_purchase = new Blob([values.car_purchase_file[0]], {
                type: "text/xml",
            })
            UploadFormData.append("car_purchase_file", car_purchase)
            let credentials = new Blob([values.credentials_file[0]], {
                type: "text/xml",
            })
            UploadFormData.append("credentials_file", credentials)
        }
        console.log("Received values of form: ", UploadFormData)
        try {
            toggleLoading(true)
            const res = await apiHelper
                .post("/api/reports/car_sales_credential", UploadFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(res => {
                    console.log(res)
                    setConfirm2(false)
                    setConfirm3(true)
                    setCurrent_tracking_number(res.data.data.order_number)
                    toggleLoading(false)
                })
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    const goBack = () => {
        backButton()
        setfillform(true)
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
                <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
                    <Form.Item
                        name="passport_file"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: "Խնդրում ենք լրացնել նշված դաշտերը",
                            },
                        ]}
                    >
                        <Upload name="passport_file" listType="picture" accept="MIME-type">
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
                        rules={[
                            {
                                required: true,
                                message: "Խնդրում ենք լրացնել նշված դաշտերը",
                            },
                        ]}
                    >
                        <Upload name="car_purchase_file" listType="picture">
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
                        rules={[
                            {
                                required: true,
                                message: "Խնդրում ենք լրացնել նշված դաշտերը",
                            },
                        ]}
                    >
                        <Upload name="credentials_file" listType="picture">
                            <CustomButton>
                                <span>Լիազորագիր</span>
                                <UploadWrapper src={UploadImage} />
                            </CustomButton>
                        </Upload>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            id="registerSubmit"
                            loading={loading}
                        >
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
                    <NavigateForwardButton>
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
