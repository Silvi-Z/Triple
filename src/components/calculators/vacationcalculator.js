import React, { useState } from 'react';
import { Typography, Row, Col, Button, InputNumber, DatePicker, Spin } from 'antd';
import {
  CaretDownFilled,
  // QuestionCircleOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiHelper } from '../../helpers/apiHelper';
import VacationImg from '../../assets/calcImages/vacation.png';
import {
  FormIcon,
  FormHeader,
  FormToggle,
  Description,
  FormLabelLong,
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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  width: 130px;
  border-color: #009db8;
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

const Label2 = styled(Text)`
  font-family: ArialAMU;
  font-weight: bold;
  line-height: 20px;
  color: ${props => props.fontcolor};
  font-size: 14px;
  @media (min-width: 576px) {
    font-size: 15px;
  }
  @media (min-width: 768px) {
    font-size: 16px;
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

const ResultCellSmall = styled.div`
  background-color: #21363d;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const VacationCalculator = ({ toggleForm, showForm }) => {
  const [formDisable, setFormDisable] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [salary, setSalary] = useState(0); // autofill salary
  const [vacStart, setVacStart] = useState(moment());
  const [vacEnd, setVacEnd] = useState(moment().add(1, 'days'));
  const [sixDayWeek, setSixDayWeek] = useState(0);
  const [daysLoading, setDaysLoading] = useState(false);
  // const [vacDays, setVacDays] = useState(vacEnd.diff(vacStart, 'days'));
  const [vacDays, setVacDays] = useState(0);
  const [workingDays, setWorkingDays] = useState(null);

  const [result2, setResult2] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [vacStart2, setVacStart2] = useState(moment());
  const [vacEnd2, setVacEnd2] = useState(moment().add(1, 'days'));

  const handleVacDays = async () => {
    const body = {
      'work_day_type': sixDayWeek,
      'date_from': moment(vacStart).format('YYYY-MM-DD'),
      'date_to': moment(vacEnd).format('YYYY-MM-DD'),
    };

    setDaysLoading(true);

    try {
      const res = await apiHelper.post('/api/counter/work_day_info', body);
      console.log('Work day info', res);
      if (res.data.success) {
        setWorkingDays(res.data.data.work_days_count);
      }
    } catch (e) {
      console.log('Work day error: ', e);
      setDaysLoading(false);
    }

    setDaysLoading(false);
  };

  const initialValues = {
    salary_type: 0,
    work_day_type: sixDayWeek,
    date_from: moment(vacStart).format('YYYY-MM-DD'),
    date_to: moment(vacEnd).format('YYYY-MM-DD'),
    pension: 0,
    patent: null,
    bonus_stamp: 0,
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

  const validationSchema = Yup.object().shape({
    month1_price: Yup.number()
      .required()
      .min(40000),
    month2_price: Yup.number()
      .required()
      .min(40000),
    month3_price: Yup.number()
      .required()
      .min(40000),
    month4_price: Yup.number()
      .required()
      .min(40000),
    month5_price: Yup.number()
      .required()
      .min(40000),
    month6_price: Yup.number()
      .required()
      .min(40000),
    month7_price: Yup.number()
      .required()
      .min(40000),
    month8_price: Yup.number()
      .required()
      .min(40000),
    month9_price: Yup.number()
      .required()
      .min(40000),
    month10_price: Yup.number()
      .required()
      .min(40000),
    month11_price: Yup.number()
      .required()
      .min(40000),
    month12_price: Yup.number()
      .required()
      .min(40000),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    validateOnMount: true,
    onSubmit: async values => {
      console.log('Big form values', values);
      setResult(null);
      let bodyFormData = new FormData();
      const json_data = {};
      for (let i = 1; i < 13; i++) {
        json_data[i] = {};
        json_data[i].price = values[`month${i}_price`];
        json_data[i].additional_price = values[`month${i}_additional_price`];
        json_data[i].bonus_price = values[`month${i}_bonus_price`];
      }
      bodyFormData.append('json_data', JSON.stringify(json_data));
      if (values.patent || values.patent === 0) {
        bodyFormData.append('patent', values.patent);
      }
      bodyFormData.append('salary_type', values.salary_type);
      bodyFormData.append('work_day_type', values.work_day_type);
      bodyFormData.append('date_from', values.date_from);
      bodyFormData.append('date_to', values.date_to);
      bodyFormData.append('pension', values.pension);
      bodyFormData.append('bonus_stamp', values.bonus_stamp);

      setLoading(true);

      try {
        const res = await apiHelper.post('/api/counter/vacation', bodyFormData);
        console.log('Vacation calc response: ', res);
        if (res.data.success) {
          const resultReduced = {};
          resultReduced.totalInfo = res.data.data.totalInfo;
          resultReduced.monthInfo = Object.values(res.data.data.monthInfo);
          console.log(resultReduced);
          setResult(resultReduced);
        }
      } catch (e) {
        console.log('Vacation calc error: ', e);
        setLoading(false);
      }

      setLoading(false);
    },
  });

  const initialValues2 = {
    'work_day_type': 0,
    'date_from': moment(vacStart2).format('YYYY-MM-DD'),
    'date_to': moment(vacEnd2).format('YYYY-MM-DD'),
    'total_vacation_days': 0,
    'used_days': 0,
  };

  const formik2 = useFormik({
    initialValues: initialValues2,
    enableReinitialize: true,
    // validationSchema,
    // validateOnMount: true,
    onSubmit: async values => {
      setLoading2(true);
      setResult2(null);

      try {
        const res = await apiHelper.post('/api/counter/vacation_days', values);
        console.log('Available vac days: ', res);
        setResult2(res.data.data);
      } catch (e) {
        console.log('Available vac days error:', e);
        setLoading2(false);
      }

      setLoading2(false);
    },
  });

  return (
    <>
      <Row align="middle" gutter={[10, 40]}>
        <FormIcon iconImg={VacationImg} />
        <FormHeader headerText={'Արձակուրդայինի հաշվիչ'} />
        <FormToggle showForm={showForm} onClick={toggleForm} />
      </Row>
      {showForm ? (
        <>
          <Description text={'Ժամանակահատված, որի ընթացքում աշխատողը գտնվել(ու) է արձակուրդի մեջ'} />
          <Row align="middle" gutter={[10, 10]}>
            <Col
              xxl={{span: 2, offset: 6}}
              xl={{span: 2, offset: 5}}
              lg={{span: 3, offset: 4}}
              md={{span: 3, offset: 2}}
              sm={{span: 4, offset: 1}}
              span={4}
            >
              <FormLabelCell>
                <Label fontcolor="#000">Սկիզբ</Label>
              </FormLabelCell>
            </Col>
            <Col>
              <StyledDatePicker
                disabled={formDisable}
                value={vacStart}
                onChange={date => {
                  console.log('Start date changed');
                  setVacStart(date);
                  setVacEnd(date);
                  setVacDays(0);
                }}
                allowClear={false}
                suffixIcon={<CustomCaret />}
                size="large"
                format="DD.MM.YYYY"
                // disabledDate={d => !d || d.isAfter(vacEnd)}
              />
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} span={4}>
              <FormLabelCell>
                <Label fontcolor="#000">Ավարտ</Label>
              </FormLabelCell>
            </Col>
            <Col>
              <StyledDatePicker
                disabled={formDisable}
                value={vacEnd}
                onChange={async date => {
                  console.log('End date changed!!!!!!!');
                  setFormDisable(true);
                  setVacEnd(date);
                  const body = {
                    'work_day_type': sixDayWeek,
                    'date_from': moment(vacStart).format('YYYY-MM-DD'),
                    'date_to': moment(date).format('YYYY-MM-DD'),
                  };
                  console.log('Body: ', body);
                  try {
                    const res = await apiHelper.post(
                      '/api/counter/vacationDayUsingFromToDate', body
                    );
                    console.log('Vac days response: ', res.data);
                    if (res.data.success) {
                      setVacDays(res.data.data.day_count);
                    }
                  } catch (e) {
                    setFormDisable(false);
                    console.log('Vac days error: ', e);
                  }
                  setFormDisable(false);
                }}
                allowClear={false}
                suffixIcon={<CustomCaret />}
                size="large"
                format="DD.MM.YYYY"
                disabledDate={d => !d || d.isBefore(vacStart)}
              />
            </Col>
          </Row>
          <Row align="middle" gutter={[10, 10]}>
            <Col
              xxl={{span: 3, offset: 6}}
              xl={{span: 4, offset: 5}}
              lg={{span: 4, offset: 4}}
              md={{span: 5, offset: 2}}
              sm={{span: 7, offset: 1}}
              span={7}
            >
              <FormLabelCell>
                <Label fontcolor="#000">Արձակուրդի օրեր</Label>
              </FormLabelCell>
            </Col>
            <Col xxl={1} xl={2} lg={2} md={2} sm={3} span={3}>
              <StyledInputNumber
                disabled={formDisable}
                value={vacDays}
                min={0}
                onChange={async val => {
                  setFormDisable(true);
                  setVacDays(val);
                  console.log('Vac days changed!!!!!!!');
                  const body = {
                    'work_day_type': sixDayWeek,
                    'date_from': moment(vacStart).format('YYYY-MM-DD'),
                    'vacation_day_count': val,
                  };

                  try {
                    const res = await apiHelper.post(
                      '/api/counter/vacation_date_to', body
                    );
                    console.log('Vac end date response: ', res.data);
                    if (res.data.success) {
                      setVacEnd(moment(res.data.data.date_to));
                    }
                  } catch (e) {
                    console.log('Vac end date error: ', e);
                    setFormDisable(false);
                  }
                  setFormDisable(false);
                }}
              />
            </Col>
            {/* <Col>
              <StyledQuestion />
            </Col> */}
            {workingDays ? (
              <>
                <Col>
                  <ResultCell>
                    <Label fontcolor="#fff">Աշխատանքային օրեր</Label>
                  </ResultCell>
                </Col>
                <Col>
                  <ResultCellSmall>
                    <Label fontcolor="#fff">{workingDays}</Label>
                  </ResultCellSmall>
                </Col>
              </>
            ) : null}
          </Row>
          <Row align="middle" gutter={[10, 30]}>
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
                type={sixDayWeek ? 'default' : 'primary'}
                onClick={() => setSixDayWeek(0)}
              >
                <Label fontcolor={sixDayWeek ? '#000' : '#fff'}>
                  Հնգօրյա աշխատանքային շաբաթ
                </Label>
              </ButtonLarge>
            </Col>
            <Col xxl={5} xl={6} lg={7} md={9} sm={11} span={12}>
              <ButtonLarge
                block
                type={!sixDayWeek ? 'default' : 'primary'}
                onClick={() => setSixDayWeek(1)}
              >
                <Label fontcolor={!sixDayWeek ? '#000' : '#fff'}>
                  Վեցօրյա աշխատանքային շաբաթ	
                </Label>
              </ButtonLarge>
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
                disabled={daysLoading}
                size="large"
                block
                onClick={() => handleVacDays()}
              >
                {daysLoading ? <Spin /> : 'Հաշվել'}
              </ButtonSubmit>
            </Col>
          </Row>
          <form onSubmit={formik.handleSubmit}>
            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 5, offset: 6 }}
                xl={{ span: 6, offset: 5 }}
                lg={{ span: 7, offset: 4 }}
                md={{ span: 9, offset: 2 }}
                sm={{ span: 11, offset: 1 }}
                span={11}
              >
                <ButtonBase
                  type={!formik.values.salary_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('salary_type', 0)}
                >
                  <Label
                    fontcolor={!formik.values.salary_type ? '#fff' : '#000'}
                  >
                    Մաքուր
                  </Label>
                </ButtonBase>
              </Col>
              <Col xxl={5} xl={6} lg={7} md={9} sm={11} span={11}>
                <ButtonBase
                  type={formik.values.salary_type ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('salary_type', 1)}
                >
                  <Label
                    fontcolor={formik.values.salary_type ? '#fff' : '#000'}
                  >
                    Կեղտոտ
                  </Label>
                </ButtonBase>
              </Col>
            </Row>
            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{ span: 3, offset: 6 }}
                xl={{ span: 3, offset: 5 }}
                lg={{ span: 4, offset: 4 }}
                md={{ span: 5, offset: 2 }}
                sm={{ span: 7, offset: 1 }}
                span={7}
              >
                <ButtonLarge
                  type={
                    formik.values.patent !== 1 && formik.values.patent !== 0
                      ? 'primary'
                      : 'default'
                  }
                  // size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', null)}
                >
                  <Label
                    fontcolor={
                      formik.values.patent !== 1 && formik.values.patent !== 0
                        ? '#fff'
                        : '#000'
                    }
                  >
                    Ընդհանուր
                    <br />
                    հարկման դաշտ
                  </Label>
                </ButtonLarge>
              </Col>
              <Col xxl={4} xl={6} lg={6} md={8} sm={10} span={11}>
                <ButtonLarge
                  type={formik.values.patent === 1 ? 'primary' : 'default'}
                  // size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', 1)}
                >
                  <Label
                    fontcolor={
                      formik.values.patent === 1
                        ? '#fff'
                        : '#000'
                    }
                  >
                    Միկրոձեռնարկատիրության
                    <br />
                    սուբյեկտ
                  </Label>
                </ButtonLarge>
              </Col>
              <Col xxl={3} xl={3} lg={4} md={5} sm={5} span={6}>
                <ButtonLarge
                  type={formik.values.patent === 0 ? 'primary' : 'default'}
                  // size="large"
                  block
                  onClick={() => formik.setFieldValue('patent', 0)}
                >
                  <Label
                    fontcolor={
                      formik.values.patent === 0
                        ? '#fff'
                        : '#000'
                    }
                  >
                    ՏՏ ոլորտի
                    <br />
                    Արտոնագիր
                  </Label>
                </ButtonLarge>
              </Col>
            </Row>
            <Row align="middle" gutter={[10, 10]}>
              <FormLabelLong text={'Մասնակցու՞մ եք կուտակային կենսաթոշակայինին'} />
              <Col>
                <ButtonSmall
                  type={formik.values.pension ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('pension', 1)}
                >
                  <Label fontcolor={
                    formik.values.pension
                      ? '#fff'
                      : '#000'
                  }>
                    Այո
                  </Label>
                </ButtonSmall>
              </Col>
              <Col>
                <ButtonSmall
                  type={!formik.values.pension ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('pension', 0)}
                >
                  <Label fontcolor={
                    !formik.values.pension
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
                  type={!formik.values.bonus_stamp ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('bonus_stamp', 0)}
                >
                  <Label fontcolor={
                    !formik.values.bonus_stamp
                      ? '#fff'
                      : '#000'
                  }>
                    Այո
                  </Label>
                </ButtonSmall>
              </Col>
              <Col>
                <ButtonSmall
                  type={formik.values.bonus_stamp ? 'primary' : 'default'}
                  size="large"
                  block
                  onClick={() => formik.setFieldValue('bonus_stamp', 1)}
                >
                  <Label fontcolor={
                    formik.values.bonus_stamp
                      ? '#fff'
                      : '#000'
                  }>
                    Ոչ
                  </Label>
                </ButtonSmall>
              </Col>
            </Row>
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
                    formik.setFieldValue('month1_price', salary);
                    formik.setFieldValue('month2_price', salary);
                    formik.setFieldValue('month3_price', salary);
                    formik.setFieldValue('month4_price', salary);
                    formik.setFieldValue('month5_price', salary);
                    formik.setFieldValue('month6_price', salary);
                    formik.setFieldValue('month7_price', salary);
                    formik.setFieldValue('month8_price', salary);
                    formik.setFieldValue('month9_price', salary);
                    formik.setFieldValue('month10_price', salary);
                    formik.setFieldValue('month11_price', salary);
                    formik.setFieldValue('month12_price', salary);
                    // formik.validateForm().then(res => {
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

            <Description text={'Այն ամիս(ներ)ը, երբ աշխատակիցը գտնվել է արձակուրդում, անաշխատունակության մեջ կամ այլ պատճառով բացակայել է աշխատանքից` չլրացնել'} />

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
              value1={formik.values.month1_price}
              value2={formik.values.month1_additional_price}
              value3={formik.values.month1_bonus_price}
              handler1={value => formik.setFieldValue('month1_price', value)}
              handler2={value => formik.setFieldValue('month1_additional_price', value)}
              handler3={value => formik.setFieldValue('month1_bonus_price', value)}
            />
            <CalcTableRow
              month={months[month2]}
              year={year2}
              value1={formik.values.month2_price}
              value2={formik.values.month2_additional_price}
              value3={formik.values.month2_bonus_price}
              handler1={value => formik.setFieldValue('month2_price', value)}
              handler2={value => formik.setFieldValue('month2_additional_price', value)}
              handler3={value => formik.setFieldValue('month2_bonus_price', value)}
            />
            <CalcTableRow
              month={months[month3]}
              year={year3}
              value1={formik.values.month3_price}
              value2={formik.values.month3_additional_price}
              value3={formik.values.month3_bonus_price}
              handler1={value => formik.setFieldValue('month3_price', value)}
              handler2={value => formik.setFieldValue('month3_additional_price', value)}
              handler3={value => formik.setFieldValue('month3_bonus_price', value)}
            />
            <CalcTableRow
              month={months[month4]}
              year={year4}
              value1={formik.values.month4_price}
              value2={formik.values.month4_additional_price}
              value3={formik.values.month4_bonus_price}
              handler1={value => formik.setFieldValue('month4_price', value)}
              handler2={value => formik.setFieldValue('month4_additional_price', value)}
              handler3={value => formik.setFieldValue('month4_bonus_price', value)}
            />
            <CalcTableRow
              month={months[month5]}
              year={year5}
              value1={formik.values.month5_price}
              value2={formik.values.month5_additional_price}
              value3={formik.values.month5_bonus_price}
              handler1={value => formik.setFieldValue('month5_price', value)}
              handler2={value => formik.setFieldValue('month5_additional_price', value)}
              handler3={value => formik.setFieldValue('month5_bonus_price', value)}
            />
            <CalcTableRow
              month={months[month6]}
              year={year6}
              value1={formik.values.month6_price}
              value2={formik.values.month6_additional_price}
              value3={formik.values.month6_bonus_price}
              handler1={value => formik.setFieldValue('month6_price', value)}
              handler2={value => formik.setFieldValue('month6_additional_price', value)}
              handler3={value => formik.setFieldValue('month6_bonus_price', value)}
            />
            <CalcTableRow
              month={months[month7]}
              year={year7}
              value1={formik.values.month7_price}
              value2={formik.values.month7_additional_price}
              value3={formik.values.month7_bonus_price}
              handler1={value => formik.setFieldValue('month7_price', value)}
              handler2={value => formik.setFieldValue('month7_additional_price', value)}
              handler3={value => formik.setFieldValue('month7_bonus_price', value)}
            />
            <CalcTableRow
              month={months[month8]}
              year={year8}
              value1={formik.values.month8_price}
              value2={formik.values.month8_additional_price}
              value3={formik.values.month8_bonus_price}
              handler1={value => formik.setFieldValue('month8_price', value)}
              handler2={value => formik.setFieldValue('month8_additional_price', value)}
              handler3={value => formik.setFieldValue('month8_bonus_price', value)}
            />
            <CalcTableRow
              month={months[month9]}
              year={year9}
              value1={formik.values.month9_price}
              value2={formik.values.month9_additional_price}
              value3={formik.values.month9_bonus_price}
              handler1={value => formik.setFieldValue('month9_price', value)}
              handler2={value => formik.setFieldValue('month9_additional_price', value)}
              handler3={value => formik.setFieldValue('month9_bonus_price', value)}
            />
            <CalcTableRow
              month={months[month10]}
              year={year10}
              value1={formik.values.month10_price}
              value2={formik.values.month10_additional_price}
              value3={formik.values.month10_bonus_price}
              handler1={value => formik.setFieldValue('month10_price', value)}
              handler2={value => formik.setFieldValue('month10_additional_price', value)}
              handler3={value => formik.setFieldValue('month10_bonus_price', value)}
            />
            <CalcTableRow
              month={months[month11]}
              year={year11}
              value1={formik.values.month11_price}
              value2={formik.values.month11_additional_price}
              value3={formik.values.month11_bonus_price}
              handler1={value => formik.setFieldValue('month11_price', value)}
              handler2={value => formik.setFieldValue('month11_additional_price', value)}
              handler3={value => formik.setFieldValue('month11_bonus_price', value)}
            />
            <CalcTableRow
              month={months[month12]}
              year={year12}
              value1={formik.values.month12_price}
              value2={formik.values.month12_additional_price}
              value3={formik.values.month12_bonus_price}
              handler1={value => formik.setFieldValue('month12_price', value)}
              handler2={value => formik.setFieldValue('month12_additional_price', value)}
              handler3={value => formik.setFieldValue('month12_bonus_price', value)}
              gutter
            />
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
          {result ? (
            <>
              <Row align="middle" gutter={[5, 10]}>
                <Col
                  xxl={{ span: 4, offset: 6 }}
                  xl={{ span: 4, offset: 5 }}
                  lg={{ span: 5, offset: 4 }}
                  md={{span: 6, offset: 2}}
                  offset={1}
                  span={10}
                >
                  <H3Styled>Արդյունք</H3Styled>
                </Col>
              </Row>
              <Row gutter={[0, 30]}>
                <Col
                  xxl={{ span: 8, offset: 6 }}
                  xl={{ span: 9, offset: 5 }}
                  lg={{ span: 9, offset: 4 }}
                  md={{ span: 21, offset: 2 }}
                  offset={1}
                  span={20}
                >
                  <Row gutter={[10, 10]}>
                    <Col span={17}>
                      <ResultCell>
                        <Label left fontcolor="#fff">Եկամտային հարկ</Label>
                      </ResultCell>
                    </Col>
                    <Col span={6}>
                      <ResultCell>
                        <Label left fontcolor="#fff">{result.totalInfo.taxPrice}</Label>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={17}>
                      <ResultCell>
                        <Label left fontcolor="#fff">Պարտադիր կուտակային կենսաթոշակ</Label>
                      </ResultCell>
                    </Col>
                    <Col span={6}>
                      <ResultCell>
                        <Label fontcolor="#fff">{result.totalInfo.pensionPrice}</Label>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={17}>
                      <ResultCell>
                        <Label fontcolor="#fff">Դրոշմանիշային վճար</Label>
                      </ResultCell>
                    </Col>
                    <Col span={6}>
                      <ResultCell>
                        <Label fontcolor="#fff">{result.totalInfo.stampPrice}</Label>
                      </ResultCell>
                    </Col>
                  </Row>
                </Col>

                <Col
                  xxl={{ span: 9, offset: 0 }}
                  xl={{ span: 10, offset: 0 }}
                  lg={{ span: 11, offset: 0 }}
                  md={{span: 20, offset: 2}}
                  span={20}
                  offset={1}
                >
                  <Row gutter={[10, 10]}>
                    <Col span={10}>
                      <ResultCell large>
                        <Label2 fontcolor="#fff">
                          Արձակուրդայինի գումար
                        </Label2>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell large>
                        <Label2 fontcolor="#fff">
                          {result.totalInfo.vacation}
                        </Label2>
                      </ResultCell>
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={10}>
                      <ResultCell large>
                        <Label2 fontcolor="#fff">
                          Վճարման ենթակա արձակուրդային
                        </Label2>
                      </ResultCell>
                    </Col>
                    <Col span={7}>
                      <ResultCell large>
                        <Label2 fontcolor="#fff">
                          {result.totalInfo.vacationPayable}
                        </Label2>
                      </ResultCell>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Description text={'Արձակուրդայինի հաշվարկը ըստ ամիսների և աշխատավարձի հետ գումարային'} />

              {result.monthInfo.map((month, i) => (
                <React.Fragment key={i}>
                  <Row align="middle" gutter={[5, 0]}>
                    <Col
                      xxl={{ span: 4, offset: 6 }}
                      xl={{ span: 4, offset: 5 }}
                      lg={{ span: 5, offset: 4 }}
                      md={{span: 6, offset: 2}}
                      sm={{span: 10, offset: 1}}
                      offset={1}
                      span={10}
                    >
                      <H3Styled>{`${i + 1}-${i ? 'րդ' : 'ին'} ամիս`}</H3Styled>
                    </Col>
                  </Row>
                  <Row align="middle" gutter={[5, 0]}>
                    <Col
                      xxl={{ span: 4, offset: 6 }}
                      xl={{ span: 5, offset: 5 }}
                      lg={{ span: 6, offset: 4 }}
                      md={{span: 7, offset: 2}}
                      sm={{span: 10, offset: 1}}
                      offset={1}
                      span={10}
                    />
                    <Col xxl={2} xl={2} lg={3} md={3} sm={4}>
                      <TabHeadCell>
                        <Label fontcolor="#000">Կեղտոտ</Label>
                      </TabHeadCell>
                    </Col>
                    <Col xxl={2} xl={2} lg={3} md={3} sm={4}>
                      <TabHeadCell>
                        <Label fontcolor="#000">Մաքուր</Label>
                      </TabHeadCell>
                    </Col>
                  </Row>
                  <Row align="middle" gutter={[10, 10]}>
                    <Col
                      xxl={{ span: 4, offset: 6 }}
                      xl={{ span: 5, offset: 5 }}
                      lg={{ span: 6, offset: 4 }}
                      md={{span: 7, offset: 2}}
                      sm={{span: 10, offset: 1}}
                      offset={1}
                      span={10}
                    >
                      <ResultCell>
                        <Label fontcolor="#fff">
                          Արձակուրդային
                        </Label>
                      </ResultCell>
                    </Col>
                    <Col xxl={2} xl={2} lg={3} md={3} sm={4}>
                      <ResultCell>
                        <Label fontcolor="#fff">
                          {month.vacation_registered_price}
                        </Label>
                      </ResultCell>
                    </Col>
                    <Col xxl={2} xl={2} lg={3} md={3} sm={4}>
                      <ResultCell>
                        <Label fontcolor="#fff">
                          {month.vacation_pure_price}
                        </Label>
                      </ResultCell>
                    </Col>
                  </Row>
                  <Row align="middle" gutter={[10, 10]}>
                    <Col
                      xxl={{ span: 4, offset: 6 }}
                      xl={{ span: 5, offset: 5 }}
                      lg={{ span: 6, offset: 4 }}
                      md={{span: 7, offset: 2}}
                      sm={{span: 10, offset: 1}}
                      offset={1}
                      span={10}
                    >
                      <ResultCell>
                        <Label fontcolor="#fff">
                          Աշխատավարձ
                        </Label>
                      </ResultCell>
                    </Col>
                    <Col xxl={2} xl={2} lg={3} md={3} sm={4}>
                      <ResultCell>
                        <Label fontcolor="#fff">
                          {month.salary_registered}
                        </Label>
                      </ResultCell>
                    </Col>
                    <Col xxl={2} xl={2} lg={3} md={3} sm={4}>
                      <ResultCell>
                        <Label fontcolor="#fff">
                          {month.salary_pure}
                        </Label>
                      </ResultCell>
                    </Col>
                  </Row>
                  <Row align="middle" gutter={[10, 40]}>
                    <Col
                      xxl={{ span: 4, offset: 6 }}
                      xl={{ span: 5, offset: 5 }}
                      lg={{ span: 6, offset: 4 }}
                      md={{span: 7, offset: 2}}
                      sm={{span: 10, offset: 1}}
                      offset={1}
                      span={10}
                    >
                      <ResultCell>
                        <Label left="true" fontcolor="#fff">
                          Ընդամենը աշխատավարձ և արձակուրդային
                        </Label>
                      </ResultCell>
                    </Col>
                    <Col xxl={2} xl={2} lg={3} md={3} sm={4}>
                      <ResultCell>
                        <Label fontcolor="#fff">
                          {month.salary_all_registered}
                        </Label>
                      </ResultCell>
                    </Col>
                    <Col xxl={2} xl={2} lg={3} md={3} sm={4}>
                      <ResultCell>
                        <Label fontcolor="#fff">
                          {month.salary_all_pure}
                        </Label>
                      </ResultCell>
                    </Col>
                  </Row>
                </React.Fragment>
              ))}
            </>
          ) : null}

          <Description text={'Հասանելիք արձակուրդային օրերի հաշվարկում'} />

          <form onSubmit={formik2.handleSubmit}>
            <Row align="middle" gutter={[10, 10]}>
              <Col
                xxl={{span: 2, offset: 6}}
                xl={{span: 2, offset: 5}}
                lg={{span: 3, offset: 4}}
                md={{span: 4, offset: 2}}
                sm={{span: 4, offset: 1}}
                span={4}
              >
                <FormLabelCell>
                  <Label fontcolor="#000">Ընդունում</Label>
                </FormLabelCell>
              </Col>
              <Col>
                <StyledDatePicker
                  value={vacStart2}
                  onChange={date => {
                    setVacStart2(date);
                    formik2.setFieldValue('date_from', moment(date).format('YYYY-MM-DD'));
                  }}
                  allowClear={false}
                  suffixIcon={<CustomCaret />}
                  size="large"
                  format="DD.MM.YYYY"
                  disabledDate={d => !d || d.isAfter(vacEnd2)}
                />
              </Col>
              <Col xxl={2} xl={2} lg={3} md={3} sm={4} span={4}>
                <FormLabelCell>
                  <Label fontcolor="#000">Մինչև</Label>
                </FormLabelCell>
              </Col>
              <Col>
                <StyledDatePicker
                  value={vacEnd2}
                  onChange={date => {
                    setVacEnd2(date);
                    formik2.setFieldValue('date_to', moment(date).format('YYYY-MM-DD'));
                  }}
                  allowClear={false}
                  suffixIcon={<CustomCaret />}
                  size="large"
                  format="DD.MM.YYYY"
                  disabledDate={d => !d || d.isBefore(vacStart2)}
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
                  type={formik2.values.work_day_type ? 'default' : 'primary'}
                  onClick={() => formik2.setFieldValue('work_day_type', 0)}
                >
                  <Label fontcolor={formik2.values.work_day_type ? '#000' : '#fff'}>
                    Հնգօրյա աշխատանքային շաբաթ
                  </Label>
                </ButtonLarge>
              </Col>
              <Col xxl={5} xl={6} lg={7} md={9} sm={11} span={12}>
                <ButtonLarge
                  block
                  type={!formik2.values.work_day_type ? 'default' : 'primary'}
                  onClick={() => formik2.setFieldValue('work_day_type', 1)}
                >
                  <Label fontcolor={!formik2.values.work_day_type ? '#000' : '#fff'}>
                    Վեցօրյա աշխատանքային շաբաթ	
                  </Label>
                </ButtonLarge>
              </Col>
            </Row>
            <Row align="middle" gutter={[10, 10]}>
              <FormLabelLong text={'Ընդհանուր արձակուրդային օրեր'} />

              <Col xxl={1} xl={2} lg={2} md={2} sm={3} span={3}>
                <StyledInputNumber
                  value={formik2.values.total_vacation_days}
                  min={1}
                  onChange={val => {
                    formik2.setFieldValue('total_vacation_days', val);
                  }}
                />
              </Col>
            </Row>
            <Row align="middle" gutter={[10, 30]}>
              <FormLabelLong text={'Օգտագործված արձակուրդային օրեր'} />

              <Col xxl={1} xl={2} lg={2} md={2} sm={3} span={3}>
                <StyledInputNumber
                  value={formik2.values.used_days}
                  min={0}
                  onChange={val => {
                    formik2.setFieldValue('used_days', val);
                  }}
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
                  disabled={loading2 /* || !formik2.isValid */}
                  size="large"
                  block
                  htmlType="submit"
                >
                  {loading2 ? <Spin /> : 'Հաշվել'}
                </ButtonSubmit>
              </Col>
            </Row>
          </form>
          {result2 ? (
            <>
              <Row align="middle" gutter={[5, 10]}>
                <Col
                  xxl={{ span: 4, offset: 6 }}
                  xl={{ span: 4, offset: 5 }}
                  lg={{ span: 5, offset: 4 }}
                  md={{span: 6, offset: 2}}
                  offset={1}
                  span={10}
                >
                  <H3Styled>Արդյունք</H3Styled>
                </Col>
              </Row>
              <Row gutter={[10, 30]}>
                <Col
                  xxl={{ offset: 6 }}
                  xl={{ offset: 5 }}
                  lg={{ offset: 4 }}
                  md={{ offset: 2}}
                  offset={1}
                >
                  <ResultCell>
                    <Label fontcolor="#fff">
                      Հասանելիք արձակուրդային օրեր
                    </Label>
                  </ResultCell>
                </Col>
                <Col>
                  <ResultCell>
                    <Label fontcolor="#fff">
                      {result2.available}
                    </Label>
                  </ResultCell>
                </Col>
              </Row>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default VacationCalculator;