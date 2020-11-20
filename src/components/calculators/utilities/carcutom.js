import moment from "moment"

export const PERSON_LEGAL = 0

export const PERSON_PHYSICAL = 1

export const COUNTRY_EEU = 0

export const COUNTRY_THIRD = 1

export const currencies = [
  {text: 'AMD', value: 'AMD', sym: '&#1423;'},
  {text: 'USD', value: 'USD', sym: '&#36;'},
  {text: 'EUR', value: 'EUR', sym: '&#8364;'}
]

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

export const euroTo = ({amount, currency}, rates) => {
  switch (currency) {
    case "AMD":
      return Math.round(amount * rates["EUR"])
    case "USD":
      return Math.round(amount * rates["EUR"] / rates["USD"])
    case "EUR":
      return amount
    default:
      return amount
  }
}

export const convertToAMD = ({amount, currency}, rates) => {
  const sym = currencies.find(c => c.value === currency).sym
  const price = (currency !== 'AMD') ?
    amount ? Math.round(amount * rates[currency]) : null : amount

  return {
    [currency]: { amount, sym },
    converted: (currency !== 'AMD') ? price : null
  }
}

export const calculate = ({ imported, person, date, capacity, price }) => {
  const age = Math.round(moment().diff(date, 'months') / 12)
  let _coefficient = {}, res = {tax: 0, fee: 0, vat: 0}

  // converting given price to EUR
  // if (currency === 'AMD') {
  //   price = price / rates['EUR']
  // }
  //
  // if (currency === 'USD') {
  //   price = price * rates[currency] / rates['EUR']
  // }

  // getting ecology coefficient
  if (age + 1 <= 5) {
    _coefficient.ecology = 0
  } else if (age + 1 > 5 && age + 1 <= 10) {
    _coefficient.ecology = 0.02
  } else if (age + 1 > 10 && age + 1 <= 15) {
    _coefficient.ecology = 0.10
  } else {
    _coefficient.ecology = 0.20
  }

  if (imported === COUNTRY_EEU && person === PERSON_PHYSICAL) {
    res.tax = Math.round(_coefficient.ecology * price)
  }

  if (imported === COUNTRY_EEU && person === PERSON_LEGAL) {
    _coefficient.vat = 0.20

    res.vat = price * _coefficient.vat
  }

  if (imported === COUNTRY_THIRD && person === PERSON_PHYSICAL) {
    if (age <= 3) {
      if (price <= 8500) {
        _coefficient.percentage = 0.54
        _coefficient.price = 2.5
      } else if (price > 8500 && price <= 16700) {
        _coefficient.percentage = 0.48
        _coefficient.price = 3.5
      } else if (price > 16700 && price <= 42300) {
        _coefficient.percentage = 0.48
        _coefficient.price = 5.5
      } else if (price > 42300 && price <= 84500) {
        _coefficient.percentage = 0.48
        _coefficient.price = 7.5
      } else if (price > 84500 && price <= 169000) {
        _coefficient.percentage = 0.48
        _coefficient.price = 15
      } else {
        _coefficient.percentage = 0.48
        _coefficient.price = 20
      }
    } else if (age > 3 && age <= 5) {
      if (capacity <= 1000) {
        _coefficient.price =  1.5
      } else if (capacity > 1000 && capacity <= 1500) {
        _coefficient.price =  1.7
      } else if (capacity > 1500 && capacity <= 1800) {
        _coefficient.price =  2.5
      } else if (capacity > 1800 && capacity <= 2300) {
        _coefficient.price =  2.7
      } else if (capacity > 2300 && capacity <= 3000) {
        _coefficient.price = 3
      } else {
        _coefficient.price = 3.6
      }
    } else {
      if (capacity <= 1000) {
        _coefficient.price = 3
      } else if (capacity > 1000 && capacity <= 1500) {
        _coefficient.price = 3.2
      } else if (capacity > 1500 && capacity <= 1800) {
        _coefficient.price = 3.5
      } else if (capacity > 1800 && capacity <= 2300) {
        _coefficient.price = 4.8
      } else if (capacity > 2300 && capacity <= 3000) {
        _coefficient.price = 5
      } else {
        _coefficient.price = 5.7
      }
    }

    res.fee = _coefficient.hasOwnProperty('percentage')
      ? Math.round(Math.max(_coefficient.percentage * price, _coefficient.price * capacity))
      : Math.round(_coefficient.price * capacity)
    res.tax = Math.round(_coefficient.ecology * price)
  }

  if (imported === COUNTRY_THIRD && person === PERSON_LEGAL) {
    // TODO: calculate for this condition
  }

  return res;
}
