import styled from "styled-components"
import { Typography, Row, Col } from "antd"
import Slider from "react-slick"
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

export const IconWrapper = styled.img`
    margin-bottom:0;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
`

export const ResponseWrapper = typeof window!="undefined" && window.innerWidth >= 768? styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`: styled(Slider)`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  max-height:320px;
  overflow:hidden;
  & .slick-slide{ 
    padding: 0 10px;
  }
  & .slick-track{
    height:100% !important;
    // display: flex;
  // flex-wrap: nowrap;
  }
  @media only screen and (max-width: 500px){
    max-height: 230px
  }
`
