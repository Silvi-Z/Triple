import styled from "styled-components"
import { Row } from "antd"
export const HeadingParagraphRow = styled(Row)`
  padding: 0 12%;
  margin-bottom: 2.8%;
  @media (min-width: 1600px) {
    padding: 0 0%;
    margin-bottom: 2.8%;
  }
  @media only screen and (max-width: 1366px) {
    padding: 0 4%;
    margin-bottom: 2.8%;
  }
  @media only screen and (max-width: 1170px) {
    padding: 0 0%;
    margin-bottom: 2.8%;
  }
  @media only screen and (max-width: 768px) {
    padding-top: 49px;
    padding-left: 8.8%;
    padding-right: 0%;
    margin-bottom: 100px;
  }
`
export const H2Styled = styled.h2`
  width: 155px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  text-align: left;
`
export const PStyled = styled.p`
  height: 46px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 50px;
  @media only screen and (max-width: 375px) {
    width: 289px;
    height: 103px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-bottom: 200px;
  }
  @media only screen and (max-width: 320px) {
    width: 289px;
    height: 103px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-bottom: 200px;
  }
`