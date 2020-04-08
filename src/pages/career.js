import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { Typography, Row, Col, Button, InputNumber } from "antd"
import CareerWrap from "../components/careercomponents/careerdrop"

const CareerParagraphRow = styled(Row)`
  padding: 0 12%;
  margin-bottom: 3.8%;
  @media only screen and (max-width: 1024px) {
    padding-top: 49px;
    padding-left: 8.8%;
    padding-right: 9%;
  }
  @media only screen and (max-width: 320px) {
    padding-top: 49px;
    padding-left: 0%;
    padding-right: 0%;
  }
`

const H2Styled = styled.h2`
  width: 244px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
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
    width: 530px;
    height: 136px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-top: 49px;
  }
  @media only screen and (max-width: 375px) {
    width: 288px;
    height: 286px;
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
  @media only screen and (max-width: 320px) {
    width: 288px;
    height: 286px;
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
`

const Career = () => {
  const [careerdata, setcareerdata] = useState([])

  const getCareerData = () => {
    setcareerdata([
      {
        status: true,
        data: {
          id: 0,
          title_arm: "Ավագ Հաշվապահ",
          title_ru: "string",
          title_en: "string",
          description_arm_1:
            "Հաշվապահական կամ ֆինանսական ոլորտում աշխատանքային փորձ (առնվազն 3 տարի)",
          description_arm_2: "Հաշվապահական ստանդարտների իմացություն,",
          description_arm_3:
            "ՀԾ, 1 C, E-invoicing և այլ հարակից հաշվապահական ծրագրերի իմացություն,",
          description_arm_4: "Microsoft Office փաթեթի իմացություն",
          description_arm_5:
            "Հաշվապահական հաշվառման ստանդարտների լավ տիրապետում",
          description_arm_6:
            "Հաշվապահական հաշվառման ստանդարտների լավ տիրապետում",
          description_ru: "string",
          description_en: "string",
        },
        open: false,
      },
      // {
      //   status: true,
      //   data: {
      //     id: 1,
      //     title_arm: "ԳԼԽԱՎՈՐ",
      //     title_ru: "string",
      //     title_en: "string",
      //     description_arm_1:
      //       "Հաշվապահական կամ ֆինանսական ոլորտում աշխատանքային փորձ (առնվազն 3 տարի)",
      //     description_arm_2: "Հաշվապահական ստանդարտների իմացություն,",
      //     description_arm_3:
      //       "ՀԾ, 1 C, E-invoicing և այլ հարակից հաշվապահական ծրագրերի իմացություն,",
      //     description_arm_4: "Microsoft Office փաթեթի իմացություն",
      //     description_arm_5:
      //       "Հաշվապահական հաշվառման ստանդարտների լավ տիրապետում",
      //     description_arm_6:
      //       "Հաշվապահական հաշվառման ստանդարտների լավ տիրապետում",
      //     description_ru: "string",
      //     description_en: "string",
      //   },
      //   open: false,
      // },
    ])
  }

  useEffect(() => {
    getCareerData()
  }, [])

  const toggle = current => {
    const data = careerdata.map(d =>
      d.data.id === current.data.id && d.open === false
        ? { ...d, open: true }
        : d.data.id !== current.data.id && d.open === true
        ? { ...d, open: false }
        : { ...d, open: false }
    )
    setcareerdata(data)
  }
  return (
    <Layout>
      <CareerParagraphRow>
        <Col lg={{ span: 24 }}>
          <H2Styled>Միացիր մեր թիմին</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերությունում աշխատանքը միջոց է մշտապես ակտիվ
            մասնագիտական գործունեության մեջ լինելու,սովորելու և մասնագիտական
            լուրջ աճ գրանցելու համար։Եթե ցանկություն ունես փորձելու ուժերդ նոր
            միջավայրում և համապատասխանում ես նշված պայմաններին,ապա դիմիր մեզ և
            մենք կդիտարկենք Քո թեկնածությունը։
          </PStyled>
        </Col>
      </CareerParagraphRow>
      {careerdata.map((d, id) => (
        <CareerWrap
          // showForm={showdrop}
          showCareerForm={toggle}
          data={d}
          key={id}
        />
      ))}
    </Layout>
  )
}

export default Career
