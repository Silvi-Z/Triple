import React, { useState } from 'react';
import { Typography, Row, Col, Button, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { apiHelper } from '../helpers/apiHelper';
import AccountImg from '../assets/account.png';

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

const FormLabelCell = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  height: 55px;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #d7d7d7;
`;

const ResultCell = styled.div`
  background-color: #21363d;
  padding-left: 16px;
  padding-right: 16px;
  height: ${props => props.large ? 80 : 60}px;
  display: flex;
  align-items: center;
  justify-content: ${props => props.large ? 'center' : 'flex-start'};
  text-align: center;
`;

const ResultLabel = styled(Typography)`
  color: #fff;
  font-weight: 600;
  font-size: ${props => props.large ? 18 : 16}px;
`;

const initialValues = {
  salary_type: false,
  patent: null,
  price: 0,
  bonus_price: 0,
  pension: true,
  bonus_stamp: true,
};

// const validationSchema = Yup.object().shape({
//   price: Yup.number().required().min(1000),
//   bonus_price: Yup.number().min(1000),
// });

const SalaryCalculator = () => {
  const [result, setResult] = useState(null);
  const [showForm, toggleForm] = useState(false);

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async values => {
      let res = {};
      let body = {};
      if ((values.patent || values.patent === 0) && values.bonus_price) {
        body = {...values};
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

      console.log('Formik values: ', values);
      console.log('Body: ', body);
      res = await apiHelper.post('/api/counter/salary', body);
      console.log('Response: ', res.data.data.result);
      setResult(res.data.data.result);
    },
  });

  return (
    <>
      <Row align="middle" gutter={[10, 10]}>
        <Col span={1} offset={3}>
          <HeadIcon src={AccountImg} alt={'icon'} />
        </Col>
        <Col span={16}>
          <H2Styled>Աշխատավարձի հաշվիչ</H2Styled>
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
          <form onSubmit={formik.handleSubmit}>
            <Row align="middle" gutter={[20, 20]}>
              <Col span={6} offset={4}>
                <ButtonBase
                  type={!formik.values.salary_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('salary_type', false)}
                >
                  Մաքուր
                </ButtonBase>
              </Col>
              <Col span={6}>
                <ButtonBase
                  type={formik.values.salary_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('salary_type', true)}
                >
                  Կեղտոտ
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[20, 20]}>
              <Col span={3} offset={4}>
                <ButtonLarge
                  type={formik.values.patent !== 1 && formik.values.patent !== 0
                    ? 'primary'
                    : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', null)}
                >
                  Ընդհանուր<br />հարկման դաշտ
                </ButtonLarge>
              </Col>
              <Col span={4}>
                <ButtonLarge
                  type={formik.values.patent === 1 ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', 1)}
                >
                  Միկրոձեռնարկատիրության<br />սուբյեկտ
                </ButtonLarge>
              </Col>
              <Col span={3}>
                <ButtonLarge
                  type={formik.values.patent === 0 ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', 0)}
                >
                  ՏՏ ոլորտի<br />Արտոնագիր
                </ButtonLarge>
              </Col>
            </Row>

            <Row align="middle" gutter={[20, 20]}>
              <Col span={7} offset={4}>
                <FormLabelCell>
                  Աշխատավարձ
                </FormLabelCell>
              </Col>
              <Col span={3}>
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

            <Row align="middle" gutter={[20, 20]}>
              <Col span={7} offset={4}>
                <FormLabelCell>
                  Պարգևավճար
                </FormLabelCell>
              </Col>
              <Col span={3}>
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
              <Col span={8} offset={4}>
                <FormLabelCell>
                  <Typography>Մասնակցու՞մ եք կուտակային կենսաթոշակայինին</Typography>
                </FormLabelCell>
              </Col>
              <Col span={1}>
                <ButtonBase
                  type={formik.values.pension ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('pension', true)}
                >
                  Այո
                </ButtonBase>
              </Col>
              <Col span={1}>
                <ButtonBase
                  type={!formik.values.pension ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('pension', false)}
                >
                  Ոչ
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 40]}>
              <Col span={8} offset={4}>
                <FormLabelCell>
                  <Typography>Վճարե՞լ եք արդեն դրոշմանիշային վճարը</Typography>
                </FormLabelCell>
              </Col>
              <Col span={1}>
                <ButtonBase
                  type={formik.values.bonus_stamp ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('bonus_stamp', true)}
                >
                  Այո
                </ButtonBase>
              </Col>
              <Col span={1}>
                <ButtonBase
                  type={!formik.values.bonus_stamp ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('bonus_stamp', false)}
                >
                  Ոչ
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 40]}>
              <Col span={4} offset={4}>
                <ButtonLarge
                  size="large"
                  block
                  htmlType="submit"
                >
                  Հաշվել
                </ButtonLarge>
              </Col>
            </Row>
          </form>
          {result
            ? (
              <>
                <Row align="middle" gutter={[10, 40]}>
                  <Col offset={4}>
                    <H3Styled>Արդյունք</H3Styled>
                  </Col>
                </Row>

                <Row>
                  <Col offset={4} span={9}>
                    <Row gutter={[15, 15]}>
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

                    <Row gutter={[15, 15]}>
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

                    <Row gutter={[15, 15]}>
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

                    <Row gutter={[15, 15]}>
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

                  <Col span={9}>
                    <Row gutter={[15, 15]}>
                      <Col span={9}>
                        <ResultCell large>
                          <ResultLabel large>Զուտ աշխատավարձ</ResultLabel>
                        </ResultCell>
                      </Col>
                      <Col span={9}>
                        <ResultCell large>
                          <ResultLabel large>{result.salary}</ResultLabel>
                        </ResultCell>
                      </Col>
                    </Row>

                    <Row gutter={[15, 15]}>
                      <Col span={9}>
                        <ResultCell large>
                          <ResultLabel large>Զուտ պարգևավճար</ResultLabel>
                        </ResultCell>
                      </Col>
                      <Col span={9}>
                        <ResultCell large>
                          <ResultLabel large>{result.bonusSalary}</ResultLabel>
                        </ResultCell>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            )
            : null
          }
        </>
      ) : null}

      
    </>
  );
};

export default SalaryCalculator;