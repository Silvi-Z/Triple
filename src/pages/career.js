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
import triple from "../api/triple"

const Career = ({ pageContext }) => {

  const [careerdata, setCareerdata] = useState([])
  useEffect(()=>{
    triple.get('/api/join_our_team')
      .then(res =>{
        makeOpened(res)
      } )
      .catch(err => console.log(err))
  }, [])

    function makeOpened (res){
      for(let i = 0; i<res.data.data.length; i++){
        res.data.data[i]['open'] = false;
      }
      setCareerdata(res.data.data)
    }
  const { career, careerForm } = useTranslations()
  let urlShared

  const toggle = (current)=> {
    const data = careerdata.map(d =>
      d.id === current.id && d.open === false
            ? { ...d, open: true }
            : d.id !== current.id && d.open === true
              ? { ...d, open: false }
              : { ...d, open: false }
    )
    setCareerdata(data);
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
    <>
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
          open={careerdata.length===1}
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
      </>
  )
}

export default Career
