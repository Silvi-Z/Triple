/*eslint-disable */
import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { apiHelper } from '../../helpers/apiHelper';
import styled from 'styled-components';
import uploadImage from '../../assets/upload2.svg';
//input styled custom with id in layout css #basic_username*/
import '../layout.css';
const Arealabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 32px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
`
const UploadImg = styled.img`
  width: 20px;
  height: 20px;
  color: "#009db8";
  margin-top: 2px;
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
    offset: 8,
    span: 16,
  },
}

const fileprops = {
  name: 'file',
  action: '/api/contacts/{id}',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
};

const initialValues = {
  // salary_type: false,
  // patent: null,
  // price: 0,
  // bonus_price: 0,
  // pension: true,
  // bonus_stamp: true,
};

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
  const onFinish = async values => {
    console.log("Success:", values)
    try {
      const res = await apiHelper.post('/api/contacts/1', values);
      setResult(res.data);
      console.log('Response: ', res.data);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  // const formik = useFormik({
  //   initialValues: onFinish(),
  //   validateOnMount: true,
  //   onSubmit: async values => {
  //     setResult(null);
  //     setLoading(true);
  //     let res = {};
  //     let body = {};

  //     console.log('Formik values: ', values);
  //     console.log('Body: ', body);
  //     try {
  //       res = await apiHelper.post('/api/contacts/{id}', body);
  //       console.log('Response: ', res.data.data.result);
  //       setResult(res.data.data.result);
  //     } catch (e) {
  //       console.log('Calculation error: ', e);
  //     }
  //     setLoading(false);
  //   },
  // });

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      encType="multipart/form-data"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      id="formcontact"
    // onSubmit={formik.handleSubmit}
    >
      <Row>
        <Col lg={{ span: 11 }} xl={{ span: 11 }} xxl={{ span: 11 }} md={{ span: 11 }} xs={24}>
          <Form.Item
            label="Անուն / Ազգանուն"
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
          lg={{ span: 11, offset: 1 }}
          xl={{ span: 11, offset: 1 }}
          xxl={{ span: 11, offset: 2 }}
          md={{ span: 11, offset: 1 }}
          xs={{ span: 11, offset: 0 }}
          offset={1}
        >
          <Form.Item
            name={["user", "email"]}
            label="Էլ․ հասցե"
            rules={[{ type: "email", required: true }]}
            style={{ marginBottom: "3px" }}
          >
            <Input size="large" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Կցել ֆայլը"
        name="facebook_icon"
        rules={[
          {
            required: true,
            message: "Խնդրում եմ լրացրեք այս դաշտը!",
          },
        ]}
        style={{ marginBottom: "3px" }}
      >
        <Upload {...fileprops}>
          <Button size="large" id="uploadbutton">
            {/* <UploadOutlined
              style={{
                color: "#009db8",
                fontSize: "20px",
                margin: "20px";
              }}
            /> */}
            <UploadImg src={uploadImage} />
          </Button>
        </Upload>
      </Form.Item>

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
