import styled from "styled-components";
import { Button, Card, DatePicker, Divider, InputNumber, Radio, Select, Slider, Typography } from "antd"
import { SubmitButton } from "../careercomponents/careerDroping/dropStyle"

const { Text } = Typography;

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
`;

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
`;

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
`;

export const CalculatorInput = styled(InputNumber)`
  background: #FFFFFF;
  border: 0.5px solid #555555;
  box-sizing: border-box;
  border-radius: 5px !important;
  width: 136px;
`;

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
`

export const Label = styled(Text)`
  font-style: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 1.15px;
  text-transform: uppercase;
  color: #000000;
  font-weight: bold;
`;

export const RadioLabel = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 1.15px;
  color: #000000;
  word-break: break-word!important;
  overflow-wrap: break-word!important;
`;

export const ButtonSubmit = styled(SubmitButton)``;

export const UnderLine = styled(Divider)`
  margin: 5px 0 15px!important;
  border-top: 1px solid #000000;
`;

export const CalculatorDatePicker = styled(DatePicker)`
  width: 150px;
  height: 40px;
  background: #FFFFFF;
  box-sizing: border-box;
  border-radius: 5px !important;
`;

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