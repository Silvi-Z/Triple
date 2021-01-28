/*eslint-disable */
import React, { useState, useEffect } from "react"
import CareerWrap from "../components/careercomponents/careerDroping/careerdrop"
import useTranslations from "../components/useTranslations"
import SEO from "../components/seo"
import { Col } from "antd"
import {
  CareerParagraphRow,
  CareerPageWrapper,
  H1Styled,
  PStyled,
} from "../components/careercomponents/careerMainStyle"
import {
  SharedWrapperCol,
  FacebookShare,
  LinkedinShare,
  FacebookIcon,
  LinkdinIcon,
  ShareLabel,
} from "../components/careercomponents/careerForm/formStyle"
const Career = ({ pageContext }) => {
  const [careerdata, setCareerdata] = useState([
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
    setCareerdata(newData)
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
    setCareerdata(data)
  }
  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/career/"
    }else {
      return "http://triple-c.algorithm.am/arm/career/"
    }
  }

  const hookComponent = () => {
    urlShared = getSharedUrl(pageContext.locale)
  }

  hookComponent()

  return (
    <CareerPageWrapper>
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
      <SharedWrapperCol>
        <ShareLabel>{careerForm.share}</ShareLabel>
        <FacebookShare
          url={urlShared}
          children={<FacebookIcon />}
        />
        <LinkedinShare
          url={urlShared}
          children={<LinkdinIcon />}
        />
      </SharedWrapperCol>
      </CareerPageWrapper>
  )
}

export default Career
