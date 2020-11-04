import { Col } from "antd"
import styled from "styled-components"
import FbBlueIcon from "../../../assets/career/facebookBlueCareer.svg"
import FbBlackIcon from "../../../assets/career/facebookCareer.svg"
import LinkdinBlackIcon from "../../../assets/career/linkedinCareer.svg"
import LinkedinBlueIcon from "../../../assets/career/linkedinBlueCareer.svg"
import { FacebookShareButton, LinkedinShareButton } from "react-share"
export const ShareLabel = styled.h3`
  width: 100%;
  text-align: start !important;
  font-family: ArialAMU;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: right;
  margin-bottom:20px;
  color: #000000;
  font-size:24px;
  @media (max-width: 763px){
  font-size:20px;
  }
`
export const SharedWrapperCol = styled(Col)`
  max-width:100%;
  flex-wrap:wrap;
  display: flex;
  justify-content: end;
  margin-top: 30px;
  padding-left:20px;
  @media only screen and (max-width: 768px){
  padding-left:0;
  }
  .react-share__ShareButtonSharedWrapperCol {
    all: unset;
  }
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
   background-image: url(${FbBlackIcon});
   cursor: pointer;
`
export const FacebookShare = styled(FacebookShareButton)`
    outline:none;
    background-image:url(${FbBlackIcon});
    display: block;
    background-position: 0 0;
    background-repeat: no-repeat;
  &:hover ${FacebookIcon}{
    transition: all .3s ease;
    transform: scale(1.5);
    opacity: 0
  }
`
export const LinkdinIcon = styled.div`
  height: 32px;
  width: 32px;
  background-image: url(${LinkdinBlackIcon});
  cursor: pointer;
`
export const LinkedinShare = styled(LinkedinShareButton)`
    outline:none;
    background-image:url(${LinkdinBlackIcon});
    margin-left:19px;
    display: block;
    background-position: 0 0;
    background-repeat: no-repeat;
  &:hover ${LinkdinIcon}{
    transition: all .3s ease;
    transform: scale(1.5);
    opacity: 0
  }
`