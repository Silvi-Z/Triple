import styled from "styled-components";
import { Button, DatePicker, Divider, InputNumber, Radio, Select, Slider, Typography } from "antd"

const { Text } = Typography;

export const FormLabel = styled.h3`
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.15px;
  color: #000000;
  margin-bottom: 15px;
`;

export const RadioGroup = styled(Radio.Group)`
  display: flex;
  align-items: center;
  justify-content: center;
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

export const CalculatorSlider = styled(Slider)`
  &:hover .ant-slider-rail {
    background-color: #000000;
  }
  
  .ant-slider-handle {
    background-color: #72eded;
    border: solid 3px #000000;
  }
  
  .ant-slider-rail  {
    background-color: #000000;
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
  letter-spacing: 0.15px;
  text-transform: uppercase;
  color: #000000;
  font-weight: bold;
`;

export const RadioLabel = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.15px;
  color: #000000;
  word-break: break-word!important;
  overflow-wrap: break-word!important;
`;

export const ButtonSubmit = styled(Button)`
  background: #1C1D21;
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 0.15px;
  text-transform: uppercase;
  color: #FFFFFF;
  width: 260px;
  height: 50px;
  &:hover:enabled {
    color: #FFFFFF !important;
    background: #1C1D21 !important;
    border-color: #1C1D21 !important;
  }
  &:focus {
    color: #FFFFFF !important;
    background: #1C1D21 !important;
    border-color: #1C1D21 !important;
  }
`;

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
  letter-spacing: 0.15px;
  text-transform: uppercase;
  color: #000000;
`

export const CalculatorTable = styled.table`
  border-collapse: separate;
  border-spacing: 10px;
  max-width: 100%;
`

export const CalculatorCol = styled.th`
  background: #F7F7F7;
  border-radius: 5px;
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.15px;
  color: #555555;
  padding: 8px 10px;
  text-align: left; 
`
