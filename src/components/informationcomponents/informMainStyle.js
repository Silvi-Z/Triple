import styled from "styled-components"
import { Row, Col } from "antd"
import LinkedinBlueIcon from "../../assets/career/linkedinBlueCareer.svg"
import LinkdinBlackIcon from "../../assets/career/linkedinCareer.svg"
import FbBlueIcon from "../../assets/career/facebookBlueCareer.svg"
import FbBlackIcon from "../../assets/career/facebookCareer.svg"
export const InformationPageWrapper = styled.div`
  margin: 0 auto;
  max-width:1440px;
  padding:50px 118px 90px 118px;
  @media only screen and (max-width: 1400px){
    padding:50px 40px 90px 40px;
  }
  @media only screen and (max-width: 1000px){
    padding:50px 20px 60px 20px;
  }
`
export const InformationParagraphRow = styled(Row)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  `
export const H2Styled = styled.h2`
  font-family: ArialAMU;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-bottom:30px;
  @media only screen and (max-width: 770px){
    font-size:20px;
  }
`
export const PStyled = styled.p`
  line-height:25px;
  max-width: 621px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  margin-bottom: 52px;
  @media only screen and (max-width: 770px){
    font-size:16px;
  }
`
export const InformationNavRow = styled.div`
  display:flex;
  justify-content: center;
  margin-bottom: 53px;
  @media only screen and (max-width: 657px){
    flex-direction: column;
    align-items:center;
  }
`
export const InformationUsfulCol = styled.button`
  width: 286px;
  max-width: 286px;
  background-color: ${props => props.active ? "white" : "black"};
  color: ${props => props.active ? "black" : "white"};
  height: 49px;
  display:flex;
  justify-content:center;
  align-items:center;
  letter-spacing: 0.15px;
  justify-content: center;
  margin-right:30px;
  @media only screen and (max-width: 657px){
    margin-right:0;
    margin-bottom:20px;
    width:100%;
  }
  
`
export const InformationDocumentCol = styled.button`
  width: 286px;
  max-width: 286px;
  background-color: ${props => props.active ? "white" : "black"};
  color: ${props => props.active ? "black" : "white"};
  height: 49px;
  display:flex;
  justify-content:center;
  align-items:center;
  letter-spacing: 0.15px;
  @media only screen and (max-width: 657px){
    width:100%;
  }
`
export const InformSectionRow = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  ul{
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }
  a{
    color: black;
    font-size: 16px;
  }
  a:hover{
    color: #00B3C7;
  }
  h2 {
    margin-bottom: 0;
    height: auto;
  }
  @media only screen and (max-width: 770px){
    flex-direction:column;
    a{
      font-size: 14px;
    }
  }
`
export const LeftSection = styled.div`
  width: 48%;
  & ul>a{
    padding-top: 27px;
    padding-bottom: 27px;
  }
  & ul>a:first-child{
    padding-top:20px;
  }
  @media only screen and (max-width: 770px){
    width:100%;
    margin-bottom: 15px;
    & ul>a{
      padding-top: 15px;
      padding-bottom: 15px;
    }
    & ul>a:last-child{
       padding-bottom:20px
    }
   }
`
export const RightSection = styled.div`
  display:flex;
  flex-direction:column;
  width: 48%;
  & ul>a{
    padding: 17px 0;
  }
  @media only screen and (max-width: 770px){
    width:100%
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