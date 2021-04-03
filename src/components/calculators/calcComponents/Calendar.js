import { CheckboxField, DayWrapper } from "../styled"
import moment from "moment"
import React from "react"

const CalendarItem = React.memo(({ week, holidays, workdays, locale }) => {
  return (
    week.map((day) => {
      if (day) {
        return (
          <DayWrapper
            key={`day_${day}`}
            align={"center"}
            id={`day_${day}`}
          >
            <CheckboxField
              className={`${moment(day).day() === 0 || moment(day).day() === 6 ? "weekend" : ""}
                ${workdays.length > 0 && workdays.find(workday => workday.date === day) ? "workday" : ""}
              ${holidays.length > 0 && holidays.find(holiday => holiday.date === day) ? "holiday" : ""}`
              }
              type="checkbox"
              value={`${day}`}
              id={`${day}`}>
              {moment(day).format("D")}
              {locale === "arm" && workdays.length > 0
              && workdays.find(workday => workday.date === day)
              && workdays.find(workday => workday.date === day).title &&
              <span className={"day_title"}>
                  {workdays.find(workday => workday.date === day).title}
                </span>
              }
              {locale !== "arm" && workdays.length > 0
              && workdays.find(workday => workday.date === day)
              && workdays.find(workday => workday.date === day).title_en &&
              <span className={"day_title"}>
                  {workdays.find(workday => workday.date === day).title_en}
                </span>
              }
              {locale === "arm" && holidays.length > 0
              && holidays.find(holiday => holiday.date === day)
              && holidays.find(holiday => holiday.date === day).title &&
              <span className={"day_title"}>
                  {holidays.find(holiday => holiday.date === day).title}
                </span>
              }
              {locale !== "arm" && holidays.length > 0
              && holidays.find(holiday => holiday.date === day)
              && holidays.find(holiday => holiday.date === day).title_en &&
              <span className={"day_title"}>
                  {holidays.find(holiday => holiday.date === day).title_en}
                </span>
              }
            </CheckboxField>
          </DayWrapper>
        )
      }
      return <td />
    })
  )
})


export default CalendarItem