import styled from "styled-components"
import { Col, Button, Row } from "antd"

export const ServiceDropRow = styled(Row)`
  height: ${data => (data.open ? "auto" : "auto")};
  /* height: 120px; */
  margin-bottom: 2.2%;
  padding-right: 7%;
  padding-left: 4.5%;
  border-bottom: 1px solid;
  border-color: #d7d7d7;
  @media (min-width: 1600px) {
    padding: 0 0%;
  }
  @media only screen and (max-width: 1170px) {
    padding-left: 8.8%;
    padding-right: 9%;
  }
  @media only screen and (max-width: 375px) {
    padding-left: 0%;
    padding-right: 0%;
  }
  @media only screen and (max-width: 320px) {
    padding-left: 0%;
    padding-right: 0%;
  }
`
export const ToggleH2Styled = styled.h2`
  width: 270px;
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
  @media only screen and (max-width: 320px) {
    width: 126px;
    height: 34px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media only screen and (max-width: 375px) {
    width: 143px;
    height: 34px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`
export const HeadIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 80%;
  @media (min-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    margin-top: 30%;
  }
  @media (min-width: 375px) {
    width: 40px;
    height: 40px;
    margin-top: 10%;
  }
  @media (min-width: 320px) {
    width: 40px;
    height: 40px;
    margin-top: 10%;
  }
  @media (min-width: 1600px) {
    width: 50px;
    height: 50px;
  }
`
export const ToggleButton = styled(Button)`
  width: 60px;
  height: 60px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-top: -17%;
  color: #009db8;
  &:hover {
    .button {
      display: none;
    }
  }
`
export const SubParagStyled = styled.div`
  width: 517px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-left: 17%;
  @media (min-width: 1600px) {
    margin-left: 25%;
  }
  @media only screen and (max-width: 1170px) {
    margin-left: 13%;
  }
  @media only screen and (max-width: 375px) {
    margin-left: 12%;
    width: 260px;
    height: 74px;
    font-family: ArialAMU;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.14;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`
export const DropHeadingIconCol = styled(Col)``
export const DropHeadingParagraphCol = styled(Col)``
export const DropButtonCol = styled(Col)`
  margin-bottom: 17px;
  margin-top: 18px;
`
export const DropTextCol = styled(Col)``