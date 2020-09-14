import React, { useState } from "react"
import { CaretDownFilled, } from "@ant-design/icons"
import { Typography, Row, Col, Button, InputNumber, DatePicker } from "antd"
import styled from "styled-components"
import { useFormik } from "formik"
import moment from "moment"
import * as Yup from "yup"
import { apiHelper } from "../../helpers/apiHelper"
import {
  Description,
  ToggleLarge,
  ToggleRegular,
  FormLabelLong,
  SubmitButton,
  CalcTableRow,
} from "./calcComponents"

const { Text } = Typography

const H3Styled = styled.h3`
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  font-family: ArialAMU;
  color: #000;
`

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
`

const ButtonBase = styled(Button)`
  height: 40px;
  border-color: #009db8;
  overflow: hidden;
`

const ButtonSmall = styled(Button)`
  height: 40px;
  width: 40px;
  border-color: #009db8;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonLarge = styled(Button)`
  height: 54px;
  border-color: #009db8;
  overflow: hidden;
  padding-vertical: 0;
`

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  height: 40px;
  border-color: #009db8;
  font-size: 13px;
  font-family: ArialAMU;
  color: #000;
  @media (min-width: 768px) {
    font-size: 14px;
  }
`

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  width: 130px;
  border-color: #009db8;
`

const FormLabelCell = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #d7d7d7;
  background-color: #fff;
`

const Label = styled(Text)`
  text-align: ${props => props.left ? "left" : "center"};
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
`

const TabHeadCell = styled.div`
  padding-left: 16px;
  padding-top: 4px;
  padding-right: 16px;
  height: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
`

const ResultCell = styled.div`
  background-color: #21363d;
  padding-left: 16px;
  padding-right: 16px;
  height: ${props => (props.large ? 60 : 40)}px;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.large ? "center" : "flex-start")};
  text-align: center;
`

const months = [
  "Հունվար",
  "Փետրվար",
  "Մարտ",
  "Ապրիլ",
  "Մայիս",
  "Հունիս",
  "Հուլիս",
  "Օգոստոս",
  "Սեպտեմբեր",
  "Հոկտեմբեր",
  "Նոյեմբեր",
  "Դեկտեմբեր",
]

const currentDate = moment()
const monthCurrent = +moment().format("M") - 1
const month1 = !monthCurrent ? 11 : monthCurrent - 1
const year1 = moment(currentDate).subtract(1, "months").year()
const month2 = !month1 ? 11 : month1 - 1
const year2 = moment(currentDate).subtract(2, "months").year()
const month3 = !month2 ? 11 : month2 - 1
const year3 = moment(currentDate).subtract(3, "months").year()
const month4 = !month3 ? 11 : month3 - 1
const year4 = moment(currentDate).subtract(4, "months").year()
const month5 = !month4 ? 11 : month4 - 1
const year5 = moment(currentDate).subtract(5, "months").year()
const month6 = !month5 ? 11 : month5 - 1
const year6 = moment(currentDate).subtract(6, "months").year()
const month7 = !month6 ? 11 : month6 - 1
const year7 = moment(currentDate).subtract(7, "months").year()
const month8 = !month7 ? 11 : month7 - 1
const year8 = moment(currentDate).subtract(8, "months").year()
const month9 = !month8 ? 11 : month8 - 1
const year9 = moment(currentDate).subtract(9, "months").year()
const month10 = !month9 ? 11 : month9 - 1
const year10 = moment(currentDate).subtract(10, "months").year()
const month11 = !month10 ? 11 : month10 - 1
const year11 = moment(currentDate).subtract(11, "months").year()
const month12 = !month11 ? 11 : month11 - 1
const year12 = moment(currentDate).subtract(12, "months").year()

const FinalCalculator = ({ langText }) => {
  const [result1, setResult1] = useState(0)
  const [result2, setResult2] = useState(null)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [release_date, set_release_date] = useState(moment().format("YYYY-MM-DD"))
  const [work_day_type, set_work_day_type] = useState(0)
  const [salary, setSalary] = useState(0)

  const initialValues1 = {
    work_day_type: 0,
    date_from: moment().format("YYYY-MM-DD"),
    date_to: moment().add(1, "days").format("YYYY-MM-DD"),
    total_vacation_days: 0,
    used_days: 0,
  }

  const formik1 = useFormik({
    initialValues: initialValues1,
    enableReinitialize: true,
    // validationSchema,
    // validateOnMount: true,
    onSubmit: async values => {
      setLoading1(true)
      setResult1(0)

      try {
        const res = await apiHelper.post("/api/counter/vacation_days", values)
        console.log("Available vac days: ", res)
        if (res.data.success) {
          setResult1(res.data.data.available)
        }
      } catch (e) {
        console.log("Available vac days error:", e)
        setLoading1(false)
      }

      setLoading1(false)
    },
  })

  const initialValues2 = {
    salary_type: 0,
    work_day_type: work_day_type,
    release_date: release_date,
    available: result1,
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
  }

  const validationSchema2 = Yup.object().shape({
    month1_price: Yup.number().required(),
    month2_price: Yup.number().required(),
    month3_price: Yup.number().required(),
    month4_price: Yup.number().required(),
    month5_price: Yup.number().required(),
    month6_price: Yup.number().required(),
    month7_price: Yup.number().required(),
    month8_price: Yup.number().required(),
    month9_price: Yup.number().required(),
    month10_price: Yup.number().required(),
    month11_price: Yup.number().required(),
    month12_price: Yup.number().required(),
  })

  const formik2 = useFormik({
    initialValues: initialValues2,
    enableReinitialize: true,
    validationSchema: validationSchema2,
    validateOnMount: true,
    onSubmit: async values => {
      console.log("Big form values", values)
      setResult2(null)
      let bodyFormData = new FormData()
      const json_data = {}
      for (let i = 1; i < 13; i++) {
        json_data[i] = {}
        json_data[i].price = values[`month${i}_price`]
        json_data[i].additional_price = values[`month${i}_additional_price`]
        json_data[i].bonus_price = values[`month${i}_bonus_price`]
      }
      bodyFormData.append("json_data", JSON.stringify(json_data))
      if (values.patent || values.patent === 0) {
        bodyFormData.append("patent", values.patent)
      }
      bodyFormData.append("salary_type", values.salary_type)
      bodyFormData.append("work_day_type", values.work_day_type)
      bodyFormData.append("release_date", values.release_date)
      bodyFormData.append("available", values.available)
      bodyFormData.append("pension", values.pension)
      bodyFormData.append("bonus_stamp", values.bonus_stamp)

      // TODO: complete form handler
      setLoading2(true)

      try {
        const res = await apiHelper.post("/api/counter/final", bodyFormData)
        console.log("Final calc response: ", res.data.data)
        if (res.data.success) {
          setResult2(res.data.data)
        }
      } catch (e) {
        console.log("Final calc error: ", e)
        setLoading2(false)
      }

      setLoading2(false)
    },
  })

  return (
    <>
      <Description text={"Չօգտագործված ամենամյա արձակուրդի համար դրամական հատուցուման հաշվարկ (Վերջնահաշվարկ)"} />

      <form onSubmit={formik1.handleSubmit}>
        <Row align="middle" gutter={[10, 10]}>
          <Col
            xxl={{ offset: 6, span: 4 }}
            xl={{ offset: 5, span: 4 }}
            lg={{ offset: 4, span: 5 }}
            md={{ offset: 2, span: 6 }}
            sm={{ offset: 1, span: 10 }}
            xs={{ span: 10 }}
          >
            <FormLabelCell>
              <Label fontcolor="#000">Ընդունման ամսաթիվ</Label>
            </FormLabelCell>
          </Col>
          <Col>
            <StyledDatePicker
              disabled={loading3}
              value={moment(formik1.values.date_from)}
              onChange={date => {
                const date_string1 = moment(date).format("YYYY-MM-DD")
                const date_string2 = moment(date).add(1, "days").format("YYYY-MM-DD")
                formik1.setFieldValue("date_from", date_string1)
                formik1.setFieldValue("date_to", date_string2)
                formik1.setFieldValue("total_vacation_days", 0)
                set_release_date(date_string2)
              }}
              allowClear={false}
              suffixIcon={<CustomCaret />}
              size="large"
              format="DD.MM.YYYY"
            />
          </Col>
          <Col
            xxl={{ offset: 0, span: 4 }}
            xl={{ offset: 0, span: 4 }}
            lg={{ offset: 0, span: 5 }}
            md={{ offset: 0, span: 6 }}
            sm={{ offset: 1, span: 10 }}
            xs={{ span: 10 }}
          >
            <FormLabelCell>
              <Label fontcolor="#000">Ազատման ամսաթիվ</Label>
            </FormLabelCell>
          </Col>
          <Col>
            <StyledDatePicker
              disabled={loading3}
              value={moment(formik1.values.date_to)}
              onChange={async date => {
                const date_string = moment(date).format("YYYY-MM-DD")
                formik1.setFieldValue("date_to", date_string)
                set_release_date(date_string)

                const body = {
                  "work_day_type": formik1.values.work_day_type,
                  "date_from": formik1.values.date_from,
                  "date_to": date_string,
                }

                setLoading3(true)

                try {
                  const res = await apiHelper.post("/api/counter/vacation_days", body)
                  formik1.setFieldValue("total_vacation_days", res.data.data.available)
                  console.log(res.data.data)
                } catch (e) {
                  console.log("Error 3: ", e)
                  setLoading3(false)
                }

                setLoading3(false)
              }}
              allowClear={false}
              suffixIcon={<CustomCaret />}
              size="large"
              format="DD.MM.YYYY"
              disabledDate={d => !d || d.isBefore(moment(formik1.values.date_from))}
            />
          </Col>
        </Row>

        <Row align="middle" gutter={[10, 10]}>
          <ToggleLarge
            disabled={loading3}
            label={"Հնգօրյա աշխատանքային շաբաթ"}
            toggleState={formik1.values.work_day_type}
            onClick={async () => {
              formik1.setFieldValue("work_day_type", 0)
              set_work_day_type(0)

              const body = {
                "work_day_type": 0,
                "date_from": formik1.values.date_from,
                "date_to": formik1.values.date_to,
              }

              setLoading3(true)

              try {
                const res = await apiHelper.post("/api/counter/vacation_days", body)
                formik1.setFieldValue("total_vacation_days", res.data.data.available)
                console.log(res.data.data)
              } catch (e) {
                console.log("Error 3: ", e)
                setLoading3(false)
              }

              setLoading3(false)
            }}
            start
          />
          <ToggleLarge
            disabled={loading3}
            label={"Վեցօրյա աշխատանքային շաբաթ"}
            toggleState={!formik1.values.work_day_type}
            onClick={async () => {
              formik1.setFieldValue("work_day_type", 1)
              set_work_day_type(1)

              const body = {
                "work_day_type": 1,
                "date_from": formik1.values.date_from,
                "date_to": formik1.values.date_to,
              }

              setLoading3(true)

              try {
                const res = await apiHelper.post("/api/counter/vacation_days", body)
                formik1.setFieldValue("total_vacation_days", res.data.data.available)
                console.log(res.data.data)
              } catch (e) {
                console.log("Error 3: ", e)
                setLoading3(false)
              }

              setLoading3(false)
            }}
          />
        </Row>

        <Row align="middle" gutter={[10, 10]}>
          <FormLabelLong text={"Ընդհանուր արձակուրդային օրեր"} />
          <Col xxl={1} xl={2} lg={2} md={2} sm={3} span={3}>
            <FormLabelCell>
              <Label fontcolor="#000">
                {formik1.values.total_vacation_days}
              </Label>
            </FormLabelCell>
          </Col>
        </Row>

        <Row align="middle" gutter={[10, 30]}>
          <FormLabelLong text={"Օգտագործված արձակուրդային օրեր"} />
          <Col xxl={1} xl={2} lg={2} md={2} sm={3} span={3}>
            <StyledInputNumber
              disabled={loading3}
              size="large"
              value={formik1.values.used_days}
              min={0}
              onChange={val => {
                formik1.setFieldValue("used_days", val)
              }}
            />
          </Col>
        </Row>

        <SubmitButton
          disabled={loading1 || loading3}
          loading={loading1}
          submitter
        />
      </form>
      {!!result1 && (
        <>
          <Row align="middle" gutter={[5, 30]}>
            <Col
              xxl={{ span: 4, offset: 6 }}
              xl={{ span: 4, offset: 5 }}
              lg={{ span: 5, offset: 4 }}
              md={{ span: 6, offset: 2 }}
              offset={1}
              span={10}
            >
              <H3Styled>Արդյունք</H3Styled>
            </Col>
          </Row>
          <Row gutter={[10, 30]}>
            <Col
              xxl={{ offset: 6, span: 7 }}
              xl={{ offset: 5, span: 9 }}
              lg={{ offset: 4, span: 10 }}
              md={{ offset: 2, span: 13 }}
              offset={1}
            >
              <ResultCell>
                <Label fontcolor="#fff">
                  Արձակուրդի չօգտագործված օրեր
                </Label>
              </ResultCell>
            </Col>
            <Col>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result1}
                </Label>
              </ResultCell>
            </Col>
          </Row>
        </>
      )}
      <form onSubmit={formik2.handleSubmit}>
        <Row align="middle" gutter={[10, 10]}>
          <ToggleRegular
            label={"Մաքուր"}
            toggleState={!formik2.values.salary_type}
            onClick={() => formik2.setFieldValue("salary_type", 0)}
            start
          />
          <ToggleRegular
            label={"Կեղտոտ"}
            toggleState={formik2.values.salary_type}
            onClick={() => formik2.setFieldValue("salary_type", 1)}
          />
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
                formik2.values.patent !== 1 && formik2.values.patent !== 0
                  ? "primary"
                  : "default"
              }
              // size="large"
              block
              onClick={() => formik2.setFieldValue("patent", null)}
            >
              <Label
                fontcolor={
                  formik2.values.patent !== 1 && formik2.values.patent !== 0
                    ? "#fff"
                    : "#000"
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
              type={formik2.values.patent === 1 ? "primary" : "default"}
              // size="large"
              block
              onClick={() => formik2.setFieldValue("patent", 1)}
            >
              <Label
                fontcolor={
                  formik2.values.patent === 1
                    ? "#fff"
                    : "#000"
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
              type={formik2.values.patent === 0 ? "primary" : "default"}
              // size="large"
              block
              onClick={() => formik2.setFieldValue("patent", 0)}
            >
              <Label
                fontcolor={
                  formik2.values.patent === 0
                    ? "#fff"
                    : "#000"
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
          <FormLabelLong text={"Մասնակցու՞մ եք կուտակային կենսաթոշակայինին"} />
          <Col>
            <ButtonSmall
              type={formik2.values.pension ? "primary" : "default"}
              size="large"
              block
              onClick={() => formik2.setFieldValue("pension", 1)}
            >
              <Label fontcolor={
                formik2.values.pension
                  ? "#fff"
                  : "#000"
              }>
                Այո
              </Label>
            </ButtonSmall>
          </Col>
          <Col>
            <ButtonSmall
              type={!formik2.values.pension ? "primary" : "default"}
              size="large"
              block
              onClick={() => formik2.setFieldValue("pension", 0)}
            >
              <Label fontcolor={
                !formik2.values.pension
                  ? "#fff"
                  : "#000"
              }>
                Ոչ
              </Label>
            </ButtonSmall>
          </Col>
        </Row>

        <Row align="middle" gutter={[10, 10]}>
          <FormLabelLong text={"Վճարե՞լ եք արդեն դրոշմանիշային վճարը"} />
          <Col>
            <ButtonSmall
              type={formik2.values.bonus_stamp ? "primary" : "default"}
              size="large"
              block
              onClick={() => formik2.setFieldValue("bonus_stamp", 1)}
            >
              <Label fontcolor={
                formik2.values.bonus_stamp
                  ? "#fff"
                  : "#000"
              }>
                Այո
              </Label>
            </ButtonSmall>
          </Col>
          <Col>
            <ButtonSmall
              type={!formik2.values.bonus_stamp ? "primary" : "default"}
              size="large"
              block
              onClick={() => formik2.setFieldValue("bonus_stamp", 0)}
            >
              <Label fontcolor={
                !formik2.values.bonus_stamp
                  ? "#fff"
                  : "#000"
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
                formik2.setFieldValue("month1_price", salary)
                formik2.setFieldValue("month2_price", salary)
                formik2.setFieldValue("month3_price", salary)
                formik2.setFieldValue("month4_price", salary)
                formik2.setFieldValue("month5_price", salary)
                formik2.setFieldValue("month6_price", salary)
                formik2.setFieldValue("month7_price", salary)
                formik2.setFieldValue("month8_price", salary)
                formik2.setFieldValue("month9_price", salary)
                formik2.setFieldValue("month10_price", salary)
                formik2.setFieldValue("month11_price", salary)
                formik2.setFieldValue("month12_price", salary)
                // formik2.validateForm().then(res => {
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
          value1={formik2.values.month1_price}
          value2={formik2.values.month1_additional_price}
          value3={formik2.values.month1_bonus_price}
          handler1={value => formik2.setFieldValue("month1_price", value)}
          handler2={value => formik2.setFieldValue("month1_additional_price", value)}
          handler3={value => formik2.setFieldValue("month1_bonus_price", value)}
        />
        <CalcTableRow
          month={months[month2]}
          year={year2}
          value1={formik2.values.month2_price}
          value2={formik2.values.month2_additional_price}
          value3={formik2.values.month2_bonus_price}
          handler1={value => formik2.setFieldValue("month2_price", value)}
          handler2={value => formik2.setFieldValue("month2_additional_price", value)}
          handler3={value => formik2.setFieldValue("month2_bonus_price", value)}
        />
        <CalcTableRow
          month={months[month3]}
          year={year3}
          value1={formik2.values.month3_price}
          value2={formik2.values.month3_additional_price}
          value3={formik2.values.month3_bonus_price}
          handler1={value => formik2.setFieldValue("month3_price", value)}
          handler2={value => formik2.setFieldValue("month3_additional_price", value)}
          handler3={value => formik2.setFieldValue("month3_bonus_price", value)}
        />
        <CalcTableRow
          month={months[month4]}
          year={year4}
          value1={formik2.values.month4_price}
          value2={formik2.values.month4_additional_price}
          value3={formik2.values.month4_bonus_price}
          handler1={value => formik2.setFieldValue("month4_price", value)}
          handler2={value => formik2.setFieldValue("month4_additional_price", value)}
          handler3={value => formik2.setFieldValue("month4_bonus_price", value)}
        />
        <CalcTableRow
          month={months[month5]}
          year={year5}
          value1={formik2.values.month5_price}
          value2={formik2.values.month5_additional_price}
          value3={formik2.values.month5_bonus_price}
          handler1={value => formik2.setFieldValue("month5_price", value)}
          handler2={value => formik2.setFieldValue("month5_additional_price", value)}
          handler3={value => formik2.setFieldValue("month5_bonus_price", value)}
        />
        <CalcTableRow
          month={months[month6]}
          year={year6}
          value1={formik2.values.month6_price}
          value2={formik2.values.month6_additional_price}
          value3={formik2.values.month6_bonus_price}
          handler1={value => formik2.setFieldValue("month6_price", value)}
          handler2={value => formik2.setFieldValue("month6_additional_price", value)}
          handler3={value => formik2.setFieldValue("month6_bonus_price", value)}
        />
        <CalcTableRow
          month={months[month7]}
          year={year7}
          value1={formik2.values.month7_price}
          value2={formik2.values.month7_additional_price}
          value3={formik2.values.month7_bonus_price}
          handler1={value => formik2.setFieldValue("month7_price", value)}
          handler2={value => formik2.setFieldValue("month7_additional_price", value)}
          handler3={value => formik2.setFieldValue("month7_bonus_price", value)}
        />
        <CalcTableRow
          month={months[month8]}
          year={year8}
          value1={formik2.values.month8_price}
          value2={formik2.values.month8_additional_price}
          value3={formik2.values.month8_bonus_price}
          handler1={value => formik2.setFieldValue("month8_price", value)}
          handler2={value => formik2.setFieldValue("month8_additional_price", value)}
          handler3={value => formik2.setFieldValue("month8_bonus_price", value)}
        />
        <CalcTableRow
          month={months[month9]}
          year={year9}
          value1={formik2.values.month9_price}
          value2={formik2.values.month9_additional_price}
          value3={formik2.values.month9_bonus_price}
          handler1={value => formik2.setFieldValue("month9_price", value)}
          handler2={value => formik2.setFieldValue("month9_additional_price", value)}
          handler3={value => formik2.setFieldValue("month9_bonus_price", value)}
        />
        <CalcTableRow
          month={months[month10]}
          year={year10}
          value1={formik2.values.month10_price}
          value2={formik2.values.month10_additional_price}
          value3={formik2.values.month10_bonus_price}
          handler1={value => formik2.setFieldValue("month10_price", value)}
          handler2={value => formik2.setFieldValue("month10_additional_price", value)}
          handler3={value => formik2.setFieldValue("month10_bonus_price", value)}
        />
        <CalcTableRow
          month={months[month11]}
          year={year11}
          value1={formik2.values.month11_price}
          value2={formik2.values.month11_additional_price}
          value3={formik2.values.month11_bonus_price}
          handler1={value => formik2.setFieldValue("month11_price", value)}
          handler2={value => formik2.setFieldValue("month11_additional_price", value)}
          handler3={value => formik2.setFieldValue("month11_bonus_price", value)}
        />
        <CalcTableRow
          month={months[month12]}
          year={year12}
          value1={formik2.values.month12_price}
          value2={formik2.values.month12_additional_price}
          value3={formik2.values.month12_bonus_price}
          handler1={value => formik2.setFieldValue("month12_price", value)}
          handler2={value => formik2.setFieldValue("month12_additional_price", value)}
          handler3={value => formik2.setFieldValue("month12_bonus_price", value)}
          gutter
        />

        <SubmitButton
          disabled={loading2 || !formik2.isValid}
          loading={loading2}
          submitter
        />
      </form>
      {!!result2 && (
        <>
          <Row align="middle" gutter={[5, 10]}>
            <Col
              xxl={{ span: 4, offset: 6 }}
              xl={{ span: 4, offset: 5 }}
              lg={{ span: 5, offset: 4 }}
              md={{ span: 6, offset: 2 }}
              offset={1}
              span={10}
            >
              <H3Styled>Արդյունք</H3Styled>
            </Col>
          </Row>
          <Description text={"Վերջնահաշվարկի հաշվարկը գումարային աշխատավարձի հետ միասին"} />

          <Row align="middle" gutter={[10, 10]}>
            <Col
              xxl={{ span: 8, offset: 6 }}
              xl={{ span: 10, offset: 5 }}
              lg={{ span: 12, offset: 4 }}
              md={{ span: 15, offset: 2 }}
              sm={{ span: 19, offset: 1 }}
              xs={{ span: 20, offset: 0 }}
            >
              <ResultCell>
                <Label fontcolor="#fff">
                  Վերջնահաշվարկ հաշվարկելու ամսվա աշխատանքային օրեր
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={2} md={2} sm={3}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.monthWorksDays}
                </Label>
              </ResultCell>
            </Col>
          </Row>

          <Row align="middle" gutter={[10, 20]}>
            <Col
              xxl={{ span: 8, offset: 6 }}
              xl={{ span: 10, offset: 5 }}
              lg={{ span: 12, offset: 4 }}
              md={{ span: 15, offset: 2 }}
              sm={{ span: 19, offset: 1 }}
              xs={{ span: 20, offset: 0 }}
            >
              <ResultCell>
                <Label fontcolor="#fff">
                  Վերջնահաշվարկ հաշվարկելու ամսվա աշխատած օրեր
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={2} md={2} sm={3}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.worksDays}
                </Label>
              </ResultCell>
            </Col>
          </Row>

          <Row align="middle" gutter={[10, 0]}>
            <Col
              xxl={{ span: 3, offset: 6 }}
              xl={{ span: 4, offset: 5 }}
              lg={{ span: 4, offset: 4 }}
              md={{ span: 5, offset: 2 }}
              sm={{ span: 6, offset: 1 }}
              xs={{ span: 7, offset: 0 }}
            />
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <TabHeadCell>
                <Label fontcolor="#000">
                  Կեղտոտ
                </Label>
              </TabHeadCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <TabHeadCell>
                <Label fontcolor="#000">
                  Մաքուր
                </Label>
              </TabHeadCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <TabHeadCell>
                <Label fontcolor="#000">
                  Եկամ/հարկ
                </Label>
              </TabHeadCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <TabHeadCell>
                <Label fontcolor="#000">
                  ՊԿԿ
                </Label>
              </TabHeadCell>
            </Col>
          </Row>

          <Row align="middle" gutter={[10, 10]}>
            <Col
              xxl={{ span: 3, offset: 6 }}
              xl={{ span: 4, offset: 5 }}
              lg={{ span: 4, offset: 4 }}
              md={{ span: 5, offset: 2 }}
              sm={{ span: 6, offset: 1 }}
              xs={{ span: 7, offset: 0 }}
            >
              <ResultCell>
                <Label fontcolor="#fff">
                  Աշխատավարձ
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.salary_registered}
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.salary_pure}
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.salary_taxPrice}
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.salary_pensionPrice}
                </Label>
              </ResultCell>
            </Col>
          </Row>

          <Row align="middle" gutter={[10, 10]}>
            <Col
              xxl={{ span: 3, offset: 6 }}
              xl={{ span: 4, offset: 5 }}
              lg={{ span: 4, offset: 4 }}
              md={{ span: 5, offset: 2 }}
              sm={{ span: 6, offset: 1 }}
              xs={{ span: 7, offset: 0 }}
            >
              <ResultCell>
                <Label fontcolor="#fff">
                  Արձակուրդային
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.vacation_registered}
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.vacation_pure}
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.vacation_taxPrice}
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.vacation_pensionPrice}
                </Label>
              </ResultCell>
            </Col>
          </Row>

          <Row align="middle" gutter={[10, 10]}>
            <Col
              xxl={{ span: 3, offset: 6 }}
              xl={{ span: 4, offset: 5 }}
              lg={{ span: 4, offset: 4 }}
              md={{ span: 5, offset: 2 }}
              sm={{ span: 6, offset: 1 }}
              xs={{ span: 7, offset: 0 }}
            >
              <ResultCell>
                <Label fontcolor="#fff">
                  Վերջնահաշվարկ
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.final_salary_registered}
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.final_salary_pure}
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.final_taxPrice}
                </Label>
              </ResultCell>
            </Col>
            <Col xxl={2} xl={2} lg={3} md={3} sm={4} xs={4}>
              <ResultCell>
                <Label fontcolor="#fff">
                  {result2.final_pensionPrice}
                </Label>
              </ResultCell>
            </Col>
          </Row>
        </>
      )}
    </>
  )
};

export default FinalCalculator;
