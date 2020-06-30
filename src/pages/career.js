/*eslint-disable */
import React, { useState, useEffect } from "react"
import { Col } from "antd"
import CareerWrap from "../components/careercomponents/careerDroping/careerdrop"
import {
  CareerParagraphRow,
  H1Styled,
  PStyled,
} from "../components/careercomponents/careerMainStyle"
import { Helmet } from "react-helmet"
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
        open: true,
      },
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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"Միացիր մեր թիմին"}</title>
        <meta
          property="og:title"
          content={
            careerdata.length !== 0
              ? careerdata[0].data.title_arm
              : "Ավագ Հաշվապահ"
          }
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="http://triple-c.algorithm.am/career/" />
      </Helmet>
      <CareerParagraphRow>
        <Col lg={{ span: 24 }} xxl={{ span: 8, offset: 4 }}>
          <H1Styled>Միացիր մեր թիմին</H1Styled>
          <PStyled>
            Մենք միշտ ուրախ ենք ընդլայնել մեր թիմը լավագույն մասնագետներով։ Եթե
            ունեք ցանկություն միանալու մեզ, ապա ուղարկեք Ձեր ինքնակենսագրականը,
            մենք ուրախ ենք տեսնել լավագույններին մեր կազմում։Ստորեւ կարող եք
            ծանոթանալ թափուր աշխատատեղերին։
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
    </>
  )
}

export default Career
