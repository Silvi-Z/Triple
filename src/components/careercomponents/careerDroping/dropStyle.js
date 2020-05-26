import { Col, Button, Row } from "antd"
import styled from "styled-components"

export const ToggleH2Styled = styled.h2`
  width: 148px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-top: 1%;
`
export const H2Styled = styled.h2`
  height: 16px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  margin-left: 5.3%;
  color: #000000;
  @media only screen and (max-width: 768px) {
    width: 211px;
    height: 16px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`
export const ToggleButton = styled(Button)`
  width: 60px;
  height: 60px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  color: #009db8;
`

export const HeadIcon = styled.img`
  width: 30px;
  height: 30px;
  @media (min-width: 1170px) {
    width: 40px;
    height: 40px;
  }
`

export const DropHeadingIconCol = styled(Col)``
export const DropHeadingTitleCol = styled(Col)``
export const DropHeadingButtonCol = styled(Col)``
export const FormWrapperCol = styled(Col)`
  padding: 0 18%;
  margin-top: -1%;
`
export const OrderList = styled.ul`
  list-style-type: none;
  margin-left: 5.3%;
  li {
    text-indent: -5px;
  }
  li:before {
    content: " - ";
    color: #009db8;
    text-indent: -5px;
  }
`
export const OrderSection = styled.li`
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media only screen and (max-width: 768px) {
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media only screen and (max-width: 375px) {
    font-family: ArialAMU;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`
export const DropCareerRow = styled(Row)`
  padding-right: "7%";
  border-bottom: 1px solid;
  border-color: #d7d7d7;
  @media only screen and (max-width: 1170px) {
    padding-left: 5%;
    padding-right: 12%;
  }
  @media only screen and (max-width: 768px) {
    padding-left: 9%;
    padding-right: 8%;
  }
  @media only screen and (max-width: 375px) {
    padding-left: 3%;
    padding-right: 12%;
  }
  @media only screen and (max-width: 320px) {
    padding-left: 0%;
    padding-right: 13%;
  }
`