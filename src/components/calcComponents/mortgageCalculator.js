import React, { useState } from 'react';
import {
  Typography,
  Row,
  Col,
  Button,
  InputNumber,
  Spin,
} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { apiHelper } from '../../helpers/apiHelper';
import ContractImg from '../../assets/calcImages/contract.png';

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

const Label = styled(Text)`
  font-size: 14px;
  font-family: ArialAMU;
  font-weight: bold;
  line-height: 20px;
  color: ${props => props.fontColor};
`;

// const Label2 = styled(Text)`
//   font-size: 16px;
//   font-family: ArialAMU;
//   font-weight: bold;
//   line-height: 20px;
//   color: ${props => props.fontColor};
// `;

const TabHeadCell = styled.div`
  padding-left: 16px;
  padding-top: 4px;
  padding-right: 16px;
  height: 50px;
  display: flex;
  align-items: flex-start;
  text-align: center;
`;

const ResultCellLight = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: #fff;
  border: 1px solid #009db8;
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

// const ResultLabel = styled(Text)`
//   color: #fff;
//   font-weight: 600;
//   font-size: ${props => (props.large ? 18 : 16)}px;
// `;

// const TableLabel = styled(Text)`
//   color: #000;
//   font-weight: 600;
//   font-size: 16px;
// `;

const currentYear = +moment().format('YYYY');
const years = [];

for (let i = currentYear; i >= 1900; i--) {
  years.push(i);
}

const months = [
  'Հունվար',
  'Փետրվար',
  'Մարտ',
  'Ապրիլ',
  'Մայիս',
  'Հունիս',
  'Հուլիս',
  'Օգոստոս',
  'Սեպտեմբեր',
  'Հոկտեմբեր',
  'Նոյեմբեր',
  'Դեկտեմբեր',
];

const monthCurrent = +moment().format('M') - 1;
const monthPrev1 = !monthCurrent ? 12 : monthCurrent - 1;
const monthPrev2 = !monthPrev1 ? 12 : monthPrev1 - 1;

const initialValuesOne = {
  price_type: false,
  patent: false,
  price1: 0,
  price2: 0,
  price3: 0,
  bonus_price1: 0,
  bonus_price2: 0,
  bonus_price3: 0,
  additional_price1: 0,
  additional_price2: 0,
  additional_price3: 0,
};

const schemaOne =  Yup.object().shape({
  'price1': Yup.number().required().min(40000),
  'price2': Yup.number().required().min(40000),
  'price3': Yup.number().required().min(40000),
});

const schemaTwo =  Yup.object().shape({
  'price1': Yup.number().required().min(40000),
  'price2': Yup.number().required().min(40000),
  'price3': Yup.number().required().min(40000),
  'paid_price': Yup.number().required().min(1),
});

const MortgageCalculator = () => {
  const [showForm, toggleForm] = useState(false);
  const [salary, setSalary] = useState(0); // autofill salary
  const [loadingOne, toggleLoadingOne] = useState(false);
  const [loadingTwo, toggleLoadingTwo] = useState(false);
  const [initialValuesTwo, setInitialValuesTwo] = useState({
    price_type: false,
    patent: false,
    price1: 0,
    price2: 0,
    price3: 0,
    bonus_price1: 0,
    bonus_price2: 0,
    bonus_price3: 0,
    additional_price1: 0,
    additional_price2: 0,
    additional_price3: 0,
    paid_price: 0,
  });
  const [resultOne, setResultOne] = useState(0);
  const [resultTwo, setResultTwo] = useState(0);

  const formikOne = useFormik({
    initialValues: initialValuesOne,
    validationSchema: schemaOne,
    validateOnMount: true,
    onSubmit: async values => {
      console.log('Formik values: ', values);
      toggleLoadingOne(true);
      try {
        const res = await apiHelper.post(
          '/api/counter/income_tax_return',
          values
        );
        console.log('Response: ', res.data);
        if (res.data.success) {
          setResultOne(res.data.data.returnedTaxPrice);
          setInitialValuesTwo({
            ...values,
            paid_price: res.data.data.returnedTaxPrice,
          });
        }
      } catch (e) {
        console.log('Error: ', e);
      }
      toggleLoadingOne(false);
    },
  });

  const formikTwo = useFormik({
    initialValues: initialValuesTwo,
    validationSchema: schemaTwo,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async values => {
      console.log('Formik values 2: ', values);
      toggleLoadingTwo(true);
      try {
        const res = await apiHelper.post(
          '/api/counter/income_tax_return',
          values
        );
        console.log('Response: ', res.data);
        if (res.data.success) {
          setResultTwo(res.data);
        }
      } catch (e) {
        console.log('Error: ', e);
      }
      toggleLoadingTwo(false);
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
          <HeadIcon src={ContractImg} alt={'icon'} />
        </Col>
        <Col xxl={13} xl={14} lg={15} md={16} span={17}>
          <H2Styled>Հիփոթեքի տոկոսագումարի ետ վերադարձի հաշվիչ</H2Styled>
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
          <form onSubmit={formikOne.handleSubmit}>
            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 5, offset: 4 }}
                xl={{ span: 5, offset: 3 }}
                lg={{ span: 6, offset: 2 }}
                offset={1}
                span={7}
              >
                <ButtonBase
                  type={!formikOne.values.price_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('price_type', false)}
                >
                  <Label fontColor={
                    !formikOne.values.price_type
                      ? '#fff'
                      : '#009db8'
                  }>
                    Մաքուր
                  </Label>
                </ButtonBase>
              </Col>
              <Col xxl={5} xl={5} lg={6} span={7}>
                <ButtonBase
                  type={formikOne.values.price_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('price_type', true)}
                >
                  <Label fontColor={
                    formikOne.values.price_type
                      ? '#fff'
                      : '#009db8'
                  }>
                    Կեղտոտ
                  </Label>
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 5, offset: 4 }}
                xl={{ span: 5, offset: 3 }}
                lg={{ span: 6, offset: 2 }}
                offset={1}
                span={7}
              >
                <ButtonBase
                  type={!formikOne.values.patent ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('patent', false)}
                >
                  <Label fontColor={
                    !formikOne.values.patent
                      ? '#fff'
                      : '#009db8'
                  }>
                    ՏՏ ոլորտի Արտոնագիր
                  </Label>
                </ButtonBase>
              </Col>
              <Col xxl={5} xl={5} lg={6} span={7}>
                <ButtonBase
                  type={formikOne.values.patent ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('patent', true)}
                >
                  <Label fontColor={
                    formikOne.values.patent
                      ? '#fff'
                      : '#009db8'
                  }>
                    Ընդհանուր հարկման դաշտ
                  </Label>
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 20]}>
              <Col
                xxl={{ span: 6, offset: 4 }}
                xl={{ span: 6, offset: 3 }}
                lg={{ span: 7, offset: 2 }}
                offset={1}
                span={10}
              >
                <FormLabelCell>
                  <Label fontColor="#000">
                    Աշխատողի ամսական աշխատավարձ
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value => setSalary(value)}
                  value={salary}
                />
              </Col>
              <Col xxl={3} xl={3} lg={4} span={5}>
                <ButtonBase
                  type="primary"
                  size="large"
                  block
                  onClick={() => {
                    formikOne.setFieldValue('price1', salary);
                    formikOne.setFieldValue('price2', salary);
                    formikOne.setFieldValue('price3', salary);
                    formikOne.validateForm().then(res => {
                      console.log('Validation fired: ', res);
                      console.log(formikOne.values);
                    });
                  }}
                >
                  <Label fontColor="#fff">
                    Լրացնել
                  </Label>
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 20]}>
              <Col
                xxl={{ span: 2, offset: 4 }}
                xl={{ span: 2, offset: 3 }}
                lg={{ span: 3, offset: 2 }}
                offset={1}
                span={4}
              >
                <TabHeadCell>
                  <Label fontColor="#000">Ամիս</Label>
                </TabHeadCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <TabHeadCell>
                  <Label fontColor="#000">Համախառն աշխատավարձ</Label>
                </TabHeadCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <TabHeadCell>
                  <Label fontColor="#000">Պարգևավճար</Label>
                </TabHeadCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <TabHeadCell>
                  <Label fontColor="#000">Հավելավճար</Label>
                </TabHeadCell>
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 2, offset: 4 }}
                xl={{ span: 2, offset: 3 }}
                lg={{ span: 3, offset: 2 }}
                offset={1}
                span={4}
              >
                <FormLabelCell>
                  <Label fontColor="#000">
                    {months[monthPrev2]}
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value => formikOne.setFieldValue('price1', value)}
                  value={formikOne.values.price1}
                />
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('bonus_price1', value)
                  }
                  value={formikOne.values.bonus_price1}
                />
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('additional_price1', value)
                  }
                  value={formikOne.values.additional_price1}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 2, offset: 4 }}
                xl={{ span: 2, offset: 3 }}
                lg={{ span: 3, offset: 2 }}
                offset={1}
                span={4}
              >
                <FormLabelCell>
                  <Label fontColor="#000">
                    {months[monthPrev1]}
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value => formikOne.setFieldValue('price2', value)}
                  value={formikOne.values.price2}
                />
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('bonus_price2', value)
                  }
                  value={formikOne.values.bonus_price2}
                />
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('additional_price2', value)
                  }
                  value={formikOne.values.additional_price2}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 55]}>
              <Col
                xxl={{ span: 2, offset: 4 }}
                xl={{ span: 2, offset: 3 }}
                lg={{ span: 3, offset: 2 }}
                offset={1}
                span={4}
              >
                <FormLabelCell>
                  <Label fontColor="#000">
                    {months[monthCurrent]}
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value => formikOne.setFieldValue('price3', value)}
                  value={formikOne.values.price3}
                />
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('bonus_price3', value)
                  }
                  value={formikOne.values.bonus_price3}
                />
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value =>
                    formikOne.setFieldValue('additional_price3', value)
                  }
                  value={formikOne.values.additional_price3}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 55]}>
              <Col
                xxl={{ span: 4, offset: 4 }}
                xl={{ span: 5, offset: 3 }}
                lg={{ span: 5, offset: 2 }}
                offset={1}
                span={8}
              >
                <ButtonSubmit
                  disabled={loadingOne  || !formikOne.isValid}
                  size="large"
                  block
                  htmlType="submit"
                >
                  {loadingOne ? <Spin /> : 'Հաշվել'}
                </ButtonSubmit>
              </Col>
            </Row>
          </form>

          <form onSubmit={formikTwo.handleSubmit}>
            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 7, offset: 4 }}
                xl={{ span: 7, offset: 3 }}
                lg={{ span: 9, offset: 2 }}
                offset={1}
                span={12}
              >
                <FormLabelCell>
                  <Typography>Հաշվետու եռամսյակում եկամտային հարկը</Typography>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={4} span={4}>
                <ResultCellLight>{resultOne}</ResultCellLight>
              </Col>
            </Row>
            <Row align="middle" gutter={[13, 55]}>
              <Col
                xxl={{ span: 7, offset: 4 }}
                xl={{ span: 7, offset: 3 }}
                lg={{ span: 9, offset: 2 }}
                offset={1}
                span={12}
              >
                <FormLabelCell>
                  <Typography>
                    Հաշվետու եռամսյակում վճարած տոկոսագումար
                  </Typography>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={4} span={4}>
                <StyledInputNumber
                  min={0}
                  type="number"
                  onChange={value => formikTwo.setFieldValue('paid_price', value)}
                  // value={formikTwo.values.paid_price}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[10, 55]}>
              <Col
                xxl={{ span: 4, offset: 4 }}
                xl={{ span: 5, offset: 3 }}
                lg={{ span: 5, offset: 2 }}
                offset={1}
                span={8}
              >
                <ButtonSubmit
                  disabled={loadingTwo  || !formikTwo.isValid}
                  size="large"
                  block
                  htmlType="submit"
                >
                  {loadingTwo ? <Spin /> : 'Հաշվել'}
                </ButtonSubmit>
              </Col>
            </Row>
          </form>
          {resultTwo && resultTwo.success ? (
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
                    <Col span={12}>
                      <ResultCell>
                        <Label fontColor="#fff">
                          Ետ վերադարձվող եկամտային հարկ
                        </Label>
                      </ResultCell>
                    </Col>
                    <Col span={5}>
                      <ResultCell>
                        <Label fontColor="#fff">
                          {resultTwo.data.returnedTaxPrice}
                        </Label>
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

export default MortgageCalculator;
