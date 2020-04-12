/*eslint-disable */
import React, { useState } from "react"
import { Typography, CareerDropRow, Col, Button, Row, InputNumber } from "antd"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import styled from "styled-components"
import CalcImg from "../../assets/account.png"
import FormCareer from "../careercomponents/careerform"

const ToggleH2Styled = styled.h2`
  width: 148px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-top: 1%;
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
  margin-left: 5.3%;
  color: #000000;
  @media only screen and (max-width: 768px) {
    width: 211px;
    height: 16px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
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
  @media (min-width: 1170px) {
    width: 40px;
    height: 40px;
  }
`

const DropHeadingIconCol = styled(Col)``
const DropHeadingTitleCol = styled(Col)``
const DropHeadingButtonCol = styled(Col)``
const FormWrapperCol = styled(Col)`
  padding: 0 18%;
  margin-top: -1%;
`
const OrderList = styled.ul`
  list-style-type: none;
  margin-left: 5.3%;
  li {
    text-indent: -5px;
  }
  li:before {
    content: " - ";
    color: #009db8;
    text-indent: -5px;
  }
`
const OrderSection = styled.li`
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media only screen and (max-width: 768px) {
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
  @media only screen and (max-width: 375px) {
    font-family: ArialAMU;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`
const DropCareerRow = styled(Row)`
  padding-right: "7%";
  border-bottom: 1px solid;
  border-color: #d7d7d7;
  @media only screen and (max-width: 1170px) {
    padding-left: 5%;
    padding-right: 12%;
  }
  @media only screen and (max-width: 768px) {
    padding-left: 9%;
    padding-right: 8%;
  }
  @media only screen and (max-width: 375px) {
    padding-left: 3%;
    padding-right: 12%;
  }
  @media only screen and (max-width: 320px) {
    padding-left: 0%;
    padding-right: 13%;
  }
`

const CareerDropWrapper = ({ showCareerForm, data }) => {
  return (
    <DropCareerRow gutter={[10, 30]}>
      <DropHeadingIconCol
        xxl={{ span: 1, offset: 3 }}
        xl={{ span: 2, offset: 3 }}
        lg={{ span: 2, offset: 2 }}
        md={{ span: 2, offset: 0 }}
      >
        <HeadIcon src={CalcImg} alt={"icon"} />
      </DropHeadingIconCol>
      <DropHeadingTitleCol xxl={13} xl={12} lg={17} span={17}>
        <ToggleH2Styled>{data.data.title_arm}</ToggleH2Styled>
      </DropHeadingTitleCol>
      <DropHeadingButtonCol xl={6} span={2}>
        <ToggleButton block onClick={() => showCareerForm(data)}>
          {data.open ? (
            <MinusOutlined style={{ fontSize: "20px" }} />
          ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
        </ToggleButton>
      </DropHeadingButtonCol>
      {data.open ? (
        <FormWrapperCol
          xl={{ span: 18, offset: 4 }}
          lg={{ span: 18, offset: 3 }}
          md={{ span: 23, offset: 1 }}
          sm={{ span: 24, offset: 0 }}
          xs={{ span: 24, offset: 0 }}
        >
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
