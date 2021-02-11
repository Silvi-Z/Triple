import styled from "styled-components"
import { Card, Checkbox, DatePicker, Divider, InputNumber, Radio, Row, Select, Typography } from "antd"
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
  word-break: break-word;
  min-height: 50px !important;
  border-color: #555555 !important;
  border-radius: 5px !important;
  white-space: nowrap;
  height: auto !important;
  &.ant-radio-button-wrapper {
    line-height: 50px;
  }
  &.ant-radio-button-wrapper-checked {
    border-radius: 5px !important;
  } 
`

export const CalculatorInput = styled(InputNumber)`
  background: #FFFFFF;
  border: 0.5px solid #555555;
  box-sizing: border-box;
  border-radius: 5px !important;
  width: 136px;
  
  &.currencyInput{
    width: 65%;
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
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
  
  .ant-select-arrow .anticon > svg{
    fill: white;
  }
`

export const Label = styled(Text)`
  font-style: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 1.15px;
  text-transform: uppercase;
  color: #000000;
  font-weight: bold;
`

export const RadioLabel = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
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
`
export const H1Styled = styled.h1`
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 1.15px;
  color: #000000;
 padding-top: 50px;
`
export const TextStyled = styled.p`
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 1.15px;
  color: #000000;
  padding-bottom: 50px;
  max-width: 734px;
  margin-bottom: 0;
`
export const CalculatorsCard = styled(Card)`
  margin-top: 30px;
`
export const CalendarWrapper = styled.div`
  width: 100%;
  border: 0.5px solid #555555;
  padding-bottom: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
`
export const CalendarInfo = styled.div`
  width: 100%;
  height: 158px;
  border: 0.5px solid #555555;
  border-radius: 10px;
  margin-bottom: 25px;
  overflow: hidden;
  
  tbody td, tbody th {
    padding: 0 5px;
    border: 1px solid #555555;   
    height: 40px; 
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
    font-family: Arial AMU;
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
  
  thead tr:last-child td {
    border: unset;
  }
`
export const CalendarTitle = styled.td`
  font-family: Arial AMU;
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
    font-family: Arial AMU;
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
  font-family: Arial AMU;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.15px;
  color: #555555;
`
export const CheckboxField = styled(Checkbox)`
  font-family: Arial AMU;
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
        display: block
      }
      .ant-checkbox-inner{
        background-color: #85c1dc
      }
    }
  
  span:last-of-type{
    position: absolute;
    z-index: 11;
  }
  
  .day_title{
      position: absolute;
      bottom: calc(100% + 5px);
      display: block;
      left: 0;
      right: 0;
      height: fit-content;
      padding: 5px 10px;
      background-color: white;
      border: 0.5px solid #555555;
      width: fit-content;
      border-radius: 5px;
      margin: auto;
      color: #555555;
      display: none;
      max-width: 70px;
      
      // &:after {
      //   content: '';
      //   width: 0; 
      //   height: 0; 
      //   border-left: 20px solid transparent;
      //   border-right: 20px solid transparent;
      //   border-top: 20px solid #f00;
      // }
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
    }
    
    &[data-action='next']{
      transform: rotate(180deg)
    }
  }
  
  p{
      text-align: center;
      letter-spacing: 0.15px;
      color: #000000;
      font-family: Arial AMU;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      margin: 0 15px
    }
`
