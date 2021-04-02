import moment from "moment"

/**
 * define working schedule based on array of days
 * non working days are empty elements in array
 *
 * @param {number[]} days
 * @param {moment.Moment} month
 * @param {{title: String | null, date: String}[]} holidays
 * @return {number}
 */
export const defineSchedule = (days, month, holidays, monthDays) => {
  const arr = []
  const arr1 = []

  monthDays.map(item => {
    let date = moment({ date: item, month: month.month(), year: month.year() })
    date.day() === 6 && arr.push(date.day())
    date.day() === 0 && arr1.push(date.day())
  })

  let { empties, absenceDays } = emptyIndexes(days)
  let count = 0
  let count1 = 0

  holidays.every(holiday => {
    if (month.month() !== moment(holiday.date).month()) {
      if (moment(holiday.date).day() === 6) {
        count++
      } else if (moment(holiday.date).day() === 0) {
        count1++
      }
    }
  })

  return ((arr.length + arr1.length) - count - count1) > empties.length ?
    {
      schedule: 6,
      days: (monthDays.length - arr1.length - absenceDays.length),
    }
    :
    {
      schedule: 5,
      days: (monthDays.length - arr1.length - arr.length - absenceDays.length),
    }
}

const emptyIndexes = array => {
  let empties = []
  let absenceDays = []

  for (let i = 0; i < array.length; i++) {
    if (!array[i]) {
      empties.push(i + 1)
    }

    if (array[i] === "բ" || array[i] === "․" || array[i] === "հ" || array[i] === "ա") {
      absenceDays.push(i + 1)
    }
  }

  return { empties, absenceDays }
}

/**
 * Convert image url to base64
 * @param {string} url
 * @return {Promise}
 */
export const urlToBase64 = url => {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.setAttribute("crossOrigin", "anonymous")
    image.src = url
    image.onload = ev => {
      let canvas = document.createElement("canvas")
      canvas.width = image.width
      canvas.height = image.height

      let ctx = canvas.getContext("2d")
      ctx.drawImage(image, 0, 0)

      resolve(canvas.toDataURL("image/png"))
    }
    image.onerror = err => reject(err)
  })
}

export const randomString = (length = 16) => {
  let result = ""
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
