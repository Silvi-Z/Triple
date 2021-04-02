import React from "react"
import moment from "moment"
import { Select } from "antd"
import { cloneDeep, isEqual, isNull } from "lodash"
import { months, years } from "../utilities/vacation"
import { SALARY_MAX, SALARY_MIN } from "../utilities/salary"
import { CalculatorCol, CalculatorInput, CalculatorSelect, CalculatorTable } from "../styled"

class GrossSalaryTable extends React.Component {
  constructor(props) {
    super(props)

    this.onBlur = props.onBlur

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

  setField({ name, v, i }, cb) {
    let items = cloneDeep(this.state.items)
    items[i][name] = v ? v : 0

    this.setState({ items }, cb)
  }

  autoFillItems() {
    const [item] = this.state.items
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

  componentDidMount() {
    this.props.onChange(this.avgMonthAmount || null)
  }

  render() {
    const { lang, onChange } = this.props
    const { items } = this.state

    return (
      <div className="tableScroll">
      <CalculatorTable className="gross">
        <thead>
        <tr>
          <th className="gross-cell">{lang.month}</th>
          <th className="gross-cell">{lang.year}</th>
          <th className="gross-cell">{lang.gross_salary}</th>
          <th className="gross-cell">{lang.surcharge}</th>
          <th className="gross-cell">{lang.bonus}</th>
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
                    style={{ minWidth: "130px" }}
                    onChange={v => this.setField({ name: "month", v, i }, this.autoFillItems)}
                  >
                    {months.arm.map((month, i) => (
                      <Select.Option style={{ textAlign: "left" }} value={i} key={`month-${month}`}>
                        {month}
                      </Select.Option>
                    ))}
                  </CalculatorSelect>
                </td>
                <td>
                  <CalculatorSelect
                    value={item.year}
                    style={{ minWidth: "80px" }}
                    onChange={v => this.setField({ name: "year", v, i }, this.autoFillItems)}
                  >
                    {years(20).map(year => (
                      <Select.Option style={{ textAlign: "left" }} value={year} key={`year-${year}`}>
                        {year}
                      </Select.Option>
                    ))}
                  </CalculatorSelect>
                </td>
              </>
            }
            <td>
              <CalculatorInput
                onChange={v => this.setField({ name: "salary", v, i }, () => onChange(this.avgMonthAmount))}
                formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={v => v.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
                value={item.salary}
                onBlur={this.onBlur}
                min={SALARY_MIN}
                max={SALARY_MAX}
                step={1000}
              />
            </td>
            <td>
              <CalculatorInput
                onChange={v => this.setField({ name: "surcharge", v, i }, () => onChange(this.avgMonthAmount))}
                formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={v => v.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
                value={item.surcharge}
                min={SALARY_MIN}
                max={SALARY_MAX}
                step={1000}
              />
            </td>
            <td>
              <CalculatorInput
                onChange={v => this.setField({ name: "bonus", v, i }, () => onChange(this.avgMonthAmount))}
                formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={v => v.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
                value={item.bonus}
                min={SALARY_MIN}
                max={SALARY_MAX}
                step={1000}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </CalculatorTable>
      </div>
    )
  }
}

export default GrossSalaryTable
