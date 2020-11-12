import styled from "styled-components"
import { Row, Col, Input } from "antd"
import UploadIcon from "../../assets/footericons/brandIcons/white_upload.svg"
import FbBlueIcon from "../../assets/career/facebookBlueCareer.svg"
import FbBlackIcon from "../../assets/career/facebookCareer.svg"
import LinkdinBlackIcon from "../../assets/career/linkedinCareer.svg"
import LinkedinBlueIcon from "../../assets/career/linkedinBlueCareer.svg"
import { FacebookShareButton, LinkedinShareButton } from "react-share"


export const H1Email = styled.h1`
  font-size:54px;
  font-style: normal;
  font-weight: bold;
  text-align: start;
  letter-spacing: 0.15px;
  color: #000000;
  border-bottom: 1px solid #D0D0D0;
  padding-bottom:30px;
  margin-right:71px;
  }
  @media only screen and (max-width: 1017px){
    font-size:47px;
  }
  @media only screen and (max-width: 967px){
    margin-right:55px;
    font-size:39px;
  }
  @media only screen and (max-width: 896px){
    margin-right:15px;
    font-size:36px;
  }
  @media only screen and (max-width: 771px){
    margin-right:0;
    }
  @media only screen and (max-width: 549px){
    margin-bottom:40px;
  }
  @media only screen and (max-width: 300px){
    font-size:33px;
  }
`
export const PElement = styled.p`
  font-size:18px;
  margin-bottom:40px;
`
export const H3Element = styled.h3`
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 25px;
  letter-spacing: 0.15px;
  margin-bottom:20px;
  color:#000000;
   @media only screen and (max-width: 771px){
    font-size:20px;
  }
`
export const ParagraphRow = styled(Row)`
  margin-bottom: 50px;
  justify-content:center;
`
export const H2Styled = styled.h2`
  margin-bottom:30px;
  font-family: ArialAMU;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media only screen and (max-width: 771px) {
    font-size:20px
  }
`
export const PStyled = styled.p`
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
  margin-bottom:0;
  @media only screen and (max-width: 771px) {
    font-size:16px
  }
`
export const NumberCol = styled(Col)`
  max-width: 602px;
  max-height: 55px;
  padding-top: 2%;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  margin-top: 1.4%;
  @media (min-width: 1600px) {
    max-width: 618px;
    padding-top: 1.3%;
    margin-left: 18.4%;
  }
  @media only screen and (max-width: 1170px) {
    max-width: 602px;
    max-height: 54px;
    margin-left: 15%;
  }
  @media only screen and (max-width: 771px) {
    max-width: 562px;
    max-height: 54px;
    margin-left: 15%;
  }
  @media (max-width: 375px) {
    max-width: 290px;
    max-height: 54px;
    margin-left: 2%;
    padding-top: 5%;
  }
  @media (max-width: 320px) {
    max-width: 290px;
    max-height: 54px;
    margin-left: -2%;
    padding-top: 5%;
  }
`
export const AdressMapCol = styled(Col)`
  margin:0;
  width: 100%;
  max-height: 465px;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  display: flex;
  justify-content: center;
`
export const AddressSpan = styled.span`
  width: 142px;
  height: 16px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;

  @media only screen and (max-width: 375px) {
    width: 142px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
  }
  @media only screen and (max-width: 320px) {
    width: 235px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
    a {
      font-size: 12px;
      color: #009db8;
      font-family: ArialAMU;
    }
  }
`
export const ContactAdressWrap = styled(Col)`
  height: 40px;
  display: flex;
  justify-content: center;
  padding-top: 2%;
  @media only screen and (max-width: 1170px) {
    height: 40px;
    font-family: ArialAMU;
    font-size: 15px;
    padding-top: 2.5%;
  }
  @media only screen and (max-width: 375px) {
    width: 290px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
  }
  @media only screen and (max-width: 320px) {
    width: 290px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
  }
`
export const MapCol = styled(Col)`
  width:100%;
`
export const Mapiframe = styled.iframe`
  width: 100%;
  height: 465px;
  border: 0;
`
export const EnvironmentWrapper = styled.img`
  width: 18px;
  height: 18px;
  margin-bottom: 0%;
`
export const HeadingParagrCol = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left:0;
    width:100%;
    max-width:100%;
    flex: 0 0 100%;
`
export const CallIconWrapper = styled.img`
  width: 20px;
  height: 20px;
  color: #000000;
  margin-top: 0.4%;
`
export const ContactNumberWrap = styled.div`
  width: 240px;
  height: 15px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  margin-left: 11px;
  color: #000000;
  margin-top: 0.4%;
  @media only screen and (max-width: 375px) {
    width: 235px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
  }
  @media only screen and (max-width: 320px) {
    width: 235px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
  }
`

export const FormRow = styled(Row)`
  align-items:end;
  display:flex;
  justify-content:space-between;
  flex-wrap:nowrap;
  @media only screen and (max-width: 771px) {
    flex-direction: column;
  }
`
export const UploadOutlinedSpan = styled.span`
  top: 17px;
  font-size:16px;
  @media only screen and (max-width: 768px){
    font-size:14px 
  }
`
export const UploadOutlined = styled.div`
  vertical-align:bottom;
  height: 20px;
  width: 20px;
  background-image:url(${UploadIcon})
`
export const InputWrapper = styled.div`
  position: relative;
  .ant-form-item-label {
    position: absolute;
    transition: 0.2s;
  }
`
export const LabelItem = styled.label`
`
export const InputElement = styled(Input)`
  font-size:16px;
  @media only screen and (max-width: 768px){
    font-size:14px 
  }
`
export const AdressColumn = styled.div`
  width:100%;
  margin-right:25px;
  @media only screen and (max-width: 771px) {
    width:25%!important;
  }
  @media only screen and (max-width: 660px){
    width:35% !important
  }
  @media only screen and (max-width: 549px){
    width:100% !important
  }
`
export const ContactColumn = styled.div`
  width:100%;
  margin-right:20px;
  @media only screen and (max-width: 771px) {
    width:44%!important;
  }
  @media only screen and (max-width: 660px){
    width:56% !important
  }
  @media only screen and (max-width: 549px){
    width:100% !important
  }
`

export const ShareColumn = styled.div`
  width:100%;
  margin-right:20px;
  @media only screen and (max-width: 771px) {
    width:19%!important;
  }
  @media only screen and (max-width: 660px){
    width:45% !important;
    margin-bottom:29px;
  }
  @media only screen and (max-width: 549px){
    width:100% !important
  }
`

export const InfoColumn = styled.div`
  @media only screen and (max-width: 771px) {
    width:100%;
  }
`
export const FormColumn = styled.div`
  flex:1;
  min-width:506px;
  height: auto;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #000000;
  color:white;
  padding:38px 62px 61px 60px ;
  @media only screen and (max-width: 880px){
    min-width: 444px;
    padding:38px 30px;
  }
  @media only screen and (max-width: 771px) {
    width:100%;
    margin-top:19px;
    padding: 38px 60px 60px 60px;
  }
  @media only screen and (max-width: 771px){
    min-width:auto;
  }
  @media only screen and (max-width: 549px){
    padding:38px 36px 61px 36px ;
  }
  @media only screen and (max-width: 384px){
    padding: 38px 15px 24px 15px;
  }
`
export const ContactNavRow = styled(Row)`
  padding: 0 20%;
  margin-bottom: 3%;
  @media (min-width: 1600px) {
    padding: 0 0%;
    margin-bottom: 3%;
  }
  @media only screen and (max-width: 1170px) {
    padding: 0 13.6%;
  }
  @media only screen and (max-width: 1024px) {
    padding: 0 10.6%;
  }
  @media only screen and (max-width: 771px) {
    padding: 0 0%;
  }
  @media only screen and (max-width: 320px) {
    padding: 0 0%;
  }
`
export const IndividCol = styled(Col)`
  max-width: 294px;
  height: 50px;
  text-align: center;
  padding-top: 1.6%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: ${props => (props.open ? "#009db8" : "#ffffff")};
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
    padding-top: 0.9%;
  }
  @media only screen and (max-width: 1170px) {
    margin-left: 15%;
    max-width: 294px;
  }
  @media only screen and (max-width: 375px) {
    margin-left: 2%;
    max-width: 290px;
    padding-top: 3.6%;
    margin-bottom: 5%;
    > span {
      width: 143px;
      height: 15px;
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
  }
  @media only screen and (max-width: 320px) {
    margin-left: 2%;
    max-width: 390px;
    padding-top: 3.6%;
    margin-bottom: 5%;
    > span {
      width: 143px;
      height: 15px;
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
  }
`
export const CompanyCol = styled(Col)`
  max-width: 294px;
  height: 50px;
  text-align: center;
  padding-top: 1.4%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: ${props => (props.open ? "#009db8" : "#ffffff")};
  margin-left: 1.6%;
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
    padding-top: 0.9%;
  }
  @media only screen and (max-width: 1170px) {
    margin-left: 1.5%;
    max-width: 294px;
  }
  @media only screen and (max-width: 1024px) {
    margin-left: 1.5%;
    max-width: 294px;
  }
  @media only screen and (max-width: 771px) {
    margin-left: 2%;
    max-width: 294px;
  }
  @media only screen and (max-width: 375px) {
    margin-left: 2%;
    max-width: 290px;
    padding-top: 3.6%;
    margin-bottom: 5%;
    > span {
      width: 143px;
      height: 15px;
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
  }
  @media only screen and (max-width: 320px) {
    margin-left: 2%;
    max-width: 290px;
    padding-top: 3.6%;
    margin-bottom: 5%;
    > span {
      width: 143px;
      height: 15px;
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
  }
`
//share button container
export const SharedWrapperCol = styled(Col)`
  max-width:145px;
  flex-wrap:wrap;
  display: flex;
  @media only screen and (max-width: 1100px){
  margin-top: 0;
  }
`
export const ShareLabel = styled.h3`
  width: 83px;
  height: 24px;
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

export const FacebookIcon = styled.div`
  height: 32px;
  width: 32px;
  background-image: url(${FbBlackIcon});
  cursor: pointer;
  @media only screen and (max-width: 1100px){
    margin-bottom: 12px
  }
`
export const FacebookShare = styled(FacebookShareButton)`
    outline:none;
    background-image:url(${FbBlackIcon});
    display: block;
    background-position: 0 0;
    background-repeat: no-repeat;
    &:hover ${FacebookIcon} {
    transition: all .3s ease;
    transform: scale(1.5);
    opacity: 0
  }
`

export const InfoWrapper = styled.div`
  width: 100%;
`

export const LinkdinIcon = styled.div`
  height: 32px;
  width: 32px;
  background-image: url(${LinkdinBlackIcon});
  cursor: pointer;
  @media only screen and (max-width: 1100px){
    margin-bottom: 12px
  }
`

export const LinkedinShare = styled(LinkedinShareButton)`
    outline:none;
    background-image:url(${LinkdinBlackIcon});
    margin-left:15px;
    display: block;
    background-position: 0 0;
    background-repeat: no-repeat;
    &:hover ${LinkdinIcon}{
    transition: all .3s ease;
    transform: scale(1.5);
    opacity: 0
  }
`
