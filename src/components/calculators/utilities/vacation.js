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

const jan = [
  ...Array
    .from(moment().range(new Date(2020, 0,1), new Date(2020, 0,7)).by("d"))
    .map(d => d.format('YYYY-MM-DD')),
  '2020-01-28'
]
const feb = []
const mar = ['2020-03-08']
const apr = ['2020-04-24']
const may = ['2020-05-01', '2020-05-09', '2020-05-28']
const jun = []
const jul = []
const aug = []
const sep = ['2020-09-21']
const oct = []
const nov = []
const dec = ['2020-12-31']

export const holidaysByMonth = [
  jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec
]

export const holidays = [
  ...jan, ...feb, ...mar, ...apr, ...may, ...jun, ...jul, ...aug, ...sep, ...oct, ...nov, ...dec
]

/**
 * Getting working days in given month
 *
 * @param {moment.Moment} date
 * @param {number} schedule
 * @return {moment.Moment[]}
 */
export const workingDaysInMonth = ({ date, schedule }) => {
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
 * @return {Array}
 */
export const workingDaysInRange = ({start, end}, schedule) => {
  const weekend = schedule === 5 ? [0, 6] : [0], days = []

  while (start.isSameOrBefore(end)) {
    if (
      !weekend.includes(start.day()) &&
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
 * @return {moment.Moment}
 */
export const endDate = (start, days, schedule) => {
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
