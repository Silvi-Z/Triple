import styled from "styled-components"
import { Row } from "antd"

export const CareerParagraphRow = styled(Row)`
  padding: 0 12%;
  margin-bottom: 3.8%;
  @media (min-width: 1600px) {
    padding: 0 0%;
    margin-bottom: 2.8%;
  }
  @media only screen and (max-width: 1024px) {
    padding-top: 49px;
    padding-left: 8.8%;
    padding-right: 9%;
  }
  @media only screen and (max-width: 320px) {
    padding-top: 49px;
    padding-left: 0%;
    padding-right: 0%;
  }
`
export const H1Styled = styled.h1`
  width: 244px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`
export const PStyled = styled.p`
  width: 769px;
  height: 76px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media only screen and (max-width: 768px) {
    width: 530px;
    height: 136px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-top: 49px;
  }
  @media only screen and (max-width: 375px) {
    width: 288px;
    height: 286px;
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
  @media only screen and (max-width: 320px) {
    width: 288px;
    height: 286px;
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
`