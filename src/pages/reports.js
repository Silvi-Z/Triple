/*eslint-disable */
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { Row, Col, Button } from "antd"
import ReportForm from "../components/reportComponents/reportForm"
import ReportForm2 from "../components/reportComponents/reportForm2"
import ReportForm3 from "../components/reportComponents/reportForm3"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import CarImg from "../assets/calcImages/carSell.png"

const ReportParagraphRow = styled(Row)`
  padding: 0 12.5%;
  margin-bottom: 2.8%;
  @media only screen and (max-width: 320px) {
    margin-bottom: 70px;
    padding: 0 3.5%;
    margin-top: 39px;
  }
  @media only screen and (max-width: 375px) {
    margin-bottom: 70px;
    padding: 0 3.5%;
    margin-top: 39px;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 49px;
    padding: 0 3.5%;
  }
  @media only screen and (max-width: 1600px) {
    margin-top: 49px;
    padding: 0 12.5%;
  }
`
const H2Styled = styled.h2`
  width: 439px;
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
  span {
    color: #009db8;
    font-family: ArialAMU;
    font-size: 18px;
    font-weight: normal;
  }
`
const H3Styled = styled.h2`
  width: 439px;
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
  span {
    color: #009db8;
    font-family: ArialAMU;
    font-size: 18px;
    font-weight: normal;
  }
  @media only screen and (max-width: 375px) {
    width: 118px;
    height: 73px;
    font-family: ArialAMU;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media only screen and (max-width: 320px) {
    width: 118px;
    height: 73px;
    font-family: ArialAMU;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`
const PStyled = styled.p`
  width: 769px;
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
  @media only screen and (max-width: 768px) {
    max-width: 509px;
    max-height: 106px;
    margin-left: 0%;
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 375px) {
    width: 288px;
    height: 226px;
    font-family: ArialAMU;
  }
  @media only screen and (max-width: 320px) {
    width: 288px;
    height: 226px;
    font-family: ArialAMU;
  }
`
const HeadIcon = styled.img`
  width: 35px;
  height: 35px;
`
const ToggleButton = styled(Button)`
  width: 60px;
  height: 60px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  color: #009db8;
  margin-top: -16%;
`
const ReportDropRow = styled(Row)``
const ReportFormRow = styled(Row)``
const H3StyledForm = styled.h3`
  width: 239px;
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
`

const Reports = () => {
  const [showForm, toggleForm] = useState(true)
  const [confirm2, setConfirm2] = useState(false)
  const [confirm3, setConfirm3] = useState(false)
  return (
    <Layout>
      <ReportParagraphRow>
        <Col lg={{ span: 24 }} xxl={{ span: 24, offset: 2 }}>
          <H2Styled>Հաշվետվության տրամադրում</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերության “Հաշվետվության տրամադրում” ծառայության
            միջոցով կարող եք առցանց և շտապ կերպով ստանալ ձեզ հետաքրքրող
            հաշվետվությունը։
          </PStyled>
        </Col>
      </ReportParagraphRow>
      <ReportDropRow align="middle" gutter={[10, 25]}>
        <Col
          xxl={{ span: 1, offset: 6 }}
          xl={{ span: 1, offset: 3 }}
          lg={{ span: 1, offset: 3 }}
          md={{ span: 2, offset: 3 }}
          sm={{ span: 6, offset: 0 }}
          xs={{ span: 5, offset: 0 }}
        >
          <HeadIcon src={CarImg} alt={"icon"} />
        </Col>
        <Col xxl={10} xl={15} lg={15} md={16} sm={10} xs={14} span={17}>
          <H3Styled>
            Ավտոմեքենայի վաճառքի հաշվետվություն <span>( 5000 դր )</span>
          </H3Styled>
        </Col>
        <Col span={2}>
          <ToggleButton block onClick={() => toggleForm(!showForm)}>
            {showForm ? (
              <MinusOutlined style={{ fontSize: "20px" }} />
            ) : (
                <PlusOutlined style={{ fontSize: "20px" }} />
              )}
          </ToggleButton>
        </Col>
      </ReportDropRow>
      <ReportFormRow align="middle">
        {showForm ? (
          <Col
            xxl={{ span: 24, offset: 6 }}
            xl={{ span: 24, offset: 4 }}
            lg={{ span: 24, offset: 4 }}
            md={{ span: 24, offset: 4 }}
            sm={{ span: 24, offset: 0 }}
            xs={{ span: 24, offset: 0 }}
          >
            <H3StyledForm>Պահանջվող տեղեկատվություն</H3StyledForm>
            <ReportForm setConfirm2={setConfirm2} closeForm1={toggleForm} />
          </Col>
        ) : confirm2 ? (
          <Col
            xxl={{ span: 18, offset: 4 }}
            xl={{ span: 18, offset: 4 }}
            lg={{ span: 18, offset: 4 }}
            md={{ span: 18, offset: 4 }}
            sm={{ span: 3, offset: 0 }}
            xs={{ span: 3, offset: 0 }}
          >
            <H3StyledForm>Պահանջվող տեղեկատվություն</H3StyledForm>
            <ReportForm2
              setConfirm3={setConfirm3}
              setConfirm2={setConfirm2}
              backButton={toggleForm}
              forwardButton={setConfirm3}
            />
          </Col>
        ) : confirm3 ? (
          <Col
            xxl={{ span: 18, offset: 4 }}
            xl={{ span: 18, offset: 4 }}
            lg={{ span: 18, offset: 4 }}
            md={{ span: 18, offset: 4 }}
            sm={{ span: 3, offset: 0 }}
            xs={{ span: 3, offset: 0 }}
          >
            <H3StyledForm>Պահանջվող տեղեկատվություն</H3StyledForm>
            <ReportForm3 forwardButton={setConfirm3} backButton={setConfirm2} />
          </Col>
        ) : null}
      </ReportFormRow>
    </Layout>
  )
}

export default Reports
