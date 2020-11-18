import styled from "styled-components"
import { Typography, Row, Col } from "antd"
import { Link } from "gatsby"

export const NavLink = styled(Link)`
  text-decoration: none;
  display: flex;
  @media (max-width: 375px) {
    margin-top: auto;
  }
`
export const PartnerspHeadingColumn = styled.div`
  width:100%;
  margin-top: 78px;
  margin-bottom: 40px;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
`
export const H2Styled = styled.h2`
  font-family: ArialAMU;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
`
export const PStyled = styled.p`
  max-width: 595px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 25px;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  margin: 26px 0 0 0;
  @media only screen and (max-width: 1094px) {
    font-size:16px;
  }
`
export const SeemoreWrapper = styled.div`
  background-color:black;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:42px;
  letter-spacing: 0.15px;
`
export const SeemoreSpan = styled.span`
  width: 162px;
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
  box-shadow: none;
  @media only screen and (max-width: 1170px) {
    width: 162px;
  }
  @media only screen and (max-width: 768px) {
    width: 187px;
    height: 50px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    text-align: center;
    padding: 15px 22px;
    display: flex;
    box-shadow: none;
  }
  @media (max-width: 380px) {
    padding: 19px 16px;
    box-shadow: none;
  }
`
export const PartnersLogosFirstRow = styled(Row)`
  width: 100%;
  height: 100%;
`
export const Seemoreimg = styled.img`
  width: 22px;
  height: 17px;
  margin-left: 20px;
  @media only screen and (max-width: 768px) {
    margin-left: 0px;
    margin-top: 8%;
  }
  @media (max-width: 380px) {
    margin-bottom: 0px;
    margin-top: 23px;
  }
`
export const IconWrapper = styled.img`
    margin-bottom:0
`

export const ResponsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
export const IconWrapperCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
  text-align: center;
`
export const IconWrapperColLast = styled(Col)`
  width: 250px;
  height: 180px;
  border-bottom: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
  text-align: center;
`
export const IconWrapperSecondLastCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-color: #d7d7d7;
  background-color: #ffffff;
  text-align: center;
`
export const IconWrapperSecondCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-right: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
  text-align: center;
`
export const ContainerRow = styled(Row)`
  margin-top: 37px;
  width: 100%;
  height: auto;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  margin: 37 auto;
`