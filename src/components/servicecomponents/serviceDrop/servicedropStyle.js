import styled from "styled-components"
import { Col, Button, Row } from "antd"
import FbBlueIcon from "../../../assets/career/facebookBlueCareer.svg"
import FbBlackIcon from "../../../assets/career/facebookCareer.svg"
import LinkdinBlackIcon from "../../../assets/career/linkedinCareer.svg"
import LinkedinBlueIcon from "../../../assets/career/linkedinBlueCareer.svg"
export const SevicePageWrapper = styled.div`
  padding:50px 118px 90px 118px;
  max-width: 1440px;
  margin: 0 auto;
  @media only screen and (max-width:1024px){
    padding:30px 20px 60px 20px;
  }
`
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
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin:0;
  @media only screen and (max-width:1024px){
    font-size: 20px;
  }
`
export const ToggleButton = styled(Button)`
  background: ${(props) => props.isOpen ? '#FFFFFF' : '#1C1D21'};
  border-color:#1C1D21;
  width: 40px;
  height: 40px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  color: ${(props) => props.isOpen ? '#1C1D21' : '#FFFFFF'};
  border: 1px solid #1C1D21;
  box-sizing: border-box;
  border-radius:50%;
  padding:0;
  --antd-wave-shadow-color:none;
  &.ant-btn:hover{
    background: ${(props) => props.isOpen ? '#1C1D21' : '#FFFFFF'};
    color: ${(props) => props.isOpen ? '#FFFFFF' : '#1C1D21'};
    border-color:#1C1D21;
  }
  &.ant-btn:focus{
    background: ${(props) => props.isOpen ? '#FFFFFF' : '#1C1D21'};
    color: ${(props) => props.isOpen ? '#1C1D21' : '#FFFFFF'};
    border-color: #1C1D21;
  }
`
export const FirstTextCol = styled.div`
  max-width:48%;
  width: 517px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
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
export const SecondTextCol = styled.div`
  max-width:48%;
  width: 517px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  font-size: 18px;
  line-height: 40px;
  letter-spacing: 0.15px;
  @media only screen and (max-width:1024px){
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
