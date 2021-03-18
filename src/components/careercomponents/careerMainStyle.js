import styled from "styled-components"
import { Row } from "antd"

export const CareerPageWrapper = styled.div`
  max-width:1440px;
  margin: 0 auto;
  padding:30px 118px;
  @media (max-width: 1200px) {
    padding: 30px 50px;
  }
  @media (max-width: 1024px) {
    padding: 30px 20px 60px 20px;
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
  margin-bottom:30px;
  @media only screen and (max-width: 1024px) {
    font-size: 20px;
  }
`

export const PStyled = styled.p`
  background-color: white;
  padding: 10px 35px;
  border-radius: 10px;
  font-size: 14px;
  white-space: pre-wrap;
  margin-bottom:0;
  width: 100%;
  font-family: ArialAMU;
  text-align: center;
  color: #000000;
  @media only screen and (max-width: 1024px) {
    width: 100%;
    color: #000000;
    margin-top: 49px;
  }
`