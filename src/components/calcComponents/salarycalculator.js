import React, { useState } from 'react';
import { Typography, Row, Col, Button, InputNumber, Spin } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiHelper } from '../../helpers/apiHelper';
import SalaryImg from '../../assets/calcImages/salary.png';

const { Text } = Typography;

const HeadIcon = styled.img`
  width: 25px;
  height: 25px;
  @media (min-width: 1200px) {
    width: 35px;
    height: 35px;
  }
  @media (min-width: 1600px) {
    width: 35px;
    height: 35px;
  }
`;

const H2Styled = styled.h2`
  font-size: 18px;
  font-weight: normal;
  margin-left: 10px;
`;

const H3Styled = styled.h3`
  font-size: 24px;
  font-weight: 400;
`;

const ToggleButton = styled(Button)`
  height: 60px;
  width: 60px;
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

const ButtonLabel = styled(Text)`
  font-size: 14px;
  font-family: ArialAMU;
  font-weight: bold;
  line-height: 20px;
  color: ${props => props.fontColor};
`;

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-color: #009db8;
  font-size: 14px;
`;

const FormLabelCell = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #d7d7d7;
`;

const ResultCell = styled.div`
  background-color: #21363d;
  padding-left: 16px;
  padding-right: 16px;
  height: ${props => (props.large ? 80 : 60)}px;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.large ? 'center' : 'flex-start')};
  text-align: center;
`;

const ResultLabel = styled(Text)`
  color: #fff;
  font-weight: 600;
  font-size: ${props => (props.large ? 18 : 16)}px;
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

const SalaryCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showForm, toggleForm] = useState(false);

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
      } else if (
        (values.patent || values.patent === 0) &&
        !values.bonus_price
      ) {
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
        <Col
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 2 }}
          lg={{ span: 1, offset: 1 }}
        >
          <HeadIcon src={SalaryImg} alt={'icon'} />
        </Col>
        <Col xxl={13} xl={14} lg={15} md={16} span={17}>
          <H2Styled>Աշխատավարձի հաշվիչ</H2Styled>
        </Col>
        <Col span={2}>
          <ToggleButton block onClick={() => toggleForm(!showForm)}>
            {showForm ? (
              <MinusOutlined style={{ fontSize: '20px' }} />
            ) : (
                <PlusOutlined style={{ fontSize: '20px' }} />
              )}
          </ToggleButton>
        </Col>
      </Row>

      {showForm ? (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 5, offset: 4 }}
                xl={{ span: 5, offset: 3 }}
                lg={{ span: 6, offset: 2 }}
                offset={1}
                span={7}
              >
                <ButtonBase
                  type={!formik.values.salary_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('salary_type', false)}
                >
                  <ButtonLabel fontColor={!formik.values.salary_type ? '#fff' : '#009db8'}>
                    Մաքուր
                  </ButtonLabel>
                </ButtonBase>
              </Col>
              <Col xxl={5} xl={5} lg={6} span={7}>
                <ButtonBase
                  type={formik.values.salary_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('salary_type', true)}
                >
                  <ButtonLabel fontColor={formik.values.salary_type ? '#fff' : '#009db8'}>
                    Կեղտոտ
                  </ButtonLabel>
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 3, offset: 4 }}
                xl={{ span: 4, offset: 3 }}
                lg={{ span: 5, offset: 2 }}
                offset={1}
                span={6}
              >
                <ButtonLarge
                  type={
                    formik.values.patent !== 1 && formik.values.patent !== 0
                      ? 'primary'
                      : 'default'
                  }
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', null)}
                >
                  <ButtonLabel fontColor={
                    formik.values.patent !== 1 && formik.values.patent !== 0
                      ? '#fff'
                      : '#009db8'
                  }>
                    Ընդհանուր
                    <br />
                    հարկման դաշտ
                  </ButtonLabel>
                </ButtonLarge>
              </Col>
              <Col xxl={4} xl={4} lg={5} span={6}>
                <ButtonLarge
                  type={formik.values.patent === 1 ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', 1)}
                >
                  <ButtonLabel fontColor={
                    formik.values.patent === 1
                      ? '#fff'
                      : '#009db8'
                  }>
                    Միկրոձեռնարկատիրության
                    <br />
                    սուբյեկտ
                  </ButtonLabel>
                </ButtonLarge>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <ButtonLarge
                  type={formik.values.patent === 0 ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', 0)}
                >
                  <ButtonLabel fontColor={
                    formik.values.patent === 0
                      ? '#fff'
                      : '#009db8'
                  }>
                    ՏՏ ոլորտի
                    <br />
                    Արտոնագիր
                  </ButtonLabel>
                </ButtonLarge>
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 7, offset: 4 }}
                xl={{ span: 7, offset: 3 }}
                lg={{ span: 8, offset: 2 }}
                offset={1}
                span={10}
              >
                <FormLabelCell>
                  <ButtonLabel fontColor="#000">
                    Աշխատավարձ
                  </ButtonLabel>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={4} span={5}>
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

            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 7, offset: 4 }}
                xl={{ span: 7, offset: 3 }}
                lg={{ span: 8, offset: 2 }}
                offset={1}
                span={10}
              >
                <FormLabelCell>
                  <ButtonLabel fontColor="#000">
                    Պարգևավճար
                  </ButtonLabel>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
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

            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 8, offset: 4 }}
                xl={{ span: 12, offset: 3 }}
                lg={{ span: 12, offset: 2 }}
                offset={1}
                span={16}
              >
                <FormLabelCell>
                  <ButtonLabel fontColor="#000">
                    Մասնակցու՞մ եք կուտակային կենսաթոշակայինին
                  </ButtonLabel>
                </FormLabelCell>
              </Col>
              <Col>
                <ButtonSmall
                  type={formik.values.pension ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('pension', true)}
                >
                  <ButtonLabel fontColor={
                    formik.values.pension
                      ? '#fff'
                      : '#009db8'
                  }>
                    Այո
                  </ButtonLabel>
                </ButtonSmall>
              </Col>
              <Col>
                <ButtonSmall
                  type={!formik.values.pension ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('pension', false)}
                >
                  <ButtonLabel fontColor={
                    !formik.values.pension
                      ? '#fff'
                      : '#009db8'
                  }>
                    Ոչ
                  </ButtonLabel>
                </ButtonSmall>
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 40]}>
              <Col
                xxl={{ span: 8, offset: 4 }}
                xl={{ span: 12, offset: 3 }}
                lg={{ span: 12, offset: 2 }}
                offset={1}
                span={16}
              >
                <FormLabelCell>
                  <ButtonLabel fontColor="#000">
                    Վճարե՞լ եք արդեն դրոշմանիշային վճարը
                  </ButtonLabel>
                </FormLabelCell>
              </Col>
              <Col>
                <ButtonSmall
                  type={formik.values.bonus_stamp ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('bonus_stamp', true)}
                >
                  <ButtonLabel fontColor={
                    formik.values.bonus_stamp
                      ? '#fff'
                      : '#009db8'
                  }>
                    Այո
                  </ButtonLabel>
                </ButtonSmall>
              </Col>
              <Col>
                <ButtonSmall
                  type={!formik.values.bonus_stamp ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('bonus_stamp', false)}
                >
                  <ButtonLabel fontColor={
                    !formik.values.bonus_stamp
                      ? '#fff'
                      : '#009db8'
                  }>
                    Ոչ
                  </ButtonLabel>
                </ButtonSmall>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 40]}>
              <Col
                xxl={{ span: 4, offset: 4 }}
                xl={{ span: 5, offset: 3 }}
                lg={{ span: 5, offset: 2 }}
                offset={1}
                span={8}
              >
                <ButtonLarge
                  disabled={loading || !formik.isValid}
                  size="large"
                  block htmlType="submit"
                >
                  {loading ? <Spin /> : 'Հաշվել'}
                </ButtonLarge>
              </Col>
            </Row>
          </form>
          {result ? (
            <>
              <Row align="middle" gutter={[5, 30]}>
                <Col
                  xxl={{ span: 4, offset: 4 }}
                  xl={{ span: 6, offset: 3 }}
                  lg={{ span: 8, offset: 2 }}
                  offset={1}
                  span={10}
                >
                  <H3Styled>Արդյունք</H3Styled>
                </Col>
              </Row>

              <Row gutter={[1, 1]}>
                <Col
                  xxl={{ span: 9, offset: 4 }}
                  xl={{ span: 10, offset: 3 }}
                  lg={{ span: 11, offset: 2 }}
                  offset={1}
                  span={20}
                >
                  <Row gutter={[10, 10]}>
                    <Col span={16}>
                      <ResultCell>
                        <ResultLabel>Ընդհանուր պահում</ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell>
                        <ResultLabel>{result.allTaxPrice}</ResultLabel>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={16}>
                      <ResultCell>
                        <ResultLabel>Եկամտային հարկ</ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell>
                        <ResultLabel>{result.taxPrice}</ResultLabel>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={16}>
                      <ResultCell>
                        <ResultLabel>Կենսաթոշակային վճար</ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell>
                        <ResultLabel>{result.pensionPrice}</ResultLabel>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={16}>
                      <ResultCell>
                        <ResultLabel>Դրոշմանիշային վճար</ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell>
                        <ResultLabel>{result.stampPrice}</ResultLabel>
                      </ResultCell>
                    </Col>
                  </Row>
                </Col>

                <Col
                  xxl={{ span: 9, offset: 0 }}
                  xl={{ span: 10, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  span={20}
                  offset={1}
                >
                  <Row gutter={[10, 10]}>
                    <Col span={9}>
                      <ResultCell large>
                        <ResultLabel large>
                          {`${
                            +result.salary_type ? 'Մաքուր' : 'Կեղտոտ'
                            } աշխատավարձ`}
                        </ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={9}>
                      <ResultCell large>
                        <ResultLabel large>{result.salary}</ResultLabel>
                      </ResultCell>
                    </Col>
                  </Row>

                  {result.bonusSalary ? (<Row gutter={[10, 10]}>
                    <Col span={9}>
                      <ResultCell large>
                        <ResultLabel large>
                          {`${
                            +result.salary_type ? 'Մաքուր' : 'Կեղտոտ'
                            } պարգևավճար`}
                        </ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={9}>
                      <ResultCell large>
                        <ResultLabel large>{result.bonusSalary}</ResultLabel>
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
