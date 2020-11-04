/*eslint-disable */
import React, { useState, useEffect } from "react"
import { Col } from "antd"
import CareerWrap from "../components/careercomponents/careerDroping/careerdrop"
import {
  CareerParagraphRow,
  H1Styled,
  PStyled,
} from "../components/careercomponents/careerMainStyle"
import useTranslations from "../components/useTranslations"
import SEO from "../components/seo"
import {
  ShareLabel,
  SharedWrapperCol,
  FaceLink,
  LinkedinLink,
  FacebookIcon,
  LinkdinIcon,
} from "../components/careercomponents/careerForm/formStyle"
import { FacebookShareButton, LinkedinShareButton } from "react-share"
const Career = ({ pageContext }) => {
  const [careerdata, setcareerdata] = useState([
    {
      status: true,
      data: {
        id: 0,
        title: "Ավագ",
        sub_title: "Պահանջվող հմտություններ",
        description_1: "Առնվազն 2 տարվա աշխատանքային փորձ",
        description_2: "Հաշվապահական հաշվառման գիտելիքներ,",
        description_3: "Հարկային օրենսգրքի իմացություն,",
        description_4: "Հայկական Ծրագրերի իմացություն",
      },
      open: true,
    },
  ])

  const { career, careerForm } = useTranslations()
  let urlShared

  const getCareerData = () => {
    let TransText = pageContext.localeResources.translation.career
    let newData = TransText.drop_content
    setcareerdata(newData)
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
  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/career/"
    } else if (lng === "ru") {
      return "http://triple-c.algorithm.am/ru/career"
    } else {
      return "http://triple-c.algorithm.am/arm/career/"
    }
  }

  const hookComponent = () => {
    urlShared = getSharedUrl(pageContext.locale)
  }

  hookComponent()

  return (
    <>
      <SEO
        title={career.title}
        description={career.paragraph}
        pageContext={pageContext}
      />
      <CareerParagraphRow justify="center">
        <Col>
          <H1Styled>{career.title}</H1Styled>
          <PStyled>{career.paragraph}</PStyled>
        </Col>
      </CareerParagraphRow>
      {careerdata.map((d, id) => (
        <CareerWrap
          showCareerForm={toggle}
          data={d}
          key={id}
          seotitle={career.title}
          seodescription={career.paragraph}
          seolang={pageContext.locale}
          formlangtext={careerForm}
          lang={pageContext.locale}
        />
      ))}
      {/*<SharedWrapperCol span={10} offset={3}>*/}
      {/*  <ShareLabel>{careerForm.share}</ShareLabel>*/}
      {/*  <FacebookShareButton*/}
      {/*    url={urlShared}*/}
      {/*    children={<FacebookIcon />}*/}
      {/*  />*/}
      {/*  <LinkedinShareButton*/}
      {/*    children={<LinkdinIcon />}*/}
      {/*    url={urlShared}*/}
      {/*  />*/}
      {/*</SharedWrapperCol>*/}
    </>
  )
}

export default Career
