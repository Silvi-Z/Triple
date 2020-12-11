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
    font-family: ArialAMU;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }
  @media only screen and (max-width: 416px) {
    width: 100%;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    margin-left:0;
  }
`
const FooterAdressSpan = styled.span`
  min-width:100px;
`
const FooterAdressWrap = styled.div`
  display:flex;
  flex-wrap:nowrap;
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
  min-width:100px;
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
  @media only screen and (max-width: 850px){
    order:3
  }
`
const FooterCopyRightWrap = styled.div`
  width: 100%;
  font-family: ArialAMU;
  border-top: 0.01em solid;
  border-color: #ffffff;
  padding:0 20px;
  padding-top: 22px;
  color: #e8e8e8;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 850px){
  flex-wrap:wrap;
  }
`
const EnvironmentWrapper = styled.img`
  width: 16px;
  height: 22px;
`
const PhoneWrapper = styled.img`
  width: 22px;
  height: 22px;
  margin-left:0;
`
const WhatsappWrapper = styled.img`
  width: 22px;
  height: 22px;
`
const ViberWrapper = styled.img`
  width: 20px;
  height: 21px;
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
  justify-content: center;
  margin-left:0;
  &>*{
  margin-left:15px;
  }
  @media only screen and (max-width: 1170px) {
    justify-content: space-between;
    margin-left:0;
  }
  @media only screen and (max-width: 850px){
  justify-content:center;
  flex-wrap:wrap;
  }
  @media only screen and (max-width: 768px) {
    padding-left: 1%;
    margin-left:0;
  }
  @media only screen and (max-width: 438px){
    padding-left:0;
    }

  @media only screen and (max-width: 400px) {
    justify-content: space-evenly;
    margin-bottom: 40px;
  }
`
const FooterAdressColumn = styled(Col)`
  display: flex;
  justify-content: center;
  /* padding-left: 12%; */
  @media only screen and (max-width: 850px){
    flex-wrap:wrap;
  }
  @media only screen and (max-width: 768px) {
    padding-left: 0%;
    justify-content: center;
  }
`
const FooterFollowUsColumn = styled(Col)`
  display: flex;
  justify-content: center;
  &>*{
  margin-left:8px;
  }
  @media only screen and (max-width: 850px){
  justify-content: space-between;
  flex-wrap:wrap;
  justify-content:center;
  }
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

const FooterBlack = ({ langtext }) => {
  return (
    <React.Fragment>
      <Row id="footerfirstrow">
        <FooterNumberColumn
          xs={24}
          sm={9}
          md={12}
          lg={{ span: 12, offset: 2 }}
          xl={{ span: 11, offset: 0 }}
          xxl={{ span: 12, offset: 0 }}
        >
          <PhoneWrapper src={PhoneImg} />
          <WhatsappWrapper src={WhatsappImg} />
          <ViberWrapper src={ViberImg} />
          <TelegramWrapper src={TelegramImg} />
          <FooterNumberWrap>
            <span>+374 98553533,+374 60407010</span>
          </FooterNumberWrap>
        </FooterNumberColumn>
        <FooterAdressColumn
            xs={3}
            sm={3}
            md={4}
            lg={6}
            xl={4}
            xxl={6}>
          <EnvironmentWrapper src={EnvironmentImg} />
          <FooterAdressWrap>
            {/* <span>Հր, Քոչար 44</span> */}
            <FooterAdressSpan>{langtext !== undefined ? langtext.footer.address : null}</FooterAdressSpan>
          </FooterAdressWrap>
        </FooterAdressColumn>
        <FooterFollowUsColumn
            xs={6}
            sm={5}
            md={5}
            lg={6}
            xl={6}
            xxl={6}>
          <FooterFollowUsWrap>
            {/* <span>Հետևեք մեզ</span> */}
            <span>{langtext !== undefined ? langtext.footer.follow : null}</span>
          </FooterFollowUsWrap>
          <a
            href="https://www.linkedin.com/company/triple-consulting/"
            target="_blank"
            title="triple-c.algorithm.am"
            style={{order:1}}
          >
            <LinkedinWrapper src={LinkedinImg} />
          </a>
          <a
            href="https://www.facebook.com/TripleCArmenia/"
            target="_blank"
            title="triple-c.algorithm.am"
            style={{order:2}}
          >
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
            <a href="https://algorithm.am/" className="footerlinkweb" target="_blank">Powered by AlgorithmSolutions</a>
          </FooterCopyRightWrap>
        </FooterCopyRightColumn>
      </Row>
    </React.Fragment>
  )
}

export default FooterBlack
