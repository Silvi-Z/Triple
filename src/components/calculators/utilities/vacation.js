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
 * Getting working dates between two dates
 *
 * @param {moment.Moment} start - moment date
 * @param {moment.Moment} end - moment date
 * @param {Number} schedule - working schedule
 * @param {{title: String|null, date: String}[]} workdays
 * @param {{title: String|null, date: String}[]} holidays
 * @return {Array}
 */
export const workingDaysInRange = ({start, end, holidays, workdays, schedule}) => {
  const days = []

  while (start.isSameOrBefore(end)) {
    if (isWorkDay(start, holidays, workdays, schedule)) {
      days.push(start.clone().format('YYYY-MM-DD'));
    }

    start.add(1, 'day');
  }

  return days
}

/**
 * Getting working days in given month
 *
 * @param {moment.Moment} date
 * @param {Number} schedule - working schedule
 * @param {{title: String|null, date: String}[]} workdays
 * @param {{title: String|null, date: String}[]} holidays
 * @return {Array}
 */
export const workingDaysInMonth = ({date, holidays, workdays, schedule}) => workingDaysInRange({
  start: date.clone().startOf('month'),
  end: date.clone().endOf('month'),
  holidays,
  workdays,
  schedule
})

/**
 * Get the end date from given date & working schedule
 *
 * @param {moment.Moment} start - start date
 * @param {Number} days - number of worked days
 * @param {Number} schedule - working schedule (5 | 6)
 * @param {{title: String|null, date: String}[]} holidays
 * @param {{title: String|null, date: String}[]} workdays
 * @return {moment.Moment}
 */
export const endDate = (start, days, schedule, holidays, workdays) => {
  for (let i = 1; i < days; i++) {
    if (
      (isWeekend(start, schedule) && !workdays.map(day => day.date).includes(start.format('YYYY-MM-DD'))) ||
      isHoliday(start, holidays)
    ) {
      i--
    }

    start.add(1, "day")
  }

  return start
}

/**
 * Checks if given date is working or not
 *
 * @param {moment.Moment} date
 * @param {{title: String|null, date: String}[]} holidays
 * @param {{title: String|null, date: String}[]} workdays
 * @param {Number} schedule
 * @return {boolean}
 */
export const isWorkDay = (date, holidays, workdays, schedule) => {
  return (!isWeekend(date, schedule) || (isWeekend(date, schedule) && workdays.map(day => day.date).includes(date.format('YYYY-MM-DD')))) && !isHoliday(date, holidays);
}

/**
 * Checks if given date is holiday
 *
 * @param {moment.Moment} date
 * @param {{title: String|null, date: String}[]} holidays
 */
export const isHoliday = (date, holidays) => holidays.map(day => day.date).includes(date.format('YYYY-MM-DD'))

/**
 * Checks if given date is weekend by schedule
 *
 * @param {moment.Moment} date
 * @param {Number} schedule
 * @return {boolean}
 */
export const isWeekend = (date, schedule) => {
  const weekend = schedule === 5 ? [0, 6] : [0]

  return weekend.includes(date.day())
}
