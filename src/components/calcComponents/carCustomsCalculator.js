import React, { useState } from 'react';
import {
  Typography,
  Row,
  Col,
  Button,
  InputNumber,
  Select,
  Spin,
} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { apiHelper } from '../../helpers/apiHelper';
import CarImg from '../../assets/calcImages/carCustoms.png';

const { Option } = Select;
const { Text } = Typography;

const HeadIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
    margin-right: 6px;
  }
  @media (min-width: 992px) {
    width: 35px;
    height: 35px;
    margin-right: 7px;
  }
  @media (min-width: 1200px) {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
  @media (min-width: 1600px) {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
`;

const H2Styled = styled.h2`
  font-size: 18px;
  font-weight: normal;
  margin-left: 10px;
  font-family: ArialAMU;
  color: #000;
`;

const H3Styled = styled.h3`
  font-size: 15px;
  font-weight: 500;
  font-family: ArialAMU;
  color: #000;
`;

const CustomSelect = styled(Select)`
  width: 100%;
  border-color: #009db8;
`;

const ToggleButton = styled(Button)`
  height: 60px;
  width: 60px;
`;

const Label = styled(Text)`
  font-family: ArialAMU;
  font-weight: bold;
  line-height: 20px;
  color: ${props => props.fontColor};
  font-size: 13px;
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const ButtonSubmit = styled(Button)`
  height: 46px;
  border-color: #009db8;
  overflow: hidden;
  padding-vertical: 0;
`;

const ButtonBase = styled(Button)`
  height: 40px;
  border-color: #009db8;
  overflow: hidden;
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

const currentYear = +moment().format('YYYY');
const years = [];

for (let i = currentYear; i >= 1900; i--) {
  years.push(i);
}

const initialValues = {
  'person': true,
  'country': true,
  'date_issue': currentYear,
  'engine_working_volume': 1,
  'car_price': 0,
  'currency': 0,
};

const validationSchema = Yup.object().shape({
  'engine_working_volume': Yup.number().required().min(1),
  'car_price': Yup.number().required().when('currency', (currency, schema) => {
    if (currency === 0 || currency === 3) {
      return schema.min(100000);
    } else if (currency === 1 || currency === 2) {
      return schema.min(100);
    }
  }),
});

const CarCustomsCalculator = () => {
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
        const res = await apiHelper.post('/api/counter/car_clearance_tax', values);
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
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 2 }}
          lg={{ span: 1, offset: 2 }}
          md={{ span: 1 }}
        />
        <HeadIcon src={CarImg} alt={'icon'} />
        <Col xxl={13} xl={14} lg={15} md={19} sm={19} span={17}>
          <H2Styled>Ավտոմեքենայի մաքսազերծման վճարի հաշվիչ</H2Styled>
        </Col>
        <Col>
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
            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 5, offset: 5 }}
                xl={{ span: 6, offset: 4 }}
                lg={{ span: 7, offset: 4 }}
                md={{ span: 9, offset: 2 }}
                sm={11}
                offset={1}
                span={7}
              >
                <ButtonBase
                  type={formik.values.person ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('person', true)}
                >
                  <Label fontColor={
                    formik.values.person
                      ? '#fff'
                      : '#000'
                  }>
                    Իրավաբանական անձ
                  </Label>
                </ButtonBase>
              </Col>
              <Col xxl={5} xl={6} lg={7} md={9} sm={11} span={7}>
                <ButtonBase
                  type={!formik.values.person ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('person', false)}
                >
                  <Label fontColor={
                    !formik.values.person
                      ? '#fff'
                      : '#000'
                  }>
                    Ֆիզիկական անձ
                  </Label>
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 5, offset: 5 }}
                xl={{ span: 6, offset: 4 }}
                lg={{ span: 7, offset: 4 }}
                md={{ span: 9, offset: 2 }}
                sm={11}
                offset={1}
                span={7}
              >
                <ButtonBase
                  type={formik.values.country ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('country', true)}
                >
                  <Label fontColor={
                    formik.values.country
                      ? '#fff'
                      : '#000'
                  }>
                    ԵԱՏՄ երկրներից ներմուծված
                  </Label>
                </ButtonBase>
              </Col>
              <Col xxl={5} xl={6} lg={7} md={9} sm={11} span={7}>
                <ButtonBase
                  type={!formik.values.country ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('country', false)}
                >
                  <Label fontColor={
                    !formik.values.country
                      ? '#fff'
                      : '#000'
                  }>
                    Երրորդ երկրներից ներմուծված
                  </Label>
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 8, offset: 5 }}
                xl={{ span: 9, offset: 4 }}
                lg={{ span: 11, offset: 4 }}
                md={{ span: 14, offset: 2 }}
                sm={17}
                offset={1}
                span={14}
              >
                <FormLabelCell>
                  <Label fontColor="#000">
                    Թողարկման տարեթիվը
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={3} lg={3} sm={5} span={4}>
                <CustomSelect
                  size="large"
                  defaultValue={formik.values.date_issue}
                  onChange={value => formik.setFieldValue('date_issue', value)}
                >
                  {years.map((e) => (
                    <Option key={e} value={e}>
                      <Label fontColor="#000">{e}</Label>
                    </Option>
                  ))}
                </CustomSelect>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 8, offset: 5 }}
                xl={{ span: 9, offset: 4 }}
                lg={{ span: 11, offset: 4 }}
                md={{ span: 11, offset: 2 }}
                sm={13}
                offset={1}
                span={14}
              >
                <FormLabelCell>
                  <Label fontColor="#000">
                    Շարժիչի աշխատանքային ծավալ
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={3} lg={3} md={4} sm={5} span={4}>
                <StyledInputNumber
                  size="large"
                  min={51}
                  id="engine_working_volume"
                  name="engine_working_volume"
                  type="number"
                  onChange={value => formik.setFieldValue('engine_working_volume', value)}
                  value={formik.values.engine_working_volume}
                />
              </Col>
              <Col xxl={2} xl={2} lg={3} md={3} sm={4} span={3}>
                <FormLabelCell>
                  <Label fontColor="#000">
                    սմ<sup>3</sup>
                  </Label>
                </FormLabelCell>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 30]}>
              <Col
                xxl={{ span: 8, offset: 5 }}
                xl={{ span: 9, offset: 4 }}
                lg={{ span: 11, offset: 4 }}
                md={{ span: 11, offset: 2 }}
                sm={13}
                offset={1}
                span={14}
              >
                <FormLabelCell>
                  <Label fontColor="#000">
                    Ավտոմեքենայի գինը
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={3} lg={3} md={4} sm={5} span={4}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  id="car_price"
                  name="car_price"
                  type="number"
                  onChange={value => formik.setFieldValue('car_price', value)}
                  value={formik.values.car_price}
                />
              </Col>
              <Col xxl={2} xl={2} lg={3} md={3} span={4}>
                <CustomSelect
                  size="large"
                  defaultValue={formik.values.currency}
                  onChange={value => formik.setFieldValue('currency', value)}
                >
                  <Option value={0}>
                    <Label fontColor="#000">AMD</Label>
                  </Option>
                  <Option value={1}>
                    <Label fontColor="#000">USD</Label>
                  </Option>
                  <Option value={2}>
                    <Label fontColor="#000">EUR</Label>
                  </Option>
                  <Option value={3}>
                    <Label fontColor="#000">RUB</Label>
                  </Option>
                </CustomSelect>
              </Col>
            </Row>
            
            <Row align="middle" gutter={[10, 30]}>
              <Col
                xxl={{ span: 4, offset: 5 }}
                xl={{ span: 4, offset: 4 }}
                lg={{ span: 5, offset: 4 }}
                md={{ span: 7, offset: 2 }}
                offset={1}
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
                  xxl={{ span: 4, offset: 5 }}
                  xl={{ span: 5, offset: 4 }}
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
                  xxl={{ span: 14, offset: 5 }}
                  xl={{ span: 17, offset: 4 }}
                  lg={{ span: 19, offset: 4 }}
                  md={{ span: 24, offset: 2 }}
                  sm={24}
                  offset={1}
                  span={20}
                >
                  <Row gutter={[10, 10]}>
                    <Col sm={15} span={14}>
                      <ResultCell>
                        <Label fontColor="#fff">Վճարման ենթակա գումար AMD</Label>
                      </ResultCell>
                    </Col>
                    <Col sm={5} span={4}>
                      <ResultCell>
                        <Label fontColor="#fff">{result.data.AMD}</Label>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col sm={15} span={14}>
                      <ResultCell>
                        <Label fontColor="#fff">Վճարման ենթակա գումար USD</Label>
                      </ResultCell>
                    </Col>
                    <Col sm={5} span={4}>
                      <ResultCell>
                        <Label fontColor="#fff">{result.data.USD}</Label>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col sm={15} span={14}>
                      <ResultCell>
                        <Label fontColor="#fff">Վճարման ենթակա գումար EUR</Label>
                      </ResultCell>
                    </Col>
                    <Col sm={5} span={4}>
                      <ResultCell>
                        <Label fontColor="#fff">{result.data.EUR}</Label>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col sm={15} span={14}>
                      <ResultCell>
                        <Label fontColor="#fff">Վճարման ենթակա գումար RUB</Label>
                      </ResultCell>
                    </Col>
                    <Col sm={5} span={4}>
                      <ResultCell>
                        <Label fontColor="#fff">{result.data.RUB}</Label>
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

export default CarCustomsCalculator;