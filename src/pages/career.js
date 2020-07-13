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
const Career = ({ pageContext }) => {
  const [careerdata, setcareerdata] = useState([
    {
      status: true,
      data: {
        id: 0,
        title: "Ավագ Հաշվապահ",
        sub_title: "Պահանջվող հմտություններ",
        description_1:
          "Հաշվապահական կամ ֆինանսական ոլորտում աշխատանքային փորձ (առնվազն 3 տարի)",
        description_2: "Հաշվապահական ստանդարտների իմացություն,",
        description_3:
          "ՀԾ, 1 C, E-invoicing և այլ հարակից հաշվապահական ծրագրերի իմացություն,",
        description_4: "Microsoft Office փաթեթի իմացություն",
        description_5: "Հաշվապահական հաշվառման ստանդարտների լավ տիրապետում",
        description_6: "Հաշվապահական հաշվառման ստանդարտների լավ տիրապետում",
      },
      open: true,
    },
  ])

  const { career } = useTranslations()
  const getCareerData = () => {
    let TransText = pageContext.localeResources.translation.career
    setcareerdata([
      ...careerdata,
      TransText.drop_content.map((obj, index) => {
        console.log("oooooooooo", careerdata[index])
        careerdata.data = {
          id: index,
          title: obj.title,
          description_1: obj.description_1,
          description_2: obj.description_2,
          description_3: obj.description_3,
          description_4: obj.description_4,
          description_5: obj.description_5,
          description_6: obj.description_6,
        }
      }),
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
  // const hookComponent = () => {
  //   getCareerData()
  //   // urlShared = getSharedUrl(pageContext.locale)
  // }
  //hookComponent()
  return (
    <>
      <SEO
        title={career.title}
        description={career.paragraph}
        pageContext={pageContext}
      />
      <CareerParagraphRow>
        <Col lg={{ span: 24 }} xxl={{ span: 8, offset: 4 }}>
          <H1Styled>{career.title}</H1Styled>
          <PStyled>{career.paragraph}</PStyled>
        </Col>
      </CareerParagraphRow>
      {console.log(careerdata)}
      {/* {careerdata.map((d, id) => (
        console.log(d)
        // < CareerWrap
        //   // showForm={showdrop}
        //   showCareerForm = { toggle }
        //   data = { d }
        //   key = { id }
        // />
      ))} */}
    </>
  )
}

export default Career
