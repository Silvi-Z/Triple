import React, { useState } from "react"
import { Typography, Row, Col, Button, InputNumber } from "antd"
import { Link } from "gatsby"
import styled from "styled-components"
// import * as Yup from 'yup';
import { apiHelper } from "../../helpers/apiHelper"
import CalcImg from "../../assets/homeImages/icons/calculator.svg"
import TaxImg from "../../assets/homeImages/icons/tax.svg"
import AuditImg from "../../assets/homeImages/icons/audit.svg"
import ClientImg from "../../assets/homeImages/icons/client.svg"
import BrowserImg from "../../assets/homeImages/icons/browser.svg"
import UserImg from "../../assets/homeImages/icons/user.svg"
import LawImg from "../../assets/homeImages/icons/law.svg"
import TeamImg from "../../assets/homeImages/icons/teamwork.svg"
import RightArrowImg from "../../assets/homeImages/right-arrow.png"

const NavLink = styled(Link)`
  text-decoration: none;
  display: flex;
`

const H2Styled = styled.section`
  width: 155px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`
const PStyled = styled.section`
  width: 517px;
  height: 46px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-top: 26px;
  @media only screen and (max-width: 768px) {
    width: 457px;
    height: 46px;
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
  @media (max-width: 375px) {
    width: 370px;
    height: 46px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-top: 26px;
  }
`
const SeemoreWrapper = styled.div`
  width: 226px;
  height: 50px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
  padding: 16px 45px;
  display: flex;

  @media only screen and (max-width: 1170px) {
    padding: 17px 40px;
  }

  @media only screen and (max-width: 768px) {
    width: 208px;
    height: 56px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    text-align: center;
    padding: 22px 33px;
    display: flex;
  }
  @media (max-width: 380px) {
    margin-top: 20%;
  }
`
const SeemoreSpan = styled.span`
  width: 125px;
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
  @media only screen and (max-width: 1170px) {
    width: 125px;
  }
`
const Seemoreimg = styled.img`
  width: 22px;
  height: 17px;
  margin-left: 16px;
`

const IconWrapper = styled.img`
  width: 35px;
  height: 35px;
  margin-top: 18.6%;
  margin-left: 45%;
`
const TextWrapperSmall = styled.p`
  width: 143px;
  height: 34px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  /* margin-left: 28.8%; */
  margin: auto;
  @media only screen and (max-width: 1170px) {
    margin-left: 22.8%;
  }
  @media (max-width: 380px) {
    margin-left: 10.8%;
  }
  @media (max-width: 320px) {
    margin-left: 0.5%;
    font-size: 14px;
  }
`
const TextWrapperBig = styled.p`
  width: 163px;
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
  /* margin-left: 30.3%; */
  margin: auto;
  @media only screen and (max-width: 1170px) {
    margin-left: auto;
    margin-bottom: 36px;
  }
  @media (max-width: 375px) {
    margin-left: 4.8%;
    font-size: 13px;
  }
  @media (max-width: 320px) {
    margin-left: -7.2%;
    font-size: 13px;
  }
`
const ResponsWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    /* display: block; */
    height: 700px;
  }
  @media (max-width: 375px) {
    display: block;
    height: 600px;
  }
`
const SeemoreColumn = styled(Col)`
  padding-left: 32%;

  @media only screen and (max-width: 1170px) {
    padding-left: 29.5%;
  }
  @media only screen and (max-width: 1024px) {
    padding-left: 26.5%;
  }
  @media only screen and (max-width: 768px) {
    padding-left: 21%;
  }
  @media (max-width: 375px) {
    padding-left: 0%;
  }
`
const IconWrapperCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
`
const IconWrapperColLast = styled(Col)`
  width: 250px;
  height: 180px;
  border-bottom: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
`
const IconWrapperSecondLastCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-color: #d7d7d7;
  background-color: #ffffff;
`
const IconWrapperSecondCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-right: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
`

const ContainerRow = styled(Row)`
  margin-top: 37px;
  width: 100%;
  height: auto;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  margin: 37 auto;
`

const Homeservices = () => {
  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={24} xs={24}>
          <H2Styled>Ծառայություններ</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերությունն բոլոր հիմնական ծառայությունները՛
            կապված հաշվախահության և աւդիտի հետ։
          </PStyled>
        </Col>
        <SeemoreColumn ls={12} sm={24} md={12} lg={12}>
          <SeemoreWrapper>
            <NavLink to="/services/">
              <SeemoreSpan>Տեսնել ավելին</SeemoreSpan>
              <Seemoreimg src={RightArrowImg} alt={"icon"}></Seemoreimg>
            </NavLink>
          </SeemoreWrapper>
        </SeemoreColumn>
      </Row>
      <ResponsWrapper>
        <ContainerRow>
          <Col span={24}>
            <Row style={{ width: "100%", height: "100%" }}>
              <IconWrapperCol lg={6} md={12} xl={6} sm={12} xs={12}>
                <IconWrapper src={CalcImg} alt={"icon"}></IconWrapper>
                <TextWrapperBig>Հաշվապահական հաշվառում</TextWrapperBig>
              </IconWrapperCol>
              <IconWrapperCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <IconWrapper src={TaxImg} alt={"icon"}></IconWrapper>
                <TextWrapperBig>Հարկային հաշվառում</TextWrapperBig>
              </IconWrapperCol>
              <IconWrapperCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <IconWrapper src={AuditImg} alt={"icon"}></IconWrapper>
                <TextWrapperBig>Հարկային աուդիտ</TextWrapperBig>
              </IconWrapperCol>
              <IconWrapperColLast lg={6} xl={6} sm={12} md={12} xs={12}>
                <IconWrapper src={ClientImg} alt={"icon"}></IconWrapper>
                <TextWrapperBig>Խորհրդատվություն</TextWrapperBig>
              </IconWrapperColLast>
            </Row>
          </Col>
          <Col span={24}>
            <Row style={{ width: "100%", height: "100%" }}>
              <IconWrapperSecondCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <IconWrapper src={BrowserImg} alt={"icon"}></IconWrapper>
                <TextWrapperBig>Կազմակերպության գրանցում</TextWrapperBig>
              </IconWrapperSecondCol>
              <IconWrapperSecondCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <IconWrapper src={UserImg} alt={"icon"}></IconWrapper>
                <TextWrapperBig>Ֆիզիկական անձանց</TextWrapperBig>
              </IconWrapperSecondCol>
              <IconWrapperSecondCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <IconWrapper src={LawImg} alt={"icon"}></IconWrapper>
                <TextWrapperBig>Մաքսային գոծարքներ</TextWrapperBig>
              </IconWrapperSecondCol>
              <IconWrapperSecondLastCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <IconWrapper src={TeamImg} alt={"icon"}></IconWrapper>
                <TextWrapperBig>Կադրային աշխատանքի վարում</TextWrapperBig>
              </IconWrapperSecondLastCol>
            </Row>
          </Col>
        </ContainerRow>
      </ResponsWrapper>
    </>
  )
}

export default Homeservices
