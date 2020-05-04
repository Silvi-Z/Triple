/*eslint-disable */
import React from "react"
import { Row, Col } from "antd"
import styled from "styled-components"
import EnvironmentImg from "../../assets/footericons/location.png"
import PhoneImg from "../../assets/footericons/brandIcons/phone (footer).svg"
import WhatsappImg from "../../assets/footericons/brandIcons/whatsapp (footer).svg"
import ViberImg from "../../assets/footericons/brandIcons/viber(footer).svg"
import TelegramImg from "../../assets/footericons/brandIcons/telegram (footer).svg"
import FacebookImg from "../../assets/footericons/brandIcons/facebook (footer).svg"
import LinkedinImg from "../../assets/footericons/brandIcons/linkedin(footer).svg"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import "../layout.css"

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
  margin-left: 16px;
  color: #ffffff;
  @media only screen and (max-width: 768px) {
    width: 220px;
    height: 15px;
    font-family: Sylfaen;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }
  @media only screen and (max-width: 375px) {
    width: 220px;
    height: 15px;
    font-family: Sylfaen;
    font-size: 15px;
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
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  margin-left: 17px;
  text-align: center;
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
  font-family: ArialAMU;
  border-top: 0.01em solid;
  border-color: #ffffff;
  padding-top: 22px;
  color: #e8e8e8;
  display: flex;
  justify-content: space-between;
`
const EnvironmentWrapper = styled.img`
  width: 14px;
  height: 20px;
`
const PhoneWrapper = styled.img`
  width: 20px;
  height: 20px;
`
const WhatsappWrapper = styled.img`
  width: 20px;
  height: 20px;
`
const ViberWrapper = styled.img`
  width: 20px;
  height: 20px;
`
const TelegramWrapper = styled.img`
  width: 20px;
  height: 20px;
`
const FacebookWrapper = styled.img`
  width: 20px;
  height: 20px;
`
const LinkedinWrapper = styled.img`
  width: 20px;
  height: 20px;
`

const FooterNumberColumn = styled(Col)`
  display: flex;
  /* padding-left: 5%; */
  justify-content: space-around;
  @media only screen and (max-width: 1170px) {
    /* padding-left: 1%; */
  }
  @media only screen and (max-width: 768px) {
    padding-left: 1%;
  }
  @media only screen and (max-width: 375px) {
    justify-content: space-evenly;
    padding-left: 5%;
    margin-bottom: 20px;
  }
`
const FooterAdressColumn = styled(Col)`
  display: flex;
  justify-content: center;
  /* padding-left: 12%; */
  @media only screen and (max-width: 768px) {
    padding-left: 0%;
    justify-content: center;
  }
`
const FooterFollowUsColumn = styled(Col)`
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  @media only screen and (max-width: 768px) {
    padding-right: 0%;
  }
  @media only screen and (max-width: 375px) {
    justify-content: space-evenly;
  }
`
const FooterCopyRightColumn = styled(Col)`
  height: 20%;
`

const FooterBlack = () => {
  return (
    <React.Fragment>
      <Row id="footerfirstrow">
        <FooterNumberColumn
          xs={24}
          sm={24}
          md={8}
          lg={{ span: 8, offset: 3 }}
          xl={{ span: 8, offset: 3 }}
          xxl={{ span: 8, offset: 2 }}
        >
          <PhoneWrapper src={PhoneImg} />
          <WhatsappWrapper src={WhatsappImg} />
          <ViberWrapper src={ViberImg} />
          <TelegramWrapper src={TelegramImg} />
          <FooterNumberWrap>
            <span>+374 93706010,+374 93706010</span>
          </FooterNumberWrap>
        </FooterNumberColumn>
        <FooterAdressColumn xs={24} sm={24} md={8} lg={6} xl={6} xxl={6}>
          <EnvironmentWrapper src={EnvironmentImg} />
          <FooterAdressWrap>
            <span>Հր, Քոչար 44</span>
          </FooterAdressWrap>
        </FooterAdressColumn>
        <FooterFollowUsColumn xs={24} sm={24} md={8} lg={6} xl={6} xxl={6}>
          <FooterFollowUsWrap>
            <span>Հետևեք մեզ</span>
          </FooterFollowUsWrap>
          <LinkedinWrapper src={LinkedinImg} />
          <a href="https://www.facebook.com/TripleCArmenia/" target="_blank">
            <FacebookWrapper src={FacebookImg} />
          </a>
        </FooterFollowUsColumn>
      </Row>
      <Row id="footersecondrow">
        <FooterCopyRightColumn lg={24} xs={24}>
          <FooterCopyRightWrap>
            <span className="copyright">
              Copyright © {new Date().getFullYear()}
            </span>{" "}
            <a className="footerlinkweb">Powered by algorithm</a>
          </FooterCopyRightWrap>
        </FooterCopyRightColumn>
      </Row>
    </React.Fragment>
  )
}

export default FooterBlack
