import React, { useState, useEffect } from "react"
import { Typography, Row, Col } from "antd"
import { Link } from "gatsby"
import styled from "styled-components"
//import { apiHelper } from "../helpers/apiHelper"
import AlgorithmImg from "../assets/homeImages/algorithm.png"
import RightArrowImg from "../assets/homeImages/right-arrow.png"

const NavLink = styled(Link)`
  text-decoration: none;
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
  width: 245px;
  height: 60px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
  padding: 22px 43px;
  display: flex;
`
const SeemoreSpan = styled.span`
  width: 137px;
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
  width: 95px;
  height: 130px;
  margin-top: 16.6%;
  margin-left: 35%;
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
        <Col lg={{ span: 12 }}>
          <H2Styled>Մեր Գործընկերներ</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերությունն իր գործունեության երկու տարվա
            ընթացքում հասցրել է համագործակցել մի շարք ընկերությունների հետ:
          </PStyled>
        </Col>
        <Col span={12} style={{ paddingLeft: "33%" }}>
          <SeemoreWrapper>
            <SeemoreSpan>Դառնալ գործընկեր</SeemoreSpan>
            <NavLink to="/contact/">
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
              <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
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
              <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
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
              <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
            </Col>
            <Col
              span={6}
              style={{
                width: "25%",
                borderBottom: "1px solid",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
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
              <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
            </Col>
            <Col
              span={6}
              style={{
                width: "25%",
                borderRight: "1px solid",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
            </Col>
            <Col
              span={6}
              style={{
                width: "25%",
                borderRight: "1px solid",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
            </Col>
            <Col
              span={6}
              style={{
                width: "25%",
                borderColor: "#d7d7d7",
              }}
            >
              <IconWrapper src={AlgorithmImg} alt={"icon"}></IconWrapper>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Homepartners
