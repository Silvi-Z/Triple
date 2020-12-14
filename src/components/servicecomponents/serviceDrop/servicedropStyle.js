import styled from "styled-components"
import { Button, Row } from "antd"

export const DropWrapper = styled.div`
  padding:40px 22px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width:1024px){
    padding:40px 0;
  }
`

export const ServiceDropRow = styled(Row)`
  border-bottom: 1px solid;
  border-color: #d7d7d7;
  .ant-btn{
    transition:none;
  }
`

export const H2Wrapper = styled.div`
  width: 93%;
  display: flex;
  align-items: center;
`

export const ToggleH2Styled = styled.h2`
  font-family: ArialAMU;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1.15px;
  text-align: left;
  color: #000000;
  margin:0;
  line-height: 25px;
  @media only screen and (max-width:1024px){
    font-size: 20px;
  }
`

export const ToggleButton = styled(Button)`
  background: ${(props) => props.isOpen ? '#FFFFFF' : '#1C1D21'};
  border-color:#1C1D21;
  width: 40px !important;
  height: 40px !important;
  visibility: visible !important;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  color: ${(props) => props.isOpen ? '#1C1D21' : '#FFFFFF'};
  border: 1px solid #1C1D21;
  box-sizing: border-box;
  border-radius:50%;
  padding:0;
  background-repeat: no-repeat;
  background-position: center;
  --antd-wave-shadow-color:none;
  &:hover{
    background: ${(props) => props.isOpen ? '#1C1D21' : '#FFFFFF'};
    color: ${(props) => props.isOpen ? '#FFFFFF' : '#1C1D21'};
    border-color:#1C1D21;
  }
  &.ant-btn:focus{
    background: ${(props) => props.isOpen ? '#FFFFFF' : '#1C1D21'};
    color: ${(props) => props.isOpen ? '#1C1D21' : '#FFFFFF'};
    border-color: #1C1D21;
  }
  @media only screen and (max-width:1024px){
    width: 30px;
    height: 30px;
  }
`

export const Text = styled.div`
  width:100%;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  line-height: 1.88;
  text-align: left;
  color: #000000;
  font-size: 18px;
  line-height: 40px;
  letter-spacing: 0.15px;
  @media only screen and (max-width:1024px){
    margin-bottom:30px;
    font-size: 16px;
    max-width: 100%;
    width: 100%;
  }
`

export const DropTextCol = styled.div`
   border-top: 1px solid black;
   display: flex;
   width: 100%;
   padding: 48px 24px;
   justify-content: space-between;
   @media only screen and (max-width:1024px){
    padding: 40px 0;
    flex-direction:column;
   }
`
