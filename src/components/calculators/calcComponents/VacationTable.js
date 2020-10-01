import React from "react"
import { cloneDeep, isEqual } from "lodash"
import { months } from "../utilities/vacation"
import { SALARY_MAX, SALARY_MIN } from "../utilities/salary"
import { ColHeader, VacationHistoryTable, VacationCol, SalaryInput } from "../styled"

class VacationTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = { items: cloneDeep(props.items) }
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

  setField({ name, value, i }) {
    let items = cloneDeep(this.state.items)
    items[i][name] = value

    this.setState({ items }, () => this.props.onChange(this.avgMonthAmount))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(this.props.items, prevProps.items)) {
      this.setState({ items: cloneDeep(this.props.items) })
    }
  }

  render() {
    const { lang } = this.props
    const { items } = this.state

    return (
      <VacationHistoryTable>
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
          <tr key={`amounts-${item.month}`}>
            <VacationCol>{months.arm[item.month]}</VacationCol>
            <VacationCol>{item.year}</VacationCol>
            <td>
              <SalaryInput
                onChange={value => this.setField({ name: "salary", value, i })}
                formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
                value={item.salary}
                min={SALARY_MIN}
                max={SALARY_MAX}
              />
            </td>
            <td>
              <SalaryInput
                onChange={value => this.setField({ name: "surcharge", value, i })}
                formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
                value={item.surcharge}
                min={SALARY_MIN}
                max={SALARY_MAX}
              />
            </td>
            <td>
              <SalaryInput
                onChange={value => this.setField({ name: "bonus", value, i })}
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
      </VacationHistoryTable>
    )
  }
}

export default VacationTable
