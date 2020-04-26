import React, { useState } from 'react';
import { Typography, Row, Col, Button, InputNumber, DatePicker } from 'antd';
import {
  CaretDownFilled,
  // QuestionCircleOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiHelper } from '../../helpers/apiHelper';
import CalcImg from '../../assets/calcImages/nonworking.png';
import {
  FormIcon,
  FormHeader,
  FormToggle,
  Description,
  ToggleLarge,
  ToggleRegular,
  FormLabelLong,
  SubmitButton,
  CalcTableRow,
} from './calcComponents';

const { Text } = Typography;

const H3Styled = styled.h3`
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  font-family: ArialAMU;
  color: #000;
`;

// const StyledQuestion = styled(QuestionCircleOutlined)`
//   color: #009db8;
//   font-size: 16px;
//   @media (min-width: 992px) {
//     font-size: 20px;
//     margin-right: 15px;
//   }
// `;

const CustomCaret = styled(CaretDownFilled)`
  color: #009db8;
`;

const ButtonBase = styled(Button)`
  height: 40px;
  border-color: #009db8;
  overflow: hidden;
`;

const ButtonSmall = styled(Button)`
  height: 40px;
  width: 40px;
  border-color: #009db8;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonLarge = styled(Button)`
  height: 54px;
  border-color: #009db8;
  overflow: hidden;
  padding-vertical: 0;
`;

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-color: #009db8;
  font-size: 13px;
  font-family: ArialAMU;
  color: #000;
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  width: 130px;
  border-color: #009db8;
`;

const FormLabelCell = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #d7d7d7;
  background-color: #fff;
`;

const Label = styled(Text)`
  text-align: ${props => props.left ? 'left' : 'center'};
  font-family: ArialAMU;
  font-weight: bold;
  line-height: 20px;
  color: ${props => props.fontcolor};
  font-size: 12px;
  @media (min-width: 576px) {
    font-size: 13px;
  }
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const TabHeadCell = styled.div`
  padding-left: 16px;
  padding-top: 4px;
  padding-right: 16px;
  height: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
`;

const ResultCell = styled.div`
  background-color: #21363d;
  padding-left: 16px;
  padding-right: 16px;
  height: ${props => (props.large ? 60 : 40)}px;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.large ? 'center' : 'flex-start')};
  text-align: center;
`;

const NonWorkingCalculator = () => {
  const [showForm, toggleForm] = useState(false);

  return (
    <>
      <Row align="middle" gutter={[10, 40]}>
        <FormIcon iconImg={CalcImg} />
        <FormHeader headerText={'Անաշխատունակության նպաստի հաշվիչ'} />
        <FormToggle
          showForm={showForm}
          onClick={() => toggleForm(!showForm)}
        />
      </Row>
    </>
  );
};

export default NonWorkingCalculator;