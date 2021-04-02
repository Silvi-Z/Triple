import React from "react"
import Excel from "xlsx"
import ExcelJS from "exceljs"
import moment from "moment"
import triple from "../../api/triple"
import { saveAs } from "file-saver"
import { compact, isEmpty, isEqual, isInteger, isNull } from "lodash"
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Col, Form, notification, Radio, Row } from "antd"
import { defineSchedule, urlToBase64 } from "./utilities/tabel"
import { workingDaysInMonth, workingDaysInRange } from "./utilities/vacation"
import {
  ButtonSubmit,
  CalculatorsCard,
  CalculatorsCardWrapper,
  FormLabel,
  Label,
  RadioLabel, RowWrapper,
  UnderLine,
} from "./styled"
import {
  BY_FIELD_TABLE,
  PENSION_FIELD_YES,
  schemaTABLE,
  TAX_FIELD_COMMON,
  TAX_FIELD_ENTERPRISE,
  TAX_FIELD_IT,
} from "./utilities/salary"
import EmployeeSalaryTable from "./calcComponents/EmployeeSalaryTable"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"

moment.locale("en", {
  week: {
    dow: 1,
  },
})

const form = {
  by: 0,
  from: 1,
  schedule: 5,
  pension: PENSION_FIELD_YES,
  tax_field: TAX_FIELD_COMMON,
}

const radioStyle = {
  display: "block",
  lineHeight: "30px",
}

const headerStyles = {
  alignment: { vertical: "middle", horizontal: "center", wrapText: true },
  font: {
    name: "Comic Sans MS",
    family: 4,
    size: 12,
    underline: false,
    bold: true,
  },
  fill: {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF0066CC" },
    bgColor: { argb: "FFFFFFFF" },
  },
  border: {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  },
}

const Logo = require("../../assets/logo.jpeg")

class SalaryTableCalculator extends React.Component {
  fileInput = React.createRef()

  top = React.createRef()

  rowWidth = React.createRef()

  constructor(props) {
    super(props)

    this.state = {
      calculated: 0,
      loading: false,
      form: { ...form },
      employees: [],
      result: {},
      excel: [],
      check: false,
      width: typeof window !="undefined" && window.innerWidth <=768
    }
    this.holidays = []
    this.workdays = []
  }

  get calculatingByTable() {
    return (this.state.form.by === BY_FIELD_TABLE)
  }

  get calculatedByTable() {
    return this.state.calculated === 2
  }

  get calculatedByDate() {
    return this.state.calculated === 1
  }

  get maxWorkingDays() {
    const { date_from, schedule } = this.state.form

    return workingDaysInRange({
      start: date_from ? moment(date_from) : moment().startOf("month"),
      end: date_from ? moment(date_from).endOf("month") : moment().endOf("month"),
      workdays: this.workdays,
      holidays: this.holidays,
      schedule,
    }).length
  }

  get dateFromValue() {
    const { date_from } = this.state.form

    return isNull(date_from) ? date_from : moment(date_from)
  }

  get dateToValue() {
    const { date_to } = this.state.form

    return isNull(date_to) ? date_to : moment(date_to)
  }

  handleUpload = (e) => {
    e.persist()

    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = eve => {
      const data = new Uint8Array(/**@type ArrayBuffer*/ eve.target.result)
      const workbook = Excel.read(data, { type: "array", cellStyles: true })
      /** @type {[][]} */
      const rows = Excel.utils.sheet_to_json(workbook.Sheets["WTimesheet"], { header: 1 })
      const date = moment(rows[9][12], "DD/MM/YY")
      const year = moment(rows[9][12])
      this.setField("year", year)
      const employees = rows.reduce((acc, row, i) => {
        if (i >= 20 && isInteger(Number(row[0]))) {
          const schedule = defineSchedule(row.slice(4, date.daysInMonth() + 4), date, this.holidays)

          acc.push({
            id: row[0],
            name: row[2],
            profession: row[1],
            days: compact(row.slice(4, date.daysInMonth() + 4)).length, // workedDays
            hours: +row[date.daysInMonth() + 5], // workedHours
            pension: PENSION_FIELD_YES,
            amount: null,
            schedule,
            workingDaysInMonth: workingDaysInMonth({
              workdays: this.workdays,
              holidays: this.holidays,
              schedule,
              date,
            }).length,
          })
        }

        return acc
      }, [])
      const lang = this.props.lang.form
      if (!date.isValid() || !employees.length) {
        notification.error({
          message: lang.message,
          description: lang.description,
        })

        employees.splice(0, employees.length)
      }

      this.fileInput.current.value = null

      this.setState({ employees })
    }
    reader.readAsArrayBuffer(file)
  }

  handleSubmit = async () => {
    const valid = await schemaTABLE.isValid({ ...this.state.form, employees: this.state.employees })

    schemaTABLE.validate({ ...this.state.form, employees: this.state.employees }).catch(function(err) {
      console.log(err)
    })

    if (!valid) return

    await this.calculateByTable()
  }

  handleByFieldChange = () => {
    const { form } = this.state

    const state = !form.by
      ? { form: { ...form, from: 1 }, result: {}, calculated: 0 }
      : { result: {}, calculated: 0 }

    this.setState(state)
  }

  handleDownload = async () => {
    const { excel } = this.state

    const wb = new ExcelJS.Workbook()
    const worksheet = wb.addWorksheet("ExcelJS sheet", {
      pageSetup: { fitToPage: true, fitToHeight: 5, fitToWidth: 7 },
      views: [
        { showGridLines: false },
      ],
    })
    const widths = [5.2, 30, 15.8, 17.3, 11, 11, 15, 13, 14, 14.5, 12, 15]
    const logo = wb.addImage({
      base64: await urlToBase64(Logo),
      extension: "png",
    })

    worksheet.addImage(logo, {
      tl: { col: 0, row: 0 },
      ext: { width: 120, height: 115 },
    })
    let headers = Object.keys(excel[0])
    headers.splice(4, 1, "Ընդամենը աշխատած")

    const merged = worksheet.insertRow(7, headers)
    const header = worksheet.addRow(Object.keys(excel[0]))

    header.eachCell(cell => cell.style = { ...headerStyles })
    merged.eachCell(cell => cell.style = { ...headerStyles })

    worksheet.mergeCells("A7:A8")
    worksheet.mergeCells("B7:B8")
    worksheet.mergeCells("C7:C8")
    worksheet.mergeCells("D7:D8")
    worksheet.mergeCells("E7:F7")
    worksheet.mergeCells("G7:G8")
    worksheet.mergeCells("H7:H8")
    worksheet.mergeCells("I7:I8")
    worksheet.mergeCells("J7:J8")
    worksheet.mergeCells("K7:K8")
    worksheet.mergeCells("L7:L8")
    worksheet.addRows(excel.map(row => Object.values(row)))

    const total = worksheet.addRow([null, "Ընդամենը", 0, null, null, null, 0, 0, 0, 0, 0, 0])
    total.font = { bold: true }
    total.eachCell(cell => {
      cell.border = { ...headerStyles.border }
      if (cell.type === 2) cell.value = {
        formula: `SUM(${cell.address.replace(cell.row.toString(), "2")}:${cell.address.replace(cell.row.toString(), (cell.row - 1).toString())})`,
        date1904: true,
      }
    })

    header.height = 30
    merged.height = 63
    header.font = { ...headerStyles.font }
    header.alignment = { ...headerStyles.alignment }
    merged.font = { ...headerStyles.font }
    merged.alignment = { ...headerStyles.alignment }

    worksheet.columns.forEach((column, i) => {
      column.width = widths[i]
      column.eachCell(cell => cell.border = { ...headerStyles.border })
    })

    worksheet.autoFilter = {
      from: {
        row: 1,
        column: 1,
      },
      to: {
        row: 3,
        column: excel.length,
      },
    }

    const buffer = await wb.xlsx.writeBuffer()

    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "աշխատավարձի հաշվարկ.xlsx")
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  setFields(fields, cb) {
    this.setState({ form: { ...this.state.form, ...fields } }, cb)
  }

  autoCalculate(prevState) {
    const prevFormByTable = { ...prevState.form, employees: [...prevState.employees] }
    const formByTable = { ...this.state.form, employees: [...this.state.employees] }

    if (
      (!isEqual(prevFormByTable, formByTable) && this.calculatingByTable && this.calculatedByTable)
    ) {
      this.handleSubmit().then(() => console.log("auto calculated"))
    }
  }

  async calculateByTable() {
    const { employees, check, width} = this.state
    const { from, tax_field, year } = this.state.form

    this.setState({ loading: true })

    const reqs = employees
      .map(employee => ({
        from,
        tax_field,
        year: year.year(),
        pension: employee.pension,
        amount: (employee.workingDaysInMonth === employee.days)
          ? employee.amount
          : employee.amount / employee.workingDaysInMonth * employee.days,
      }))
      .map(data => triple.post("/api/counter/salary", data))


    const results = await Promise.all(reqs).then(res => res.map(r => r.data)).finally(() => {
      if(check && width){
        this.top.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
      }
      this.setState((prevState) => ({
        ...prevState,
        check: false,
      }))
    })
    const excel = results.map((result, i) => ({
      N: employees[i].id,
      ["Անուն, Ազգանուն, Հայրանուն"]: employees[i].name,
      ["Գրանցված աշխատավարձ (ամսական)"]: employees[i].amount,
      ["Աշխատանքային գրաֆիկ"]: employees[i].schedule === 5 ? "Հնգօրյա" : "Վեցօրյա",
      ["Օր"]: employees[i].days,
      ["ժամ"]: employees[i].hours,
      ["Գրանցված աշխատավարձ (ըստ աշխատած օրերի)"]: (employees[i].workingDaysInMonth === employees[i].days)
        ? employees[i].amount
        : Math.round(employees[i].amount / employees[i].workingDaysInMonth * employees[i].days),
      ["Եկամտային հարկ"]: result.income_tax,
      ["Սոցիալական վճար"]: result.pension_fee,
      ["Դրոշմանշային վճար"]: result.stamp_fee,
      ["Ընդհանուր պահումներ"]: result.total_fee,
      ["Զուտ աշխատավարձ"]: Math.round(result.salary),
    }))
    const result = results.reduce((acc, result) => ({
      total_fee: Math.round(acc.total_fee + result.total_fee),
      income_tax: Math.round(acc.income_tax + result.income_tax),
      pension_fee: Math.round(acc.pension_fee + result.pension_fee),
      stamp_fee: Math.round(acc.stamp_fee + result.stamp_fee),
      salary: Math.round(acc.salary + result.salary),
    }))
    result["gross_salary"] = employees.map(employee => (employee.workingDaysInMonth === employee.days)
      ? employee.amount
      : employee.amount / employee.workingDaysInMonth * employee.days,
    ).reduce((acc, amount) => acc + Math.round(amount), 0)

    this.setState({ excel, result, loading: false, calculated: 2 })
  }

  checkValue() {
    this.setState((prevState) => ({
      ...prevState,
      check: true,
    }))
  }

  fetchDays() {
    triple.get("/api/days").then(res => {
      this.holidays = res.data.holidays
      this.workdays = res.data.workdays
    }).catch(err => console.log(err))
  }

  componentDidMount() {

    this.fetchDays()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // this.autoCalculate(prevState)
  }


  render() {
    const { lang } = this.props
    const { form, employees, result, loading } = this.state

    return (
      <Row className="rowWrapper" align="start" gutter={20} ref={this.rowWidth}>
          <CalculatorsCardWrapper span={24} xl={16}>
          <CalculatorsCard bordered={false}>
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >

              <>
                <RowWrapper style={{flexDirection:"row-reverse"}} className="inlineElements uploadInput" label={lang.form.upload}>
                  <input
                    type="file"
                    name="file"
                    accept=".xls,.xlsx"
                    ref={this.fileInput}
                    style={{ display: "none" }}
                    onChange={this.handleUpload}
                  />

                  <Button
                    onClick={() => this.fileInput.current.click()}
                    style={{ background: "#1C1D21", color: "#FFFFFF" , marginRight: "15px"}}
                    icon={<UploadOutlined />}
                    shape="circle"
                    type="ghost"
                  />
                </RowWrapper>

                {employees.length ? <EmployeeSalaryTable
                  items={employees}
                  lang={lang.table}
                  onChange={employees => this.setState({ employees })}
                /> : null}
              </>

              {/* tax field */}
              <Form.Item label={<Label style={{ fontSize: "16px" }}>{lang.form["tax_label"]}</Label>}
                         labelCol={{ span: 24 }} name="tax_field">
                <Radio.Group
                  onChange={e => this.setField("tax_field", e.target.value)}
                  value={form.tax_field}
                >
                  <Radio className="inlineElements" style={radioStyle} value={TAX_FIELD_COMMON}>
                    <RadioLabel>{lang.form["tax_common"]}</RadioLabel>
                  </Radio>
                  <Radio className="inlineElements" style={radioStyle} value={TAX_FIELD_IT}>
                    <RadioLabel>{lang.form["tax_it"]}</RadioLabel>
                  </Radio>
                  <Radio className="inlineElements" style={radioStyle} value={TAX_FIELD_ENTERPRISE}>
                    <RadioLabel>{lang.form["tax_enterprise"]}</RadioLabel>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item style={{ marginTop: "20px" }}>
                <ButtonSubmit
                  htmlType="submit"
                  shape="round"
                  size="large"
                  onClick={()=>this.checkValue()}
                >
                  {lang["calculate"]}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </CalculatorsCard>
        </CalculatorsCardWrapper>

        <Col span={20} xl={8} className="result" ref={this.top}>
          <Row>
           <Col md={12} span={24} xl={24}>
             <FormLabel style={{ margin: 0 }}>{lang.result.title}</FormLabel>

             <UnderLine />

             <CalculatorCardResult
               title={lang.result.gross_salary}
               text={result.gross_salary}
               loading={loading}
             />

             <CalculatorCardResult
               title={lang.result.income_tax}
               text={result.income_tax}
               loading={loading}
             />

             <CalculatorCardResult
               title={lang.result.pension_fee}
               text={result.pension_fee}
               loading={loading}
             />
           </Col>

            <Col md={12} span={24} xl={24}>
              <CalculatorCardResult
                title={lang.result.stamp_fee}
                text={result.stamp_fee}
                loading={loading}
              />

              <CalculatorCardResult
                title={lang.result.total_fee}
                text={result.total_fee}
                loading={loading}
              />

              <CalculatorCardResult
                title={form.from === 1 ? lang.result["dirty_to_clean_salary"] : lang.result["clean_to_dirty_salary"]}
                text={result.salary}
                loading={loading}
              />
            </Col>

            {!form.by && !isEmpty(result) ?
              <ButtonSubmit
                style={{ textTransform: "none", width: "100%", marginBottom: "40px" }}
                onClick={this.handleDownload}
                icon={<DownloadOutlined />}
                htmlType="button"
                shape="round"
                size="large"
                block

              >
                {lang.result.download}
              </ButtonSubmit> : null}
          </Row>
        </Col>
      </Row>
    )
  }
}

export default SalaryTableCalculator
