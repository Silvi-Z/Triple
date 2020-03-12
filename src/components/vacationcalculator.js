import React, { useState } from 'react';
import { Typography, Row, Col, Button, InputNumber, DatePicker } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { apiHelper } from '../helpers/apiHelper';
import UserImg from '../assets/user.png';

const { Title, Text } = Typography;

const HeadIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const H2Styled = styled.h2`
  font-size: 25px;
  font-weight: 400;
`;

const H3Styled = styled.h3`
  font-size: 24px;
  font-weight: 400;
`;

const ToggleButton = styled(Button)`
  height: 80px;
  width: 80px;
`;

const ButtonBase = styled(Button)`
  height: 55px;
  border-color: #009db8;
  overflow: hidden;
`;

const ButtonLarge = styled(Button)`
  height: 70px;
  border-color: #009db8;
  overflow: hidden;
`;

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  border-color: #009db8;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 55px;
  border-color: #009db8;
`;

const FormLabelCell = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  height: 55px;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #d7d7d7;
`;

const VacationCalculator = () => {
  const [result, setResult] = useState(null);
  const [showForm, toggleForm] = useState(false);

  return (
    <>
      <Row align="middle" gutter={[10, 10]}>
        <Col span={1} offset={3}>
          <HeadIcon src={UserImg} alt={'icon'} />
        </Col>
        <Col span={16}>
          <H2Styled>Արձակուրդայինի հաշվիչ</H2Styled>
        </Col>
        <Col span={2}>
          <ToggleButton
            block
            onClick={() => toggleForm(!showForm)}
          >
            {showForm ? (
              <MinusOutlined style={{fontSize: '20px'}} />
            ) : (
              <PlusOutlined style={{fontSize: '20px'}} />
            )}
          </ToggleButton>
        </Col>
      </Row>
      {showForm ? (
        <>
          <Row align="middle" gutter={[20, 20]}>
            <Col span={9} offset={4}>
              <Title level={4}>
                Ժամանակահատված, որի ընթացքում աշխատողը գտնվել(ու) է արձակուրդի մեջ
              </Title>
            </Col>
          </Row>
          <Row align="middle" gutter={[20, 20]}>
            <Col span={2} offset={4}>
              <FormLabelCell>
                <Text>Սկիզբ</Text>
              </FormLabelCell>
            </Col>
            <Col span={3}>
              <StyledDatePicker
                // popupStyle={{
                //   fontFamily: 'sans-serif',
                //   fontSize: '8px',
                // }}
                size="large"
              />
            </Col>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default VacationCalculator;