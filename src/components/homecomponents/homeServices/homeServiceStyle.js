import { Typography, Row, Col, Button, InputNumber } from "antd"
import { Link } from "gatsby"
import styled from "styled-components"

export const NavLink = styled(Link)`
  text-decoration: none;
  display: flex;
`
export const NavLinkItems = styled(Link)`
  width: 250px;
  height: 180px;
  background-color: #ffffff;
`
export const H2Styled = styled.section`
  width: 155px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`
export const PStyled = styled.section`
  width: 517px;
  height: 46px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-top: 26px;
  @media only screen and (max-width: 768px) {
    width: 457px;
    height: 46px;
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
  @media (max-width: 375px) {
    width: 370px;
    height: 46px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-top: 26px;
  }
`
export const SeemoreWrapper = styled.div`
  width: 226px;
  height: 50px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
  padding: 16px 45px;
  display: flex;
  @media only screen and (max-width: 1170px) {
    padding: 17px 40px;
  }
  @media only screen and (max-width: 768px) {
    width: 208px;
    height: 56px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    text-align: center;
    padding: 22px 33px;
    display: flex;
  }
  @media (max-width: 380px) {
    margin-top: 20%;
  }
`
export const SeemoreSpan = styled.span`
  width: 125px;
  height: 16px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #009db8;
  @media only screen and (max-width: 1170px) {
    width: 125px;
  }
`
export const Seemoreimg = styled.img`
  width: 22px;
  height: 17px;
  margin-left: 16px;
`

export const IconWrapper = styled.img`
  cursor: pointer;
  width: 35px;
  height: 35px;
  margin-top: 11.6%;
  margin-left: 45%;
  @media (min-width: 1600px) {
    width: 40px;
    height: 40px;
  }
`
export const TextWrapperSmall = styled.p`
  width: 143px;
  height: 34px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  /* margin-left: 28.8%; */
  margin: auto;
  @media only screen and (max-width: 1170px) {
    margin-left: 22.8%;
  }
  @media (max-width: 380px) {
    margin-left: 10.8%;
  }
  @media (max-width: 320px) {
    margin-left: 0.5%;
    font-size: 14px;
  }
`
export const TextWrapperBig = styled.p`
  cursor: pointer;
  width: 163px;
  height: 16px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  /* margin-left: 30.3%; */
  margin: auto;
  @media only screen and (max-width: 1170px) {
    margin-left: auto;
    margin-bottom: 36px;
  }
  @media (max-width: 375px) {
    margin-left: 4.8%;
    font-size: 13px;
  }
  @media (max-width: 320px) {
    margin-left: -7.2%;
    font-size: 13px;
  }
`
export const ResponsWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    /* display: block; */
    height: 700px;
  }
  @media (max-width: 375px) {
    display: block;
    height: 600px;
  }
`
export const SeemoreColumn = styled(Col)`
  padding-left: 32%;
  @media only screen and (max-width: 1920px) {
    padding-left: 37%;
  }
  @media only screen and (max-width: 1366px) {
    padding-left: 32%;
  }
  @media only screen and (max-width: 1170px) {
    padding-left: 29.5%;
  }
  @media only screen and (max-width: 1024px) {
    padding-left: 26.5%;
  }
  @media only screen and (max-width: 768px) {
    padding-left: 21%;
  }
  @media (max-width: 375px) {
    padding-left: 0%;
  }
`
export const IconWrapperCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
`
export const IconWrapperColLast = styled(Col)`
  width: 250px;
  height: 180px;
  border-bottom: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
`
export const IconWrapperSecondLastCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-color: #d7d7d7;
  background-color: #ffffff;
`
export const IconWrapperSecondCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-right: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
`

export const ContainerRow = styled(Row)`
  margin-top: 37px;
  width: 100%;
  height: auto;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  margin: 37 auto;
`
