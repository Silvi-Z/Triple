import moment from "moment"
import { holidaysByMonth } from "./vacation"

/**
 * define working schedule based on array of days
 * non working days are empty elements in array
 *
 * @param {number[]} days
 * @param {moment.Moment} month
 * @return {number}
 */
export const defineSchedule = (days, month) => {
  let empties = emptyIndexes(days), hasSaturday, hasSunday;

  empties.map(item => month.clone().date(item)).forEach(date => {
    if (holidaysByMonth[date.month()].every(holiday => !moment(holiday).isSame(date))) {
      if (date.day() === 0) hasSunday = true

      if (date.day() === 6) hasSaturday = true
    }
  })

  return (hasSaturday && hasSunday) ? 5 : 6
}

const emptyIndexes = array => {
  let empties = []

  for (let i = 0; i < array.length; i++) {
    if (!array[i]) {
      empties.push(i + 1);
    }
  }

  return empties
}

/**
 * Convert image url to base64
 * @param {string} url
 * @return {Promise}
 */
export const urlToBase64 = url => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
      image.src = url
      image.onload = ev => {
        let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;

        let ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0);

        resolve(canvas.toDataURL("image/png"))
      };
      image.onerror = err => reject(err)
  })
}

export const randomString = (length = 16) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
