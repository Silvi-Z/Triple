import React, { useState } from 'react';
import { Typography, Row, Col, Button, InputNumber, Spin } from 'antd';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiHelper } from '../../helpers/apiHelper';
import SalaryImg from '../../assets/calcImages/salary.png';
import {
  FormIcon,
  FormHeader,
  FormToggle,
  FormLabelLong,
} from './calcComponents';

const { Text } = Typography;

const H3Styled = styled.h3`
  font-size: 15px;
  font-weight: 500;
  font-family: ArialAMU;
  color: #000;
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

const ButtonSubmit = styled(Button)`
  height: 46px;
  border-color: #009db8;
  overflow: hidden;
  padding-vertical: 0;
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

const Label2 = styled(Text)`
  font-family: ArialAMU;
  font-weight: bold;
  line-height: 20px;
  color: ${props => props.fontcolor};
  font-size: 14px;
  @media (min-width: 576px) {
    font-size: 15px;
  }
  @media (min-width: 768px) {
    font-size: 16px;
  }
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

const initialValues = {
  salary_type: false,
  patent: null,
  price: 0,
  bonus_price: 0,
  pension: true,
  bonus_stamp: true,
};

const validationSchema = Yup.object().shape({
  price: Yup.number().required().min(40000),
  bonus_price: Yup.number().transform(value => {
    if (value === 0 || value >= 1000) {
      return value;
    } else {
      return null;
    }
  }),
});

const SalaryCalculator = ({ toggleForm, showForm }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: async values => {
      setResult(null);
      setLoading(true);
      let res = {};
      let body = {};
      // TODO: refactor this filter
      if ((values.patent || values.patent === 0) && values.bonus_price) {
        body = { ...values };
      } else if (!values.patent && values.bonus_price) {
        body = {
          salary_type: values.salary_type,
          price: values.price,
          bonus_price: values.bonus_price,
          pension: values.pension,
          bonus_stamp: values.bonus_stamp,
        };
      } else if ((values.patent || values.patent === 0) && !values.bonus_price) {
        body = {
          salary_type: values.salary_type,
          price: values.price,
          pension: values.pension,
          bonus_stamp: values.bonus_stamp,
          patent: values.patent,
        };
      } else if (!values.patent && !values.bonus_price) {
        body = {
          salary_type: values.salary_type,
          price: values.price,
          pension: values.pension,
          bonus_stamp: values.bonus_stamp,
        };
      }

      if (!values.price) {
        delete body.price;
      }

      console.log('Formik values: ', values);
      console.log('Body: ', body);
      try {
        res = await apiHelper.post('/api/counter/salary', body);
        console.log('Response: ', res.data.data.result);
        setResult(res.data.data.result);
      } catch (e) {
        console.log('Calculation error: ', e);
      }
      setLoading(false);
    },
  });

  return (
    <>
      <Row align="middle" gutter={[10, 40]}>
        <FormIcon iconImg={SalaryImg} />
        <FormHeader headerText={'Աշխատավարձի հաշվիչ'} />
        <FormToggle showForm={showForm} onClick={toggleForm} />
      </Row>

      {showForm ? (
        <>
          <form onSubmit={formik.handleSubmit}>
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
                  type={!formik.values.salary_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('salary_type', false)}
                >
                  <Label fontcolor={!formik.values.salary_type ? '#fff' : '#000'}>
                    Մաքուր
                  </Label>
                </ButtonBase>
              </Col>
              <Col xxl={5} xl={6} lg={7} md={9} sm={11} span={11}>
                <ButtonBase
                  type={formik.values.salary_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('salary_type', true)}
                >
                  <Label fontcolor={formik.values.salary_type ? '#fff' : '#000'}>
                    Կեղտոտ
                  </Label>
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 3, offset: 6 }}
                xl={{ span: 3, offset: 5 }}
                lg={{ span: 4, offset: 4 }}
                md={{ span: 5, offset: 2 }}
                sm={{ span: 7, offset: 1 }}
                span={7}
              >
                <ButtonLarge
                  type={
                    formik.values.patent !== 1 && formik.values.patent !== 0
                      ? 'primary'
                      : 'default'
                  }
                  // size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', null)}
                >
                  <Label fontcolor={
                    formik.values.patent !== 1 && formik.values.patent !== 0
                      ? '#fff'
                      : '#000'
                  }>
                    Ընդհանուր
                    <br />
                    հարկման դաշտ
                  </Label>
                </ButtonLarge>
              </Col>
              <Col xxl={4} xl={6} lg={6} md={8} sm={10} span={11}>
                <ButtonLarge
                  type={formik.values.patent === 1 ? 'primary' : 'default'}
                  // size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', 1)}
                >
                  <Label fontcolor={
                    formik.values.patent === 1
                      ? '#fff'
                      : '#000'
                  }>
                    Միկրոձեռնարկատիրության
                    <br />
                    սուբյեկտ
                  </Label>
                </ButtonLarge>
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <ButtonLarge
                  type={formik.values.patent === 0 ? 'primary' : 'default'}
                  // size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', 0)}
                >
                  <Label fontcolor={
                    formik.values.patent === 0
                      ? '#fff'
                      : '#000'
                  }>
                    ՏՏ ոլորտի
                    <br />
                    Արտոնագիր
                  </Label>
                </ButtonLarge>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <FormLabelLong text={'Աշխատավարձ'} />
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  id="price"
                  name="price"
                  type="number"
                  onChange={value => formik.setFieldValue('price', value)}
                  value={formik.values.price}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <FormLabelLong text={'Պարգևավճար'} />
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <StyledInputNumber
                  min={0}
                  id="bonus_price"
                  name="bonus_price"
                  type="number"
                  onChange={value => formik.setFieldValue('bonus_price', value)}
                  value={formik.values.bonus_price}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <FormLabelLong text={'Մասնակցու՞մ եք կուտակային կենսաթոշակայինին'} />
              <Col>
                <ButtonSmall
                  type={formik.values.pension ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('pension', true)}
                >
                  <Label fontcolor={
                    formik.values.pension
                      ? '#fff'
                      : '#000'
                  }>
                    Այո
                  </Label>
                </ButtonSmall>
              </Col>
              <Col>
                <ButtonSmall
                  type={!formik.values.pension ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('pension', false)}
                >
                  <Label fontcolor={
                    !formik.values.pension
                      ? '#fff'
                      : '#000'
                  }>
                    Ոչ
                  </Label>
                </ButtonSmall>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 30]}>
              <FormLabelLong text={'Վճարե՞լ եք արդեն դրոշմանիշային վճարը'} />
              <Col>
                <ButtonSmall
                  type={formik.values.bonus_stamp ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('bonus_stamp', true)}
                >
                  <Label fontcolor={
                    formik.values.bonus_stamp
                      ? '#fff'
                      : '#000'
                  }>
                    Այո
                  </Label>
                </ButtonSmall>
              </Col>
              <Col>
                <ButtonSmall
                  type={!formik.values.bonus_stamp ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('bonus_stamp', false)}
                >
                  <Label fontcolor={
                    !formik.values.bonus_stamp
                      ? '#fff'
                      : '#000'
                  }>
                    Ոչ
                  </Label>
                </ButtonSmall>
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
                  disabled={loading || !formik.isValid}
                  size="large"
                  block
                  htmlType="submit"
                >
                  {loading ? <Spin /> : 'Հաշվել'}
                </ButtonSubmit>
              </Col>
            </Row>
          </form>
          {result ? (
            <>
              <Row align="middle" gutter={[5, 10]}>
                <Col
                  xxl={{ span: 4, offset: 6 }}
                  xl={{ span: 4, offset: 5 }}
                  lg={{ span: 5, offset: 4 }}
                  md={{span: 6, offset: 2}}
                  offset={1}
                  span={10}
                >
                  <H3Styled>Արդյունք</H3Styled>
                </Col>
              </Row>

              <Row>
                <Col
                  xxl={{ span: 7, offset: 6 }}
                  xl={{ span: 9, offset: 5 }}
                  lg={{ span: 9, offset: 4 }}
                  md={{ span: 21, offset: 2 }}
                  offset={1}
                  span={20}
                >
                  <Row gutter={[10, 10]}>
                    <Col span={16}>
                      <ResultCell>
                        <Label fontcolor="#fff">Ընդհանուր պահում</Label>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell>
                        <Label fontcolor="#fff">{result.allTaxPrice}</Label>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={16}>
                      <ResultCell>
                        <Label fontcolor="#fff">Եկամտային հարկ</Label>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell>
                        <Label fontcolor="#fff">{result.taxPrice}</Label>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={16}>
                      <ResultCell>
                        <Label fontcolor="#fff">Կենսաթոշակային վճար</Label>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell>
                        <Label fontcolor="#fff">{result.pensionPrice}</Label>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={16}>
                      <ResultCell>
                        <Label fontcolor="#fff">Դրոշմանիշային վճար</Label>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell>
                        <Label fontcolor="#fff">{result.stampPrice}</Label>
                      </ResultCell>
                    </Col>
                  </Row>
                </Col>

                <Col
                  xxl={{ span: 9, offset: 0 }}
                  xl={{ span: 9, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  md={{span: 20, offset: 2}}
                  span={20}
                  offset={1}
                >
                  <Row gutter={[10, 10]}>
                    <Col span={9}>
                      <ResultCell large>
                        <Label2 fontcolor="#fff">
                          {`${
                            +result.salary_type ? 'Մաքուր' : 'Կեղտոտ'
                          } աշխատավարձ`}
                        </Label2>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell large>
                        <Label2 fontcolor="#fff">
                          {result.salary}
                        </Label2>
                      </ResultCell>
                    </Col>
                  </Row>

                  {result.bonusSalary ? (<Row gutter={[10, 10]}>
                    <Col span={9}>
                      <ResultCell large>
                        <Label2 fontcolor="#fff">
                          {`${
                            +result.salary_type ? 'Մաքուր' : 'Կեղտոտ'
                          } պարգևավճար`}
                        </Label2>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell large>
                        <Label2 fontcolor="#fff">
                          {result.bonusSalary}
                        </Label2>
                      </ResultCell>
                    </Col>
                  </Row>) : null}
                </Col>
              </Row>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default SalaryCalculator;
