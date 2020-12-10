import styled from "styled-components"
import { Row } from "antd"

export const CareerPageWrapper = styled.div`
  max-width:1440px;
  margin: 0 auto;
  padding:50px 118px;
  @media (max-width: 1200px) {
    padding: 50px;
  }
  @media (max-width: 1024px) {
    padding: 50px 20px 60px 20px;
  }
`

export const CareerParagraphRow = styled(Row)`
  padding: 0 12%;
  margin-bottom: 19px;
  @media (min-width: 1200px) {
    padding: 0px 20px;
  }
  @media only screen and (max-width: 1024px) {
    padding: 0px 24px 0 24px;
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
  @media only screen and (max-width: 1024px) {
    font-size: 20px;
  }
`

export const PStyled = styled.p`
  margin-bottom:0px;
  width: 620px;
  font-family: ArialAMU;
  font-size: 18px;
  text-align: center;
  color: #000000;
  @media only screen and (max-width: 1024px) {
    width: 100%;
    font-size: 16px;
    color: #000000;
    margin-top: 49px;
  }
`