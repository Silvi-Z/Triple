import styled from "styled-components"
import { Typography, Row, Col } from "antd"
import { Link } from "gatsby"

export const NavLink = styled(Link)`
  text-decoration: none;
  display: flex;
  width: fit-content;
  margin: auto;
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
  @media only screen and (max-width: 1024px) {
    margin-top:63px;
  }
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
  margin-bottom:0;
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
  margin: 30px 0 0 0;
  @media only screen and (max-width: 1094px) {
    font-size:16px;
  }
`
export const SeemoreWrapper = styled.button`
  background-color:black;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:42px;
  letter-spacing: 1.15px;
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
    margin-bottom:0;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
`

export const ResponsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;justify-content:end;
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