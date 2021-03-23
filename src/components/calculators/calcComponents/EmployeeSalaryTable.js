import React from "react"
import { Select } from "antd"
import { cloneDeep } from "lodash"
import { CalculatorCol, CalculatorInput, CalculatorSelect, CalculatorTable, ColHeader } from "../styled"
import { PENSION_FIELD_NO,PENSION_FIELD_YES, PENSION_FIELD_YES_VOLUNTEER, SALARY_MAX, SALARY_MIN, } from "../utilities/salary"

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
    console.log('lang',lang)
    return (
      <CalculatorTable style={style}>
        <thead>
        <tr>
          <ColHeader>N.</ColHeader>
          <ColHeader>{lang.name}</ColHeader>
          <ColHeader>{lang.day}</ColHeader>
          <ColHeader>{lang.hour}</ColHeader>
          <ColHeader>{lang.social_fee}</ColHeader>
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
            <td width="150">
              <CalculatorSelect
                size="large"
                style={{width: '100%'}}
                value={employee.pension}
                onChange={value => this.setField({ name: "pension", value, i })}
              >
                <Select.Option value={PENSION_FIELD_YES}>{lang.yes}</Select.Option>
                <Select.Option value={PENSION_FIELD_YES_VOLUNTEER}>{lang.yes_volunteer}</Select.Option>
                <Select.Option value={PENSION_FIELD_NO}>{lang.no}</Select.Option>
              </CalculatorSelect>
            </td>
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
