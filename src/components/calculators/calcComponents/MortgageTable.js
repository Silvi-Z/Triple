import React from "react"
import { months } from "../utilities/mortgage"
import { SALARY_MAX, SALARY_MIN } from "../utilities/salary"
import { CalculatorCol, CalculatorTable, ColHeader, CalculatorInput } from "../styled"

class MortgageTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { lang, items, onChange } = this.props

    return (
      <div className="tableScroll">
        <CalculatorTable>
        <thead>
        <tr>
          <ColHeader>{lang.quarter_months}</ColHeader>
          <ColHeader>{lang.gross_salary}</ColHeader>
          <ColHeader>{lang.surcharge}</ColHeader>
          <ColHeader>{lang.bonus}</ColHeader>
        </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={`amounts-${item.month}`}>
              <CalculatorCol>{months.arm[item.month]}</CalculatorCol>
              <td>
                <CalculatorInput
                  onChange={value => onChange({ name: "salary", value, i })}
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
                  onChange={value => onChange({ name: "surcharge", value, i })}
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
                  onChange={value => onChange({ name: "bonus", value, i })}
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
      </div>
    )
  }
}

export default MortgageTable
