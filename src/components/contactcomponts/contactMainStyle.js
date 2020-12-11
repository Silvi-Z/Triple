import styled from "styled-components"
import { Row, Col, Input } from "antd"
import { FacebookShareButton, LinkedinShareButton } from "react-share"
import FbBlackIcon from "../../assets/career/facebookCareer.svg"
import LinkdinBlackIcon from "../../assets/career/linkedinCareer.svg"
import UploadIcon from "../../assets/footericons/brandIcons/white_upload.svg"

export const H1Email = styled.h1`
  font-size:54px;
  font-style: normal;
  font-weight: bold;
  text-align: start;
  letter-spacing: 1.15px;
  color: #000000;
  border-bottom: 1px solid #D0D0D0;
  padding-bottom:30px;
  margin-right:71px;
  @media only screen and (max-width: 1200px){
    margin-right:0;
    font-size:36px;
    }
`

export const PElement = styled.p`
  font-size:18px;
  margin-bottom:40px;
  max-width: 150px;
  line-height: 30px;
`

export const H3Element = styled.h3`
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 25px;
  letter-spacing: 1.15px;
  margin-bottom:20px;
  color:#000000;
   @media only screen and (max-width: 1200px){
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
  @media only screen and (max-width: 1200px) {
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
  @media only screen and (max-width: 1200px) {
    font-size:16px
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

export const MapCol = styled(Col)`
  width:100%;
`

export const Mapiframe = styled.iframe`
  width: 100%;
  height: 465px;
  border: 0;
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

export const FormRow = styled(Row)`
  align-items:end;
  display:flex;
  justify-content:space-between;
  flex-wrap:nowrap;
  @media only screen and (max-width: 1200px) {
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

export const InputElement = styled(Input)`
  font-size:16px;
  width:100%;
  @media only screen and (max-width: 768px){
    font-size:14px 
  }
`

export const AdressColumn = styled.div`
  width:100%;
  margin-right:25px;
  @media only screen and (max-width: 1200px) {
    width:25%!important;
  }
  @media only screen and (max-width: 768px){
    width:100% !important
  }
`

export const ContactColumn = styled.div`
  width:100%;
  margin-right:20px;
  @media only screen and (max-width: 1200px) {
    width:44%!important;
  }
  @media only screen and (max-width: 768px){
    width:100% !important
  }
`

export const ShareColumn = styled.div`
  width:100%;
  margin-right:20px;
  @media only screen and (max-width: 1200px) {
    width:20%!important;
    margin-right:0;
  }
  @media only screen and (max-width: 768px){
    width:100% !important;
    margin-bottom:29px;
  }
`

export const InfoColumn = styled.div`
  @media only screen and (max-width: 1200px) {
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
  @media only screen and (max-width: 1200px) {
    width:100%;
    margin-top:19px;
    padding: 38px 60px 60px 60px;
    min-width:auto;
  }
  @media only screen and (max-width: 768px){
    padding: 38px 15px 63px 15px;
  }
`

export const SharedWrapperCol = styled(Col)`
  max-width:147px;
  flex-wrap:wrap;
  display: flex;
  // @media only screen and (max-width: 768px){
  //   max-width:100%;
  //   width:100%
  // }
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
  @media only screen and (max-width: 1200px){
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
  @media only screen and (max-width: 1200px){
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
export const Arealabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 32px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
`
export const UploadImg = styled.img`
  width: 20px;
  height: 20px;
  color: "#009db8";
  margin-top: 2px;
`
