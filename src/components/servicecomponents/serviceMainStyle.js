import styled from "styled-components"
import { Row } from "antd"
import FbBlueIcon from "../../assets/career/facebookBlueCareer.svg"
import FbBlackIcon from "../../assets/career/facebookCareer.svg"
import LinkdinBlackIcon from "../../assets/career/linkedinCareer.svg"
import LinkedinBlueIcon from "../../assets/career/linkedinBlueCareer.svg"

export const ServicePageWrapper = styled.div`
  padding:50px 118px 90px 118px;
  max-width: 1440px;
  margin: 0 auto;
  @media only screen and (max-width:1024px){
    padding:30px 20px 60px 20px;
  }
`

export const HeadingParagraphRow = styled(Row)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const H2Styled = styled.h2`
  font-family: ArialAMU;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1.15px;
  text-align: center;
  color: #000000;
  @media only screen and (max-width:1024px){
    font-size:20px;
  }
`

export const PStyled = styled.p`
  width:100%;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  line-height: 1.88;
  letter-spacing: 0.15px;
  text-align: center;
  color: #000000;
  padding:30px 0 20px 0;
  margin-bottom:0;
  @media only screen and (max-width:1024px){
    font-size:16px;
    padding:30px 0 10px 0;
  }
  @media only screen and (max-width:768px){
    padding: 30px 0 20px 0
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
