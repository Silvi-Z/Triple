import { Row, Col } from "antd"
import styled from "styled-components"
import { AnchorLink } from "gatsby-plugin-anchor-links";

export const Link = styled(AnchorLink)`
  width:100%;
  transition: 0s;
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
export const H2Styled = styled.section`
  font-family: ArialAMU;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  letter-spacing: 1.15px;
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
export const SeemoreWrapper = styled.button`
  letter-spacing: 1.15px;
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
export const ResponsWrapper = styled.div`
  margin-bottom:42px;
  justify-content:center;
`
export const PElement = styled.p`
  margin-bottom:0;
  font-size:16px;
  line-height: 35px;
  text-align: center;
  letter-spacing: 0.15px;
  @media only screen and (max-width: 400px){
    line-height:unset
  }
`
export const ContentLink = styled(Link)`
  transition:0;
  width:100%;
`
export const InfoAboutPartners = styled.div`
  @media only screen and (min-width: 1024px){
    position: absolute;
    background: rgba(28, 29, 33, 0.95);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
    height: 100%;
    color:white;
    opacity:0;
    transition: .2s;
  }
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  letter-spacing:1.15px;
  height: 100px;
  width: 100%;
  color:black;
  opacity:1;
  border-radius: 10px;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  p{
    font-weight:normal;
    margin-bottom:0;
    margin-top:15px;
    letter-spacing:0.15px;
  }
  @media only screen and (max-width: 768px){
    font-size: 16px;
  }
`
export const ServiceNameWrapper = styled.div`
  @media only screen and (min-width: 1024px){
     position:relative;
     height:100%;
  }
  padding: 0 51px;
  text-align: center;
  background-color:#fff;
  width:100%;
  height:164px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1.15px;
  font-weight: bold;
  font-size: 18px;
  color:black;
  &:hover{
    border: 1px solid #00B3C7;
    color:#00B3C7;
  }
  @media only screen and (max-width: 1024px){
    padding: 0 20px;
    font-size:16px;
  }
  @media only screen and (max-width: 768px){
    width:100%;
    margin:0 auto;
  }
`
export const Div = styled.div`
  width:100%;
  position:relative;
  height:100%;
  @media only screen and (min-width: 1024px){
    ${ServiceNameWrapper}{
      position: absolute;
    }
    &:hover{
    &>${ServiceNameWrapper}{
      border: 1px solid rgba(28, 29, 33, 0.95);
    }
  ${InfoAboutPartners}{
      opacity:1;      
    }
   }
  }
`
export const ContentContainer = styled.div`
  display: flex;
  width: 33.3%;
  height: 258px;
  border-color: #D0D0D0;
  padding:20px 25px;
  &:nth-child(3n+1):not(:nth-child(7)), &:nth-child(3n+2):not(:nth-child(8)){
    border-right: 1px solid #D0D0D0;
    border-bottom: 1px solid #D0D0D0;
  }
  &:nth-child(3n+0):not(:nth-child(9)){
    border-bottom: 1px solid #D0D0D0;
  }
  &:nth-child(n+7):not(:nth-child(9)){
    border-right: 1px solid #D0D0D0;
  }
  @media only screen and (max-width: 1024px){
    &:nth-child(n){
      width:50%;
      border-bottom: none !important;
      border-right: none !important;
      padding:20px 30px;
      height:auto;
    }
  }
  @media only screen and (max-width: 768px){
    &:nth-child(n){
      justify-content: center;
      width:100%;
      padding:10px 0;
    }
  }
`
export const HomePageWrapper = styled.div`
  max-width:1440px;
  margin:0 auto;
  padding:50px 60px 90px 55px;
  @media only screen and (max-width: 1024px) {
    padding:0 20px 63px 20px;
  }
  ${ResponsWrapper}:nth-child(2){
    ${ContentContainer}{
    height:auto;
    }
  }
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
  justify-content: end;
  width: 100%;
  height: auto;
  margin: 37 auto;
  
`