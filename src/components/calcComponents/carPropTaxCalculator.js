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
  'car_type': 0,
  'date_issue': currentYear,
  'horsepower': 0,
};

const CarPropTaxCalculator = () => {
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
        const res = await apiHelper.post('/api/counter/car_property_tax', values);
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
          <H2Styled>Ավտոմեքենայի գույքահարկի հաշվիչ</H2Styled>
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
                xxl={{ span: 3, offset: 4 }}
                xl={{ span: 3, offset: 3 }}
                lg={{ span: 4, offset: 2 }}
                offset={1}
                span={5}
              >
                <FormLabelCell>
                  ՏՄ տեսակը
                </FormLabelCell>
              </Col>
              <Col xxl={10} xl={10} lg={10} span={13}>
                <CustomSelect
                  size="large"
                  defaultValue={0}
                  onChange={value => formik.setFieldValue('date_issue', value)}
                >
                  <Option value={0}>9 և պակաս նստատեղ ունեցող մարդատար</Option>
                  <Option value={1}>10 և ավելի նստատեղ ունեցող մարդատար</Option>
                  <Option value={2}>Բեռնատար</Option>
                  <Option value={3}>Մոտոցիկլ</Option>
                  <Option value={4}>Ջրային</Option>
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

            <Row align="middle" gutter={[13, 55]}>
              <Col
                xxl={{ span: 9, offset: 4 }}
                xl={{ span: 13, offset: 3 }}
                lg={{ span: 15, offset: 2 }}
                offset={1}
                span={14}
              >
                <FormLabelCell>
                  Շարժիչի հզորությունը (ձիաուժ)
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
                        <ResultLabel>Վճարման ենթակա գույքահարկ</ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={6}>
                      <ResultCell>
                        <ResultLabel>{result.data.result}</ResultLabel>
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

export default CarPropTaxCalculator;