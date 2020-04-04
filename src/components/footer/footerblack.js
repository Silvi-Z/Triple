import React from "react"
import { Row, Col } from "antd"
import styled from "styled-components"
import CallPhoneImg from "../../assets/footericons/phone-call.png"
import LocationImg from "../../assets/footericons/location.png"
import LinkedinImg from "../../assets/footericons/linkedin.png"
import FacebookImg from "../../assets/footericons/facebook-4.png"

const FooterNumberWrap = styled.div`
  width: 238px;
  height: 15px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  margin-left: 17px;
  color: #ffffff;
  @media only screen and (max-width: 768px) {
    width: 235px;
    height: 16px;
    font-family: Sylfaen;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }
`
const FooterAdressWrap = styled.div`
  height: 16px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  margin-left: 17px;
  text-align: center;
  /* @media only screen and (max-width: 768px) {
    width: 89px;
    height: 16px;
    font-family: Sylfaen;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #009db8;
  } */
`
const FooterFollowUsWrap = styled.div`
  width: 90px;
  height: 15px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`
const FooterCopyRightWrap = styled.div`
  width: 100%;
  height: 13px;
  font-family: ArialAMU;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  border-top: 0.01em solid;
  border-color: #ffffff;
  padding-top: 22px;
  color: #e8e8e8;
  /* @media only screen and (min-width: 768px) {
    display: none;
  } */
`
const CallIconWrapper = styled.img`
  width: 20px;
  height: 20px;
  /* @media only screen and (max-width: 768px) {
    background-color: #000000;
  } */
`
const LocationIconWrapper = styled.img`
  /* @media only screen and (max-width: 768px) {
    color: #009db8;
  } */
`
const LinkdinWrapper = styled.img`
  /* @media only screen and (max-width: 768px) {
    color: #009db8;
  } */
`
const FacebookWrapper = styled.img``

const FooterNumberColumn = styled(Col)`
  display: flex;
  padding-left: 15%;
  @media only screen and (max-width: 1524px) {
    padding-left: 7%;
  }
  @media only screen and (max-width: 768px) {
    padding-left: 1%;
  }
  @media (max-width: 380px) {
    padding-left: 10%;
  }
`
const FooterAdressColumn = styled(Col)`
  display: flex;
  padding-left: 12%;
  @media only screen and (max-width: 768px) {
    padding-left: 0%;
    justify-content: center;
  }
`
const FooterFollowUsColumn = styled(Col)`
  display: flex;
  justify-content: space-around;
  padding-right: 17%;
  @media only screen and (max-width: 768px) {
    padding-right: 0%;
  }
`
const FooterCopyRightColumn = styled(Col)``

const FooterBlack = () => {
  return (
    <React.Fragment>
      <Row>
        <FooterNumberColumn xs={24} sm={24} md={8} lg={8} xl={8}>
          <CallIconWrapper src={CallPhoneImg} alt={"icon"}></CallIconWrapper>
          <FooterNumberWrap>
            <span>+374 93706010,+374 93706010</span>
          </FooterNumberWrap>
        </FooterNumberColumn>
        <FooterAdressColumn xs={24} sm={24} md={8} lg={8} xl={8}>
          <LocationIconWrapper src={LocationImg} alt={"icon"} />
          <FooterAdressWrap>
            <span>Հր, Քոչար 44</span>
          </FooterAdressWrap>
        </FooterAdressColumn>
        <FooterFollowUsColumn xs={24} sm={24} md={8} lg={8} xl={8}>
          <FooterFollowUsWrap>
            <span>Հետևեք մեզ</span>
          </FooterFollowUsWrap>
          <LinkdinWrapper src={LinkedinImg} alt={"icon"} />
          <a href="https://www.facebook.com/TripleCArmenia/" target="_blank">
            <FacebookWrapper src={FacebookImg} alt={"icon"} />
          </a>
        </FooterFollowUsColumn>
      </Row>
      <Row>
        <FooterCopyRightColumn lg={24}>
          <FooterCopyRightWrap>
            Copyright © {new Date().getFullYear()} AlgorithmSolutions
          </FooterCopyRightWrap>
        </FooterCopyRightColumn>
      </Row>
    </React.Fragment>
  )
}

export default FooterBlack
