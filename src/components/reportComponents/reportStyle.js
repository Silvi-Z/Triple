import styled from "styled-components"
import { Row, Col, Button } from "antd"
import FbBlueIcon from "../../assets/career/facebookBlueCareer.svg"
import FbBlackIcon from "../../assets/career/facebookCareer.svg"
import LinkdinBlackIcon from "../../assets/career/linkedinCareer.svg"
import LinkedinBlueIcon from "../../assets/career/linkedinBlueCareer.svg"
export const ReportParagraphRow = styled(Row)`
  padding: 0 12.5%;
  margin-bottom: 2.8%;
  @media only screen and (max-width: 1920px) {
    padding: 0 13.5%;
    margin-bottom: 0.8%;
  }
  @media only screen and (max-width: 1600px) {
    margin-top: 49px;
    padding: 0 12.5%;
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
  width: 439px;
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
  @media only screen and (max-width: 375px) {
    width: 250px;
  }
`
export const H3Styled = styled.h2`
  width: 439px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  span {
    color: #009db8;
    font-family: ArialAMU;
    font-size: 18px;
    font-weight: normal;
  }
  @media only screen and (max-width: 375px) {
    width: 118px;
    height: 73px;
    font-family: ArialAMU;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media only screen and (max-width: 320px) {
    width: 118px;
    height: 73px;
    font-family: ArialAMU;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
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
    max-width: 900px;
    max-height: 106px;
    margin-left: 0%;
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 768px) {
    max-width: 509px;
    max-height: 106px;
    margin-left: 0%;
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 375px) {
    width: 260px;
    height: 226px;
    font-size: 15px;
    font-family: ArialAMU;
    margin-bottom: 60px;
  }
  @media only screen and (max-width: 320px) {
    width: 260px;
    height: 226px;
    font-size: 15px;
    font-family: ArialAMU;
  }
  
`
export const HeadIcon = styled.img`
  width: 35px;
  height: 35px;
`
export const ToggleButton = styled(Button)`
  width: 60px;
  height: 60px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  color: #009db8;
  margin-top: -16%;
`
export const ReportDropRow = styled(Row)``
export const ReportFormRow = styled(Row)``
export const H3StyledForm = styled.h3`
  width: 239px;
  height: 16px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`

export const SharedWrapperCol = styled(Col)`
  padding: 0 1%;
  display: flex;
  justify-content: end;
  margin-top: 2%;
  .react-share__ShareButton {
    all: unset;
  }
  /* @media (min-width: 375px) {
    a {
      display: contents;
      color: #da4567;
    }
  } */
`
export const FaceLink = styled.a`
  color: black;
  font-size: 32px;
  margin-top: -4%;
  &:hover {
    cursor: pointer;
    color: #009db8;
  }
`
export const LinkedinLink = styled.a`
  color: black;
  font-size: 32px;
  margin-top: -4%;
  cursor: pointer;
  &:hover {
    color: #009db8;
  }
`
export const FacebookIcon = styled.div`
  height: 32px;
  width: 32px;
  margin-left: 19px;
  background-image: url(${FbBlackIcon});
  cursor: pointer;
  &:hover {
    background-image: url(${FbBlueIcon});
  }
`
export const LinkdinIcon = styled.div`
  height: 32px;
  width: 32px;
  margin-left: 19px;
  background-image: url(${LinkdinBlackIcon});
  cursor: pointer;
  &:hover {
    background-image: url(${LinkedinBlueIcon});
  }
`

export const ShareLabel = styled.h3`
  width: 83px;
  height: 15px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: right;
  margin-top: -5px;
  color: #000000;
`
