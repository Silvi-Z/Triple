import React from "react"
import { Row, Col } from "antd"
import styled from "styled-components"
import {
  EnvironmentOutlined,
  PhoneOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons"

const FooterNumberWrap = styled.div`
  width: 122px;
  height: 13px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #009db8;
  margin-left: 9px;
`
const FooterAdressWrap = styled.div`
  width: 93px;
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
  margin-left: 9px;
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
  color: #000000;
`
const FooterLangWrap = styled.div`
  width: 25px;
  height: 14px;
  font-family: ArialAMU;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  margin-left: 39px;
`
const FooterNumberColumn = styled(Col)`
  display: flex;
  padding-left: 0%;
  justify-content: center;
  margin-top: 30px;
`
const FooterAdressColumn = styled(Col)`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`
const FooterFollowUsColumn = styled(Col)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`
const FooterԼangColumn = styled(Col)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-left: -20px;
`
const FooterBlack = () => {
  return (
    <React.Fragment>
      <Row>
        <FooterAdressColumn xs={24} sm={24} md={24}>
          <EnvironmentOutlined />
          <FooterAdressWrap>
            <span>Հր, Քոչար 44</span>
          </FooterAdressWrap>
        </FooterAdressColumn>
        <FooterNumberColumn xs={24} sm={24} md={24}>
          <PhoneOutlined />
          <FooterNumberWrap>
            <span> 374 93 00 00 00</span>
          </FooterNumberWrap>
        </FooterNumberColumn>
        <FooterFollowUsColumn xs={24} sm={24} md={24}>
          <FooterFollowUsWrap>
            <span>Հետևեք մեզ</span>
          </FooterFollowUsWrap>
          <a href="https://www.facebook.com/TripleCArmenia/" target="_blank">
            <FacebookOutlined style={{ marginLeft: "9px" }} />
          </a>
          <a>
            <LinkedinOutlined style={{ marginLeft: "9px" }} />
          </a>
        </FooterFollowUsColumn>
        <FooterԼangColumn xs={24} sm={24} md={24}>
          <FooterLangWrap>
            <span>Հայ</span>
          </FooterLangWrap>
          <FooterLangWrap>
            <span style={{ color: "#009db8" }}>Eng</span>
          </FooterLangWrap>
          <FooterLangWrap>
            <span style={{ color: "#009db8" }}>Рус</span>
          </FooterLangWrap>
        </FooterԼangColumn>
      </Row>
    </React.Fragment>
  )
}

export default FooterBlack
