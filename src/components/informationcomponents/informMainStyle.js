import styled from "styled-components"
import { Row, Col } from "antd"
export const InformationParagraphRow = styled(Row)`
  padding: 0 13.5%;
  margin-bottom: 2.8%;
  @media (min-width: 1200px) {
    padding: 0 19%;
  }
  @media (min-width: 1600px) {
    padding: 0 17%;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 49px;
    padding: 0 3.5%;
  }
  @media only screen and (max-width: 375px) {
    margin-bottom: 70px;
    padding: 0 3.5%;
    margin-top: 39px;
  }
  @media only screen and (max-width: 320px) {
    margin-bottom: 70px;
    padding: 0 3.5%;
    margin-top: 39px;
  }
`
export const H2Styled = styled.h2`
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
  @media only screen and (max-width: 1920px) {
    max-width: 800px;
    max-height: 90px;
    margin-left: 0%;
    margin-bottom: 30px;
  }
  @media only screen and (max-width: 768px) {
    max-width: 509px;
    max-height: 106px;
    margin-left: 0%;
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 375px) {
    width: 288px;
    height: 226px;
    font-family: ArialAMU;
  }
  @media only screen and (max-width: 320px) {
    width: 288px;
    height: 226px;
    font-family: ArialAMU;
  }
`
export const InformationNavRow = styled(Row)`
  padding: 0 18.2%;
  margin-bottom: 3%;
  @media (min-width: 1200px) {
    padding: 0 21.6%;
  }
  @media (min-width: 1600px) {
    padding: 0 29%;
  }
  @media only screen and (max-width: 1024px) {
    padding: 0 14%;
  }
  @media only screen and (max-width: 768px) {
    padding: 0 0%;
  }
`

export const InformationUsfulCol = styled(Col)`
  max-width: 232px;
  height: 50px;
  text-align: center;
  padding-top: 1.8%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: ${props => (props.open ? "#009db8" : "#ffffff")};
  margin-left: 0.7%;
  > span {
    width: 205px;
    height: 16px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${props => (props.open ? "#ffffff" : "#009db8")};
  }
  &:hover {
    background-color: #009db8;
    cursor: pointer;
    span {
      color: white;
    }
  }
  @media (min-width: 1600px) {
    padding-top: 1%;
  }
  @media (min-width: 1200px) {
    padding-top: 1.5%;
  }
  @media only screen and (max-width: 375px) {
    max-width: 290px;
    height: 50px;
    padding-top: 3.5%;
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 320px) {
    max-width: 290px;
    height: 50px;
    padding-top: 3.5%;
    margin-bottom: 10px;
  }
`
export const InformationDocumentCol = styled(Col)`
  max-width: 232px;
  height: 50px;
  text-align: center;
  padding-top: 1.8%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: ${props => (props.open ? "#009db8" : "#ffffff")};
  margin-left: 0.7%;
  > span {
    width: 214px;
    height: 16px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${props => (props.open ? "#ffffff" : "#009db8")};
  }
  &:hover {
    background-color: #009db8;
    cursor: pointer;
    span {
      color: white;
    }
  }
  @media (min-width: 1600px) {
    padding-top: 1%;
  }
  @media (min-width: 1200px) {
    padding-top: 1.5%;
  }
  @media only screen and (max-width: 375px) {
    max-width: 290px;
    height: 50px;
    padding-top: 3.5%;
  }
  @media only screen and (max-width: 320px) {
    max-width: 290px;
    height: 50px;
    padding-top: 3.5%;
  }
`
export const InformSectionRow = styled(Row)`
  padding: 0 14.5%;
  margin-bottom: 2.8%;
  @media (min-width: 1200px) {
    padding: 0 19%;
  }
  @media (min-width: 1600px) {
    padding: 0 27%;
  }
  @media only screen and (max-width: 768px) {
    padding: 0 0%;
  }
  @media only screen and (max-width: 375px) {
    padding: 0 0%;
  }
  @media only screen and (max-width: 320px) {
    padding: 0 0%;
  }
`
export const InformationNewsCol = styled(Col)`
  max-width: 232px;
  height: 50px;
  text-align: center;
  padding-top: 1.8%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: ${props =>
        props.open || props.opensecondnews === "true" ? "#009db8" : "#ffffff"};
  > span {
    width: 105px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${props =>
        props.open || props.opensecondnews === "true" ? "#ffffff" : "#009db8"};
  }
  &:hover {
    background-color: #009db8;
    cursor: pointer;
    span {
      color: white;
    }
  }
  @media (min-width: 1600px) {
    padding-top: 1%;
  }
  @media (min-width: 1200px) {
    padding-top: 1.5%;
  }
  @media only screen and (max-width: 375px) {
    max-width: 290px;
    height: 50px;
    padding-top: 3.5%;
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 320px) {
    max-width: 290px;
    height: 50px;
    padding-top: 3.5%;
    margin-bottom: 10px;
  }
`
