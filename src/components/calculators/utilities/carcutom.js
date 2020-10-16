export const PERSON_LEGAL = 0

export const PERSON_PHYSICAL = 1

export const COUNTRY_EEU = 0

export const COUNTRY_THIRD = 1

/**
 * Generate array of years from current to given
 *
 * @param {Number} to
 */
export const years = to => {
  let years = []

  for (let i = new Date().getFullYear(); i >= to; i--) years.push(i)

  return years;
}

/**
 *
 * @param year
 * @param capacity
 * @param price
 * @returns {{price: number, range: number, ecology: number}|{price: number, percentage: number, range: number, ecology: number}}
 */
export const coefficient = (year, capacity, price) => {
  const range = new Date().getFullYear() - year
  let _coefficient

  if (range <= 3) {
    if (price < 8500) {
      _coefficient = {percentage: 0.54, price: 2.5, range}
    } else if (price >= 8500 && price < 16700) {
      _coefficient = {percentage: 0.48, price: 3.5, range}
    } else if (price >= 16700 && price < 42300) {
      _coefficient = {percentage: 0.48, price: 5.5, range}
    } else if (price >= 42300 && price < 84500) {
      _coefficient = {percentage: 0.48, price: 7.5, range}
    } else if (price >= 84500 && price < 169000) {
      _coefficient = {percentage: 0.48, price: 15, range}
    } else {
      _coefficient = {percentage: 0.48, price: 20, range}
    }
  } else if (range > 3 && range <= 5) {
    if (capacity < 1000) {
      _coefficient = {price: 1.5, range}
    } else if (capacity >= 1000 && capacity < 15000) {
      _coefficient = {price: 1.7, range}
    } else if (capacity >= 1500 && capacity < 1800) {
      _coefficient = {price: 2.5, range}
    } else if (capacity >= 1800 && capacity < 2300) {
      _coefficient = {price: 2.7, range}
    } else if (capacity >= 2300 && capacity < 3000) {
      _coefficient = {price: 3, range}
    } else {
      _coefficient = {price: 3.6, range}
    }
  } else {
    if (capacity < 1000) {
      _coefficient = {price: 3, range}
    } else if (capacity >= 1000 && capacity < 1500) {
      _coefficient = {price: 3.2, range}
    } else if (capacity >= 1500 && capacity < 1800) {
      _coefficient = {price: 3.5, range}
    } else if (capacity >= 1800 && capacity < 2300) {
      _coefficient = {price: 4.8, range}
    } else if (capacity >= 2300 && capacity < 3000) {
      _coefficient = {price: 5, range}
    } else {
      _coefficient = {price: 5.7, range}
    }
  }

  if (range + 1 <= 5) {
    _coefficient.ecology = 0
  } else if (range + 1 > 5 && range + 1 <= 10) {
    _coefficient.ecology = 0.02
  } else if (range + 1 > 10 && range + 1 <= 15) {
    _coefficient.ecology = 0.10
  } else {
    _coefficient.ecology = 0.20
  }

  return _coefficient;
}
