import React, { useState, useEffect } from "react"
import { Row, Col } from "antd"
import AlgorithmImg from "../../../assets/homeImages/partners/algorithm-logo.png"
import KochonImg from "../../../assets/homeImages/partners/kochon.png"
import AbcImg from "../../../assets/homeImages/partners/abc.png"
import RightArrowImg from "../../../assets/homeImages/right-arrow.png"
import {
  NavLink,
  PartnerspHeadingColumn,
  H2Styled,
  PStyled,
  SeemoreWrapper,
  SeemoreColumn,
  SeemoreSpan,
  PartnersLogosFirstRow,
  Seemoreimg,
  IconWrapper,
  ResponsWrapper,
  IconWrapperCol,
  IconWrapperColLast,
  IconWrapperSecondLastCol,
  IconWrapperSecondCol,
  ContainerRow
} from "./homePartStyle.js"

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
