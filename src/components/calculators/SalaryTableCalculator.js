import React from "react"
import Excel from "xlsx"
import ReactDOM from "react-dom"
import moment from "moment"
import triple from "../../api/triple"
import { isNull, compact, isInteger, isEmpty, isEqual } from "lodash"
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons"
import { Row, Col, Card, Form, Radio, Button, notification } from "antd"
import { workingDaysInMonth, workingDaysInRange } from "./utilities/vacation"
import { CalculatorDatePicker, CalculatorSlider, CalculatorInput, ButtonSubmit, RadioButton, RadioGroup, RadioLabel, UnderLine, FormLabel, Label } from "./styled"
import { schemaBy, BY_FIELD_DATE, BY_FIELD_TABLE, SALARY_MAX, SALARY_MIN, SALARY_STEP, TAX_FIELD_IT, TAX_FIELD_COMMON, TAX_FIELD_ENTERPRISE, PENSION_FIELD_NO, PENSION_FIELD_YES, PENSION_FIELD_YES_VOLUNTEER } from "./utilities/salary"
import EmployeeSalaryTable from "./calcComponents/EmployeeSalaryTable"
import CalculatorCardResult from "./calcComponents/CalculatorCardResult"

const form = {
  by: 1,
  from: 1,
  amount: null,
  schedule: 5,
  date_to: null,
  date_from: null,
  pension: PENSION_FIELD_YES,
  tax_field: TAX_FIELD_COMMON,
}

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

class SalaryTableCalculator extends React.Component {
  fileInput = React.createRef()

  dateToPicker = React.createRef()

  dateFromPicker = React.createRef()

  handleSubmit = async () => {
    const { by, schedule } = this.state.form
    const avgWorkingDays = schedule === 5 ? 21 : 25;
    const valid = await schemaBy.isValid({ ...this.state.form, employees: this.state.employees })

    console.log(valid)
    schemaBy.validate({ ...this.state.form, employees: this.state.employees }).catch(function (err) {
      console.log(err)
    });

    if (!valid) return

    by ? await this.calculateByDate(avgWorkingDays) : await this.calculateByTable(avgWorkingDays)
  }

  handleUpload = e => {
    e.persist()

    const file = e.target.files[0]
    const reader = new FileReader();
    const { schedule } = this.state.form

    reader.onload = eve => {
      const data = new Uint8Array(eve.target.result);
      const workbook = Excel.read(data, {type: 'array'});
      /** @type {[][]} */
      const rows = Excel.utils.sheet_to_json(workbook.Sheets['WTimesheet'], {header:1})
      const date = moment(compact(rows[9])[1], 'DD/MM/YY')
      const workingDays = workingDaysInMonth({ date, schedule }).length
      const employees = rows.reduce((acc, row, i) => {
        if (i >= 20 && isInteger(row[0])) acc.push({
          id: row[0],
          name: row[2],
          profession: row[1],
          days: row[date.daysInMonth() + 4],
          hours: row[date.daysInMonth() + 5],
          amount: null,
          workingDays
        })

        return acc;
      }, [])

      this.setState({employees})
    };
    reader.readAsArrayBuffer(file)
  }

  handleDownload = () => {
    const { excel } = this.state

    const workbook = Excel.utils.book_new()
    const workSheet = Excel.utils.json_to_sheet(excel, {
      header: Object.keys(excel[0])
    })

    Excel.utils.book_append_sheet(workbook, workSheet, "Sheet");
    Excel.writeFile(workbook, 'out.xls');
  }

  handlePickerInput = e => {
    const { value, name } = e.target

    if (!value) {
      this.setDateField(name, null)

      name === "date_from"
        ? this.dateFromPicker.current.blur()
        : this.dateFromPicker.current.blur()
    }
  }

  handleByFieldChange = () => {
    const { form } = this.state

    const state = !form.by
      ? { form: {...form, from: 1}, result: {}, calculated: 0 }
      : { result: {}, calculated: 0 }

    this.setState(state)
  }

  get calculatingByDate() {
    return (this.state.form.by === BY_FIELD_DATE)
  }

  get calculatingByTable() {
    return (this.state.form.by === BY_FIELD_TABLE)
  }

  get calculatedByDate() {
    return this.state.calculated === 1
  }

  get calculatedByTable() {
    return this.state.calculated === 2
  }

  get dateFromValue() {
    const { form } = this.state

    return isNull(form.date_from) ? form.date_from : moment(form.date_from)
  }

  get dateToValue() {
    const { form } = this.state

    return isNull(form.date_to) ? form.date_to : moment(form.date_to)
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
  }

  setField(name, value, cb) {
    this.setState({ form: { ...this.state.form, [name]: value } }, cb)
  }

  setDateField(name, date) {
    date = isNull(date) ? date : date.format("YYYY-MM-DD")

    this.setField(name, date)
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
      end: moment(date_to)
    }, schedule)

    const res = await triple.post("/api/counter/salary", {
      from,
      pension,
      tax_field,
      amount: amount / avgWorkingDays * workingDays.length
    })

    this.setState({result: res.data, loading: false, calculated: 1})
  }

  async calculateByTable(avgWorkingDays) {
    const { employees } = this.state
    const { from, pension, tax_field } = this.state.form

    this.setState({ loading: true })

    const reqs = employees
      .map(employee => ({
        from,
        pension,
        tax_field,
        amount: (employee.workingDays === employee.days)
          ? employee.amount
          : employee.amount / avgWorkingDays * employee.days
      }))
      .map(data => triple.post("/api/counter/salary", data))

    const results = await Promise.all(reqs).then(res => res.map(r => r.data))
    const excel = results.map((result, i) => ({
      N: employees[i].id,
      ["Անուն Ազգանուն"]: employees[i].name,
      ["Գրանցված աշխատավարձ"]: employees[i].amount,
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

    this.setState({ excel, result, loading: false, calculated: 2 })
  }

  componentDidMount() {
    ReactDOM
      .findDOMNode(this.dateFromPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handlePickerInput)

    ReactDOM
      .findDOMNode(this.dateToPicker.current)
      .querySelector("input")
      .addEventListener("input", this.handlePickerInput)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.autoCalculate(prevState)
  }

  render() {
    const { lang } = this.props
    const { form, employees, result, loading } = this.state

    return (
      <Row align="start" gutter={0}>
        <Col className="px-35" span={16}>
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
                      {lang.form.dirty_salary}
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
                      {lang.form.clean_salary}
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
                    {<Label style={{ textTransform: "none" }}>{lang.form.by_date}</Label>}
                  </Radio>
                  <Radio value={BY_FIELD_TABLE}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.by_table}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {/* date fields */}
              {form.by
                ? <>
                  <Row gutter={10} align="start">
                    <Col span={10}>
                      <Form.Item label={<Label>{lang.form.start}</Label>}>
                        <CalculatorDatePicker
                          disabledDate={d => form.date_to && (d.isSameOrAfter(form.date_to, "day")) && !d.isSame(form.date_to, 'month')}
                          onChange={date => this.setDateField("date_from", date)}
                          value={this.dateFromValue}
                          ref={this.dateFromPicker}
                          inputReadOnly={false}
                          placeholder={null}
                          format="DD.MM.YYYY"
                          name="date_from"
                          size="large"
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item label={<Label>{lang.form.end}</Label>}>
                        <CalculatorDatePicker
                          onChange={date => this.setDateField("date_to", date)}
                          disabledDate={d => !form.date_from || (d.isSameOrBefore(form.date_from, "day")) || !d.isSame(form.date_from, 'month')}
                          value={this.dateToValue}
                          ref={this.dateToPicker}
                          placeholder={null}
                          format="DD.MM.YYYY"
                          name="date_to"
                          size="large"
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item label={<Label>{lang.form.salary}</Label>} name="amount">
                    <CalculatorInput
                      formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      onChange={v => this.setField("amount", v)}
                      value={form.amount}
                      min={SALARY_MIN}
                      name="amount"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item name="amount">
                    <CalculatorSlider
                      onChange={v => this.setField("amount", v)}
                      value={form.amount}
                      step={SALARY_STEP}
                      min={SALARY_MIN}
                      max={SALARY_MAX}
                      name="amount"
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
                    style={{maxWidth: '569px'}}
                    onChange={employees => this.setState({employees})}
                  /> : null}
                </>
              }
              {/* tax field */}
              <Form.Item label={<Label style={{fontSize: '16px'}}>{lang.form.tax_label}</Label>} labelCol={{ span: 24 }} name="tax_field">
                <Radio.Group
                  onChange={e => this.setField("tax_field", e.target.value)}
                  value={form.tax_field}
                >
                  <Radio style={radioStyle} value={TAX_FIELD_COMMON}>
                    <RadioLabel>{lang.form.tax_common}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_IT}>
                    <RadioLabel>{lang.form.tax_it}</RadioLabel>
                  </Radio>
                  <Radio style={radioStyle} value={TAX_FIELD_ENTERPRISE}>
                    <RadioLabel>{lang.form.tax_enterprise}</RadioLabel>
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {/* pension field */}
              <Form.Item label={<RadioLabel>{lang.form.pensioner}</RadioLabel>} name="pension">
                <Radio.Group
                  onChange={e => this.setField("pension", e.target.value)}
                  value={form.pension}
                  size="large"
                >
                  <Radio value={PENSION_FIELD_YES}>
                    <Label>{lang.form.yes}</Label>
                  </Radio>
                  <Radio value={PENSION_FIELD_YES_VOLUNTEER}>
                    <Label>{lang.form.yes_volunteer}</Label>
                  </Radio>
                  <Radio value={PENSION_FIELD_NO}>
                    <Label>{lang.form.no}</Label>
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {/* schedule field */}
              <Form.Item label={lang.form.working_schedule} labelCol={{ span: 24 }}>
                <Radio.Group
                  onChange={e => this.setField("schedule", e.target.value)}
                  value={form.schedule}
                >
                  <Radio value={5}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.five_days}</Label>}
                  </Radio>
                  <Radio value={6}>
                    {<Label style={{ textTransform: "none" }}>{lang.form.six_days}</Label>}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {/* button */}
              <Form.Item>
                <ButtonSubmit
                  htmlType="submit"
                  shape="round"
                  size="large"
                >
                  {lang.calculate}
                </ButtonSubmit>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col className="px-35" span={8}>
          <FormLabel style={{margin: 0}}>{lang.result.title}</FormLabel>

          <UnderLine/>

          <CalculatorCardResult
            title={form.from === 1 ? lang.result["dirty_to_clean_salary"] : lang.result["clean_to_dirty_salary"]}
            text={result.salary}
            loading={loading}
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
          />

          <CalculatorCardResult
            title={lang.result.total_fee}
            text={result.total_fee}
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
