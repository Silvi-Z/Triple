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
import ContractImg from '../../assets/calcImages/contract.png';

const { Text } = Typography;
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

const TabHeadCell = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  height: 55px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const ResultCellLight = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  height: 55px;
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

const TableLabel = styled(Text)`
  color: #000;
  font-weight: 600;
  font-size: 16px;
`;

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
  'price_type': false,
  'patent': false,
  'price1': 0,
  'price2': 0,
  'price3': 0,
  'bonus_price1': 0,
  'bonus_price2': 0,
  'bonus_price3': 0,
  'additional_price1': 0,
  'additional_price2': 0,
  'additional_price3': 0,
};

const MortgageCalculator = () => {
  const [showForm, toggleForm] = useState(false);
  const [salary, setSalary] = useState(0); // autofill salary
  const [loadingOne, toggleLoadingOne] = useState(false);
  const [loadingTwo, toggleLoadingTwo] = useState(false);
  const [initialValuesTwo, setInitialValuesTwo] = useState({
    'price_type': false,
    'patent': false,
    'price1': 0,
    'price2': 0,
    'price3': 0,
    'bonus_price1': 0,
    'bonus_price2': 0,
    'bonus_price3': 0,
    'additional_price1': 0,
    'additional_price2': 0,
    'additional_price3': 0,
    'paid_price': 0,
  });
  const [resultOne, setResultOne] = useState(0);
  const [resultTwo, setResultTwo] = useState(0);

  const formikOne = useFormik({
    initialValues: initialValuesOne,
    // validationSchema,
    onSubmit: async values => {
      console.log('Formik values: ', values);
      toggleLoadingOne(true);
      try {
        const res = await apiHelper.post('/api/counter/income_tax_return', values);
        console.log('Response: ', res.data);
        if (res.data.success) {
          setResultOne(res.data.data.returnedTaxPrice);
          setInitialValuesTwo({
            ...values,
            'paid_price': res.data.data.returnedTaxPrice,
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
    // validationSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      console.log('Formik values 2: ', values);
      toggleLoadingTwo(true);
      try {
        const res = await apiHelper.post('/api/counter/income_tax_return', values);
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
          xxl={{ span: 2, offset: 3 }}
          xl={{ span: 2, offset: 2 }}
          lg={{ span: 2, offset: 1 }}
        >
          <HeadIcon src={ContractImg} alt={'icon'} />
        </Col>
        <Col xxl={17} xl={18} lg={19} span={19}>
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
                xxl={{ span: 6, offset: 4 }}
                xl={{ span: 8, offset: 3 }}
                lg={{ span: 9, offset: 2 }}
                offset={1}
                span={11}
              >
                <ButtonBase
                  type={!formikOne.values.price_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('price_type', false)}
                >
                  Մաքուր
                </ButtonBase>
              </Col>
              <Col xxl={6} xl={8} lg={9} span={11}>
                <ButtonBase
                  type={formikOne.values.price_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('price_type', true)}
                >
                  Կեղտոտ
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
                  type={!formikOne.values.patent ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('patent', false)}
                >
                  ՏՏ ոլորտի Արտոնագիր
                </ButtonBase>
              </Col>
              <Col xxl={6} xl={8} lg={9} span={11}>
                <ButtonBase
                  type={formikOne.values.patent ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formikOne.setFieldValue('patent', true)}
                >
                  Ընդհանուր հարկման դաշտ
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 20]}>
              <Col
                xxl={{ span: 7, offset: 4 }}
                xl={{ span: 8, offset: 3 }}
                lg={{ span: 9, offset: 2 }}
                offset={1}
                span={11}
              >
                <FormLabelCell>Աշխատողի ամսական աշխատավարձ</FormLabelCell>
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
                  }}
                >
                  Լրացնել
                </ButtonBase>
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 20]}>
              <Col
                xxl={{ span: 3, offset: 4 }}
                xl={{ span: 3, offset: 3 }}
                lg={{ span: 4, offset: 2 }}
                offset={1}
                span={5}
              >
                <TabHeadCell>
                  <TableLabel>
                    Ամիս
                  </TableLabel>
                </TabHeadCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <TabHeadCell>
                  <TableLabel>
                    Համախառն աշխատավարձ
                  </TableLabel>
                </TabHeadCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <TabHeadCell>
                  <TableLabel>
                    Պարգևավճար
                  </TableLabel>
                </TabHeadCell>
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <TabHeadCell>
                  <TableLabel>
                    Հավելավճար
                  </TableLabel>
                </TabHeadCell>
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 3, offset: 4 }}
                xl={{ span: 3, offset: 3 }}
                lg={{ span: 4, offset: 2 }}
                offset={1}
                span={5}
              >
                <FormLabelCell>
                  {months[monthPrev2]}
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
                  onChange={value => formikOne.setFieldValue('bonus_price1', value)}
                  value={formikOne.values.bonus_price1}
                />
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value => formikOne.setFieldValue('additional_price1', value)}
                  value={formikOne.values.additional_price1}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 3, offset: 4 }}
                xl={{ span: 3, offset: 3 }}
                lg={{ span: 4, offset: 2 }}
                offset={1}
                span={5}
              >
                <FormLabelCell>
                  {months[monthPrev1]}
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
                  onChange={value => formikOne.setFieldValue('bonus_price2', value)}
                  value={formikOne.values.bonus_price2}
                />
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value => formikOne.setFieldValue('additional_price2', value)}
                  value={formikOne.values.additional_price2}
                />
              </Col>
            </Row>

            <Row align="middle" gutter={[13, 55]}>
              <Col
                xxl={{ span: 3, offset: 4 }}
                xl={{ span: 3, offset: 3 }}
                lg={{ span: 4, offset: 2 }}
                offset={1}
                span={5}
              >
                <FormLabelCell>
                  {months[monthCurrent]}
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
                  onChange={value => formikOne.setFieldValue('bonus_price3', value)}
                  value={formikOne.values.bonus_price3}
                />
              </Col>
              <Col xxl={3} xl={4} lg={5} span={6}>
                <StyledInputNumber
                  size="large"
                  min={0}
                  type="number"
                  onChange={value => formikOne.setFieldValue('additional_price3', value)}
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
                <ButtonLarge disabled={loadingOne} size="large" block htmlType="submit">
                  {loadingOne ? <Spin /> : 'Հաշվել'}
                </ButtonLarge>
              </Col>
            </Row>
          </form>

          <form onSubmit={formikTwo.handleSubmit}>
            <Row align="middle" gutter={[13, 13]}>
              <Col
                xxl={{ span: 8, offset: 4 }}
                xl={{ span: 12, offset: 3 }}
                lg={{ span: 12, offset: 2 }}
                offset={1}
                span={16}
              >
                <FormLabelCell>
                  <Typography>
                    Հաշվետու եռամսյակում եկամտային հարկը
                  </Typography>
                </FormLabelCell>
              </Col>
              <Col xxl={3} xl={3} lg={4} span={4}>
                <ResultCellLight>
                  {resultOne}
                </ResultCellLight>
              </Col>
            </Row>
            <Row align="middle" gutter={[13, 55]}>
              <Col
                xxl={{ span: 8, offset: 4 }}
                xl={{ span: 12, offset: 3 }}
                lg={{ span: 12, offset: 2 }}
                offset={1}
                span={16}
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
                  value={formikTwo.values.paid_price}
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
                <ButtonLarge disabled={loadingTwo} size="large" block htmlType="submit">
                  {loadingTwo ? <Spin /> : 'Հաշվել'}
                </ButtonLarge>
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
                    <Col span={15}>
                      <ResultCell>
                        <ResultLabel>Ետ վերադարձվող եկամտային հարկ</ResultLabel>
                      </ResultCell>
                    </Col>
                    <Col span={6}>
                      <ResultCell>
                        <ResultLabel>{resultTwo.data.returnedTaxPrice}</ResultLabel>
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
