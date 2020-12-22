import React from "react"
import Excel from "xlsx"
import ExcelJS from "exceljs"
import ReactDOM from "react-dom"
import moment from "moment"
import triple from "../../api/triple"
import { saveAs } from 'file-saver';
import { isNull, compact, isInteger, isEmpty, isEqual } from "lodash"
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons"
import { Row, Col, Card, Form, Radio, Button, notification } from "antd"
import { defineSchedule, urlToBase64, randomString } from "./utilities/tabel"
import { endDate, isHoliday, isWeekend, workingDaysInMonth, workingDaysInRange } from "./utilities/vacation"
import { CalculatorDatePicker, CalculatorInput, ButtonSubmit, RadioButton, RadioGroup, RadioLabel, UnderLine, FormLabel, Label } from "./styled"
import { schemaBy, BY_FIELD_DATE, BY_FIELD_TABLE, SALARY_MIN, SALARY_STEP, TAX_FIELD_IT, TAX_FIELD_COMMON, TAX_FIELD_ENTERPRISE, PENSION_FIELD_NO, PENSION_FIELD_YES, PENSION_FIELD_YES_VOLUNTEER } from "./utilities/salary"
import EmployeeSalaryTable from "./calcComponents/EmployeeSalaryTable"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"

moment.locale('en', {
  week: {
    dow: 1,
  },
});

const form = {
  by: 1,
  from: 1,
  amount: null,
  schedule: 5,
  date_to: null,
  date_from: null,
  working_days: null,
  pension: PENSION_FIELD_YES,
  tax_field: TAX_FIELD_COMMON,
}

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

const headerStyles = {
  alignment: {vertical: 'middle', horizontal: 'center',  wrapText: true},
  font: {
    name: "Comic Sans MS",
    family: 4,
    size: 12,
    underline: false,
    bold: true
  },
  fill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {argb: 'FF0066CC'},
    bgColor: {argb: 'FFFFFFFF'}
  },
  border: {
    top: {style:'thin'},
    left: {style:'thin'},
    bottom: {style:'thin'},
    right: {style:'thin'}
  }
}

const Logo = require('../../assets/logo.jpeg')

class SalaryTableCalculator extends React.Component {
  fileInput = React.createRef()

  daysInput = React.createRef()

  dateToPicker = React.createRef()

  dateFromPicker = React.createRef()

  dateToPickerKey = randomString()

  dateFromPickerKey = randomString()

  handleUpload = e => {
    e.persist()

    const file = e.target.files[0]
    const reader = new FileReader();

    reader.onload = eve => {
      const data = new Uint8Array(/**@type ArrayBuffer*/ eve.target.result);
      const workbook = Excel.read(data, {type: 'array', cellStyles: true});
      /** @type {[][]} */
      const rows = Excel.utils.sheet_to_json(workbook.Sheets['WTimesheet'], { header: 1 })
      const date = moment(rows[9][12], 'DD/MM/YY')
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
              date
            }).length
          })
        }

        return acc;
      }, [])

      if (!date.isValid() || !employees.length) {
        notification.error({
          message: 'Սխալ ֆայլի ներբեռնում։',
          description: 'Ձեր կողմից ներբեռնված ֆայլի սխալ ֆորմատի է։',
        })

        employees.splice(0, employees.length)
      }

      this.fileInput.current.value = null

      this.setState({employees})
    };
    reader.readAsArrayBuffer(file)
  }

  handleSubmit = async () => {
    const { by, schedule, date_from } = this.state.form

    const avgWorkingDays = workingDaysInMonth({
      workdays: this.workdays,
      holidays: this.holidays,
      date: moment(date_from),
      schedule
    }).length

    const valid = await schemaBy.isValid({ ...this.state.form, employees: this.state.employees })

    schemaBy.validate({ ...this.state.form, employees: this.state.employees }).catch(function (err) {
      console.log(err)
    });

    if (!valid) return

    by ? await this.calculateByDate(avgWorkingDays) : await this.calculateByTable()
  }

  handleByFieldChange = () => {
    const { form } = this.state

    const state = !form.by
      ? { form: {...form, from: 1}, result: {}, calculated: 0 }
      : { result: {}, calculated: 0 }

    this.setState(state)
  }

  handleDownload = async () => {
    const { excel } = this.state

    const wb = new ExcelJS.Workbook();
    const worksheet = wb.addWorksheet("ExcelJS sheet", {
      pageSetup:{fitToPage: true, fitToHeight: 5, fitToWidth: 7},
      views: [
        {showGridLines: false}
      ],
    });
    const widths = [5.2, 30, 15.8, 17.3, 11, 11, 15, 13, 14, 14.5, 12, 15]
    const logo = wb.addImage({
      base64: await urlToBase64(Logo),
      extension: 'png',
    });

    worksheet.addImage(logo, {
      tl: { col: 0, row: 0 },
      ext: { width: 120, height: 115 },
    });
    let headers = Object.keys(excel[0]); headers.splice(4, 1, "Ընդամենը աշխատած");

    const merged = worksheet.insertRow(7, headers)
    const header = worksheet.addRow(Object.keys(excel[0]))

    header.eachCell(cell => cell.style = { ...headerStyles })
    merged.eachCell(cell => cell.style = { ...headerStyles })

    worksheet.mergeCells('A7:A8')
    worksheet.mergeCells('B7:B8')
    worksheet.mergeCells('C7:C8')
    worksheet.mergeCells('D7:D8')
    worksheet.mergeCells('E7:F7')
    worksheet.mergeCells('G7:G8')
    worksheet.mergeCells('H7:H8')
    worksheet.mergeCells('I7:I8')
    worksheet.mergeCells('J7:J8')
    worksheet.mergeCells('K7:K8')
    worksheet.mergeCells('L7:L8')
    worksheet.addRows(excel.map(row => Object.values(row)))

    const total = worksheet.addRow([null, 'Ընդամենը', 0, null, null, null, 0, 0, 0, 0, 0, 0])
    total.font = {bold: true}
    total.eachCell(cell => {
      cell.border = {...headerStyles.border}
      if (cell.type === 2) cell.value = {
        formula: `SUM(${cell.address.replace(cell.row.toString(), '2')}:${cell.address.replace(cell.row.toString(), (cell.row - 1).toString())})`,
        date1904: true
      }
    })

    header.height = 30
    merged.height = 63
    header.font = {...headerStyles.font};
    header.alignment = {...headerStyles.alignment};
    merged.font = {...headerStyles.font};
    merged.alignment = {...headerStyles.alignment};

    worksheet.columns.forEach((column, i) => {
      column.width = widths[i]
      column.eachCell(cell => cell.border = {...headerStyles.border})
    })

    worksheet.autoFilter = {
      from: {
        row: 1,
        column: 1
      },
      to: {
        row: 3,
        column: excel.length
      }
    };

    const buffer = await wb.xlsx.writeBuffer();

    saveAs(new Blob([buffer], {type: "application/octet-stream"}), 'աշխատավարձի հաշվարկ.xlsx')
  }

  /**
   * Render picker calendar cells by weekends & holidays
   *
   * @param {moment.Moment} date
   * @param {moment.Moment} today
   * @param {String} range - can be 'start' or 'end'
   * @return {JSX.Element}
   */
  handlePickerRender = (date, today, range) => {
    const { schedule } = this.state.form

    const condition = range === 'start'
      ? this.handleDateFromDisabled(date)
      : this.handleDateToDisabled(date)

    if (date.isSame(today, 'day')) {
      return <div className={
        !condition
          ? 'ant-picker-cell-inner ant-picker-cell-today'
          : 'ant-picker-cell-inner'
      }>
        {date.format('D')}
      </div>
    } else if (isHoliday(date, this.holidays)) {
      return <div className={
        !condition
          ? 'ant-picker-cell-inner ant-picker-cell-holiday'
          : 'ant-picker-cell-inner'
      }>
        {date.format('D')}
      </div>
    } else if (isWeekend(date, schedule)) {
      return <div className={
        !condition
          ? 'ant-picker-cell-inner ant-picker-cell-weekend'
          : 'ant-picker-cell-inner'
      }>
        {date.format('D')}
      </div>
    } else {
      return <div className="ant-picker-cell-inner">{date.format('D')}</div>
    }
  }

  handleDateFromChange = date => {
    const fields = !date ? { date_from: date, date_to: date } : { date_from: date.format("YYYY-MM-DD") }
    if (!date) this.dateFromPickerKey = randomString()

    this.setFields(fields, () => {
      this.dateToPickerKey = randomString()

      this.autocompleteWorkingDays()
    })
  }

  handleDateToChange = date => {
    date = isNull(date) ? date : date.format("YYYY-MM-DD")

    this.setField("date_to", date, () => this.autocompleteWorkingDays())
  }

  handleDateFromDisabled = d => {
    const { date_to } = this.state.form

    return date_to && (d.isSameOrAfter(date_to, "day")) && (!d.isSame(date_to, 'month'))
  }

  handleDateToDisabled = d => {
    const { date_from } = this.state.form

    return !date_from || !d || (d.isBefore(date_from, "day")) || (!d.isSame(date_from, 'month'))
  }

  handleDateFromInput = e => {
    const { value } = e.target

    if (!value) {
      this.handleDateFromChange(null)
      this.dateFromPicker.current.blur()
    }
  }

  handleDateToInput = e => {
    const { value } = e.target

    if (!value) {
      this.handleDateToChange(null)
      this.dateToPicker.current.blur()
    }
  }

  get calculatingByTable() {
    return (this.state.form.by === BY_FIELD_TABLE)
  }

  get calculatingByDate() {
    return (this.state.form.by === BY_FIELD_DATE)
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
      start: date_from ? moment(date_from) : moment().startOf('month'),
      end: date_from ? moment(date_from).endOf('month') : moment().endOf('month'),
      workdays: this.workdays,
      holidays: this.holidays,
      schedule
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

  constructor(props) {
    super(props);

    this.state = {
      calculated: 0,
      loading: false,
      form: {...form},
      employees: [],
      result: {},
      excel: []
    }
    this.holidays = []
    this.workdays = []
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  setFields(fields, cb) {
    this.setState({form: {...this.state.form, ...fields}}, cb)
  }

  setDateField(name, date) {
    date = isNull(date) ? date : date.format("YYYY-MM-DD")

    this.setField(name, date, this.autocompleteWorkingDays)
    // if ((name === 'date_from') && date) {
    //   this.setField(name, date, () => {
    //     if (!this.state.form.date_to) {
    //       this.setField("date_to", date, () => {
    //         this.setField('date_to', null)
    //       })
    //     } else {
    //       this.autocompleteWorkingDays()
    //     }
    //   })
    // } else if ((name === 'date_from') && !date) {
    //   this.setField(name, moment().format("YYYY-MM-DD"), () => {
    //     this.setField(name, null, () => {
    //       this.setField('date_to', moment().format("YYYY-MM-DD"), () => {
    //         this.setState({ form: { ...this.state.form, date_to : null , working_days: null} })
    //       })
    //     })
    //   })
    // } else {
    //   this.setField(name, date, this.autocompleteWorkingDays)
    // }
  }

  autocompleteVacationDateTo() {
    const { date_from, working_days, schedule } = this.state.form

    if (!working_days) {
      this.setField('date_to',null)
    }

    if (date_from && working_days) {
      const days = (working_days > this.maxWorkingDays) ? this.maxWorkingDays : working_days
      const date_to = endDate(moment(date_from), days, schedule, this.holidays, this.workdays).format("YYYY-MM-DD")

      this.setField("date_to", date_to)
    }
  }

  autocompleteWorkingDays() {
    const { date_from, date_to, schedule } = this.state.form

    this.daysInput.current.blur()

    if (!date_to || !date_from) {
      this.setField('working_days', null)
    }

    if (date_from && date_to) {
      const working_days = workingDaysInRange({
        start: moment(date_from),
        end: moment(date_to),
        workdays: this.workdays,
        holidays: this.holidays,
        schedule
      }).length

      this.setField('working_days', working_days)
    }
  }

  autoCalculate(prevState) {
    const prevFormByTable = { ...prevState.form, employees: [...prevState.employees] }
    const formByTable = { ...this.state.form, employees: [...this.state.employees] }

    if (
      (!isEqual(prevState.form, this.state.form) && this.calculatingByDate && this.calculatedByDate) ||
      (!isEqual(prevFormByTable, formByTable) && this.calculatingByTable && this.calculatedByTable)
    ) {
      this.handleSubmit().then(() => console.log('auto calculated'))
    }
  }

  async calculateByDate(avgWorkingDays) {
    this.setState({ loading: true })

    const { from, pension, tax_field, schedule, date_from, date_to, amount } = this.state.form
    const workingDays = workingDaysInRange({
      start: moment(date_from),
      end: moment(date_to),
      workdays: this.workdays,
      holidays: this.holidays,
      schedule
    })
    const gross_salary = Math.round(amount / avgWorkingDays * workingDays.length)

    const res = await triple.post("/api/counter/salary", {
      from,
      pension,
      tax_field,
      amount: gross_salary
    })

    const result = Object.assign({}, res.data, { gross_salary })

    this.setState({result, loading: false, calculated: 1})
  }

  async calculateByTable() {
    const { employees } = this.state
    const { from, tax_field } = this.state.form

    this.setState({ loading: true })

    const reqs = employees
      .map(employee => ({
        from,
        tax_field,
        pension: employee.pension,
        amount: (employee.workingDaysInMonth === employee.days)
          ? employee.amount
          : employee.amount / employee.workingDaysInMonth * employee.days
      }))
      .map(data => triple.post("/api/counter/salary", data))

    const results = await Promise.all(reqs).then(res => res.map(r => r.data))
    const excel = results.map((result, i) => ({
      N: employees[i].id,
      ["Անուն, Ազգանուն, Հայրանուն"]: employees[i].name,
      ["Գրանցված աշխատավարձ (ամսական)"]: employees[i].amount,
      ["Աշխատանքային գրաֆիկ"]: employees[i].schedule === 5 ? 'Հնգօրյա' : 'Վեցօրյա',
      ["Օր"]: employees[i].days,
      ["ժամ"]: employees[i].hours,
      ["Գրանցված աշխատավարձ (ըստ աշխատած օրերի)"]: (employees[i].workingDaysInMonth === employees[i].days)
        ? employees[i].amount
        : Math.round(employees[i].amount / employees[i].workingDaysInMonth * employees[i].days),
      ["Եկամտային հարկ"]: result.income_tax,
      ["Սոցիալական վճար"]: result.pension_fee,
      ["Դրոշմանշային վճար"]: result.stamp_fee,
      ["Ընդհանուր պահումներ"]: result.total_fee,
      ["Զուտ աշխատավարձ"]: result.salary
    }))
    const result = results.reduce((acc, result) => ({
      total_fee: acc.total_fee + result.total_fee,
      income_tax: acc.income_tax + result.income_tax,
      pension_fee: acc.pension_fee + result.pension_fee,
      stamp_fee: acc.stamp_fee + result.stamp_fee,
      salary: acc.salary + result.salary
    }));
    result['gross_salary'] = employees.map(employee => (employee.workingDaysInMonth === employee.days)
      ? employee.amount
      : employee.amount / employee.workingDaysInMonth * employee.days
    ).reduce((acc, amount) => acc + Math.round(amount), 0)

    this.setState({ excel, result, loading: false, calculated: 2 })
  }

  fetchDays() {
    triple.get('/api/days').then(res => {
      this.holidays = res.data.holidays
      this.workdays = res.data.workdays
    }).catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchDays()

    ReactDOM
      .findDOMNode(/** @type Element */this.dateFromPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateFromInput)

    ReactDOM
      .findDOMNode(/** @type Element */this.dateToPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handleDateToInput)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // this.autoCalculate(prevState)
  }

  render() {
    const { lang } = this.props
    const { form, employees, result, loading } = this.state

    return (
      <Row align="start" gutter={20}>
        <Col span={16}>
          <Row align="center" style={{justifyContent: 'space-between'}}>
            <FormLabel>{lang.title}</FormLabel>

            <FormLabel>{(new Date()).getFullYear()}թ.</FormLabel>
          </Row>

          <Card bordered={false}>
            <Form
              onFinish={this.handleSubmit}
              initialValues={form}
              colon={false}
              layout="horizontal"
              size="large"
            >
              {/* from field */}
              {form.by ? <Row align={form.from === 2 ? "end" : "start"} gutter={[10,10]}>
                <RadioGroup
                  style={{ flexDirection: form.from === 2 ? "row-reverse" : "row", }}
                  onChange={e => this.setField("from", e.target.value)}
                  value={form.from}
                  size="large"
                >
                  <Col span={10}>
                    <RadioButton value={1} size="large">
                      {lang.form["dirty_salary"]}
                    </RadioButton>
                  </Col>
                  <Col span={2} style={{textAlign: 'center'}}>
                    <svg
                      fill="none"
                      width="30"
                      height="49"
                      viewBox="0 0 24 14"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => this.setField("from", form.from === 2 ? 1 : 2)}
                    >
                      <path d="M5.32 6L0 10L5.32 14V11H14.6667V9H5.32V6ZM24 4L18.68 0V3H9.33333V5H18.68V8L24 4Z" fill="#00B3C7"/>
                    </svg>
                  </Col>
                  <Col span={10}>
                    <RadioButton value={2} size="large">
                      {lang.form["clean_salary"]}
                    </RadioButton>
                  </Col>
                </RadioGroup>
              </Row> : null}
              {/* by field */}
              <Form.Item>
                <Radio.Group
                  onChange={e => this.setField("by", e.target.value, this.handleByFieldChange)}
                  value={form.by}
                >
                  <Radio value={BY_FIELD_DATE}>
                    {<Label style={{ textTransform: "none" }}>{lang.form["by_date"]}</Label>}
                  </Radio>
                  <Radio value={BY_FIELD_TABLE}>
                    {<Label style={{ textTransform: "none" }}>{lang.form["by_table"]}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {/* date fields */}
              {form.by
                ? <>
                  <Row gutter={10} align="start">
                    <Col lg={10} xl={9} xxl={8}>
                      <Form.Item label={<Label>{lang.form.start}</Label>}>
                        <CalculatorDatePicker
                          dateRender={(date, today) => this.handlePickerRender(date, today, 'start')}
                          disabledDate={this.handleDateFromDisabled}
                          onChange={this.handleDateFromChange}
                          value={this.dateFromValue}
                          key={this.dateFromPickerKey}
                          ref={this.dateFromPicker}
                          placeholder={null}
                          format="DD.MM.YYYY"
                          name="date_from"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={10} xl={9} xxl={8}>
                      <Form.Item label={<Label>{lang.form.end}</Label>}>
                        <CalculatorDatePicker
                          dateRender={(date, today) => this.handlePickerRender(date, today, 'end')}
                          defaultPickerValue={this.dateFromValue}
                          disabledDate={this.handleDateToDisabled}
                          onChange={this.handleDateToChange}
                          value={this.dateToValue}
                          key={this.dateToPickerKey}
                          ref={this.dateToPicker}
                          placeholder={null}
                          format="DD.MM.YYYY"
                          name="date_to"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item label={<Label>{lang.form.working_days}</Label>}>
                    <CalculatorInput
                      onChange={v => this.setField("working_days", v, this.autocompleteVacationDateTo)}
                      value={form.working_days}
                      style={{ width: "54px" }}
                      ref={this.daysInput}
                      max={this.maxWorkingDays}
                      min={1}
                      name="working_days"
                      type="number"
                      size="large"
                    />
                  </Form.Item>

                  {/* schedule field */}
                  <Form.Item label={lang.form.working_schedule} labelCol={{ span: 24 }}>
                    <Radio.Group
                      onChange={e => this.setField("schedule", e.target.value, this.autocompleteWorkingDays)}
                      value={form.schedule}
                    >
                      <Radio value={5}>
                        {<Label style={{ textTransform: "none" }}>{lang.form["five_days"]}</Label>}
                      </Radio>
                      <Radio value={6}>
                        {<Label style={{ textTransform: "none" }}>{lang.form["six_days"]}</Label>}
                      </Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label={<Label>{lang.form.salary}</Label>} name="amount">
                    <CalculatorInput
                      formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={v => v.replace(/\$\s?|(,*)/g, '')}
                      onChange={v => this.setField("amount", v)}
                      value={form.amount}
                      step={SALARY_STEP}
                      min={SALARY_MIN}
                      name="amount"
                      size="large"
                    />
                  </Form.Item>
                </>
                : <>
                  <Form.Item label={lang.form.upload}>
                    <input
                      type="file"
                      name="file"
                      accept=".xls,.xlsx"
                      ref={this.fileInput}
                      style={{ display: 'none' }}
                      onChange={this.handleUpload}
                    />

                    <Button
                      onClick={() => this.fileInput.current.click()}
                      style={{ background: '#1C1D21', color: '#FFFFFF' }}
                      icon={<UploadOutlined />}
                      shape="circle"
                      type="ghost"
                    />
                  </Form.Item>

                  {employees.length ? <EmployeeSalaryTable
                    items={employees}
                    lang={lang.table}
                    onChange={employees => this.setState({employees})}
                  /> : null}
                </>
              }
              {/* tax field */}
              <Form.Item label={<Label style={{fontSize: '16px'}}>{lang.form["tax_label"]}</Label>} labelCol={{ span: 24 }} name="tax_field">
                <Radio.Group
                  onChange={e => this.setField("tax_field", e.target.value)}
                  value={form.tax_field}
                >
                  <Radio style={radioStyle} value={TAX_FIELD_COMMON}>
                    <RadioLabel>{lang.form["tax_common"]}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_IT}>
                    <RadioLabel>{lang.form["tax_it"]}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_ENTERPRISE}>
                    <RadioLabel>{lang.form["tax_enterprise"]}</RadioLabel>
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {/* pension field */}
              {form.by ?
                <Form.Item label={<RadioLabel>{lang.form["pensioner"]}</RadioLabel>} name="pension">
                  <Radio.Group
                    onChange={e => this.setField("pension", e.target.value)}
                    value={form.pension}
                    size="large"
                  >
                    <Radio value={PENSION_FIELD_YES}>
                      <Label>{lang.form["yes"]}</Label>
                    </Radio>
                    <Radio value={PENSION_FIELD_YES_VOLUNTEER}>
                      <Label>{lang.form["yes_volunteer"]}</Label>
                    </Radio>
                    <Radio value={PENSION_FIELD_NO}>
                      <Label>{lang.form["no"]}</Label>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              : null}
              {/* button */}
              <Form.Item>
                <ButtonSubmit
                  htmlType="submit"
                  shape="round"
                  size="large"
                >
                  {lang["calculate"]}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={8}>
          <FormLabel style={{margin: 0}}>{lang.result.title}</FormLabel>

          <UnderLine/>

          <CalculatorCardResult
            title={lang.result.gross_salary}
            text={result.gross_salary}
            loading={loading}
            tooltip
          />

          <CalculatorCardResult
            title={lang.result.income_tax}
            text={result.income_tax}
            loading={loading}
            tooltip
          />

          <CalculatorCardResult
            title={lang.result.pension_fee}
            text={result.pension_fee}
            loading={loading}
            tooltip
          />

          <CalculatorCardResult
            title={lang.result.stamp_fee}
            text={result.stamp_fee}
            loading={loading}
            tooltip
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

          {!form.by && !isEmpty(result) ?
            <ButtonSubmit
              style={{textTransform: "none", width: "100%"}}
              onClick={this.handleDownload}
              icon={<DownloadOutlined />}
              htmlType="button"
              shape="round"
              size="large"
              block
            >
              {lang.result.download}
            </ButtonSubmit>
          : null}
        </Col>
      </Row>
    )
  }
}

export default SalaryTableCalculator
