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
import { PlusOutlined, MinusOutlined, CaretDownFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { apiHelper } from '../../helpers/apiHelper';
import CarImg from '../../assets/calcImages/carSell.png';

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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  width: 130px;
  border-color: #009db8;
`;

const CustomCaret = styled(CaretDownFilled)`
  color: #009db8;
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
      <Row align="middle" gutter={[10, 40]}>
        <Col
          xxl={{ offset: 4 }}
          xl={{ offset: 4 }}
          lg={{ offset: 3 }}
          md={{ offset: 1 }}
        >
          <HeadIconWrapper>
            <HeadIcon src={CarImg} alt={'icon'} />
          </HeadIconWrapper>
        </Col>
        <Col xxl={14} xl={14} lg={15} md={19} sm={19} span={18}>
          <H2Styled>Ավտոմեքենայի վաճառքի հաշվիչ</H2Styled>
        </Col>
        <Col>
          <ToggleButton block onClick={() => toggleForm(!showForm)}>
            {showForm ? <StyledMinus /> : <StyledPlus />}
          </ToggleButton>
        </Col>
      </Row>
      {showForm ? (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 3, offset: 6 }}
                xl={{ span: 4, offset: 5 }}
                lg={{ span: 4, offset: 4 }}
                md={{ span: 5, offset: 2 }}
                sm={{ span: 14, offset: 1 }}
                span={14}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">Գնման ամսաթիվ</Label>
                </FormLabelCell>
              </Col>
              <Col>
                <StyledDatePicker
                  allowClear={false}
                  suffixIcon={<CustomCaret />}
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
                xxl={{ span: 3, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                lg={{ span: 5, offset: 0 }}
                md={{ span: 6, offset: 0 }}
                sm={{ span: 14, offset: 1 }}
                span={14}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">Վաճառքի ամսաթիվ</Label>
                </FormLabelCell>
              </Col>
              <Col>
                <StyledDatePicker
                  allowClear={false}
                  suffixIcon={<CustomCaret />}
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

            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 8, offset: 6 }}
                xl={{ span: 9, offset: 5 }}
                lg={{ span: 11, offset: 4 }}
                md={{ span: 15, offset: 2 }}
                sm={{ span: 14, offset: 1 }}
                span={14}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    Մեքենայի ձիաուժ
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={3} lg={3} md={4} sm={6} span={7}>
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

            <Row align="middle" gutter={[10, 30]}>
              <Col
                xxl={{ span: 8, offset: 6 }}
                xl={{ span: 9, offset: 5 }}
                lg={{ span: 11, offset: 4 }}
                md={{ span: 15, offset: 2 }}
                sm={{ span: 14, offset: 1 }}
                span={14}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    Վաճառքի գին
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={3} lg={3} md={4} sm={6} span={7}>
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
          {result && result.success ? (
            <>
              <Row align="middle" gutter={[5, 30]}>
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
              <Row gutter={[1, 1]}>
                <Col
                  xxl={{ span: 13, offset: 6 }}
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
                        <Label fontcolor="#fff">Վճարման ենթակա եկամտային հարկ</Label>
                      </ResultCell>
                    </Col>
                    <Col xs={6} sm={5} span={4}>
                      <ResultCell>
                        <Label fontcolor="#fff">{result.data.price}</Label>
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
