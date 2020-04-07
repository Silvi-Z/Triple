import React, { useState } from "react"
import styled from "styled-components"
import { Typography, Row, Col, Button, InputNumber } from "antd"

const ContainerNews = styled(Col)`
  max-width: 790px;
  height: 150px;
  overflow: hidden;
  margin-top: 5%;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  @media only screen and (max-width: 768px) {
    max-width: 738px;
  }
  @media only screen and (max-width: 375px) {
    max-width: 290px;
    height: 365px;
  }
  @media only screen and (max-width: 320px) {
    max-width: 290px;
    height: 365px;
  }
`
const ImgWrapper = styled(Col)`
  height: -webkit-fill-available;
`
const TextWrapper = styled(Col)`
  padding: 2.2% 1%;
  &:hover {
    color: #009db8;
    cursor: pointer;
    h2 {
      color: #009db8;
    }
    p {
      color: #009db8;
    }
  }
`
const Ptext = styled.p`
  height: auto;
  font-family: ArialAMU;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media only screen and (max-width: 375px) {
    width: 268px;
    height: 133px;
    font-family: ArialAMU;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media only screen and (max-width: 320px) {
    width: 268px;
    height: 133px;
    font-family: ArialAMU;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`
const WrapperImg = styled.img`
  height: -webkit-fill-available;
  cursor: pointer;
  @media only screen and (max-width: 375px) {
    width: 100%;
    height: 150px;
  }
  @media only screen and (max-width: 320px) {
    width: 100%;
    height: 150px;
  }
`
const H2text = styled.h2`
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-bottom: 8px;
`
const News = ({ data, openpage }) => {
  return (
    <ContainerNews ls={24} onClick={openpage}>
      <Row>
        <ImgWrapper xl={6} lg={6} md={6} xs={24}>
          <WrapperImg src={data.Imgurl} alt={"img"} />
        </ImgWrapper>
        <TextWrapper xl={18} lg={18} md={18} xs={24}>
          <H2text>{data.heading}</H2text>
          <hr width="10%" style={{ marginBottom: "9px" }} />
          <Ptext>{data.paragraph}</Ptext>
        </TextWrapper>
      </Row>
    </ContainerNews>
  )
}

export default News
