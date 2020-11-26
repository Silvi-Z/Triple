import { Row, Col } from "antd"
import styled from "styled-components"
import { AnchorLink } from "gatsby-plugin-anchor-links";
export const HomePageWrapper = styled.div`
  max-width:1440px;
  margin:0 auto;
  padding:50px 55px 91px 55px;
  @media only screen and (max-width: 1094px) {
    padding:50px 20px 63px 20px;
    margin-top:25px;
  }
`
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
export const ResponsWrapper = styled.div`
  margin-bottom:42px;
  justify-content:center;
`
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
    width:50%;
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
    > a{ 
     color:#00B3C7;
  }
  }
  @media only screen and (max-width: 1024px){
    padding: 0 20px;
  }
  @media only screen and (max-width: 768px){
    width:100%;
    margin:0 auto;
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