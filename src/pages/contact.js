import React, { useState } from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { Typography, Row, Col, Button, InputNumber } from "antd"
import FormindIviduals from "../components/contactcomponts/formindividuals"
import FormOrganizations from "../components/contactcomponts/formorganizations"

import CallPhoneImg from "../assets/footericons/phone-call.svg"

const HeadingParagraphRow = styled(Row)`
  padding: 0 15%;
  margin-bottom: 2.8%;
  @media only screen and (max-width: 1524px) {
    padding: 0 10.5%;
  }
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
  @media only screen and (max-width: 1524px) {
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
  }
`
const HeaderNumberColumn = styled(Col)`
  height: 4.7%;
  padding-top: 2%;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  margin-top: 1.4%;

  @media only screen and (max-width: 1524px) {
    max-width: 562px;
    max-height: 54px;
    margin-left: 15%;
  }
  @media (max-width: 380px) {
    padding-left: 10%;
  }
`
const HeadingParagrCol = styled(Col)`
  @media only screen and (max-width: 1524px) {
    margin-left: 3.8%;
  }
`
const CallIconWrapper = styled.img`
  width: 20px;
  height: 20px;
  color: #000000;
  margin-top: 0.4%;
`
const ContactNumberWrap = styled.div`
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
  margin-left: 17px;
  color: #000000;
  margin-top: 0.4%;
`

const FormRow = styled(Row)`
  padding: 0 12%;
`
const FormColumn = styled(Col)`
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  padding: 1.8% 8.4%;
  @media only screen and (max-width: 1524px) {
    margin-left: 16.5%;
    max-width: 562px;
    max-height: 700px;
  }
`
const InformationNavRow = styled(Row)`
  padding: 0 16%;
  margin-bottom: 3%;
  @media only screen and (max-width: 1524px) {
    padding: 0 13.6%;
  }
`
const InformationIndividCol = styled(Col)`
  width: 256px;
  height: 50px;
  text-align: center;
  padding-top: 1.6%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
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
    color: #009db8;
  }
  &:hover {
    background-color: #009db8;
    cursor: pointer;
    span {
      color: white;
    }
  }
  @media only screen and (max-width: 1524px) {
    margin-left: 17.5%;
    max-width: 256px;
  }
`
const InformationCompCol = styled(Col)`
  width: 256px;
  height: 50px;
  text-align: center;
  padding-top: 1.4%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
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
    color: #009db8;
  }
  &:hover {
    background-color: #009db8;
    cursor: pointer;
    span {
      color: white;
    }
  }
  @media only screen and (max-width: 1524px) {
    margin-left: 1.8%;
    max-width: 256px;
  }
`
const Contact = () => {
  const [openIndivid, setopenIndivid] = useState(true)
  const [openComp, setopenComp] = useState(false)

  const ChangeOpenInvid = () => {
    setopenIndivid(true)
    setopenComp(false)
  }
  const ChangeOpenComp = () => {
    setopenIndivid(false)
    setopenComp(true)
  }

  return (
    <Layout>
      <HeadingParagraphRow>
        <HeadingParagrCol lg={{ span: 24 }}>
          <H2Styled>Կապ մեզ հետ</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերությունը պատրաստակամ է համագործակցելու ինչպես
            անհատնների,այնպես էլ կազմակերպություններ հետ։Համագործակցելու համար
            լրացրեք ձեր տվյալները համապատասխան հատվածում,կամ պարզապես զանգահարեք
            մեզ։
          </PStyled>
        </HeadingParagrCol>
      </HeadingParagraphRow>
      <InformationNavRow>
        <InformationIndividCol lg={8} offset={3} onClick={ChangeOpenInvid}>
          <span>Անհատների համար</span>
        </InformationIndividCol>
        <InformationCompCol lg={8} offset={1} onClick={ChangeOpenComp}>
          <span>Կազմակերպությունների համար</span>
        </InformationCompCol>
        <HeaderNumberColumn lg={{ span: 19 }} offset={2}>
          <CallIconWrapper src={CallPhoneImg} alt={"icon"} />
          <ContactNumberWrap>
            <span>+374 93706010,+374 93706010</span>
          </ContactNumberWrap>
        </HeaderNumberColumn>
      </InformationNavRow>
      <FormRow>
        {openIndivid ? (
          <FormColumn lg={{ span: 17 }} offset={3}>
            <FormindIviduals />
          </FormColumn>
        ) : openComp ? (
          <FormColumn lg={{ span: 17 }} offset={3}>
            <FormOrganizations />
          </FormColumn>
        ) : null}
      </FormRow>
    </Layout>
  )
}

export default Contact
