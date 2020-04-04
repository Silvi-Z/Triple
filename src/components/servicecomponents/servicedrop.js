import React, { useState } from "react"
import { Typography, CareerDropRow, Col, Button, Row, InputNumber } from "antd"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import styled from "styled-components"

const ServiceDropRow = styled(Row)`
  height: ${data => (data.open ? "auto" : "auto")};
  /* height: 120px; */
  margin-bottom: 2.2%;
  padding-right: 7%;
  padding-left: 4.5%;
  border-bottom: 1px solid;
  border-color: "#009db8";
  @media only screen and (max-width: 1170px) {
    padding-left: 8.8%;
    padding-right: 9%;
  }
  @media only screen and (max-width: 375px) {
    padding-left: 0%;
    padding-right: 0%;
  }
  @media only screen and (max-width: 320px) {
    padding-left: 0%;
    padding-right: 0%;
  }
`
const ToggleH2Styled = styled.h2`
  width: 240px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  @media only screen and (max-width: 320px) {
    width: 126px;
    height: 34px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media only screen and (max-width: 375px) {
    width: 128px;
    height: 34px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`
const HeadIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 80%;
  @media (min-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    margin-top: 30%;
  }
  @media (min-width: 375px) {
    width: 40px;
    height: 40px;
    margin-top: 10%;
  }
  @media (min-width: 320px) {
    width: 40px;
    height: 40px;
    margin-top: 10%;
  }
  @media (min-width: 1600px) {
    width: 50px;
    height: 50px;
  }
`
const ToggleButton = styled(Button)`
  width: 60px;
  height: 60px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  color: #009db8;
`
const SubParagStyled = styled.div`
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
  margin-left: 17%;
  @media only screen and (max-width: 1170px) {
    margin-left: 13%;
  }
  @media only screen and (max-width: 375px) {
    margin-left: 12%;
    width: 260px;
    height: 74px;
    font-family: ArialAMU;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.14;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`

const DropHeadingIconCol = styled(Col)``
const DropHeadingParagraphCol = styled(Col)``
const DropButtonCol = styled(Col)`
  margin-bottom: 17px;
  margin-top: 18px;
`
const DropTextCol = styled(Col)``

const Servicedrop = ({ data, showServiceForm }) => {
  return (
    <ServiceDropRow align="middle" gutter={[10, 30]}>
      <DropHeadingIconCol
        // xxl={{ span: 1, offset: 3 }}
        xl={{ span: 2, offset: 2 }}
        lg={{ span: 2, offset: 1 }}
        xs={{ span: 3, offset: 0 }}
      >
        <HeadIcon src={data.data.image} alt={"icon"} />
      </DropHeadingIconCol>
      <DropHeadingParagraphCol xxl={17} xl={16} lg={18} xs={17}>
        <ToggleH2Styled>{data.data.paragraph}</ToggleH2Styled>
      </DropHeadingParagraphCol>
      <DropButtonCol lg={2} xl={2} md={2} xs={4}>
        <ToggleButton block onClick={() => showServiceForm(data)}>
          {data.open ? (
            <MinusOutlined style={{ fontSize: "20px" }} />
          ) : (
            <PlusOutlined style={{ fontSize: "20px" }} />
          )}
        </ToggleButton>
      </DropButtonCol>
      {data.open ? (
        <DropTextCol span={24}>
          <SubParagStyled>{data.data.text}</SubParagStyled>
        </DropTextCol>
      ) : null}
    </ServiceDropRow>
  )
}

export default Servicedrop
