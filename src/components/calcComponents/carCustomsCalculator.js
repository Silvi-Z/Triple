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
// import * as Yup from 'yup';
import moment from 'moment';
import { apiHelper } from '../../helpers/apiHelper';
import CarImg from '../../assets/calcImages/carCustoms.png';

const { Option } = Select;

const HeadIcon = styled.img`
  width: 25px;
  height: 25px;
  @media (min-width: 1200px) {
    width: 35px;
    height: 35px;
  }
  @media (min-width: 1600px) {
    width: 45px;
    height: 45px;
  }
`;

const H2Styled = styled.h2`
  font-size: 25px;
  font-weight: 400;
`;

const H3Styled = styled.h3`
  font-size: 24px;
  font-weight: 400;
`;

const CustomSelect = styled(Select)`
  width: 100%;
  ${'' /* height: 55px; */}
  border-color: #009db8;
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

const currentYear = +moment().format('YYYY');
const years = [];

for (let i = currentYear; i >= 1900; i--) {
  years.push(i);
}

const initialValues = {
  'person': true,
  'country': true,
  'date_issue': currentYear,
  'engine_working_volume': 1600,
  'car_price': 0,
  'currency': 0,
};

const CarCustomsCalculator = () => {
  const [loading, toggleLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showForm, toggleForm] = useState(false);

  const formik = useFormik({
    initialValues,
    // validationSchema,
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
      <Row align="middle" gutter={[10, 50]}>
        <Col
          xxl={{ span: 2, offset: 3 }}
          xl={{ span: 2, offset: 2 }}
          lg={{ span: 2, offset: 1 }}
        >
          <HeadIcon src={CarImg} alt={'icon'} />
        </Col>
        <Col xxl={17} xl={18} lg={19} span={19}>
          <H2Styled>Ավտոմեքենայի մաքսազերծման վճարի հաշվիչ</H2Styled>
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
                xxl={{ span: 6, offset: 4 }}
                xl={{ span: 8, offset: 3 }}
                lg={{ span: 9, offset: 2 }}
                offset={1}
                span={11}
              >
                <ButtonBase
                  type={formik.values.person ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('person', true)}
                >
                  Իրավաբանական անձ
                </ButtonBase>
              </Col>
              <Col xxl={6} xl={8} lg={9} span={11}>
                <ButtonBase
                  type={!formik.values.person ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('person', false)}
                >
                  Ֆիզիկական անձ
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 6, offset: 4 }}
                xl={{ span: 8, offset: 3 }}
                lg={{ span: 9, offset: 2 }}
                offset={1}
                span={11}
              >
                <ButtonBase
                  type={formik.values.country ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('country', true)}
                >
                  ԵԱՏՄ երկրներից ներմուծված
                </ButtonBase>
              </Col>
              <Col xxl={6} xl={8} lg={9} span={11}>
                <ButtonBase
                  type={!formik.values.country ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('country', false)}
                >
                  Երրորդ երկրներից ներմուծված
                </ButtonBase>
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
                  Թողարկման տարեթիվը
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={3} span={4}>
                <CustomSelect
                  size="large"
                  defaultValue={formik.values.date_issue}
                  onChange={value => formik.setFieldValue('date_issue', value)}
                >
                  {years.map((e) => (<Option key={e} value={e}>{e}</Option>))}
                </CustomSelect>
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
                  Շարժիչի աշխատանքային ծավալ
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={3} span={4}>
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
              <Col xxl={2} xl={2} lg={2} span={3}>
                <FormLabelCell>
                  սմ<sup>3</sup>
                </FormLabelCell>
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
                  Ավտոմեքենայի գինը
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={3} span={4}>
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
              <Col xxl={2} xl={2} lg={2} span={4}>
                <CustomSelect
                  size="large"
                  defaultValue={formik.values.currency}
                  onChange={value => formik.setFieldValue('currency', value)}
                >
                  <Option value={0}>AMD</Option>
                  <Option value={1}>USD</Option>
                  <Option value={2}>EUR</Option>
                  <Option value={3}>RUB</Option>
                </CustomSelect>
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
                <ButtonLarge disabled={loading} size="large" block htmlType="submit">
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
                        <ResultLabel>Վճարման ենթակա գումար AMD</ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={6}>
                      <ResultCell>
                        <ResultLabel>{result.data.AMD}</ResultLabel>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={15}>
                      <ResultCell>
                        <ResultLabel>Վճարման ենթակա գումար USD</ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={6}>
                      <ResultCell>
                        <ResultLabel>{result.data.USD}</ResultLabel>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={15}>
                      <ResultCell>
                        <ResultLabel>Վճարման ենթակա գումար EUR</ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={6}>
                      <ResultCell>
                        <ResultLabel>{result.data.EUR}</ResultLabel>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={15}>
                      <ResultCell>
                        <ResultLabel>Վճարման ենթակա գումար RUB</ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={6}>
                      <ResultCell>
                        <ResultLabel>{result.data.RUB}</ResultLabel>
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