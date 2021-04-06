import React, { useEffect, useMemo, useRef, useState } from "react"
import moment from "moment"
import { Checkbox, Col, Form, Radio, Row } from "antd"
import {
  ButtonSubmit,
  CalculatorDatePicker,
  CalculatorsCard,
  CalculatorsCardWrapper,
  CalendarInfo,
  CalendarTable,
  CalendarTitle,
  CalendarWrapper,
  FormLabel,
  InformationTitles,
  Label, RowWrapper,
  UnderLine,
  YearField,
} from "./styled"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"
import triple from "../../api/triple"
import Calendar from "../../calculators/Calendar"
import { isHoliday, isWeekend } from "./utilities/vacation"
import arrow from "../../assets/arrowForCalendar.svg"
import { getCalendarDates } from "./utilities/calendar"
import CalendarItem from "./calcComponents/Calendar"
import { randomString } from "./utilities/tabel"

const CalendarCalculator = ({ lang, locale }) => {
  const dateToPicker = useRef()
  const dateFromPicker = useRef()
  const [form, setForm] = useState({
    dates: [],
    schedule: 5,
    date_to: null,
    date_from: null,
    randomKey: randomString(),
  })
  const [check, setCheck] = useState(false)
  const top = useRef(null)
  const [width, setWidth] = useState(typeof window !="undefined" && window.innerWidth <=768)
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
  const [year, setYear] = useState(moment().year())
  const calendar = useMemo(() => getCalendarDates(year), [year])
  const [initialState, setInitialState] = useState({
    calculated: false,
    data: [],
    holidays: [],
    workdays: [],
    workingDaysAndHours: [],
    result: {},
  })

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
      randomKey: randomString(),
      [name]: value,
    }))
  }

  const setFields = (fields) => {
    setForm((state) => ({
      ...state,
      ...fields,
    }))
  }

  const setNewYear = (event) => {
    const actionType = event.currentTarget.getAttribute("data-action")
    setForm((state) => ({
      ...state,
      randomKey: randomString(),
    }))
    if (actionType === "prev") {
      setYear(year - 1)
    } else if (actionType === "next") {
      setYear(year + 1)
    }
  }

  const handleSubmit = async () => Calendar.schema.isValid(form).then(valid => {
    if (!valid) {
      setInitialState((state) => ({
        ...state,
        calculated: false,
      }))

      return
    }

    calculateDates(form.date_from.format("YYYY-MM-DD"), form.date_to.format("YYYY-MM-DD"))
  }).finally(() => {
    if(check && width){
      top.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      setCheck(false)
    }

  })

  const calculateDates = (start, end) => {
    triple.get(`/api/days/calculate?from=${start}&to=${end}&schedule=${form.schedule}`).then(res => {
      setInitialState((state) => ({
        ...state,
        result: res.data,
        calculated: true,
      }))
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    getHolidays()
  }, [year])

  useEffect(() => {
    if (initialState.calculated) {
      handleSubmit()
    }
  }, [form])

  const addCheckedDataRange = (date) => {
    if (date) {
      let checked = form.dates
      let start = moment(date[date.length - 1]).isBefore(moment(date[0]))
        ? moment(date[date.length - 1])
        : moment(date[0])
      let end = moment(date[date.length - 1]).isBefore(moment(date[0]))
        ? moment(date[date.length - 2])
        : moment(date[date.length - 1])

      if (date[0] === form.dates[0] && date[date.length - 1] === form.dates[form.dates.length - 1]) {
        let checkedDate = end
        for (let i = 0; i < checked.length - 1; i++) {
          if (!date.includes(checked[i])) {
            checkedDate = checked[i]
          }
        }
        start = checked[0]
        end = checkedDate
      }
      const range = moment().range(start, end)
      const checkedDates = []
      Array.from(range.by("days")).map(element => checkedDates.push(element.format("YYYY-MM-DD")))
      setFields({
        dates: checkedDates,
        date_from: moment(start),
        date_to: moment(end),
      })
    }
  }

  const handlePickerRender = (date, today, range) => {
    const { schedule, date_to, date_from } = form

    // const condition = range === "start"
    //   ? date_from && (date.isSameOrAfter(date_from, "day"))
    //   : !date_to || (date.isSameOrBefore(date_to, "day"))

    if (date.isSame(today, "day")) {
      return <div className={
        // !condition
        "ant-picker-cell-inner ant-picker-cell-today"
        // : "ant-picker-cell-inner"
      }>
        {date.format("D")}
        {locale === "arm" && initialState.workdays.length > 0
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && initialState.workdays.length > 0
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
        {locale === "arm" && initialState.holidays.length > 0
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && initialState.holidays.length > 0
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
      </div>
    } else if (isHoliday(date, initialState.holidays)) {
      return <div className={
        // !condition
        "ant-picker-cell-inner ant-picker-cell-holiday"
        // : "ant-picker-cell-inner"
      }>
        {date.format("D")}
        {locale === "arm" && initialState.workdays.length > 0
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && initialState.workdays.length > 0
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
        {locale === "arm" && initialState.holidays.length > 0
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && initialState.holidays.length > 0
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
      </div>
    } else if (isWeekend(date, schedule)) {
      return <div className={
        // !condition
        "ant-picker-cell-inner ant-picker-cell-weekend"
        // : "ant-picker-cell-inner"
      }>
        {date.format("D")}
        {locale === "arm" && initialState.workdays.length > 0
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && initialState.workdays.length > 0
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
        {locale === "arm" && initialState.holidays.length > 0
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && initialState.holidays.length > 0
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
      </div>
    } else {
      return <div className="ant-picker-cell-inner">
        {date.format("D")}
        {locale === "arm" && initialState.workdays.length > 0
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && initialState.workdays.length > 0
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD"))
        && initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {initialState.workdays.find(workday => workday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
        {locale === "arm" && initialState.holidays.length > 0
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title &&
        <span className={"day_title"}>
                  {initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title}
                </span>
        }
        {locale !== "arm" && initialState.holidays.length > 0
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD"))
        && initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en &&
        <span className={"day_title"}>
                  {initialState.holidays.find(holiday => holiday.date === date.format("YYYY-MM-DD")).title_en}
                </span>
        }
      </div>
    }
  }

  const handleDateFromDisabled = d => {
    const { date_to } = form
    // return date_to && (d.isAfter(date_to, "day"))
    if (date_to) {
      return d.isSameOrAfter(date_to, "day")
    } else {
      return d && d.year() !== year
    }
  }

  const handleDateToDisabled = d => {
    const { date_from } = form
    // return !date_from || !d || (d.isBefore(date_from, "day"))
    if (date_from) {
      return d.isSameOrBefore(date_from, "day")
    } else {
      return d && d.year() !== year
    }
  }

  const handleDateFromChange = date => {
    const { date_to } = form
    const range = moment().range(date, date_to ? date_to : date)
    const checkedDates = []
    Array.from(range.by("days")).map(element => checkedDates.push(element.format("YYYY-MM-DD")))

    setFields({
      dates: checkedDates,
      date_from: date,
    })
  }

  const defaultDate = () => {
    return moment({ year })
  }

  const defaultToDate = () => {
    const { date_from } = form
    return date_from ? moment(date_from) : moment({ year })
  }

  const handleDateToChange = date => {
    const { date_from } = form
    const range = moment().range(date_from, date)
    const checkedDates = []
    Array.from(range.by("days")).map(element => checkedDates.push(element.format("YYYY-MM-DD")))

    setFields({
      date_to: date,
      dates: checkedDates,
    })
  }

  return (
    <Row align="start" gutter={20} className="fixElement">
      <CalculatorsCardWrapper className="calendarWrapper" xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <CalculatorsCard bordered={false} className={"calendarBody"}>
          <Form
            onFinish={handleSubmit}
            initialValues={form}
            colon={false}
            layout="horizontal"
            size="large"
          >
            <Row align="start"
                 justify="space-between">
              <CalculatorsCardWrapper className="calendarWrapper" span={24} xl={16}>
                <Form.Item label={lang.working_schedule} labelCol={{ span: 24 }}>
                  <Radio.Group
                    onChange={e => setField("schedule", e.target.value)}
                    value={form.schedule}
                  >
                    <Radio className="inlineElements" value={5}>
                      {<Label
                        style={{ textTransform: "none" }}>{lang.calendar.additionalInformation["five_days"]}</Label>}
                    </Radio>
                    <Radio className="inlineElements" value={6}>
                      {<Label
                        style={{ textTransform: "none" }}>{lang.calendar.additionalInformation["six_days"]}</Label>}
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <Row gutter={10} className="startEndInputs">
                  <RowWrapper style={{ marginRight: "25px", display:"flex", alignItems: "center" }} label={<Label>{lang.form.start}</Label>}>
                    <CalculatorDatePicker
                      dateRender={(date, today) => handlePickerRender(date, today, "start")}
                      disabledDate={handleDateFromDisabled}
                      onChange={handleDateFromChange}
                      value={form.date_from}
                      defaultPickerValue={defaultDate()}
                      placeholder={null}
                      key={form.randomKey}
                      ref={dateFromPicker}
                      allowClear={false}
                      format="DD.MM.YYYY"
                      name="date_from"
                      size="large"
                    />
                  </RowWrapper>
                  <RowWrapper style={{display:"flex", alignItems: "center"}} label={<Label>{lang.form.end}</Label>}>
                    <CalculatorDatePicker
                      dateRender={(date, today) => handlePickerRender(date, today, "end")}
                      disabledDate={handleDateToDisabled}
                      onChange={handleDateToChange}
                      defaultPickerValue={defaultToDate()}
                      value={form.date_to}
                      allowClear={false}
                      ref={dateToPicker}
                      key={form.randomKey}
                      placeholder={null}
                      format="DD.MM.YYYY"
                      name="date_to"
                      size="large"
                    />
                  </RowWrapper>
                </Row>
                <Form.Item style={{ marginTop: "20px" }}>
                  <ButtonSubmit
                    htmlType="submit"
                    shape="round"
                    size="large"
                    onClick={()=>setCheck(true)}
                  >
                    {lang.calculate}
                  </ButtonSubmit>
                </Form.Item>
              </CalculatorsCardWrapper>
              <Col xxl={8} xl={8} ref={top}  className={"result calendarResult"}>
                <Row>
                  <Col md={12} span={24} xl={24}>
                    <FormLabel style={{ margin: 0, minHeight: "40px", lineHeight: "40px" }}>
                      {lang.result.title}
                      {Object.keys(initialState.result).length > 0 && form.date_from && form.date_to &&
                      <span className={"dateRange"}>
              {` (${moment(form.date_from).format("DD.MM.YY")}${lang.year} -
          ${moment(form.date_to).format("DD.MM.YY")}${lang.year})`}
            </span>

                      }
                    </FormLabel>

                    <UnderLine />

                    <CalculatorCardResult
                      title={lang.result.calendarDays}
                      text={initialState.result.overallDays}
                    />

                    <CalculatorCardResult
                      title={lang.result.workDays}
                      text={initialState.result.workingDays}
                    />
                  </Col>
                  <Col md={12} span={24} xl={24}>

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
              </Col>
            </Row>
            <Form.Item style={{marginLeft:"10px", marginTop:"25px"}} label={<Label>{lang.chooseDaysRange}</Label>} labelCol={{ span: 24 }}>
            </Form.Item>
            <YearField align="middle">
              <button onClick={setNewYear} data-action={"prev"} type={"button"}>
                <img src={arrow} alt="arrow" />
              </button>
              <p>{year}</p>
              <button onClick={setNewYear} data-action={"next"} type={"button"}>
                <img src={arrow} alt="arrow" />
              </button>
            </YearField>

            <Checkbox.Group
              style={{ width: "100%" }}
              onChange={(v) => addCheckedDataRange(v)}
              name={"dates[]"}
              value={form.dates}>
              <Row
                align="start"
                justify="space-between"
                style={{
                  width: "100%",
                }}>
                {calendar.length > 0 && calendar.map((month, index) => (
                  <Col xxl={6} xl={8} lg={8} md={12} sm={24} xs={24} className={"calendarCol"} key={`month_${index}`}>
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
                            <CalendarItem
                              locale={locale}
                              week={week}
                              holidays={initialState.holidays}
                              workdays={initialState.workdays}
                            />
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
          </Form>
        </CalculatorsCard>
      </CalculatorsCardWrapper>
    </Row>
  )
}

export default CalendarCalculator
