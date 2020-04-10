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
import CarImg from '../../assets/calcImages/carTax.png';

const { Option } = Select;
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
  font-size: 15px;
  font-weight: 500;
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
  font-size: 14px;
  font-family: ArialAMU;
  color: #000;
`;

const FormLabelCell = styled.div`
  padding-left: 12px;
  padding-right: 12px;
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
  height: ${props => (props.large ? 60 : 40)}px;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.large ? 'center' : 'flex-start')};
  text-align: center;
`;

const Label = styled(Text)`
  font-size: 14px;
  font-family: ArialAMU;
  font-weight: 600;
  line-height: 20px;
  color: ${props => props.fontColor};
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
        <Col
          xxl={{ span: 1, offset: 4 }}
          xl={{ span: 1, offset: 3 }}
          lg={{ span: 1, offset: 1 }}
        >
          <HeadIcon src={CarImg} alt={'icon'} />
        </Col>
        <Col xxl={13} xl={13} lg={15} md={16} span={17}>
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
            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 2, offset: 5 }}
                xl={{ span: 2, offset: 4 }}
                lg={{ span: 4, offset: 2 }}
                offset={1}
                span={5}
              >
                <FormLabelCell>
                  <Label fontColor="#000">
                    ՏՄ տեսակը
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={8} xl={8} lg={10} span={13}>
                <CustomSelect
                  size="large"
                  defaultValue={0}
                  onChange={value => formik.setFieldValue('car_type', value)}
                >
                  <Option value={0}>
                    <Label fontColor="#000">
                      Մինչև 10 նստատեղ ունեցող մարդատար ավտոմեքենա
                    </Label>
                  </Option>
                  <Option value={1}>
                    <Label fontColor="#000">
                      10 և ավել նստատեղ ունեցող մարդատար ավտոմեքենա
                    </Label>
                  </Option>
                  <Option value={2}>
                    <Label fontColor="#000">
                      Բեռնատար ավտոմեքենա
                    </Label>
                  </Option>
                  <Option value={3}>
                    <Label fontColor="#000">
                      Մոտոցիկլետ
                    </Label>
                  </Option>
                  <Option value={4}>
                    <Label fontColor="#000">
                      Ջրային փոխադրամիջոց
                    </Label>
                  </Option>
                </CustomSelect>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 8, offset: 5 }}
                xl={{ span: 8, offset: 4 }}
                lg={{ span: 12, offset: 2 }}
                offset={1}
                span={14}
              >
                <FormLabelCell>
                  <Label fontColor="#000">
                    Թողարկման տարեթիվը
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={2} lg={3} span={4}>
                <CustomSelect
                  size="large"
                  defaultValue={formik.values.date_issue}
                  onChange={value => formik.setFieldValue('date_issue', value)}
                >
                  {years.map((e) => (
                    <Option key={e} value={e}>
                      <Label fontColor="#000">{e}</Label>
                    </Option>))}
                </CustomSelect>
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 30]}>
              <Col
                xxl={{ span: 8, offset: 5 }}
                xl={{ span: 8, offset: 4 }}
                lg={{ span: 12, offset: 2 }}
                offset={1}
                span={14}
              >
                <FormLabelCell>
                  <Label fontColor="#000">
                    Շարժիչի հզորությունը (ձիաուժ)
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={2} lg={3} span={4}>
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
                xxl={{ span: 4, offset: 5 }}
                xl={{ span: 4, offset: 4 }}
                lg={{ span: 5, offset: 2 }}
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
                  xl={{ span: 4, offset: 4 }}
                  lg={{ span: 8, offset: 2 }}
                  offset={1}
                  span={10}
                >
                  <H3Styled>Արդյունք</H3Styled>
                </Col>
              </Row>
              <Row gutter={[1, 1]}>
                <Col
                  xxl={{ span: 13, offset: 5 }}
                  xl={{ span: 13, offset: 4 }}
                  lg={{ span: 17, offset: 2 }}
                  offset={1}
                  span={20}
                >
                  <Row gutter={[10, 10]}>
                    <Col span={15}>
                      <ResultCell>
                        <Label fontColor="#fff">Վճարման ենթակա գույքահարկ</Label>
                      </ResultCell>
                    </Col>
                    <Col span={4}>
                      <ResultCell>
                        <Label fontColor="#fff">{result.data.result}</Label>
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