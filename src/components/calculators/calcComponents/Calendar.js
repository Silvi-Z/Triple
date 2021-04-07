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
                <span className="day_title_context">{workdays.find(workday => workday.date === day).title}</span>
                </span>
              }
              {locale !== "arm" && workdays.length > 0
              && workdays.find(workday => workday.date === day)
              && workdays.find(workday => workday.date === day).title_en &&
              <span className={"day_title"}>
                <span className="day_title_context">{workdays.find(workday => workday.date === day).title_en}</span>
                </span>
              }
              {locale === "arm" && holidays.length > 0
              && holidays.find(holiday => holiday.date === day)
              && holidays.find(holiday => holiday.date === day).title &&
              <span className={"day_title"}>
                <span className="day_title_context">{holidays.find(holiday => holiday.date === day).title}</span>
                </span>
              }
              {locale !== "arm" && holidays.length > 0
              && holidays.find(holiday => holiday.date === day)
              && holidays.find(holiday => holiday.date === day).title_en &&
              <span className={"day_title"}>
                <span className="day_title_context">{holidays.find(holiday => holiday.date === day).title_en}</span>
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