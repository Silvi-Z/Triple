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
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { apiHelper } from '../../helpers/apiHelper';
import CarImg from '../../assets/calcImages/carTax.png';
import {
  FormIcon,
  FormHeader,
  FormToggle,
} from './calcComponents';

const { Option } = Select;
const { Text } = Typography;

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

const validationSchema = Yup.object().shape({
  horsepower: Yup.number().required().min(1),
});

const CarPropTaxCalculator = () => {
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
        <FormIcon iconImg={CarImg} />
        <FormHeader headerText={'Ավտոմեքենայի գույքահարկի հաշվիչ'} />
        <FormToggle
          showForm={showForm}
          onClick={() => toggleForm(!showForm)}
        />
      </Row>

      {showForm ? (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 2, offset: 6 }}
                xl={{ span: 3, offset: 5 }}
                lg={{ span: 3, offset: 4 }}
                md={{ span: 4, offset: 2 }}
                sm={{ span: 5, offset: 1 }}
                span={6}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    ՏՄ տեսակը
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={8} xl={9} lg={11} md={14} sm={17} span={17}>
                <CustomSelect
                  size="large"
                  defaultValue={0}
                  onChange={value => formik.setFieldValue('car_type', value)}
                >
                  <Option value={0}>
                    <Label fontcolor="#000">
                      Մինչև 10 նստատեղ ունեցող մարդատար ավտոմեքենա
                    </Label>
                  </Option>
                  <Option value={1}>
                    <Label fontcolor="#000">
                      10 և ավել նստատեղ ունեցող մարդատար ավտոմեքենա
                    </Label>
                  </Option>
                  <Option value={2}>
                    <Label fontcolor="#000">
                      Բեռնատար ավտոմեքենա
                    </Label>
                  </Option>
                  <Option value={3}>
                    <Label fontcolor="#000">
                      Մոտոցիկլետ
                    </Label>
                  </Option>
                  <Option value={4}>
                    <Label fontcolor="#000">
                      Ջրային փոխադրամիջոց
                    </Label>
                  </Option>
                </CustomSelect>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 8, offset: 6 }}
                xl={{ span: 9, offset: 5 }}
                lg={{ span: 11, offset: 4 }}
                md={{ span: 14, offset: 2 }}
                sm={{ span: 17, offset: 1 }}
                span={17}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    Թողարկման տարեթիվը
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={3} lg={3} sm={5} span={6}>
                <CustomSelect
                  size="large"
                  defaultValue={formik.values.date_issue}
                  onChange={value => formik.setFieldValue('date_issue', value)}
                >
                  {years.map((e) => (
                    <Option key={e} value={e}>
                      <Label fontcolor="#000">{e}</Label>
                    </Option>))}
                </CustomSelect>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 30]}>
              <Col
                xxl={{ span: 8, offset: 6 }}
                xl={{ span: 9, offset: 5 }}
                lg={{ span: 11, offset: 4 }}
                md={{ span: 14, offset: 2 }}
                sm={{ span: 17, offset: 1 }}
                span={17}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    Շարժիչի հզորությունը (ձիաուժ)
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={3} lg={3} sm={5} span={6}>
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
                        <Label fontcolor="#fff">Վճարման ենթակա գույքահարկ</Label>
                      </ResultCell>
                    </Col>
                    <Col xs={6} sm={5} span={4}>
                      <ResultCell>
                        <Label fontcolor="#fff">{result.data.result}</Label>
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