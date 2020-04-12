/*eslint-disable */
import React, { useState } from "react"
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
//styled inputs with layout.css
import "../layout.css"

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

const residences = [
    {
        value: "zhejiang",
        label: "Zhejiang",
        children: [
            {
                value: "hangzhou",
                label: "Hangzhou",
                children: [
                    {
                        value: "xihu",
                        label: "West Lake",
                    },
                ],
            },
        ],
    },
    {
        value: "jiangsu",
        label: "Jiangsu",
        children: [
            {
                value: "nanjing",
                label: "Nanjing",
                children: [
                    {
                        value: "zhonghuamen",
                        label: "Zhong Hua Men",
                    },
                ],
            },
        ],
    },
]

const formItemLayout = {
    labelCol: {
        xl: { span: 24 },
        lg: { span: 24 },
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        lg: {
            span: 24,
            offset: 0,
        },
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
}

const RegistrationForm = () => {
    const [form] = Form.useForm()

    const onFinish = values => {
        console.log("Received values of form: ", values)
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">Երևան</Option>
                <Option value="87">Կենտրոն</Option>
            </Select>
        </Form.Item>
    )

    const [autoCompleteResult, setAutoCompleteResult] = useState([])

    const onWebsiteChange = value => {
        if (!value) {
            setAutoCompleteResult([])
        } else {
            setAutoCompleteResult(
                [".com", ".org", ".net"].map(domain => `${value}${domain}`)
            )
        }
    }

    const websiteOptions = autoCompleteResult.map(website => ({
        label: website,
        value: website,
    }))

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "86",
            }}
            scrollToFirstError
        >
            <Form.Item
                name="nickname"
                label={<span>Անուն / Ազգանուն</span>}
                rules={[
                    {
                        required: true,
                        message: "Please input your nickname!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label={
                    <span>
                        Email&nbsp;
            <Tooltip title="Why do you give  us your email?">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                }
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            {/* <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                "The two passwords that you entered do not match!"
                            )
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item> */}

            {/* <Form.Item
                name="residence"
                label="Habitual Residence"
                rules={[
                    {
                        type: "array",
                        required: true,
                        message: "Please select your habitual residence!",
                    },
                ]}
            >
                <Cascader options={residences} />
            </Form.Item> */}
            <Row gutter={[0, 0]}>
                <Col lg={4}>
                    <Form.Item
                        name="country"
                        label="Բնակության վայրի հասցե *"
                        rules={[
                            { required: true, message: "Please input your phone number!" },
                        ]}
                    >
                        <Select style={{ width: 116 }}>
                            <Option value="Երևան">Երևան</Option>
                            <Option value="Կենտրոն">Կենտրոն</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col lg={4}>
                    <Form.Item
                        name="city"
                        label="   "
                        rules={[
                            { required: true, message: "Please input your Adress!" },
                        ]}
                    >
                        <Select style={{ width: 116, height: 40 }}>
                            <Option value="Երևան">Երևան</Option>
                            <Option value="Կենտրոն">Կենտրոն</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col lg={8}>
                    <Form.Item
                        name="phone"
                        label="  "
                        rules={[
                            { required: true, message: "Please input your phone number!" },
                        ]}
                    >
                        <Input style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
            </Row>
            {/* <Form.Item
                name="website"
                label="Website"
                rules={[{ required: true, message: "Please input website!" }]}
            >
                <AutoComplete
                    options={websiteOptions}
                    onChange={onWebsiteChange}
                    placeholder="website"
                >
                    <Input />
                </AutoComplete>
            </Form.Item> */}

            {/* <Form.Item
                label="Captcha"
                extra="We must make sure that your are a human."
            >
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name="captcha"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the captcha you got!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Button>Get captcha</Button>
                    </Col>
                </Row>
            </Form.Item> */}

            {/* <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject("Should accept agreement"),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item> */}
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Հաստատել
                </Button>
            </Form.Item>
        </Form>
    )
}

export default RegistrationForm
