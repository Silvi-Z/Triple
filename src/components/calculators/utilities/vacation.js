import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export const months = {
  arm: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"],
  en: [],
  ru: []
}

/**
 * Generate array of years
 *
 * @param {Number} count
 * @returns {Array}
 */
export const years = count => {
  const years = []
  const dateEnd = moment()
  const dateStart = moment().subtract(count, 'y')

  while (dateEnd.diff(dateStart, 'years') >= 0) {
    years.unshift(dateStart.format('YYYY'))
    dateStart.add(1, 'year')
  }

  return years
}

/**
 * Getting working days in given month
 *
 * @param {moment.Moment} date
 * @param {number} schedule
 * @param {String[][]}holidaysByMonth
 * @return {moment.Moment[]}
 */
export const workingDaysInMonth = ({ date, schedule }, holidaysByMonth) => {
  const weekend = schedule === 5 ? [0, 6] : [0]
  let days = [],
    daysInMonth = date.daysInMonth(),
    start = date.startOf('month')

  while (daysInMonth) {
    start.date(daysInMonth);

    if (
      !weekend.includes(start.day()) &&
      holidaysByMonth[date.month()].every(holiday => !moment(holiday).isSame(start))
    ) days.push(start.clone());

    daysInMonth--;
  }

  return days
}

/**
 * Getting working dates between two dates
 *
 * @param {moment.Moment} start - moment date
 * @param {moment.Moment} end - moment date
 * @param {Number} schedule - working schedule
 * @param {String[][]}holidaysByMonth
 * @return {Array}
 */
export const workingDaysInRange = ({start, end}, schedule, holidaysByMonth) => {
  const weekend = schedule === 5 ? [0, 6] : [0], days = []

  while (start.isSameOrBefore(end)) {
    if (
      !weekend.includes(start.day()) &&
      holidaysByMonth[start.month()] &&
      holidaysByMonth[start.month()].every(holiday => !moment(holiday).isSame(start))
    ) days.push(start.clone().format('DD.MM.YYYY'));

    start.add(1, 'day');
  }

  return days
}

/**
 * Get the end date from given date & working schedule
 *
 * @param {moment.Moment} start - start date
 * @param {Number} days - number of worked days
 * @param {Number} schedule - working schedule (5 | 6)
 * @param {String[]} holidays
 * @return {moment.Moment}
 */
export const endDate = (start, days, schedule, holidays) => {
  const weekends = schedule === 5 ? [0, 6] : [6]
  const end = start.clone()

  for (let i = 1; i < days; i++) {
    if (weekends.includes(end.day()) || holidays.includes(end.format('YYYY-MM-DD'))) {
      i--
    }

    end.add(1, "day")
  }

  return end
}

/**
 * Checks if given date is working or not
 *
 * @param {moment.Moment} date
 * @param {String[]} holidays
 * @param {Number} schedule
 * @return {boolean}
 */
export const isWorkingDay = (date, holidays, schedule) => {
  const weekend = schedule === 5 ? [0, 6] : [0]

  return !(holidays.includes(date.format('YYYY-MM-DD')) || weekend.includes(date.day()))
}

/**
 * Checks if given date is holiday
 *
 * @param {moment.Moment} date
 * @param {String[]} holidays
 */
export const isHoliday = (date, holidays) => holidays.includes(date.format('YYYY-MM-DD'))

/**
 * Checks if given date is weekend by schedule
 * @param {moment.Moment} date
 * @param {Number} schedule
 * @return {boolean}
 */
export const isWeekend = (date, schedule) => {
  const weekend = schedule === 5 ? [0, 6] : [0]

  return weekend.includes(date.day())
}
