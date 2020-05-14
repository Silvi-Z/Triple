import styled from "styled-components"
import { Form, Input, Tooltip, Select, Row, Col, Button, Spin } from "antd"
import { DatePicker, InputNumber } from "antd"

export const ColAddress = styled(Col)`
  /* margin-top: 3.1%;
@media (min-width: 768px) {
  margin-top: 5.5%;
  margin-left: 3%;
}*/
  @media (min-width: 1024px) {
    margin-left: 9%;
  }
  @media (min-width: 1170px) {
    margin-left: 2.5%;
  }
  @media (min-width: 1300px) {
    margin-left: 0.2%;
  }
  @media (min-width: 1600px) {
    margin-left: 0.2%;
  }
`
export const ReportPassportRow = styled(Row)`
  width: 48.6%;
  @media (min-width: 768px) {
    width: 100%;
  }
  @media (min-width: 1024px) {
    width: 75%;
  }
  @media (min-width: 1170px) {
    width: 66%;
  }
  @media (min-width: 1366px) {
    width: 59%;
  }
  @media (min-width: 1600px) {
    width: 51%;
  }
`
export const DatePickerCustom = styled(DatePicker)`
  width: 142px;
  height: 40px;
  border: solid 1px #009db8;
  @media (min-width: 320px) {
    width: 290px;
    border: solid 1px #009db8;
  }
  @media (min-width: 375px) {
    width: 290px;
    border: solid 1px #009db8;
  }
  @media (min-width: 768px) {
    width: 142px;
    border: solid 1px #009db8;
  }
`
export const SelectCustom = styled(Select)`
  width: 216px;
  border: solid 1px #009db8;
  background: white;
  @media (min-width: 320px) {
    width: 138px;
    border: solid 1px #009db8;
  }
  @media (min-width: 375px) {
    width: 138px;
    border: solid 1px #009db8;
  }
  @media (min-width: 1300px) {
    width: 200px;
    border: solid 1px #009db8;
  }
  @media (min-width: 1600px) {
    width: 216px;
    border: solid 1px #009db8;
  }
`
export const PassportButton = styled(Button)`
  height: 40px;
  @media (min-width: 320px) {
    margin-top: 10px;
    width: 290px;
    border: solid 1px #009db8;
  }
  @media (min-width: 375px) {
    margin-top: 10px;
    width: 290px;
    border: solid 1px #009db8;
  }
  @media (min-width: 768px) {
    width: 216px;
    border: solid 1px #009db8;
  }
`
export const IdButton = styled(Button)`
  width: 216px;
  height: 40px;
  margin-left: 2.7%;
  @media (min-width: 320px) {
    width: 290px;
    border: solid 1px #009db8;
    margin-top: 3%;
    margin-left: 0%;
  }
  @media (min-width: 375px) {
    width: 290px;
    border: solid 1px #009db8;
    margin-top: 3%;
    margin-left: 0%;
  }
  @media (min-width: 768px) {
    width: 216px;
    border: solid 1px #009db8;
    margin-left: 3%;
  }
  @media (min-width: 1366px) {
    margin-left: 2.9%;
  }
  @media (min-width: 1900px) {
    margin-left: 2.6%;
  }
`
export const SubmitSpan = styled.span`
  width: 408px;
  height: 31px;
  font-family: ArialAMU;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media (min-width: 320px) {
    width: 290px;
    margin-bottom: 20px;
  }
  @media (min-width: 375px) {
    width: 290px;
    margin-bottom: 20px;
  }
`
export const LabelSpan = styled.span`
  width: auto;
  height: 14px;
  font-family: ArialAMU;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media (min-width: 320px) {
    width: 290px;
  }
  @media (min-width: 375px) {
    width: 290px;
  }
  @media (min-width: 1170px) {
    width: 390px;
  }
`
