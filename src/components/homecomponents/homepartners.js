import React, { useState, useEffect } from "react"
import { Typography, Row, Col } from "antd"
import { Link } from "gatsby"
import styled from "styled-components"
//import { apiHelper } from "../helpers/apiHelper"
import AlgorithmImg from "../../assets/homeImages/partners/algorithm-logo.png"
import KochonImg from "../../assets/homeImages/partners/kochon.png"
import AbcImg from "../../assets/homeImages/partners/abc.png"
import RightArrowImg from "../../assets/homeImages/right-arrow.png"

const NavLink = styled(Link)`
  text-decoration: none;
  display: flex;
  @media (max-width: 375px) {
    margin-top: auto;
  }
`
const PartnerspHeadingColumn = styled(Col)`
  @media (max-width: 375px) {
    margin-top: 88px;
    margin-bottom: 28px;
  }
`

const H2Styled = styled.section`
  width: 166px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
`
const PStyled = styled.section`
  width: 519px;
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
    width: 442px;
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

  @media (max-width: 380px) {
    width: 285px;
    height: 107px;
  }
`
const SeemoreWrapper = styled.div`
  width: 226px;
  height: 50px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
  padding: 16px 23px;
  display: flex;

  @media only screen and (max-width: 1170px) {
    padding: 16px 22px;
  }
  @media only screen and (max-width: 768px) {
    width: 226px;
    height: 50px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    text-align: center;
    padding: 0px;
    padding-left: 0px;
    padding-top: 0px;
    display: flex;
  }
`
const SeemoreColumn = styled(Col)`
  padding-left: 32%;
  @media only screen and (max-width: 1920px) {
    padding-left: 37%;
  }
  @media only screen and (max-width: 1170px) {
    padding-left: 30%;
  }
  @media only screen and (max-width: 1024px) {
    padding-left: 26.5%;
  }
  @media only screen and (max-width: 768px) {
    padding-left: 18%;
  }
  @media (max-width: 380px) {
    padding-left: 0%;
  }
`
const SeemoreSpan = styled.span`
  width: 162px;
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
  box-shadow: none;
  @media only screen and (max-width: 1170px) {
    width: 162px;
  }
  @media only screen and (max-width: 768px) {
    width: 187px;
    height: 50px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    text-align: center;
    padding: 15px 22px;
    display: flex;
    box-shadow: none;
  }
  @media (max-width: 380px) {
    padding: 19px 16px;
    box-shadow: none;
  }
`
const PartnersLogosFirstRow = styled(Row)`
  width: 100%;
  height: 100%;
`
const Seemoreimg = styled.img`
  width: 22px;
  height: 17px;
  margin-left: 20px;
  @media only screen and (max-width: 768px) {
    margin-left: 0px;
    margin-top: 8%;
  }
  @media (max-width: 380px) {
    margin-bottom: 0px;
    margin-top: 23px;
  }
`
const IconWrapper = styled.img`
  width: 171px;
  height: 50px;
  margin-top: 18.7%;
  @media (max-width: 375px) {
    width: 116px;
    height: 34px;
    margin-top: 44.7%;
  }
`

const ResponsWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    display: block;
    height: 838px;
  }
`
const IconWrapperCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
  text-align: center;
`
const IconWrapperColLast = styled(Col)`
  width: 250px;
  height: 180px;
  border-bottom: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
  text-align: center;
`
const IconWrapperSecondLastCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-color: #d7d7d7;
  background-color: #ffffff;
  text-align: center;
`
const IconWrapperSecondCol = styled(Col)`
  width: 250px;
  height: 180px;
  border-right: 1px solid;
  border-color: #d7d7d7;
  background-color: #ffffff;
  text-align: center;
`
const ContainerRow = styled(Row)`
  margin-top: 37px;
  width: 100%;
  height: auto;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  margin: 37 auto;
`

const Homepartners = () => {
  // const [hasError, setErrors] = useState(false)
  // const [images, setImages] = useState({})

  // async function fetchData() {
  //   res = await apiHelper.get("/api/partner")
  //   console.log("Response: ", res.json())
  // }
  // useEffect(() => fetchData())
  return (
    <>
      <Row style={{ marginTop: "59px" }}>
        <PartnerspHeadingColumn lg={12} ls={12} sm={24} md={12} xs={24}>
          <H2Styled>ՄԵր Գործընկերը</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերությունն իր գործունեության երկու տարվա
            ընթացքում հասցրել է համագործակցել մի շարք ընկերությունների հետ:
          </PStyled>
        </PartnerspHeadingColumn>
        <SeemoreColumn ls={12} sm={24} md={12} lg={12} xs={24}>
          <SeemoreWrapper>
            <NavLink to="/contact/">
              <SeemoreSpan>Դառնալ գործընկեր</SeemoreSpan>
              <Seemoreimg src={RightArrowImg} alt={"icon"}></Seemoreimg>
            </NavLink>
          </SeemoreWrapper>
        </SeemoreColumn>
      </Row>
      <ResponsWrapper>
        <ContainerRow>
          <Col span={24}>
            <PartnersLogosFirstRow>
              <IconWrapperCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
              </IconWrapperCol>
              <IconWrapperCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <IconWrapper src={AbcImg} alt={"icon"}></IconWrapper>
              </IconWrapperCol>
              <IconWrapperCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
              </IconWrapperCol>
              <IconWrapperColLast lg={6} xl={6} sm={12} md={12} xs={12}>
                <IconWrapper src={AbcImg} alt={"icon"}></IconWrapper>
              </IconWrapperColLast>
            </PartnersLogosFirstRow>
          </Col>
          <Col span={24}>
            <PartnersLogosFirstRow>
              <IconWrapperSecondCol lg={6} sm={12} md={12} xs={12}>
                <IconWrapper src={KochonImg} alt={"icon"}></IconWrapper>
              </IconWrapperSecondCol>
              <IconWrapperSecondCol lg={6} sm={12} md={12} xs={12}>
                <IconWrapper src={AbcImg} alt={"icon"}></IconWrapper>
              </IconWrapperSecondCol>
              <IconWrapperSecondCol lg={6} sm={12} md={12} xs={12}>
                <IconWrapper src={KochonImg} alt={"icon"}></IconWrapper>
              </IconWrapperSecondCol>
              <IconWrapperSecondLastCol lg={6} sm={12} md={12} xs={12}>
                <IconWrapper src={AbcImg} alt={"icon"}></IconWrapper>
              </IconWrapperSecondLastCol>
            </PartnersLogosFirstRow>
          </Col>
        </ContainerRow>
      </ResponsWrapper>
    </>
  )
}

export default Homepartners
