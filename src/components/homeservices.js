import React, { useState } from "react"
import { Typography, Row, Col, Button, InputNumber } from "antd"
import { Link } from "gatsby"
import styled from "styled-components"
// import * as Yup from 'yup';
import { apiHelper } from "../helpers/apiHelper"
import CalcImg from "../assets/homeImages/calculator-1.png"
import TaxImg from "../assets/homeImages/tax-1@3x.png"
import AuditImg from "../assets/homeImages/audit@3x.png"
import ClientImg from "../assets/homeImages/client-1@3x.png"
import BrowserImg from "../assets/homeImages/browser@3x.png"
import UserImg from "../assets/homeImages/user-1@3x.png"
import LawImg from "../assets/homeImages/law@3x.png"
import TeamImg from "../assets/homeImages/teamwork@3x.png"
import RightArrowImg from "../assets/homeImages/right-arrow.png"

const NavLink = styled(Link)`
  text-decoration: none;
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
`
const SeemoreWrapper = styled.div`
  width: 226px;
  height: 60px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
  padding: 22px 43px;
  display: flex;
`
const SeemoreSpan = styled.span`
  width: 104px;
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
`
const Seemoreimg = styled.img`
  width: 22px;
  height: 17px;
  margin-left: 100%;
`

const IconWrapper = styled.img`
  width: 35px;
  height: 35px;
  margin-top: 25.6%;
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
  margin-left: 28.8%;
`
const TextWrapperBig = styled.p`
  width: 156px;
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
  margin-left: 30.3%;
`


const Homeservices = () => {
  return (
    <>
      <Row>
        <Col lg={{ span: 12 }}>
          <H2Styled>Ծառայություններ</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերությունն բոլոր հիմնական ծառայությունները՛
            կապված հաշվախահության և աւդիտի հետ։
          </PStyled>
        </Col>
        <Col span={12} style={{ paddingLeft: "35%" }}>
          <SeemoreWrapper>
            <SeemoreSpan>Տեսնել ավելին</SeemoreSpan>
            <NavLink to="/services/">
              <Seemoreimg src={RightArrowImg} alt={"icon"}></Seemoreimg>
            </NavLink>
          </SeemoreWrapper>
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "37px",
          width: "100%",
          height: "500px",
          boxShadow: "0px 5px 40px 0 rgba(0, 0, 0, 0.05)",
          backgroundColor: "#ffffff",
          margin: "37 auto",
        }}
      >
        <Col span={24}>
          <Row style={{ width: "100%", height: "100%" }}>
            <Col
              span={6}
              style={{
                width: "25%",
                borderBottom: "1px solid",
                borderRight: "1px solid",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={CalcImg} alt={"icon"}></IconWrapper>
              <TextWrapperSmall>Հաշվապահական հաշվառում</TextWrapperSmall>
            </Col>
            <Col
              span={6}
              style={{
                width: "25%",
                borderBottom: "1px solid",
                borderRight: "1px solid",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={TaxImg} alt={"icon"}></IconWrapper>
              <TextWrapperBig>Հարկային հաշվառում</TextWrapperBig>
            </Col>
            <Col
              span={6}
              style={{
                width: "25%",
                borderBottom: "1px solid",
                borderRight: "1px solid",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={AuditImg} alt={"icon"}></IconWrapper>
              <TextWrapperBig>Հարկային աուդիտ</TextWrapperBig>
            </Col>
            <Col
              span={6}
              style={{
                width: "25%",
                borderBottom: "1px solid",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={ClientImg} alt={"icon"}></IconWrapper>
              <TextWrapperBig>Խորհրդատվություն</TextWrapperBig>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row style={{ width: "100%", height: "100%" }}>
            <Col
              span={6}
              style={{
                width: "25%",
                borderRight: "1px solid",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={BrowserImg} alt={"icon"}></IconWrapper>
              <TextWrapperSmall>Կազմակերպության գրանցում</TextWrapperSmall>
            </Col>
            <Col
              span={6}
              style={{
                width: "25%",
                borderRight: "1px solid",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={UserImg} alt={"icon"}></IconWrapper>
              <TextWrapperBig>Ֆիզիկական անձանց</TextWrapperBig>
            </Col>
            <Col
              span={6}
              style={{
                width: "25%",
                borderRight: "1px solid",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={LawImg} alt={"icon"}></IconWrapper>
              <TextWrapperBig>Մաքսային գոծարքներ</TextWrapperBig>
            </Col>
            <Col
              span={6}
              style={{
                width: "25%",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={TeamImg} alt={"icon"}></IconWrapper>
              <TextWrapperBig>Կադրային աշխատանքի վարում</TextWrapperBig>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Homeservices
