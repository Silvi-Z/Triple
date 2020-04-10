import React, { useState } from 'react';
import { Typography, Row, Col, Button, InputNumber, DatePicker } from 'antd';
import { PlusOutlined, MinusOutlined, CaretDownFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { apiHelper } from '../../helpers/apiHelper';
import UserImg from '../../assets/calcImages/user.png';
import VacationImg from '../../assets/calcImages/vacation.png';

const { Title, Text } = Typography;

const HeadIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 80%;
  @media (min-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    margin-top: 30%;
  }
  @media (min-width: 375px) {
    width: 40px;
    height: 40px;
    margin-top: 10%;
  }
  @media (min-width: 320px) {
    width: 40px;
    height: 40px;
    margin-top: 10%;
  }
  @media (min-width: 1600px) {
    width: 50px;
    height: 50px;
  }
`;

const H2Styled = styled.h2`
  font-size: 18px;
  font-weight: normal;
  margin-left: 10px;
`;

const H3Styled = styled.h3`
  font-size: 15px;
  font-weight: 500;
  color: #000;
`;

const ToggleButton = styled(Button)`
  height: 60px;
  width: 60px;
`;

const CustomCaret = styled(CaretDownFilled)`
  color: #009db8;
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
  height: 40px;
  display: flex;
  align-items: center;
  border-color: #009db8;
  font-size: 14px;
  font-family: ArialAMU;
  color: #000;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 55px;
  border-color: #009db8;
`;

const FormLabelCell = styled.div`
  padding-left: 12px;
  padding-right: 12px;
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
      <Row align="middle" gutter={[10, 50]}>
        <Col
          xxl={{span: 1, offset: 3}}
          xl={{span: 1, offset: 2}}
          lg={{span: 1, offset: 1}}
        >
          <HeadIcon src={VacationImg} alt={'icon'} />
        </Col>
        <Col xxl={13} xl={14} lg={15} md={16} span={17}>
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
            <Col
              xxl={{span: 9, offset: 4}}
              xl={{span: 10, offset: 3}}
              lg={{span: 12, offset: 2}}
              span={19}
              offset={1}
            >
              <Title level={4}>
                Ժամանակահատված, որի ընթացքում աշխատողը գտնվել(ու) է արձակուրդի մեջ
              </Title>
            </Col>
          </Row>
          <Row align="middle" gutter={[20, 20]}>
            <Col
              xxl={{span: 2, offset: 4}}
              xl={{span: 3, offset: 3}}
              lg={{span: 4, offset: 2}}
              span={4}
              offset={1}
            >
              <FormLabelCell>
                <Text>Սկիզբ</Text>
              </FormLabelCell>
            </Col>
            <Col xxl={3} xl={4} lg={5} span={6}>
              <StyledDatePicker
                suffixIcon={<CustomCaret />}
                size="large"
                format="DD.MM.YYYY"
              />
            </Col>
            <Col
              xxl={2}
              xl={3}
              lg={4}
              span={4}
            >
              <FormLabelCell>
                <Text>Ավարտ</Text>
              </FormLabelCell>
            </Col>
            <Col xxl={3} xl={4} lg={5} span={6}>
              <StyledDatePicker
                suffixIcon={<CustomCaret />}
                size="large"
                format="DD.MM.YYYY"
              />
            </Col>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default VacationCalculator;