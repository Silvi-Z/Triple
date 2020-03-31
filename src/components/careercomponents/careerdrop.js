import React, { useState } from "react"
import { Typography, CareerDropRow, Col, Button, Row, InputNumber } from "antd"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import styled from "styled-components"
import CalcImg from "../../assets/account.png"
import FormCareer from "../careercomponents/careerform"

const ToggleH2Styled = styled.h2`
  font-size: 25px;
  font-weight: 400;
  margin-left: 2.7%;
`
const H2Styled = styled.h2`
  height: 16px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  margin-left: 2%;
  color: #000000;
`
const ToggleButton = styled(Button)`
  width: 60px;
  height: 60px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  color: #009db8;
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
const DropCareerRow = styled(Row)`
  padding-right: "7%";
  border-bottom: 1px solid;
  border-color: "#009db8";
  @media only screen and (max-width: 1524px) {
    padding-left: 5%;
    padding-right: 12%;
  }
`
const DropHeadingIconCol = styled(Col)``
const DropHeadingTitleCol = styled(Col)``
const DropHeadingButtonCol = styled(Col)``
const FormWrapperCol = styled(Col)`
  padding: 0 18%;
  /* margin-bottom: 2.8%; */
`
const OrderList = styled.ul`
  list-style-type: none;
  li {
    text-indent: -5px;
  }
  li:before {
    content: " - ";
    text-indent: -5px;
  }
`
const OrderSection = styled.li``

const CareerDropWrapper = ({ showForm, showCareerForm, data }) => {
  // console.log(showForm, showCareerForm, data)
  return (
    <DropCareerRow gutter={[10, 50]}>
      <DropHeadingIconCol
        xxl={{ span: 1, offset: 3 }}
        xl={{ span: 1, offset: 2 }}
        lg={{ span: 1, offset: 2 }}
      >
        <HeadIcon src={CalcImg} alt={"icon"} />
      </DropHeadingIconCol>
      <DropHeadingTitleCol xxl={13} xl={18} lg={19} span={19}>
        <ToggleH2Styled>{data.data.title_arm}</ToggleH2Styled>
      </DropHeadingTitleCol>
      <DropHeadingButtonCol span={2}>
        <ToggleButton block onClick={() => showCareerForm(data)}>
          {data.open ? (
            <MinusOutlined style={{ fontSize: "20px" }} />
          ) : (
            <PlusOutlined style={{ fontSize: "20px" }} />
          )}
        </ToggleButton>
      </DropHeadingButtonCol>
      {data.open ? (
        <FormWrapperCol span={15} offset={4}>
          <H2Styled>Պահանջվող հմտություններ</H2Styled>
          <OrderList>
            <OrderSection>{data.data.description_arm_1}</OrderSection>
            <OrderSection>{data.data.description_arm_2}</OrderSection>
            <OrderSection>{data.data.description_arm_3}</OrderSection>
            <OrderSection>{data.data.description_arm_4}</OrderSection>
            <OrderSection>{data.data.description_arm_5}</OrderSection>
            <OrderSection>{data.data.description_arm_6}</OrderSection>
          </OrderList>
          <FormCareer />
        </FormWrapperCol>
      ) : null}
    </DropCareerRow>
  )
}
export default CareerDropWrapper
