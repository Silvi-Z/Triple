import React from "react"
import { Row, Col } from "antd"
import styled from "styled-components"
import LinkedinImg from "../../assets/footericons/linkedin.png"
import FacebookImg from "../../assets/footericons/facebook-4.png"
import {
  WhatsAppOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
  FacebookOutlined,
} from "@ant-design/icons"
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
  margin-left: 17px;
  color: #ffffff;
  @media only screen and (max-width: 768px) {
    width: 220px;
    height: 15px;
    font-family: Sylfaen;
    font-size: 13px;
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
  font-family: ArialAMU;
  border-top: 0.01em solid;
  border-color: #ffffff;
  padding-top: 22px;
  color: #e8e8e8;
  display: flex;
  justify-content: space-between;
  /* @media only screen and (min-width: 768px) {
    display: none;
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
  padding-left: 7%;
  justify-content: space-around;
  @media only screen and (max-width: 1170px) {
    padding-left: 2%;
  }
  @media only screen and (max-width: 768px) {
    padding-left: 1%;
  }
  @media only screen and (max-width: 375px) {
    justify-content: space-evenly;
    padding-left: 10%;
    margin-bottom: 20px;
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
  justify-content: space-evenly;
  padding-left: 15%;
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
        <FooterNumberColumn xs={24} sm={24} md={8} lg={8} xl={8}>
          <WhatsAppOutlined style={{ fontSize: "20px", color: "white" }} />
          <PhoneOutlined style={{ fontSize: "20px", color: "white" }} />
          <i
            className="fab fa-viber"
            style={{ fontSize: "20px", color: "white" }}
          ></i>
          <FooterNumberWrap>
            <span>+374 93706010,+374 93706010</span>
          </FooterNumberWrap>
        </FooterNumberColumn>
        <FooterAdressColumn xs={24} sm={24} md={8} lg={8} xl={8}>
          <EnvironmentOutlined style={{ fontSize: "20px", color: "white" }} />
          <FooterAdressWrap>
            <span>Հր, Քոչար 44</span>
          </FooterAdressWrap>
        </FooterAdressColumn>
        <FooterFollowUsColumn xs={24} sm={24} md={8} lg={8} xl={8}>
          <FooterFollowUsWrap>
            <span>Հետևեք մեզ</span>
          </FooterFollowUsWrap>
          <LinkedinOutlined style={{ fontSize: "20px", color: "white" }} />
          <a href="https://www.facebook.com/TripleCArmenia/" target="_blank">
            <FacebookOutlined style={{ fontSize: "20px", color: "white" }} />
          </a>
        </FooterFollowUsColumn>
      </Row>
      <Row id="footersecondrow">
        <FooterCopyRightColumn lg={24}>
          <FooterCopyRightWrap>
            <span className="copyright">
              Copyright © {new Date().getFullYear()}
            </span>{" "}
            <a className="footerlinkweb">Website by AlgorithmSolutions</a>
          </FooterCopyRightWrap>
        </FooterCopyRightColumn>
      </Row>
    </React.Fragment>
  )
}

export default FooterBlack
