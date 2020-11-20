import { Typography, Row, Col, Button, InputNumber } from "antd"
import { Link } from "gatsby"
import styled from "styled-components"
export const HomePageWrapper = styled.div`
  max-width:1440px;
  margin:0 auto;
  padding:50px 55px 91px 55px;
  @media only screen and (max-width: 1024px) {
    padding:50px 20px 63px 20px;
  }
`
export const ServiceTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top:90px;
  margin-bottom:40px;
  @media only screen and (max-width: 1024px){
    margin-bottom:20px;
  }
`
export const NavLink = styled(Link)`
  text-decoration: none;
  display: flex;
`
export const NavLinkItems = styled(Link)`
  background-color: #ffffff;
`
export const H2Styled = styled.section`
  font-family: ArialAMU;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  letter-spacing: 0.15px;
`
export const PStyled = styled.section`
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  color: #000000;
  margin-top: 30px;
   @media only screen and (max-width: 1024px) {
    font-size:16px;
  }
`
export const SeemoreWrapper = styled.div`
  letter-spacing: 0.15px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:0 auto;
`

export const Seemoreimg = styled.img`
  width: 22px;
  height: 17px;
  margin-left: 16px;
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
  margin-bottom:42px;
  justify-content:center;
`
// export const Roww = styled.div`
//   width:100%;
//   height:auto;
//   display:flex;
//   justify-content:center;
// `
export const Borders = styled.div`
  display: flex;
  width: 33.3%;
  height: 258px;
  border-bottom: ${props=>props.borderBottom ? ".5px solid" : "none" };
  border-top: ${props=>props.borderTop ? ".5px solid" : "none" };
  border-right: ${props=>props.borderRight ? ".5px solid" : "none" };
  border-left: ${props=>props.borderLeft ? ".5px solid" : "none" };
  border-color: #D0D0D0;
  padding:20px 25px;
  @media only screen and (max-width: 1024px){
    width:45%;
    border-bottom: none;
    border-top: none;
    border-right: none;
    border-left: none;
    padding:20px 30px;
    height:204px;
  }
  @media only screen and (max-width: 768px){
    justify-content: center;
    width:100%;
  }
`
export const ServiceNameWrapper = styled.div`
  padding: 0 51px;
  text-align: center;
  background-color:#fff;
  width:100%;
  height:100%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.15px;
  font-weight: bold;
  font-size: 18px;
  &:hover{
    border: 1px solid #00B3C7;
    color:#00B3C7;
  }
  @media only screen and (max-width: 1024px){
    padding: 0 20px;
  }
  @media only screen and (max-width: 768px){
    width:280px;
  }
`
export const IconWrapperColLast = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 180px;
  border-bottom: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
`
export const IconWrapperSecondLastCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 180px;
  border-color: #d7d7d7;
  background-color: #ffffff;
`
export const IconWrapperSecondCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 180px;
  border-right: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
`

export const ContainerRow = styled(Row)`
  display: flex;
  justify-content: center;
  // flex-direction: column;
  width: 100%;
  height: auto;
  margin: 37 auto;
`