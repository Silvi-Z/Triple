import React, { useState } from 'react';
import { Typography, Row, Col, Button, InputNumber, DatePicker } from 'antd';
import {
  CaretDownFilled,
  // QuestionCircleOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiHelper } from '../../helpers/apiHelper';
import CalcImg from '../../assets/calcImages/nonworking.png';
import {
  FormIcon,
  FormHeader,
  FormToggle,
  Description,
  ToggleLarge,
  ToggleRegular,
  FormLabelLong,
  SubmitButton,
  CalcTableRow,
} from './calcComponents';

const { Text } = Typography;

const H3Styled = styled.h3`
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  font-family: ArialAMU;
  color: #000;
`;

// const StyledQuestion = styled(QuestionCircleOutlined)`
//   color: #009db8;
//   font-size: 16px;
//   @media (min-width: 992px) {
//     font-size: 20px;
//     margin-right: 15px;
//   }
// `;

const CustomCaret = styled(CaretDownFilled)`
  color: #009db8;
`;

const ButtonBase = styled(Button)`
  height: 40px;
  border-color: #009db8;
  overflow: hidden;
`;

const ButtonSmall = styled(Button)`
  height: 40px;
  width: 40px;
  border-color: #009db8;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonLarge = styled(Button)`
  height: 54px;
  border-color: #009db8;
  overflow: hidden;
  padding-vertical: 0;
`;

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  height: ${props => props.large ? 56 : 40}px;
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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  width: 130px;
  border-color: #009db8;
`;

const FormLabelCell = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  height: ${props => props.large ? 56 : 40}px;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #d7d7d7;
  background-color: #fff;
`;

const Label = styled(Text)`
  text-align: ${props => props.left ? 'left' : 'center'};
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

const TabHeadCell = styled.div`
  padding-left: 16px;
  padding-top: 4px;
  padding-right: 16px;
  height: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
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

const currentDate = moment();
const monthCurrent = +moment().format('M') - 1;
const month1 = !monthCurrent ? 11 : monthCurrent - 1;
const year1 = moment(currentDate).subtract(1, 'months').year();
const month2 = !month1 ? 11 : month1 - 1;
const year2 = moment(currentDate).subtract(2, 'months').year();
const month3 = !month2 ? 11 : month2 - 1;
const year3 = moment(currentDate).subtract(3, 'months').year();
const month4 = !month3 ? 11 : month3 - 1;
const year4 = moment(currentDate).subtract(4, 'months').year();
const month5 = !month4 ? 11 : month4 - 1;
const year5 = moment(currentDate).subtract(5, 'months').year();
const month6 = !month5 ? 11 : month5 - 1;
const year6 = moment(currentDate).subtract(6, 'months').year();
const month7 = !month6 ? 11 : month6 - 1;
const year7 = moment(currentDate).subtract(7, 'months').year();
const month8 = !month7 ? 11 : month7 - 1;
const year8 = moment(currentDate).subtract(8, 'months').year();
const month9 = !month8 ? 11 : month8 - 1;
const year9 = moment(currentDate).subtract(9, 'months').year();
const month10 = !month9 ? 11 : month9 - 1;
const year10 = moment(currentDate).subtract(10, 'months').year();
const month11 = !month10 ? 11 : month10 - 1;
const year11 = moment(currentDate).subtract(11, 'months').year();
const month12 = !month11 ? 11 : month11 - 1;
const year12 = moment(currentDate).subtract(12, 'months').year();

const initialValues1 = {
  benefit_type: 0,
  employment: 0,
  turnover_tax: 1,
  date_from: moment(),
  date_to: moment().add('d', 140),
  other_employer_income: 0,
  previous_year_number_months: 0,
  work_days_count: 0,
  salary_type: 0,
  work_day_type: 0,
  pension: 0,
  bonus_stamp: 0,
  patent: null,
  salary: 0,
  last_year_tax_base: 0,
  download: true,
  // json_data: {},
  month1_price: 0,
  month1_additional_price: 0,
  month1_bonus_price: 0,
  month2_price: 0,
  month2_additional_price: 0,
  month2_bonus_price: 0,
  month3_price: 0,
  month3_additional_price: 0,
  month3_bonus_price: 0,
  month4_price: 0,
  month4_additional_price: 0,
  month4_bonus_price: 0,
  month5_price: 0,
  month5_additional_price: 0,
  month5_bonus_price: 0,
  month6_price: 0,
  month6_additional_price: 0,
  month6_bonus_price: 0,
  month7_price: 0,
  month7_additional_price: 0,
  month7_bonus_price: 0,
  month8_price: 0,
  month8_additional_price: 0,
  month8_bonus_price: 0,
  month9_price: 0,
  month9_additional_price: 0,
  month9_bonus_price: 0,
  month10_price: 0,
  month10_additional_price: 0,
  month10_bonus_price: 0,
  month11_price: 0,
  month11_additional_price: 0,
  month11_bonus_price: 0,
  month12_price: 0,
  month12_additional_price: 0,
  month12_bonus_price: 0,
};

const NonWorkingCalculator = () => {
  const [showForm, toggleForm] = useState(false);
  const [vacationDays, setVacationDays] = useState(140);
  const [salary, setSalary] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [result1, setResult1] = useState(null);

  const [loading2, setLoading2] = useState(false);
  const [result2, setResult2] = useState(null);

  const formik1 = useFormik({
    initialValues: initialValues1,
    enableReinitialize: true,
    // validationSchema: validationSchema1,
    // validateOnMount: true,
    onSubmit: async values => {
      console.log('Values', values);
      console.log(moment(values.date_from).format('YYYY-MM-DD'));
      console.log(moment(values.date_to).format('YYYY-MM-DD'));
      let bodyFormData = new FormData();
      bodyFormData.append('benefit_type', values.benefit_type);
      bodyFormData.append('employment', values.employment);
      bodyFormData.append('date_from', moment(values.date_from).format('YYYY-MM-DD'));
      bodyFormData.append('date_to', moment(values.date_to).format('YYYY-MM-DD'));
      bodyFormData.append('download', 0);

      if (!values.employment) {
        bodyFormData.append('turnover_tax', values.turnover_tax);
      } else {
        bodyFormData.append('work_day_type', values.work_day_type);
      }

      if (!values.employment && values.turnover_tax) {
        bodyFormData.append(
          'previous_year_number_months', values.previous_year_number_months
        );
      }

      if (
        !formik1.values.benefit_type
          && !values.employment
          && formik1.values.turnover_tax
      ) {
        bodyFormData.append('other_employer_income', values.other_employer_income);
      }

      if (!formik1.values.benefit_type && !!values.employment) {
        bodyFormData.append('pension', values.pension);
        bodyFormData.append('bonus_stamp', values.bonus_stamp);
      }

      setResult1(null);
      setLoading1(true);

      try {
        const res = await apiHelper.post('/api/counter/benefit', bodyFormData);
        console.log('Non working calc response', res.data);
        if (res.data.success) {
          setResult1(res.data.data);
        }
      } catch (e) {
        console.log('Non working calc error: ', e);
        setLoading1(false);
      }
      setLoading1(false);
    },
  });

  return (
    <>
      <Row align="middle" gutter={[10, 40]}>
        <FormIcon iconImg={CalcImg} />
        <FormHeader headerText={'Անաշխատունակության նպաստի հաշվիչ'} />
        <FormToggle
          showForm={showForm}
          onClick={() => toggleForm(!showForm)}
        />
      </Row>
      {showForm && (
        <form onSubmit={formik1.handleSubmit}>
          <Row align="middle" gutter={[10, 10]}>
            <ToggleRegular
              label={'Մայրության նպաստ'}
              toggleState={!formik1.values.benefit_type}
              onClick={() => formik1.setFieldValue('benefit_type', 0)}
              start
            />
            <ToggleRegular
              label={'Անաշխատունակության նպաստ'}
              toggleState={formik1.values.benefit_type}
              onClick={() => formik1.setFieldValue('benefit_type', 1)}
            />
          </Row>

          <Row align="middle" gutter={[10, 10]}>
            <ToggleRegular
              label={'Ինքնազբաղ'}
              toggleState={!formik1.values.employment}
              onClick={() => formik1.setFieldValue('employment', 0)}
              start
            />
            <ToggleRegular
              label={'Գործատուի կողմից վճարվող'}
              toggleState={formik1.values.employment}
              onClick={() => formik1.setFieldValue('employment', 1)}
            />
          </Row>

          {!formik1.values.employment && (
            <Row align="middle" gutter={[10, 10]}>
              <ToggleRegular
                label={'Շրջանառության հարկ վճարող'}
                toggleState={formik1.values.turnover_tax}
                onClick={() => formik1.setFieldValue('turnover_tax', 1)}
                start
              />
              <ToggleRegular
                label={'Հարկման ընդհանուր դաշտ'}
                toggleState={!formik1.values.turnover_tax}
                onClick={() => formik1.setFieldValue('turnover_tax', 0)}
              />
            </Row>
          )}

          {!!formik1.values.employment && (
            <Row align="middle" gutter={[10, 10]}>
              <ToggleLarge
                label={'Հնգօրյա աշխատանքային շաբաթ'}
                toggleState={formik1.values.work_day_type}
                onClick={() => {
                  formik1.setFieldValue('work_day_type', 0);
                }}
                start
              />
              <ToggleLarge
                label={'Վեցօրյա աշխատանքային շաբաթ'}
                toggleState={!formik1.values.work_day_type}
                onClick={() => {
                  formik1.setFieldValue('work_day_type', 1);
                }}
              />
            </Row>
          )}

          <Description small text={'Արձակուրդի ժամկետը'} />

          <Row align="middle" gutter={[10, 10]}>
            <Col
              xxl={{offset: 6}}
              xl={{offset: 5}}
              lg={{offset: 4}}
              md={{offset: 2}}
              sm={{offset: 1}}
              offset={0}
            >
              <FormLabelCell>
                <Label fontcolor="#000">Սկիզբ</Label>
              </FormLabelCell>
            </Col>
            <Col>
              <StyledDatePicker
                value={moment(formik1.values.date_from)}
                onChange={date => {
                  formik1.setFieldValue('date_from', date);
                  formik1.setFieldValue('date_to', moment(date).add('d', 140));
                }}
                allowClear={false}
                suffixIcon={<CustomCaret />}
                size="large"
                format="DD.MM.YYYY"
              />
            </Col>
            <Col>
              <FormLabelCell>
                <Label fontcolor="#000">Ավարտ</Label>
              </FormLabelCell>
            </Col>
            <Col>
              <StyledDatePicker
                value={moment(formik1.values.date_to)}
                onChange={date => {
                  formik1.setFieldValue('date_to', date);
                  const first = moment(formik1.values.date_from);
                  const second = moment(date);
                  const diff = second.diff(first, 'days');
                  setVacationDays(diff);
                }}
                allowClear={false}
                suffixIcon={<CustomCaret />}
                size="large"
                format="DD.MM.YYYY"
                disabledDate={
                  d => !d ||
                    d.isBefore(moment(formik1.values.date_from).add('d', 140))
                }
              />
            </Col>
          </Row>

          <Row align="middle" gutter={[10, 10]}>
            <Col
              xxl={{offset: 6, span: 6}}
              xl={{offset: 5, span: 7}}
              lg={{offset: 4, span: 8}}
              md={{offset: 2, span: 10}}
              sm={{offset: 1, span: 14}}
              offset={0}
              span={16}
            >
              <FormLabelCell>
                <Label fontcolor="#000">
                  Լրացնել արձակուրդի օրերը
                </Label>
              </FormLabelCell>
            </Col>
            <Col xxl={2} xl={3} lg={3} md={4} sm={5} span={6}>
              <StyledInputNumber
                value={vacationDays}
                min={140}
                onChange={val => {
                  setVacationDays(val);
                  formik1.setFieldValue(
                    'date_to', moment(formik1.values.date_from).add('d', val)
                  );
                }}
              />
            </Col>
          </Row>

          {!formik1.values.benefit_type
            && !formik1.values.employment
            && !!formik1.values.turnover_tax
            && (<Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{offset: 6, span: 7}}
                xl={{offset: 5, span: 8}}
                lg={{offset: 4, span: 9}}
                md={{offset: 2, span: 11}}
                sm={{offset: 1, span: 15}}
                offset={0}
                span={16}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">
                    Այլ գործատուների կողմից վճարված եկամուտ
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={3} lg={3} md={4} sm={5} span={6}>
                <StyledInputNumber
                  value={formik1.values.other_employer_income}
                  min={0}
                  onChange={val => {
                    formik1.setFieldValue('other_employer_income', val);
                  }}
                />
              </Col>
            </Row>)}

          {!formik1.values.employment && !!formik1.values.turnover_tax && (
            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{offset: 6, span: 7}}
                xl={{offset: 5, span: 8}}
                lg={{offset: 4, span: 9}}
                md={{offset: 2, span: 11}}
                sm={{offset: 1, span: 15}}
                offset={0}
                span={16}
              >
                <FormLabelCell large>
                  <Label left fontcolor="#000">
                    Նախորդ մեկ տարվա ընթացքում աշխատած ամիսների քանակ
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={3} lg={3} md={4} sm={5} span={6}>
                <StyledInputNumber
                  large
                  value={formik1.values.previous_year_number_months}
                  min={0}
                  onChange={val => {
                    formik1.setFieldValue('previous_year_number_months', val);
                  }}
                />
              </Col>
            </Row>
          )}

          {!formik1.values.employment && !formik1.values.turnover_tax && (
            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{offset: 6, span: 7}}
                xl={{offset: 5, span: 8}}
                lg={{offset: 4, span: 9}}
                md={{offset: 2, span: 11}}
                sm={{offset: 1, span: 15}}
                offset={0}
                span={16}
              >
                <FormLabelCell large>
                  <Label left fontcolor="#000">
                    Նախորդ տարվա ընթացքում շահութահարկով հարկման բազա
                  </Label>
                </FormLabelCell>
              </Col>
              <Col xxl={2} xl={3} lg={3} md={4} sm={5} span={6}>
                <StyledInputNumber
                  large
                  value={formik1.values.last_year_tax_base}
                  min={0}
                  onChange={val => {
                    formik1.setFieldValue('last_year_tax_base', val);
                  }}
                />
              </Col>
            </Row>
          )}

          {!!formik1.values.employment && ( 
            <>
              <Row gutter={[10, 15]}><Col /></Row>
              <SubmitButton
                disabled={false}
                loading={false}
                onClick={() => null}
              />
            </>
          )}

          {!!formik1.values.employment && (
            <>
              <Row align="middle" gutter={[10, 10]}>
                <Col
                  xxl={{offset: 6, span: 6}}
                  xl={{offset: 5, span: 7}}
                  lg={{offset: 4, span: 8}}
                  md={{offset: 2, span: 10}}
                  sm={{offset: 1, span: 14}}
                  offset={0}
                  span={16}
                >
                  <FormLabelCell>
                    <Label fontcolor="#000">
                      Աշխատանքային օրերը
                    </Label>
                  </FormLabelCell>
                </Col>
                <Col xxl={2} xl={3} lg={3} md={4} sm={5} span={6}>
                  <StyledInputNumber
                    value={formik1.values.work_days_count}
                    min={0}
                    onChange={val => {
                      formik1.setFieldValue('work_days_count', val);
                    }}
                  />
                </Col>
              </Row>

              <Row align="middle" gutter={[10, 10]}>
                <Col
                  xxl={{ span: 5, offset: 6 }}
                  xl={{ span: 6, offset: 5 }}
                  lg={{ span: 7, offset: 4 }}
                  md={{ span: 9, offset: 2 }}
                  sm={{ span: 11, offset: 1 }}
                  span={12}
                >
                  <ButtonLarge
                    block
                    type={formik1.values.patent !== 0 ? 'primary' : 'default'}
                    onClick={() => {
                      formik1.setFieldValue('patent', null);
                    }}
                  >
                    <Label fontcolor={formik1.values.patent !== 0 ? '#FFF' : '#000'}>
                      Ընդհանուր հարկման դաշտ
                    </Label>
                  </ButtonLarge>
                </Col>
                <Col xxl={5} xl={6} lg={7} md={9} sm={11} span={12}>
                  <ButtonLarge
                    block
                    type={formik1.values.patent !== 0 ? 'default' : 'primary'}
                    onClick={() => {
                      formik1.setFieldValue('patent', 0);
                    }}
                  >
                    <Label fontcolor={formik1.values.patent !== 0 ? '#000' : '#fff'}>
                      ՏՏ ոլորտի արտոնագիր
                    </Label>
                  </ButtonLarge>
                </Col>
              </Row>

              <Row align="middle" gutter={[10, 10]}>
                <ToggleRegular
                  label={'Մաքուր'}
                  toggleState={!formik1.values.salary_type}
                  onClick={() => formik1.setFieldValue('salary_type', 0)}
                  start
                />
                <ToggleRegular
                  label={'Կեղտոտ'}
                  toggleState={formik1.values.salary_type}
                  onClick={() => formik1.setFieldValue('salary_type', 1)}
                />
              </Row>
            </>
          )}
          {!formik1.values.benefit_type && !!formik1.values.employment && (
            <>
              <Row align="middle" gutter={[10, 10]}>
                <FormLabelLong text={'Մասնակցու՞մ եք կուտակային կենսաթոշակայինին'} />
                <Col>
                  <ButtonSmall
                    type={formik1.values.pension ? 'primary' : 'default'}
                    size="large"
                    block
                    onClick={() => formik1.setFieldValue('pension', 1)}
                  >
                    <Label fontcolor={
                      formik1.values.pension
                        ? '#fff'
                        : '#000'
                    }>
                      Այո
                    </Label>
                  </ButtonSmall>
                </Col>
                <Col>
                  <ButtonSmall
                    type={!formik1.values.pension ? 'primary' : 'default'}
                    size="large"
                    block
                    onClick={() => formik1.setFieldValue('pension', 0)}
                  >
                    <Label fontcolor={
                      !formik1.values.pension
                        ? '#fff'
                        : '#000'
                    }>
                      Ոչ
                    </Label>
                  </ButtonSmall>
                </Col>
              </Row>

              <Row align="middle" gutter={[10, 10]}>
                <FormLabelLong text={'Վճարե՞լ եք արդեն դրոշմանիշային վճարը'} />
                <Col>
                  <ButtonSmall
                    type={formik1.values.bonus_stamp ? 'primary' : 'default'}
                    size="large"
                    block
                    onClick={() => formik1.setFieldValue('bonus_stamp', 1)}
                  >
                    <Label fontcolor={
                      formik1.values.bonus_stamp
                        ? '#fff'
                        : '#000'
                    }>
                      Այո
                    </Label>
                  </ButtonSmall>
                </Col>
                <Col>
                  <ButtonSmall
                    type={!formik1.values.bonus_stamp ? 'primary' : 'default'}
                    size="large"
                    block
                    onClick={() => formik1.setFieldValue('bonus_stamp', 0)}
                  >
                    <Label fontcolor={
                      !formik1.values.bonus_stamp
                        ? '#fff'
                        : '#000'
                    }>
                      Ոչ
                    </Label>
                  </ButtonSmall>
                </Col>
              </Row>
            </>
          )}
          {!!formik1.values.employment && (
            <>
              <Row align="middle" gutter={[10, 30]}>
                <Col
                  xxl={{ span: 6, offset: 6 }}
                  xl={{ span: 7, offset: 5 }}
                  lg={{ span: 8, offset: 4 }}
                  md={{ span: 10, offset: 2 }}
                  sm={{ span: 13, offset: 1 }}
                  span={13}
                >
                  <FormLabelCell>
                    <Label fontcolor="#000">
                      Աշխատողի ամսական աշխատավարձ
                    </Label>
                  </FormLabelCell>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={4} sm={4} span={5}>
                  <StyledInputNumber
                    size="large"
                    min={0}
                    type="number"
                    onChange={value => setSalary(value)}
                    value={salary}
                  />
                </Col>
                <Col xxl={3} xl={3} lg={4} md={4} sm={5} span={5}>
                  <ButtonBase
                    type="primary"
                    size="large"
                    block
                    onClick={() => {
                      formik1.setFieldValue('month1_price', salary);
                      formik1.setFieldValue('month2_price', salary);
                      formik1.setFieldValue('month3_price', salary);
                      formik1.setFieldValue('month4_price', salary);
                      formik1.setFieldValue('month5_price', salary);
                      formik1.setFieldValue('month6_price', salary);
                      formik1.setFieldValue('month7_price', salary);
                      formik1.setFieldValue('month8_price', salary);
                      formik1.setFieldValue('month9_price', salary);
                      formik1.setFieldValue('month10_price', salary);
                      formik1.setFieldValue('month11_price', salary);
                      formik1.setFieldValue('month12_price', salary);
                      // formik1.validateForm().then(res => {
                      //   console.log('Validation fired: ', res);
                      //   console.log(formikOne.values);
                      // });
                    }}
                  >
                    <Label fontcolor="#fff">
                      Լրացնել
                    </Label>
                  </ButtonBase>
                </Col>
              </Row>

              <Row align="middle" gutter={[10, 20]}>
                <Col
                  xxl={{ span: 2, offset: 6 }}
                  xl={{ span: 3, offset: 5 }}
                  lg={{ span: 3, offset: 4 }}
                  md={{ span: 4, offset: 2 }}
                  sm={{ span: 5, offset: 1 }}
                  span={5}
                >
                  <TabHeadCell>
                    <Label fontcolor="#000">Ամիս</Label>
                  </TabHeadCell>
                </Col>
                <Col xxl={2} xl={2} lg={2} md={3} sm={3} span={4}>
                  <TabHeadCell>
                    <Label fontcolor="#000">Տարի</Label>
                  </TabHeadCell>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={4} sm={5} span={5}>
                  <TabHeadCell>
                    <Label fontcolor="#000">Համախառն աշխատավարձ</Label>
                  </TabHeadCell>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={4} sm={5} span={5}>
                  <TabHeadCell>
                    <Label fontcolor="#000">Պարգևավճար</Label>
                  </TabHeadCell>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={4} sm={5} span={5}>
                  <TabHeadCell>
                    <Label fontcolor="#000">Հավելավճար</Label>
                  </TabHeadCell>
                </Col>
              </Row>

              <CalcTableRow
                month={months[month1]}
                year={year1}
                value1={formik1.values.month1_price}
                value2={formik1.values.month1_additional_price}
                value3={formik1.values.month1_bonus_price}
                handler1={value => formik1.setFieldValue('month1_price', value)}
                handler2={value => formik1.setFieldValue('month1_additional_price', value)}
                handler3={value => formik1.setFieldValue('month1_bonus_price', value)}
              />
              <CalcTableRow
                month={months[month2]}
                year={year2}
                value1={formik1.values.month2_price}
                value2={formik1.values.month2_additional_price}
                value3={formik1.values.month2_bonus_price}
                handler1={value => formik1.setFieldValue('month2_price', value)}
                handler2={value => formik1.setFieldValue('month2_additional_price', value)}
                handler3={value => formik1.setFieldValue('month2_bonus_price', value)}
              />
              <CalcTableRow
                month={months[month3]}
                year={year3}
                value1={formik1.values.month3_price}
                value2={formik1.values.month3_additional_price}
                value3={formik1.values.month3_bonus_price}
                handler1={value => formik1.setFieldValue('month3_price', value)}
                handler2={value => formik1.setFieldValue('month3_additional_price', value)}
                handler3={value => formik1.setFieldValue('month3_bonus_price', value)}
              />
              <CalcTableRow
                month={months[month4]}
                year={year4}
                value1={formik1.values.month4_price}
                value2={formik1.values.month4_additional_price}
                value3={formik1.values.month4_bonus_price}
                handler1={value => formik1.setFieldValue('month4_price', value)}
                handler2={value => formik1.setFieldValue('month4_additional_price', value)}
                handler3={value => formik1.setFieldValue('month4_bonus_price', value)}
              />
              <CalcTableRow
                month={months[month5]}
                year={year5}
                value1={formik1.values.month5_price}
                value2={formik1.values.month5_additional_price}
                value3={formik1.values.month5_bonus_price}
                handler1={value => formik1.setFieldValue('month5_price', value)}
                handler2={value => formik1.setFieldValue('month5_additional_price', value)}
                handler3={value => formik1.setFieldValue('month5_bonus_price', value)}
              />
              <CalcTableRow
                month={months[month6]}
                year={year6}
                value1={formik1.values.month6_price}
                value2={formik1.values.month6_additional_price}
                value3={formik1.values.month6_bonus_price}
                handler1={value => formik1.setFieldValue('month6_price', value)}
                handler2={value => formik1.setFieldValue('month6_additional_price', value)}
                handler3={value => formik1.setFieldValue('month6_bonus_price', value)}
              />
              <CalcTableRow
                month={months[month7]}
                year={year7}
                value1={formik1.values.month7_price}
                value2={formik1.values.month7_additional_price}
                value3={formik1.values.month7_bonus_price}
                handler1={value => formik1.setFieldValue('month7_price', value)}
                handler2={value => formik1.setFieldValue('month7_additional_price', value)}
                handler3={value => formik1.setFieldValue('month7_bonus_price', value)}
              />
              <CalcTableRow
                month={months[month8]}
                year={year8}
                value1={formik1.values.month8_price}
                value2={formik1.values.month8_additional_price}
                value3={formik1.values.month8_bonus_price}
                handler1={value => formik1.setFieldValue('month8_price', value)}
                handler2={value => formik1.setFieldValue('month8_additional_price', value)}
                handler3={value => formik1.setFieldValue('month8_bonus_price', value)}
              />
              <CalcTableRow
                month={months[month9]}
                year={year9}
                value1={formik1.values.month9_price}
                value2={formik1.values.month9_additional_price}
                value3={formik1.values.month9_bonus_price}
                handler1={value => formik1.setFieldValue('month9_price', value)}
                handler2={value => formik1.setFieldValue('month9_additional_price', value)}
                handler3={value => formik1.setFieldValue('month9_bonus_price', value)}
              />
              <CalcTableRow
                month={months[month10]}
                year={year10}
                value1={formik1.values.month10_price}
                value2={formik1.values.month10_additional_price}
                value3={formik1.values.month10_bonus_price}
                handler1={value => formik1.setFieldValue('month10_price', value)}
                handler2={value => formik1.setFieldValue('month10_additional_price', value)}
                handler3={value => formik1.setFieldValue('month10_bonus_price', value)}
              />
              <CalcTableRow
                month={months[month11]}
                year={year11}
                value1={formik1.values.month11_price}
                value2={formik1.values.month11_additional_price}
                value3={formik1.values.month11_bonus_price}
                handler1={value => formik1.setFieldValue('month11_price', value)}
                handler2={value => formik1.setFieldValue('month11_additional_price', value)}
                handler3={value => formik1.setFieldValue('month11_bonus_price', value)}
              />
              <CalcTableRow
                month={months[month12]}
                year={year12}
                value1={formik1.values.month12_price}
                value2={formik1.values.month12_additional_price}
                value3={formik1.values.month12_bonus_price}
                handler1={value => formik1.setFieldValue('month12_price', value)}
                handler2={value => formik1.setFieldValue('month12_additional_price', value)}
                handler3={value => formik1.setFieldValue('month12_bonus_price', value)}
                gutter
              />
            </>
          )}
          <Row gutter={[10, 15]}><Col /></Row>
          <SubmitButton
            disabled={loading1 /* || !formik1.isValid */}
            loading={loading1}
            submitter
          />
        </form>
      )}
    </>
  );
};

export default NonWorkingCalculator;