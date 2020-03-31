import React, { useState } from "react"
import { Typography, CareerDropRow, Col, Button, Row, InputNumber } from "antd"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import styled from "styled-components"

const ServiceDropRow = styled(Row)`
  height: ${data => (data.open ? "auto" : "auto")};
  /* height: 120px; */
  margin-bottom: 2.2%;
  padding-right: 7%;
  padding-left: 0%;
  border-bottom: 1px solid;
  border-color: "#009db8";
  @media only screen and (max-width: 1524px) {
    padding-left: 8.8%;
    padding-right: 9%;
  }
`
const ToggleH2Styled = styled.h2`
  /* font-size: 25px;
  font-weight: 400;
  margin-left: 2.7%; */
  width: 264px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  margin-left: 2%;
  color: #000000;
`
const HeadIcon = styled.img`
  width: 30px;
  height: 30px;
  @media (min-width: 1200px) {
    width: 40px;
    height: 40px;
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
  margin-left: 18%;
  @media only screen and (max-width: 1524px) {
    margin-left: 10%;
  }
`

const DropHeadingIconCol = styled(Col)``
const DropHeadingParagraphCol = styled(Col)``
const DropButtonCol = styled(Col)``
const DropTextCol = styled(Col)``

const Servicedrop = ({ data, showServiceForm }) => {
  console.log(data)
  return (
    <ServiceDropRow
      align="middle"
      gutter={[10, 30]}
      //   style={{ marginBottom: "2.2%", paddingRight: "7%" }}
    >
      <DropHeadingIconCol
        xxl={{ span: 1, offset: 3 }}
        xl={{ span: 1, offset: 2 }}
        lg={{ span: 1, offset: 1 }}
      >
        <HeadIcon src={data.data.image} alt={"icon"} />
      </DropHeadingIconCol>
      <DropHeadingParagraphCol xxl={17} xl={18} lg={19} span={19}>
        <ToggleH2Styled>{data.data.paragraph}</ToggleH2Styled>
      </DropHeadingParagraphCol>
      <DropButtonCol span={2}>
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
