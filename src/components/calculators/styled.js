import styled from "styled-components"
import { Card, Checkbox, DatePicker, Divider, InputNumber, Radio, Row, Select, Typography, Col, Form } from "antd"
import { SubmitButton } from "../careercomponents/careerDroping/dropStyle"

const { Text } = Typography

export const CalcImagesWrapper = styled.div`
  color:black;
  padding: 39px 51px;
  text-align: center;
  background-color:#fff;
  width:100%;
  height:100%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  letter-spacing: 1.15px;
  font-weight: bold;
  font-size: 18px;
  &:hover{
    border: 1px solid #00B3C7;
     color:#00B3C7;
  }
  @media only screen and (max-width:1340px){
    padding:39px 15px;
  }
  @media only screen and (max-width: 768px){
    width:100%;
    margin:0 auto;
  }
`
export const IconWrapper = styled.img`
    margin-bottom: 15px;
`
export const FormLabel = styled.h3`
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 1.15px;
  color: #000000;
  margin-bottom: 15px;
`

export const FormItemLabel = styled.p`
  font-family: Arial AMU, serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  text-align: left;
  position: relative;
  &:after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 60px;
    border: 1px solid #000000;
  }
`

export const RadioGroup = styled(Radio.Group)`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  min-height: 50px !important;
  margin-bottom: 25px;
`

export const RadioButton = styled(Radio.Button)`
  font-weight: bold;
  text-align: center;
  border-radius: 5px;
  width: 100%;
  padding-right:0;
  padding-left:0;
  word-break: break-word;
  min-height: 50px !important;
  border-color: #555555 !important;
  border-radius: 5px !important;
  white-space: nowrap;
  height: auto !important;
  &.ant-radio-button-wrapper {
    line-height: unset;
    white-space: break-spaces;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.ant-radio-button-wrapper-checked {
    border-radius: 5px !important;
  }
  
`

export const CalculatorInput = styled(InputNumber)`
  background: #FFFFFF;
  border: 1px solid rgb(85,85,85)!important;
  box-sizing: border-box;
  border-radius: 5px !important;
  width: 136px;
  
  &.currencyInput{
    width: 65%;
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
  }
`

export const CurrencySymbol = styled.strong`
  margin-left: 10px;
  display: flex;
  align-items: center;
  @media (min-width: 768px){
    margin-right: 20px;
  }
`

export const CalculatorSelect = styled(Select)`
  background: #FFFFFF;
  border: 0.5px solid #555555;
  box-sizing: border-box;
  border-radius: 5px !important;
  
  .ant-select-selector {   
    border: none !important;
    border-radius: 5px !important;
    background-color: transparent !important; 
  }
  
  &.currencySelect{
     width: 35%;
     background-color: #555555;
     border-bottom-left-radius: 0 !important;
    border-top-left-radius: 0 !important;
    border: none !important;
    height: 45px;
    color: white !important;
    position: absolute;
    right: 0;
    height: 40px;
  }
  
  &.yearSelect .ant-select-arrow .anticon > svg{
    fill: black;
  }
  
  // .ant-select-arrow .anticon > svg{
  //   fill: white;
  // }
`

export const Label = styled(Text)`
  display: flex;
  align-items: center;
  font-style: normal;
  font-size: 14px;
  display:flex;
  line-height: 25px;
  letter-spacing: 1.15px;
  text-transform: uppercase;
  color: #000000;
  font-weight: bold;
    // margin-right:0!important;
 white-space: normal;
`

export const RadioLabel = styled(Text)`
  display:inline-flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  white-space: normal;
  height: fit-content;
  line-height: 25px;
  letter-spacing: 1.15px;
  color: #000000;
  word-break: break-word!important;
  overflow-wrap: break-word!important;
`

export const ButtonSubmit = styled(SubmitButton)``

export const UnderLine = styled(Divider)`
  margin: 5px 0 15px!important;
  border-top: 1px solid #000000;
`

export const CalculatorDatePicker = styled(DatePicker)`
  width: 150px;
  height: 40px;
  background: #FFFFFF;
  box-sizing: border-box;
  border-radius: 5px !important;
  border: 1px solid #555555;
  &.currencyDate{
    margin-right: 10px;
  }
`

export const ColHeader = styled.th`
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 1.15px;
  text-transform: uppercase;
  color: #000000;
`

export const CalculatorTable = styled.table`
  border-collapse: separate;
  border-spacing: 10px;
  max-width: 100%;
  transform: rotateX(180deg);
`

export const CalculatorCol = styled.td`
  background: #F7F7F7;
  border-radius: 5px;
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 1.15px;
  color: #555555;
  padding: 8px 10px;
  text-align: left; 
  @media (max-width: 1200px){
    white-space: pre;
  }
`
export const H1Styled = styled.h1`
  font-family: ArialAMU,serif;
  max-width:80%;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 1.15px;
  color: #000000;
  padding-top: 30px;
  margin-bottom:30px;
  @media (max-width: 1200px){
    font-size:20px
  }
`
export const TextStyled = styled.p`
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 1.15px;
  color: #000000;
  margin: 0 40px 50px;
  background: white;
  border-radius: 5px;
  padding: 10px 35px;
  @media (max-width: 768px){
    margin:0 10px 50px;
    padding:10px
  }
`
export const SvgWrapper = styled.div`
  display:inline-block;
  height: 25px;
  width: 45px;
  background-position: center;
  background-repeat: no-repeat;
`
export const CalculatorsCard = styled(Card)`
  margin-top: 30px;
  border-radius: 10px;
  @media (min-width: 1200px){
    margin: 30px 20px 0 20px;
  }
  @media (max-width: 768px){
    & > div{
    padding: 20px;
    }
  }
  & .ant-form-item-control-input-content{
    display:flex
  }
  & .ant-form-item-label > label{
    height:unset !important;
  }
`
export const Arrows = styled(Col)`
  overflow:hidden;
  @media (max-width: 768px){
    min-width:230px;
  }
`
export const RadioElementsWrapper = styled.div`
  display: flex;
  @media only screen and (max-width:768px){
    flex-direction:column;
    width:100%;
  }
`
export const RowWrapper = styled(Form.Item)`
  display:flex;
  flex-wrap: nowrap;
  height:fit-content;
  align-items:center;
  & .ant-form-large .ant-form-item-label > label{
    height:unset
  }
  @media only screen and (max-width:768px){
  & > div{
    width:fit-content;
    flex: 1 1 !important;
  }
  &:not(&.uploadInput) > div:first-child{
    max-width:fit-content !important;
    margin-right:10px;
  }
  & > div:last-child{
    max-width:fit-content !important;
  }
  & .ant-form-item-label{
    text-align: left;
  }
  }
  
`
export const CalendarWrapper = styled.div`
  width: 100%;
  box-shadow: inset 0px 0px 0px 1px rgb(0 0 0);
  padding-bottom: 10px;
  border-radius: 10px;
  margin: 0 auto 15px;
  min-width: 250px;
  width: 250px;
  max-width: 250px;
  height:230px;
  @media (max-width: 768px){
    margin: auto auto 50px;
  }
`
export const CalendarInfo = styled.div`
  width: 100%;
  height: 180px;
  // border: 0.5px solid #555555;
  border-radius: 10px;
  margin:0 auto 25px;
  overflow: hidden;
  min-width: 250px;
  box-shadow: inset 0px 0px 0px 1px rgb(0 0 0);
  width: 250px;
  max-width: 250px;
  
  tbody td, tbody th {
    padding: 0 5px;
    border: 1px solid #555555;   
    height: 49px; 
  }
      
  tbody th{
    border-left: unset;
  }
  
  tbody tr:last-of-type td,
  tbody tr:last-of-type th {
    border-bottom: unset;
  }  
  
  tbody td{
    text-align: center;
    letter-spacing: 0.15px;
    color: #000000;
    font-family: ArialAMU, serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;
  }
`
export const CalendarTable = styled.table`
  height: 206px;
  width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 0;
  
  thead tr:last-child td {
    border: unset;
  }
`
export const CalendarTitle = styled.td`
  font-family: ArialAMU, serif;
  padding: 10px 0;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.15px;
  color: #000000;
  border-bottom: 1px solid #C4C4C4;
  
  &.additionalInformation{
    font-family: ArialAMU, serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.15px;
    color: #555555;
    padding-left: 5px; 
    padding-right: 5px; 
  }
`
export const DayWrapper = styled.td`
  padding: 2.5px 5px;
  width: 20px;
  height: 20px;
  text-align: center;
`
export const InformationTitles = styled.th`
  font-family: ArialAMU, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.15px;
  color: #555555;
`

export const CalculatorsCardWrapper = styled(Col)`
  &:not(.calendarWrapper){
    padding-left:0!important;
    padding-right:0!important;
  }
  &.calendarWrapper{
    padding-left:10px!important;
    padding-right:10px!important;
  }
  @media only screen and (min-width:1200px){
    margin-bottom:90px;
  }
  @media only screen and (max-width: 370px){
    &.subsidyWrapper ${RowWrapper} > div{
      max-width: 100%!important;
      min-width: 80%!important;
    }
  }
`
export const CheckboxField = styled(Checkbox)`
  font-family: ArialAMU, serif;
  width: 20px;
  border: none;
  outline: none;
  height: 20px;
  border-radius: 2px;
  line-height: 20px;
  text-align: center;
  background-color: transparent;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.15px;
  padding: 0;
  cursor: pointer;
  display: block;
  margin: auto;
  position: relative;
  
    &:hover {
    
      .day_title{
        display: flex;
        background-color: white;
      }
      .ant-checkbox-inner{
        background-color: #85c1dc
      }
    }
  
  span:last-of-type{
    position: absolute;
    // z-index: 11;
  }
  
  .day_title{
      width: auto;
      align-items: center;
      justify-content: center;
      max-width: 170px;
      bottom: calc(100% + 5px);
      display: block;
      word-wrap: normal;
      left: 0;
      right: 0;
      height: fit-content;
      border-radius: 5px;
      margin: auto;
      color: #555555;
      display: none;
      
    }
    
    .day_title_context{
      width: fit-content;
      height: fit-content;
      background-color: white;
      border: 0.5px solid rgb(85, 85, 85);
      border-radius: 5px;
      z-index: 15;
      bottom: -2px;
      padding: 5px 10px;
    }
    
    .ant-checkbox-inner{
      height: 100%;
      width: 100%;
      background-color: inherit;
      border: none;
      border-radius: 2px;
      
      &:after{
        content: unset;
      }
    }
  

  
  &.weekend {
    
    .ant-checkbox-inner{
      background-color: #CDF5FA;
    }
    &.workday{
      color:#000000;
    
    .ant-checkbox-inner{
      background-color: transparent;
    }
      
    }
    
    &:hover {
      .ant-checkbox-inner{
        background-color: #85c1dc
      }
    }
  }
  
  &.workday {
    .ant-checkbox-inner{
      background-color: transparent;
    }
    
    &:hover {
      .ant-checkbox-inner{
        background-color: #85c1dc
      }
    }
  }
  
  &.holiday {
      color: #FFFFFF;
    .ant-checkbox-inner{
      background-color: #00779C;
    }
    
    &:hover {
      color: #000000;

      .ant-checkbox-inner{
        background-color: #85c1dc
      }
    }
    
    
    &.weekend{
        color:#000000;
      .ant-checkbox-inner{
        background: #CDF5FA;
      }
      
      &:hover {
      .ant-checkbox-inner{
        background-color: #85c1dc
      }
    }
    }
  }
  
  span{
    padding: 0;
    height: 100%;
    width: 100%;
    display: block;
  }
  
  .ant-checkbox{
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: inline;
    height: 100%;
    width: 100%;
    
    &.ant-checkbox-checked{
      &:after{
        content: unset;
      }
    }

    input{
    display: none;
    
      &:checked{
        & + .ant-checkbox-inner{
          box-shadow: 0px 0px 4px #b3b3b3;
          background-color: #85c1dc;
          border: 1px solid #76b0ca;
          border-radius: 2px;
        }
      }
    }
  }
`

export const YearField = styled(Row)`
  margin-bottom: 25px;
  margin-left: 10px;
  button{
    background: #00779C;
    height: 20px;
    width: 20px;
    outline: none;
    border: none;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img{
      height: 80%;
      object-fit: contain;
      width: 80%;
      position: relative;
      z-index: 11;
    }
    
    &[data-action='next']{
      transform: rotate(180deg)
    }
  }
  
  p{
      text-align: center;
      letter-spacing: 0.15px;
      color: #000000;
      font-family: ArialAMU, serif;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      margin: 0 15px
    }
`
