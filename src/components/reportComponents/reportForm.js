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
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
//styled inputs with layout.css
import "../layout.css"

function onChange(date, dateString) {
    console.log(date, dateString);
}
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
const tailFormButtonLayout = {
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
            span: 24,
            offset: 8,
        },
    },
}

const RegistrationForm = ({ closeForm1, setConfirm }) => {
    const [form] = Form.useForm()

    const onFinish = values => {
        console.log("Received values of form: ", values)
        setConfirm(true)
        closeForm1(false)
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
    const [checkPassport, setcheckPassport] = useState(true)
    const [checkId, setcheckId] = useState(false)

    const openPassport = () => {
        setcheckPassport(true)
        setcheckId(false)
    }
    const openId = () => {
        setcheckPassport(false)
        setcheckId(true)
    }

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
                <Col lg={3} xxl={{ span: 2, offset: 0 }}>
                    <Form.Item
                        name="adress"
                        label="Բնակության վայրի հասցե"
                        rules={[
                            { required: true, message: "Please input your phone number!" },
                        ]}
                    >
                        <Select style={{ width: "116px", border: "solid 1px #009db8" }} size="large" placeholder="Երևան">
                            <Option value="Երևան" style={{ height: "40px" }}>Երևան</Option>
                            <Option value="Կենտրոն">Կենտրոն</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xxl={{ span: 2, offset: 1 }} lg={3} offset={1}>
                    <Form.Item
                        name="city"
                        label=" "
                        rules={[
                            { required: true, message: "Please input your Adress!" },
                        ]}
                    >
                        <Select style={{ width: 116, border: "solid 1px #009db8" }} size="large" placeholder="Կենտրոն" >
                            <Option value="Երևան">Երևան</Option>
                            <Option value="Կենտրոն">Կենտրոն</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xxl={{ span: 4, offset: 1 }} lg={5} offset={1}>
                    <Form.Item
                        name="phone"
                        label=" "
                        rules={[
                            { required: true, message: "Please input your phone number!" },
                        ]}
                    >
                        <Input style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item {...tailFormButtonLayout} style={{ Maxwidth: "53.6%", display: "flex" }}>
                <Button type={checkPassport ? "primary" : "default"} style={{ width: "216px", height: "40px" }} onClick={() => openPassport()}>
                    Անձնագիր
                </Button>
                <Button type={checkId ? "primary" : "default"} style={{ width: "216px", height: "40px", marginLeft: "2%" }} onClick={() => openId()}>
                    Նույնականացման քարտ
                </Button>
            </Form.Item>
            {checkPassport ?
                <Row style={{ width: "48.6%" }}>
                    <Col lg={8} xxl={6}>
                        <Form.Item
                            name="passportSeria"
                            label={<span>Անձնագրի սերիա</span>}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your right number!",
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col lg={8} xxl={6}>
                        <Form.Item
                            name="givenby"
                            label={<span>Տրված է ում կողմից</span>}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your right number!",
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col lg={8} xxl={6}>
                        <Form.Item
                            name="givedata"
                            label={<span>Երբ</span>}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your right number!",
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                : <Row>
                    <Col lg={8}>
                        <Form.Item
                            name="passportSeria"
                            label={<span>Նույնականացման քարտ թվեր</span>}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your right number!",
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            }
            <Form.Item
                name="birthday"
                label="Ծննդյան օր/ամսի/տարեթիվ"
                rules={[
                    { required: true, message: "Please input your Adress!" },
                ]}
            >
                <DatePicker onChange={onChange} placeholder={new Date('December 25, 1995 23:15:30')} style={{ width: "116px", height: "40px", border: "solid 1px #009db8" }} />

            </Form.Item>
            <Form.Item
                name="IPN"
                label={<span>ՀԾՀ</span>}
                rules={[
                    {
                        required: true,
                        message: "Please input your ՀԾՀ!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="IPN"
                label={<span>ՀՎՀՀ</span>}
                rules={[
                    {
                        required: true,
                        message: "Please input your ՀԾՀ!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Հեռախոսահամար"
                rules={[
                    { required: true, message: "Please input your phone number!" },
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
                <Button type="primary" htmlType="submit" id="registerSubmit" >
                    Հաստատել
                </Button>
            </Form.Item>
        </Form >
    )
}

export default RegistrationForm
