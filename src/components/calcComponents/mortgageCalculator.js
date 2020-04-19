import React, { useState, useRef } from 'react';
import {
  Typography,
  Row,
  Col,
  Button,
  InputNumber,
  Spin,
} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { apiHelper } from '../../helpers/apiHelper';
import ContractImg from '../../assets/calcImages/contract.png';

const { Text } = Typography;

const HeadIconWrapper = styled.div`
  width: 25px;
  height: 25px;
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
  }
  @media (min-width: 992px) {
    width: 35px;
    height: 35px;
  }
  @media (min-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 1600px) {
    width: 50px;
    height: 50px;
  }
`;

const HeadIcon = styled.img`
  width: 25px;
  height: 25px;
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
  }
  @media (min-width: 992px) {
    width: 35px;
    height: 35px;
  }
  @media (min-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 1600px) {
    width: 50px;
    height: 50px;
  }
`;

const H2Styled = styled.h2`
  font-weight: normal;
  margin-bottom: 0;
  margin-left: 10px;
  font-family: ArialAMU;
  color: #000;
  font-size: 17px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const H3Styled = styled.h3`
  font-size: 15px;
  font-weight: 500;
  font-family: ArialAMU;
  color: #000;
`;

const ToggleButton = styled(Button)`
  height: 48px;
  width: 48px;
  @media (min-width: 992px) {
    height: 60px;
    width: 60px;
  }
`;

const StyledMinus = styled(MinusOutlined)`
  color: #009db8;
  font-size: 16px;
  @media (min-width: 992px) {
    font-size: 20px;
  }
`;

const StyledPlus = styled(PlusOutlined)`
  color: #009db8;
  font-size: 16px;
  @media (min-width: 992px) {
    font-size: 20px;
  }
`;

const ButtonBase = styled(Button)`
  height: 40px;
  border-color: #009db8;
  overflow: hidden;
`;

const ButtonSubmit = styled(Button)`
  height: 46px;
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

const ResultCellLight = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: #fff;
  border: 1px solid #009db8;
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

const currentYear = +moment().format('YYYY');
const years = [];

for (let i = currentYear; i >= 1900; i--) {
  years.push(i);
}

const months = [
  'Հունվար',
  'Փետրվար',
  'Մարտ',
  'Ապրիլ',
  'Մայիս',
  'Հունիս',
  'Հուլիս',
  'Օգոստոս',
  'Սեպտեմբեր',
  'Հոկտեմբեր',
  'Նոյեմբեր',
  'Դեկտեմբեր',
];

const monthCurrent = +moment().format('M') - 1;
const monthPrev1 = !monthCurrent ? 12 : monthCurrent - 1;
const monthPrev2 = !monthPrev1 ? 12 : monthPrev1 - 1;

const initialValuesOne = {
  price_type: false,
  patent: false,
  price1: 0,
  price2: 0,
  price3: 0,
  bonus_price1: 0,
  bonus_price2: 0,
  bonus_price3: 0,
  additional_price1: 0,
  additional_price2: 0,
  additional_price3: 0,
};

const schemaOne = Yup.object().shape({
  price1: Yup.number()
    .required()
    .min(40000),
  price2: Yup.number()
    .required()
    .min(40000),
  price3: Yup.number()
    .required()
    .min(40000),
});

const schemaTwo = Yup.object().shape({
  price1: Yup.number()
    .required()
    .min(40000),
  price2: Yup.number()
    .required()
    .min(40000),
  price3: Yup.number()
    .required()
    .min(40000),
  paid_price: Yup.number()
    .required()
    .min(1),
});

const MortgageCalculator = () => {
  const monthOne = useRef(1);
  const monthTwo = useRef(2);
  const monthThree = useRef(3);
  const [showForm, toggleForm] = useState(false);
  const [salary, setSalary] = useState(0); // autofill salary
  const [loadingOne, toggleLoadingOne] = useState(false);
  const [loadingTwo, toggleLoadingTwo] = useState(false);
  const [initialValuesTwo, setInitialValuesTwo] = useState({
    price_type: false,
    patent: false,
    price1: 0,
    price2: 0,
    price3: 0,
    bonus_price1: 0,
    bonus_price2: 0,
    bonus_price3: 0,
    additional_price1: 0,
    additional_price2: 0,
    additional_price3: 0,
    paid_price: 0,
  });
  const [resultOne, setResultOne] = useState(0);
  const [resultTwo, setResultTwo] = useState(0);

  const formikOne = useFormik({
    initialValues: initialValuesOne,
    validationSchema: schemaOne,
    validateOnMount: true,
    onSubmit: async values => {
      console.log('Formik values: ', values);
      toggleLoadingOne(true);
      try {
        const res = await apiHelper.post(
          '/api/counter/income_tax_return',
          values
        );
        console.log('Response: ', res.data);
        if (res.data.success) {
          setResultOne(res.data.data.returnedTaxPrice);
          setInitialValuesTwo({
            ...values,
            paid_price: res.data.data.returnedTaxPrice,
          });
        }
      } catch (e) {
        console.log('Error: ', e);
      }
      toggleLoadingOne(false);
    },
  });

  const formikTwo = useFormik({
    initialValues: initialValuesTwo,
    validationSchema: schemaTwo,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async values => {
      console.log('Formik values 2: ', values);
      toggleLoadingTwo(true);
      try {
        const res = await apiHelper.post(
          '/api/counter/income_tax_return',
          values
        );
        console.log('Response: ', res.data);
        if (res.data.success) {
          setResultTwo(res.data);
        }
      } catch (e) {
        console.log('Error: ', e);
      }
      toggleLoadingTwo(false);
    },
  });

  return (
    <>
      <Row align="middle" gutter={[10, 40]}>
        <Col
          xxl={{ offset: 4 }}
          xl={{ offset: 4 }}
          lg={{ offset: 3 }}
          md={{ offset: 1 }}
        >
          <HeadIconWrapper>
            <HeadIcon src={ContractImg} alt={'icon'} />
          </HeadIconWrapper>
        </Col>
        <Col xxl={14} xl={14} lg={15} md={19} sm={19} span={18}>
          <H2Styled>Հիփոթեքի տոկոսագումարի ետ վերադարձի հաշվիչ</H2Styled>
        </Col>
        <Col>
          <ToggleButton block onClick={() => toggleForm(!showForm)}>
            {showForm ? <StyledMinus /> : <StyledPlus />}
          </ToggleButton>
        </Col>
      </Row>

      {showForm ? (
        <>
          <form onSubmit={formikOne.handleSubmit}>
            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 5, offset: 6 }}
                xl={{ span: 6, offset: 5 }}
                lg={{ span: 7, offset: 4 }}
                md={{ span: 9, offset: 2 }}
                sm={{ span: 11, offset: 1 }}
                span={11}
              >
                <ButtonBase
                  type={!formikOne.values.price_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('price_type', false)}
                >
                  <Label fontcolor={
                    !formikOne.values.price_type
                      ? '#fff'
                      : '#000'
                  }>
                    Մաքուր
                  </Label>
                </ButtonBase>
              </Col>
              <Col xxl={5} xl={6} lg={7} md={9} sm={11} span={11}>
                <ButtonBase
                  type={formikOne.values.price_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('price_type', true)}
                >
                  <Label fontcolor={
                    formikOne.values.price_type
                      ? '#fff'
                      : '#000'
                  }>
                    Կեղտոտ
                  </Label>
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 5, offset: 6 }}
                xl={{ span: 6, offset: 5 }}
                lg={{ span: 7, offset: 4 }}
                md={{ span: 9, offset: 2 }}
                sm={{ span: 11, offset: 1 }}
                span={11}
              >
                <ButtonBase
                  type={!formikOne.values.patent ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('patent', false)}
                >
                  <Label fontcolor={
                    !formikOne.values.patent
                      ? '#fff'
                      : '#000'
                  }>
                    ՏՏ ոլորտի Արտոնագիր
                  </Label>
                </ButtonBase>
              </Col>
              <Col xxl={5} xl={6} lg={7} md={9} sm={11} span={11}>
                <ButtonBase
                  type={formikOne.values.patent ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('patent', true)}
                >
                  <Label fontcolor={
                    formikOne.values.patent
                      ? '#fff'
                      : '#000'
                  }>
                    Ընդհանուր հարկման դաշտ
                  </Label>
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 20]}>
              <Col
                xxl={{ span: 6, offset: 6 }}
                xl={{ span: 7, offset: 5 }}
                lg={{ span: 8, offset: 4 }}
                md={{ span: 10, offset: 2 }}
                sm={{ span: 13, offset: 1 }}
                span={12}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    Աշխատողի ամսական աշխատավարձ
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={4} md={4} sm={4} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value => setSalary(value)}
                  value={salary}
                />
              </Col>
              <Col xxl={3} xl={3} lg={4} md={4} sm={5} span={5}>
                <ButtonBase
                  type="primary"
                  size="large"
                  block
                  onClick={() => {
                    formikOne.setFieldValue('price1', salary);
                    formikOne.setFieldValue('price2', salary);
                    formikOne.setFieldValue('price3', salary);
                    formikOne.validateForm().then(res => {
                      console.log('Validation fired: ', res);
                      console.log(formikOne.values);
                    });
                    console.log('Ref test', monthOne.current);
                  }}
                >
                  <Label fontcolor="#fff">
                    Լրացնել
                  </Label>
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 20]}>
              <Col
                xxl={{ span: 2, offset: 6 }}
                xl={{ span: 3, offset: 5 }}
                lg={{ span: 3, offset: 4 }}
                md={{ span: 4, offset: 2 }}
                sm={{ span: 5, offset: 1 }}
                span={5}
              >
                <TabHeadCell>
                  <Label fontcolor="#000">Ամիս</Label>
                </TabHeadCell>
              </Col>
              <Col xxl={3} xl={4} lg={4} md={5} sm={5} span={6}>
                <TabHeadCell>
                  <Label fontcolor="#000">Համախառն աշխատավարձ</Label>
                </TabHeadCell>
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <TabHeadCell>
                  <Label fontcolor="#000">Պարգևավճար</Label>
                </TabHeadCell>
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <TabHeadCell>
                  <Label fontcolor="#000">Հավելավճար</Label>
                </TabHeadCell>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 2, offset: 6 }}
                xl={{ span: 3, offset: 5 }}
                lg={{ span: 3, offset: 4 }}
                md={{ span: 4, offset: 2 }}
                sm={{ span: 5, offset: 1 }}
                span={5}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    {months[monthPrev2]}
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={4} lg={4} md={5} sm={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value => formikOne.setFieldValue('price1', value)}
                  value={formikOne.values.price1}
                  ref={monthOne}
                />
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('bonus_price1', value)
                  }
                  value={formikOne.values.bonus_price1}
                />
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('additional_price1', value)
                  }
                  value={formikOne.values.additional_price1}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 2, offset: 6 }}
                xl={{ span: 3, offset: 5 }}
                lg={{ span: 3, offset: 4 }}
                md={{ span: 4, offset: 2 }}
                sm={{ span: 5, offset: 1 }}
                span={5}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    {months[monthPrev1]}
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={4} lg={4} md={5} sm={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value => formikOne.setFieldValue('price2', value)}
                  value={formikOne.values.price2}
                  ref={monthTwo}
                />
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('bonus_price2', value)
                  }
                  value={formikOne.values.bonus_price2}
                />
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('additional_price2', value)
                  }
                  value={formikOne.values.additional_price2}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 30]}>
              <Col
                xxl={{ span: 2, offset: 6 }}
                xl={{ span: 3, offset: 5 }}
                lg={{ span: 3, offset: 4 }}
                md={{ span: 4, offset: 2 }}
                sm={{ span: 5, offset: 1 }}
                span={5}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    {months[monthCurrent]}
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={4} lg={4} md={5} sm={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value => formikOne.setFieldValue('price3', value)}
                  value={formikOne.values.price3}
                  ref={monthThree}
                />
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('bonus_price3', value)
                  }
                  value={formikOne.values.bonus_price3}
                />
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('additional_price3', value)
                  }
                  value={formikOne.values.additional_price3}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 30]}>
              <Col
                xxl={{ span: 4, offset: 6 }}
                xl={{ span: 4, offset: 5 }}
                lg={{ span: 5, offset: 4 }}
                md={{ span: 7, offset: 2 }}
                sm={{ span: 7, offset: 2 }}
                span={8}
              >
                <ButtonSubmit
                  disabled={loadingOne || !formikOne.isValid}
                  size="large"
                  block
                  htmlType="submit"
                >
                  {loadingOne ? <Spin /> : 'Հաշվել'}
                </ButtonSubmit>
              </Col>
            </Row>
          </form>

          <form onSubmit={formikTwo.handleSubmit}>
            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 7, offset: 6 }}
                xl={{ span: 8, offset: 5 }}
                lg={{ span: 10, offset: 4 }}
                md={{ span: 14, offset: 2 }}
                sm={{ span: 16, offset: 1 }}
                span={17}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    Հաշվետու եռամսյակում եկամտային հարկը
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={4} span={6}>
                <ResultCellLight>
                  <Label fontcolor="#000">
                    {resultOne}
                  </Label>
                </ResultCellLight>
              </Col>
            </Row>
            <Row align="middle" gutter={[10, 30]}>
              <Col
                xxl={{ span: 7, offset: 6 }}
                xl={{ span: 8, offset: 5 }}
                lg={{ span: 10, offset: 4 }}
                md={{ span: 14, offset: 2 }}
                sm={{ span: 16, offset: 1 }}
                span={17}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    Հաշվետու եռամսյակում վճարած տոկոսագումար
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={4} span={6}>
                <StyledInputNumber
                  min={0}
                  type="number"
                  onChange={value => formikTwo.setFieldValue('paid_price', value)}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 30]}>
              <Col
                xxl={{ span: 4, offset: 6 }}
                xl={{ span: 4, offset: 5 }}
                lg={{ span: 5, offset: 4 }}
                md={{ span: 7, offset: 2 }}
                sm={{ span: 7, offset: 2 }}
                span={8}
              >
                <ButtonSubmit
                  disabled={loadingTwo || !formikTwo.isValid}
                  size="large"
                  block
                  htmlType="submit"
                >
                  {loadingTwo ? <Spin /> : 'Հաշվել'}
                </ButtonSubmit>
              </Col>
            </Row>
          </form>
          {resultTwo && resultTwo.success ? (
            <>
              <Row align="middle" gutter={[5, 10]}>
                <Col
                  xxl={{ span: 4, offset: 6 }}
                  xl={{ span: 5, offset: 5 }}
                  lg={{ span: 8, offset: 4 }}
                  md={{span: 6, offset: 2}}
                  offset={1}
                  span={10}
                >
                  <H3Styled>Արդյունք</H3Styled>
                </Col>
              </Row>

              <Row>
                <Col
                  xxl={{ span: 14, offset: 6 }}
                  xl={{ span: 17, offset: 5 }}
                  lg={{ span: 19, offset: 4 }}
                  md={{ span: 24, offset: 2 }}
                  sm={24}
                  offset={1}
                  span={24}
                >
                  <Row gutter={[10, 10]}>
                    <Col sm={15} span={14}>
                      <ResultCell>
                        <Label fontcolor="#fff">
                          Ետ վերադարձվող եկամտային հարկ
                        </Label>
                      </ResultCell>
                    </Col>
                    <Col xs={6} sm={5} span={4}>
                      <ResultCell>
                        <Label fontcolor="#fff">
                          {resultTwo.data.returnedTaxPrice}
                        </Label>
                      </ResultCell>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default MortgageCalculator;
