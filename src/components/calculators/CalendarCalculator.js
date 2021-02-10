import React, { useEffect, useState } from "react"
import moment from "moment"
import { Checkbox, Col, Form, Radio, Row } from "antd"
import {
  ButtonSubmit,
  CalculatorsCard,
  CalendarInfo,
  CalendarTable,
  CalendarTitle,
  CalendarWrapper,
  CheckboxField,
  DayWrapper,
  FormLabel,
  H1Styled,
  InformationTitles,
  Label,
  TextStyled,
  UnderLine,
} from "./styled"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import triple from "../../api/triple"
import Calendar from "../../calculators/Calendar"

const CalendarCalculatorExample = ({ lang }) => {
  const [form, setForm] = useState({
    dates: [],
    schedule: 5,
    someFlag: false,
  })
  const monthsList = [
    {
      id: 0,
      name: lang.calendar.months.january,
    },
    {
      id: 1,
      name: lang.calendar.months.february,
    },
    {
      id: 2,
      name: lang.calendar.months.march,
    },
    {
      id: 3,
      name: lang.calendar.months.april,
    },
    {
      id: 4,
      name: lang.calendar.months.may,
    },
    {
      id: 5,
      name: lang.calendar.months.june,
    },
    {
      id: 6,
      name: lang.calendar.months.july,
    },
    {
      id: 7,
      name: lang.calendar.months.august,
    },
    {
      id: 8,
      name: lang.calendar.months.september,
    },
    {
      id: 9,
      name: lang.calendar.months.october,
    },
    {
      id: 10,
      name: lang.calendar.months.november,
    },
    {
      id: 11,
      name: lang.calendar.months.december,
    },
  ]
  const year = moment().year()
  const [initialState, setInitialState] = useState({
    calculated: false,
    data: [],
    holidays: [],
    workdays: [],
    workingDaysAndHours: [],
    result: {},
    checkedDates: [],
  })
  const [check, setCheck] = useState([])

  const getHolidays = () => {
    triple.get(`/api/days?year=${year}&calculated=1`).then(res => {
      setInitialState((state) => ({
        ...state,
        holidays: res.data.holidays,
        workdays: res.data.workdays,
        workingDaysAndHours: res.data.workingDaysAndHours,
      }))
    })
      .catch(err => console.log(err))
  }

  const setField = (name, value, cb) => {
    setForm((state) => ({
      ...state,
      [name]: value,
      someFlag: true,
    }))
  }

  const handleSubmit = () => Calendar.schema.isValid(form).then(valid => {
    if (!valid) {
      setInitialState((state) => ({
        ...state,
        calculated: false,
      }))

      return
    }

    let start = moment(form.dates[form.dates.length - 1]).isBefore(moment(form.dates[0])) ? form.dates[form.dates.length - 1] : form.dates[0]
    let end = moment(form.dates[form.dates.length - 1]).isBefore(moment(form.dates[0])) ? form.dates[form.dates.length - 2] : form.dates[form.dates.length - 1]

    triple.get(`/api/days/calculate?from=${start}&to=${end}&schedule=${form.schedule}`).then(res => {
      setInitialState((state) => ({
        ...state,
        result: res.data,
        calculated: true,
      }))
    }).catch(err => console.log(err))

  })

  const monthDays = (month) => {
    let weeks = [], days = []

    for (let i = 1; i <= month.daysInMonth(); i++) {
      let date = moment({ date: i, month: month.month(), year: month.year() })

      days[date.day()] = { date: date }

      if (date.day() === 6) {
        weeks.push(days.slice())
        days = []
      }
    }

    if (days.length) {
      days = days.concat(Array(7 - days.length).fill(undefined))

      weeks.push(days)
    }

    return weeks
  }

  useEffect(() => {
    handleSubmit()
  }, [initialState.calculated])

  const getCalendarDatas = () => {
    let start = moment({ year: year }).startOf("year")
    let end = moment({ year: year }).endOf("year")
    let range = moment.range(start, end)
    const months = Array
      .from(range.by("month"))
      .map(month => monthDays(month))
    setInitialState((state) => ({
      ...state,
      data: months,
    }))
  }

  useEffect(() => {
    getCalendarDatas()
    getHolidays()
  }, [])

  useEffect(() => {
    form.dates.length > 1 && form.someFlag && addCheckedDataRange()
  }, [form])

  const addCheckedDataRange = () => {
    let start, end
    if (check.length > 0) {
      if (check[0] === form.dates[0] && check[check.length - 1] === form.dates[form.dates.length - 1]) {
        let checkedDate
        for (let i = 0; i < check.length - 1; i++) {
          if (!form.dates.includes(check[i])) {
            checkedDate = check[i]
          }
        }
        start = check[0]
        end = checkedDate
      } else {
        start = moment(form.dates[form.dates.length - 1]).isBefore(moment(form.dates[0])) ? moment(form.dates[form.dates.length - 1]) : moment(form.dates[0])
        end = moment(form.dates[form.dates.length - 1]).isBefore(moment(form.dates[0])) ? moment(form.dates[form.dates.length - 2]) : moment(form.dates[form.dates.length - 1])
      }
    } else {
      start = moment(form.dates[form.dates.length - 1]).isBefore(moment(form.dates[0])) ? moment(form.dates[form.dates.length - 1]) : moment(form.dates[0])
      end = moment(form.dates[form.dates.length - 1]).isBefore(moment(form.dates[0])) ? moment(form.dates[form.dates.length - 2]) : moment(form.dates[form.dates.length - 1])
    }
    const range = moment().range(start, end)
    const checkedDates = []
    Array.from(range.by("days")).map(element => checkedDates.push(element.format("YYYY-MM-DD")))

    setForm((state) => ({
      ...state,
      dates: checkedDates,
      someFlag: false,
    }))
    setCheck(checkedDates)
  }

  const CalendarItem = ({ item }) => {
    let days = []

    for (let i = 0; i < item.length; i++) {
      const day = item[i]
        ?
        <DayWrapper
          key={`day_${item[i].date.format("YYYY-MM-DD")}`}
          align={"center"}
          id={`day_${item[i].date.format("YYYY-MM-DD")}`}
        >
          <CheckboxField
            className={`${item[i].date.day() === 0 || item[i].date.day() === 6 ? "weekend" : ""}
            ${initialState.workdays.length > 0 && initialState.workdays.find(workday => workday.date === item[i].date.format("YYYY-MM-DD")) ? "workday" : ""}
          ${initialState.holidays.length > 0 && initialState.holidays.find(holiday => holiday.date === item[i].date.format("YYYY-MM-DD")) ? "holiday" : ""}`
            }
            type="checkbox"
            value={`${item[i].date.format("YYYY-MM-DD")}`}
            id={`${item[i].date.format("YYYY-MM-DD")}`}>
            {item[i].date.format("D")}
          </CheckboxField>
        </DayWrapper>
        : <td />

      days.push(day)
    }

    return days
  }

  return (
    <Row align="start" gutter={20}>
      <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
        <Row align="center" style={{ justifyContent: "space-between" }}>
          <div className="textSec">
            <H1Styled>{lang.title}</H1Styled>
            <TextStyled>{lang.paragraph}</TextStyled>
          </div>
        </Row>
        <CalculatorsCard bordered={false} className={"calendarBody"}>
          <Form.Item label={<Label>{lang.chooseDaysRange}</Label>} labelCol={{ span: 24 }}>
          </Form.Item>
          <Form
            onFinish={handleSubmit}
            initialValues={form}
            colon={false}
            layout="horizontal"
            size="large"
          >
            <Checkbox.Group
              style={{ width: "100%" }}
              onChange={(v) => setField("dates", v)}
              name={"dates[]"}
              value={form.dates}>
              <Row
                align="start"
                justify="space-between"
                style={{
                  width: "100%",
                }}>
                {initialState.data.length > 0 && initialState.data.map((month, index) => (
                  <Col className={"calendarCol"} key={`month_${index}`}>
                    <CalendarWrapper>
                      <CalendarTable>
                        <thead>
                        <tr>
                          <CalendarTitle colSpan={7} align={"center"}>
                            {monthsList.map(monthData => (
                              monthData.id === index && monthData.name
                            ))}
                          </CalendarTitle>
                        </tr>
                        <tr>
                          <CalendarTitle
                            className={"additionalInformation weekend"} align={"center"}
                            data-day={"0"}>{lang.calendar.daysOfWeek.sunday}</CalendarTitle>
                          <CalendarTitle
                            className={"additionalInformation"} align={"center"}
                            data-day={"1"}>{lang.calendar.daysOfWeek.monday}</CalendarTitle>
                          <CalendarTitle
                            className={"additionalInformation"} align={"center"}
                            data-day={"2"}>{lang.calendar.daysOfWeek.tuesday}</CalendarTitle>
                          <CalendarTitle
                            className={"additionalInformation"} align={"center"}
                            data-day={"3"}>{lang.calendar.daysOfWeek.wednesday}</CalendarTitle>
                          <CalendarTitle
                            className={"additionalInformation"} align={"center"}
                            data-day={"4"}>{lang.calendar.daysOfWeek.thursday}</CalendarTitle>
                          <CalendarTitle
                            className={"additionalInformation"} align={"center"}
                            data-day={"5"}>{lang.calendar.daysOfWeek.friday}</CalendarTitle>
                          <CalendarTitle
                            className={"additionalInformation weekend"} align={"center"}
                            data-day={"6"}>{lang.calendar.daysOfWeek.saturday}</CalendarTitle>
                        </tr>
                        </thead>
                        <tbody>
                        {month.map((week, i) => (
                          <tr key={`calendar_${index}_week_${i}`}>
                            <CalendarItem item={week} />
                          </tr>
                        ))}
                        </tbody>
                      </CalendarTable>
                    </CalendarWrapper>
                    <CalendarInfo>
                      {initialState.workingDaysAndHours.length > 0 &&
                      <table>
                        <thead>
                        <tr>
                          <CalendarTitle />
                          <CalendarTitle
                            className={"additionalInformation"}>{lang.calendar.additionalInformation.five_days}</CalendarTitle>
                          <CalendarTitle
                            className={"additionalInformation"}>{lang.calendar.additionalInformation.six_days}</CalendarTitle>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <InformationTitles>{lang.calendar.additionalInformation.calendarDays}</InformationTitles>
                          <td
                            colSpan={2}>
                            {initialState.workingDaysAndHours.find(element => element.month === index + 1).overallDays}
                          </td>
                        </tr>
                        <tr>
                          <InformationTitles>{lang.calendar.additionalInformation.workDays}</InformationTitles>
                          <td>
                            {initialState.workingDaysAndHours.find(element => element.month === index + 1).workingDaysFive}
                          </td>
                          <td>
                            {initialState.workingDaysAndHours.find(element => element.month === index + 1).workingDaysSix}
                          </td>
                        </tr>
                        <tr>
                          <InformationTitles>{lang.calendar.additionalInformation.workHours}</InformationTitles>
                          <td>
                            {initialState.workingDaysAndHours.find(element => element.month === index + 1).workingHoursFive}
                          </td>
                          <td>
                            {initialState.workingDaysAndHours.find(element => element.month === index + 1).workingHoursSix}
                          </td>
                        </tr>
                        </tbody>
                      </table>
                      }
                    </CalendarInfo>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>

            <Form.Item label={lang.working_schedule} labelCol={{ span: 24 }}>
              <Radio.Group
                onChange={e => setField("schedule", e.target.value)}
                value={form.schedule}
              >
                <Radio value={5}>
                  {<Label
                    style={{ textTransform: "none" }}>{lang.calendar.additionalInformation["five_days"]}</Label>}
                </Radio>
                <Radio value={6}>
                  {<Label style={{ textTransform: "none" }}>{lang.calendar.additionalInformation["six_days"]}</Label>}
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item style={{ marginTop: "50px" }}>
              <ButtonSubmit
                htmlType="submit"
                shape="round"
                size="large"
              >
                {lang.calculate}
              </ButtonSubmit>
            </Form.Item>

          </Form>
        </CalculatorsCard>
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} className="result">
        <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

        <UnderLine />

        <CalculatorCardResult
          title={lang.result.calendarDays}
          text={initialState.result.overallDays}
        />

        <CalculatorCardResult
          title={lang.result.workDays}
          text={initialState.result.workingDays}
        />

        <CalculatorCardResult
          title={lang.result.nonWorkingDays}
          text={initialState.result.nonWorkingDays}
        />

        <CalculatorCardResult
          title={lang.result.workHours}
          text={initialState.result.workingHours}
        />
      </Col>
    </Row>
  )
}

export default CalendarCalculatorExample
