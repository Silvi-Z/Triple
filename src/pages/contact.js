import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { Typography, Row, Col, Button, InputNumber } from "antd"
import FormindIviduals from "../components/formindividuals"
import FormOrganizations from "../components/formorganizations"

import CallPhoneImg from "../assets/footericons/phone-call.svg"

const HeadingParagraphRow = styled(Row)`
  padding: 0 12%;
  margin-bottom: 2.8%;
`
const H2Styled = styled.h2`
  width: 119px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`
const PStyled = styled.p`
  width: 768px;
  height: 76px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`
const HeaderNumberColumn = styled(Col)`
  height: 4.7%;
  padding-top: 2%;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  /* @media only screen and (max-width: 768px) {
    padding-left: 0%;
  }
  @media (max-width: 380px) {
    padding-left: 10%;
  } */
`
const CallIconWrapper = styled.img`
  width: 20px;
  height: 20px;
  color: #000000;
`
const FooterNumberWrap = styled.div`
  width: 235px;
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
  color: #000000;
`

const FormRow = styled(Row)`
  padding: 0 12%;
`
const FormColumn = styled(Col)`
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  padding: 4.9% 6.2%;
`
const H2form = styled.h2`
  width: 278px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`

const Contact = () => {
  return (
    <Layout>
      <HeadingParagraphRow>
        <Col lg={{ span: 24 }}>
          <H2Styled>Կապ մեզ հետ</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերությունը պատրաստակամ է համագործակցելու ինչպես
            անհատնների,այնպես էլ կազմակերպություններ հետ։Համագործակցելու համար
            լրացրեք ձեր տվյալները համապատասխան հատվածում,կամ պարզապես զանգահարեք
            մեզ։
          </PStyled>
        </Col>
        <HeaderNumberColumn lg={{ span: 24 }}>
          <CallIconWrapper src={CallPhoneImg} alt={"icon"}></CallIconWrapper>
          <FooterNumberWrap>+374 93706010,+374 93706010</FooterNumberWrap>
        </HeaderNumberColumn>
      </HeadingParagraphRow>
      <FormRow>
        <FormColumn lg={11}>
          <H2form>Անհատների համար</H2form>
          <FormindIviduals />
        </FormColumn>
        <FormColumn lg={11} offset={2}>
          <H2form>Կազմակերպությունների համար</H2form>
          <FormOrganizations />
        </FormColumn>
      </FormRow>
    </Layout>
  )
}

export default Contact
