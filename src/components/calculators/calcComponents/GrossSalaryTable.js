import React from "react"
import moment from "moment"
import { Select } from "antd"
import { cloneDeep, isEqual, isNull } from "lodash"
import { months, years } from "../utilities/vacation"
import { SALARY_MAX, SALARY_MIN } from "../utilities/salary"
import { ColHeader, CalculatorTable, CalculatorCol, CalculatorInput, CalculatorSelect } from "../styled"

class GrossSalaryTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: cloneDeep(props.items),
    }
  }

  get workedMonths() {
    return this.state.items.filter(item => item.salary > 0).length
  }

  get avgMonthAmount() {
    return Math.round((this.total("salary") + this.total("surcharge")) / this.workedMonths + this.total("bonus") / 12)
  }

  total(key) {
    return this.state.items.reduce((a, b) => a + b[key] || 0, 0)
  }

  setField({ name, value, i }, cb) {
    let items = cloneDeep(this.state.items)
    items[i][name] = value

    this.setState({ items }, cb)
  }


  autoFillItems() {
    let item = { ...this.state.items[0] }
    const { month, year } = item

    if (!isNull(month) && year) {
      this.props.setDate(moment({ month, year }))
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(this.props.items, prevProps.items)) {
      this.setState({ items: cloneDeep(this.props.items) })
    }
  }

  render() {
    const { lang, onChange } = this.props
    const { items } = this.state

    return (
      <CalculatorTable>
        <thead>
        <tr>
          <ColHeader>{lang.month}</ColHeader>
          <ColHeader>{lang.year}</ColHeader>
          <ColHeader>{lang.gross_salary}</ColHeader>
          <ColHeader>{lang.surcharge}</ColHeader>
          <ColHeader>{lang.bonus}</ColHeader>
        </tr>
        </thead>
        <tbody>
        {items.map((item, i) => (
          <tr key={`amounts-${i}`}>
            {i > 0 ?
              <>
                <CalculatorCol>{months.arm[item.month]}</CalculatorCol>
                <CalculatorCol>{item.year}</CalculatorCol>
              </> :
              <>
                <td>
                  <CalculatorSelect
                    value={item.month}
                    style={{ width: "120px" }}
                    onChange={value => this.setField({ name: "month", value, i }, this.autoFillItems)}
                  >
                    {months.arm.map((month, i) => (
                      <Select.Option value={i} key={`month-${month}`}>
                        {month}
                      </Select.Option>
                    ))}
                  </CalculatorSelect>
                </td>
                <td>
                  <CalculatorSelect
                    value={item.year}
                    style={{ width: "100px" }}
                    onChange={value => this.setField({ name: "year", value, i }, this.autoFillItems)}
                  >
                    {years(20).map(year => (
                      <Select.Option value={year} key={`year-${year}`}>
                        {year}
                      </Select.Option>
                    ))}
                  </CalculatorSelect>
                </td>
              </>
            }
            <td>
              <CalculatorInput
                onChange={value => this.setField({ name: "salary", value, i }, () => onChange(this.avgMonthAmount))}
                formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
                value={item.salary}
                min={SALARY_MIN}
                max={SALARY_MAX}
              />
            </td>
            <td>
              <CalculatorInput
                onChange={value => this.setField({ name: "surcharge", value, i }, () => onChange(this.avgMonthAmount))}
                formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
                value={item.surcharge}
                min={SALARY_MIN}
                max={SALARY_MAX}
              />
            </td>
            <td>
              <CalculatorInput
                onChange={value => this.setField({ name: "bonus", value, i }, () => onChange(this.avgMonthAmount))}
                formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
                value={item.bonus}
                min={SALARY_MIN}
                max={SALARY_MAX}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </CalculatorTable>
    )
  }
}

export default GrossSalaryTable
