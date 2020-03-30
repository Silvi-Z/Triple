import React, { useState, useEffect } from "react"
import { Typography, Row, Col } from "antd"
import { Link } from "gatsby"
import styled from "styled-components"
//import { apiHelper } from "../helpers/apiHelper"
import AlgorithmImg from "../../assets/homeImages/algorithm.png"
import RightArrowImg from "../../assets/homeImages/right-arrow.png"

const NavLink = styled(Link)`
  text-decoration: none;
  display: flex;
  @media (max-width: 380px) {
    margin-top: auto;
  }
`
const PartnerspHeadingColumn = styled(Col)`
  @media (max-width: 380px) {
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
  text-align: center;
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

  @media (max-width: 380px) {
    width: 285px;
    height: 107px;
  }
`
const SeemoreWrapper = styled.div`
  width: 245px;
  height: 60px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
  padding: 22px 33px;
  display: flex;

  @media only screen and (max-width: 1524px) {
    padding: 20px 40px;
  }
  @media only screen and (max-width: 768px) {
    width: 225px;
    height: 58px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    text-align: center;
    padding: 0px 35px;
    padding-left: 0px;
    padding-top: 0px;
    display: flex;
  }
`
const SeemoreColumn = styled(Col)`
  padding-left: 33%;
  @media only screen and (max-width: 1524px) {
    padding-left: 32%;
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
  @media only screen and (max-width: 1524px) {
    width: 162px;
  }
  @media only screen and (max-width: 768px) {
    width: 208px;
    height: 56px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    text-align: center;
    padding: 22px 22px;
    display: flex;
    box-shadow: none;
  }
  @media (max-width: 380px) {
    padding: 19px 16px;
    box-shadow: none;
  }
`
const PartnersLogosWrapperRow = styled(Row)`
  margin-top: 37px;
  width: 100%;
  height: 500px;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  margin: 37 auto;
`
const PartnersLogosFirstRow = styled(Row)`
  width: 100%;
  height: 100%;
`
const Seemoreimg = styled.img`
  width: 22px;
  height: 17px;
  margin-left: 20px;
  @media (max-width: 380px) {
    margin-bottom: 0px;
    margin-top: 23px;
  }
`
const IconWrapper = styled.img`
  width: 95px;
  height: 130px;
  margin-top: 16.6%;
  margin-left: 35%;

  @media (max-width: 380px) {
    margin-left: 18%;
  }
`
const ResponsWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    display: block;
    height: 838px;
  }
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
        <PartnersLogosWrapperRow>
          <Col span={24}>
            <PartnersLogosFirstRow>
              <Col
                lg={6}
                sm={12}
                md={12}
                xs={12}
                style={{
                  width: "25%",
                  borderBottom: "1px solid",
                  borderRight: "1px solid",
                  borderColor: "#d7d7d7",
                }}
              >
                <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
              </Col>
              <Col
                lg={6}
                sm={12}
                md={12}
                xs={12}
                style={{
                  width: "25%",
                  borderBottom: "1px solid",
                  borderRight: "1px solid",
                  borderColor: "#d7d7d7",
                }}
              >
                <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
              </Col>
              <Col
                lg={6}
                sm={12}
                md={12}
                xs={12}
                style={{
                  width: "25%",
                  borderBottom: "1px solid",
                  borderRight: "1px solid",
                  borderColor: "#d7d7d7",
                }}
              >
                <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
              </Col>
              <Col
                lg={6}
                sm={12}
                md={12}
                xs={12}
                style={{
                  width: "25%",
                  borderBottom: "1px solid",
                  borderColor: "#d7d7d7",
                }}
              >
                <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
              </Col>
            </PartnersLogosFirstRow>
          </Col>
          <Col span={24}>
            <PartnersLogosFirstRow>
              <Col
                lg={6}
                sm={12}
                md={12}
                xs={12}
                style={{
                  width: "25%",
                  borderRight: "1px solid",
                  borderColor: "#d7d7d7",
                }}
              >
                <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
              </Col>
              <Col
                lg={6}
                sm={12}
                md={12}
                xs={12}
                style={{
                  width: "25%",
                  borderRight: "1px solid",
                  borderColor: "#d7d7d7",
                }}
              >
                <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
              </Col>
              <Col
                lg={6}
                sm={12}
                md={12}
                xs={12}
                style={{
                  width: "25%",
                  borderRight: "1px solid",
                  borderColor: "#d7d7d7",
                }}
              >
                <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
              </Col>
              <Col
                lg={6}
                sm={12}
                md={12}
                xs={12}
                style={{
                  width: "25%",
                  borderColor: "#d7d7d7",
                }}
              >
                <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
              </Col>
            </PartnersLogosFirstRow>
          </Col>
        </PartnersLogosWrapperRow>
      </ResponsWrapper>
    </>
  )
}

export default Homepartners
