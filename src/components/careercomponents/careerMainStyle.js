import styled from "styled-components"
import { Row } from "antd"

export const CareerParagraphRow = styled(Row)`
  padding: 0 12%;
  margin-bottom: 19px;
  @media (min-width: 1600px) {
    padding: 0 0%;
  }
  @media only screen and (max-width: 1024px) {
    padding: 31px 24px 0 24px;
  }
  @media only screen and (max-width: 320px) {
    padding-top: 49px;
    padding-left: 0%;
    padding-right: 0%;
  }
`
export const H1Styled = styled.h1`
  font-family: ArialAMU;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  @media only screen and (max-width: 768px){
  font-size:20px
  }
`
export const PStyled = styled.p`
  margin-bottom:0px;
  width: 620px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  @media only screen and (max-width: 768px) {
    width: 100%;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    color: #000000;
    margin-top: 49px;
  }
`