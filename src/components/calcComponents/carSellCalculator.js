import React, { useState } from 'react';
import {
  Typography,
  Row,
  Col,
  Button,
  InputNumber,
  DatePicker,
  Spin,
} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { apiHelper } from '../../helpers/apiHelper';
import CarImg from '../../assets/calcImages/carSell.png';

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
  height: ${props => (props.large ? 80 : 60)}px;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.large ? 'center' : 'flex-start')};
  text-align: center;
`;

const ResultLabel = styled(Typography)`
  color: #fff;
  font-weight: 600;
  font-size: ${props => (props.large ? 18 : 16)}px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 55px;
  border-color: #009db8;
`;

const initialValues = {
  'date_from': moment().format('YYYY-MM-DD'),
  'date_to': moment().format('YYYY-MM-DD'),
  'horsepower': 0,
  'carPrice': 0,
};

const validationSchema = Yup.object().shape({
  horsepower: Yup.number().required().min(1),
  carPrice: Yup.number().required().min(100000),
});

const CarSellCalculator = () => {
  const [loading, toggleLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showForm, toggleForm] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: async values => {
      console.log('Formik values: ', values);
      setResult(null);
      toggleLoading(true);
      try {
        const res = await apiHelper.post('/api/counter/car_income_tax', values);
        setResult(res.data);
        console.log('Response: ', res.data);
      } catch (e) {
        console.log('Error: ', e);
      }
      toggleLoading(false);
    },
  });

  return (
    <>
      <Row align="middle" gutter={[10, 50]}>
        <Col
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 2 }}
          lg={{ span: 1, offset: 1 }}
        >
          <HeadIcon src={CarImg} alt={'icon'} />
        </Col>
        <Col xxl={13} xl={14} lg={15} md={16} span={17}>
          <H2Styled>Ավտոմեքենայի վաճառքի հաշվիչ</H2Styled>
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
            <Row align="middle" gutter={[20, 20]}>
              <Col
                xxl={{span: 4, offset: 4}}
                xl={{span: 5, offset: 3}}
                lg={{span: 6, offset: 2}}
                span={6}
                offset={1}
              >
                <FormLabelCell>
                  <Text>Գնման ամսաթիվ</Text>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledDatePicker
                  size="large"
                  format="DD.MM.YYYY"
                  defaultValue={moment()}
                  onChange={date => {
                    console.log(date.format('YYYY-MM-DD'));
                    formik.setFieldValue('date_from', date.format('YYYY-MM-DD'));
                  }}
                />
              </Col>
              <Col
                xxl={4}
                xl={5}
                lg={6}
                span={6}
              >
                <FormLabelCell>
                  <Text>Վաճառքի ամսաթիվ</Text>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledDatePicker
                  size="large"
                  format="DD.MM.YYYY"
                  defaultValue={moment()}
                  onChange={date => {
                    console.log(date.format('YYYY-MM-DD'));
                    formik.setFieldValue('date_to', date.format('YYYY-MM-DD'));
                  }}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 9, offset: 4 }}
                xl={{ span: 13, offset: 3 }}
                lg={{ span: 15, offset: 2 }}
                offset={1}
                span={14}
              >
                <FormLabelCell>
                Մեքենայի ձիաուժ
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={3} span={4}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  id="horsepower"
                  name="horsepower"
                  type="number"
                  onChange={value => formik.setFieldValue('horsepower', value)}
                  value={formik.values.horsepower}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 55]}>
              <Col
                xxl={{ span: 9, offset: 4 }}
                xl={{ span: 13, offset: 3 }}
                lg={{ span: 15, offset: 2 }}
                offset={1}
                span={14}
              >
                <FormLabelCell>
                  Վաճառքի գին
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={3} span={4}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  id="carPrice"
                  name="carPrice"
                  type="number"
                  onChange={value => formik.setFieldValue('carPrice', value)}
                  value={formik.values.carPrice}
                />
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
                  block
                  htmlType="submit"
                >
                  {loading ? <Spin /> : 'Հաշվել'}
                </ButtonLarge>
              </Col>
            </Row>
          </form>
          {result && result.success ? (
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
                  xxl={{ span: 14, offset: 4 }}
                  xl={{ span: 16, offset: 3 }}
                  lg={{ span: 17, offset: 2 }}
                  offset={1}
                  span={20}
                >
                  <Row gutter={[10, 10]}>
                    <Col span={15}>
                      <ResultCell>
                        <ResultLabel>Վճարման ենթակա եկամտային հարկ</ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={6}>
                      <ResultCell>
                        <ResultLabel>{result.data.price}</ResultLabel>
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

export default CarSellCalculator;
