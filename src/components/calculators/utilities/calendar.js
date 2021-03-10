import moment from "moment"

export const getCalendarDates = (year) => {
  let start = moment({ year: year }).startOf("year")
  let end = moment({ year: year }).endOf("year")
  let range = moment.range(start, end)
  const months = Array
    .from(range.by("month"))
    .map(month => {
      let weeks = [], days = []

      for (let i = 1; i <= month.daysInMonth(); i++) {
        let date = moment({ date: i, month: month.month(), year: month.year() })

        days[date.day()] = date.format("YYYY-MM-DD")

        if (date.day() === 6) {
          weeks.push(days)
          days = []
        }
      }

      weeks[0] = Array.from(weeks[0], item => item || undefined)

      if (days.length) {
        days = days.concat(Array(7 - days.length).fill(false))
        weeks.push(days)
      }

      return weeks
    })


  return months
}
