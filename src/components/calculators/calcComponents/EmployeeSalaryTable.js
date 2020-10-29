import React from "react"
import { cloneDeep } from "lodash"
import { SALARY_MAX, SALARY_MIN } from "../utilities/salary"
import { CalculatorCol, CalculatorInput, CalculatorTable, ColHeader } from "../styled"

class EmployeeSalaryTable extends React.Component {
  constructor(props) {
    super(props);
  }

  setField({ name, value, i }) {
    let items = cloneDeep(this.props.items)
      items[i][name] = value

    this.props.onChange(items)
  }

  render() {
    const { lang, items, style } = this.props

    return (
      <CalculatorTable style={style}>
        <thead>
        <tr>
          <ColHeader>N.</ColHeader>
          <ColHeader>{lang.name}</ColHeader>
          <ColHeader>{lang.day}</ColHeader>
          <ColHeader>{lang.hour}</ColHeader>
          <ColHeader>{lang.salary}</ColHeader>
        </tr>
        </thead>
        <tbody>
        {items.map((employee, i) => (
          <tr key={`employees-${employee.id}`}>
            <CalculatorCol style={{textAlign: "left"}}>{employee.id}</CalculatorCol>
            <CalculatorCol>{employee.name}</CalculatorCol>
            <CalculatorCol>{employee.days}</CalculatorCol>
            <CalculatorCol>{employee.hours}</CalculatorCol>
            <td>
              <CalculatorInput
                onChange={value => this.setField({ name: "amount", value, i })}
                formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
                value={employee.amount}
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

export default EmployeeSalaryTable
