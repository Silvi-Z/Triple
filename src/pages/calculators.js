import React, { useState } from "react"
import { Router, Location } from "@reach/router"
import { Typography, Row, Col, Divider } from "antd"
import styled from "styled-components"
import CalculatorNav from "../components/navbar/CalculatorNav"
import SalaryCalculator from "../components/calculators/salarycalculator"
import VacationCalculator from "../components/calculators/vacationcalculator"
import NonWorkingCalculator from "../components/calculators/nonWorkingCalculator"
import CarCustomsCalculator from "../components/calculators/carCustomsCalculator"
import CarSellCalculator from "../components/calculators/carSellCalculator"
import CarPropTaxCalculator from "../components/calculators/carPropTaxCalculator"
import MortgageCalculator from "../components/calculators/mortgageCalculator"
import FinalCalculator from "../components/calculators/finalCalculator"
//
import FbBlueIcon from "../assets/career/facebookBlueCareer.svg"
import FbBlackIcon from "../assets/career/facebookCareer.svg"
import LinkdinBlackIcon from "../assets/career/linkedinCareer.svg"
import LinkedinBlueIcon from "../assets/career/linkedinBlueCareer.svg"
import useTranslations from "../components/useTranslations"
import SEO from "../components/seo"
import { FacebookShareButton, LinkedinShareButton } from "react-share"


const { Text } = Typography

const HeaderRow = styled(Row)`
  @media only screen and (max-width: 768px) {
    padding-top: 49px;
  }
`

const H1Styled = styled.h1`
  font-size: 18px;
  font-weight: bold;
  font-family: ArialAMU;
  color: #000;
`

const TextStyled = styled(Text)`
  font-size: 16px;
  font-family: ArialAMU;
  color: #000;
`
//share button container
export const SharedWrapperCol = styled(Col)`
  padding: 0 1%;
  display: flex;
  justify-content: end;
  margin-top: 2%;
  .react-share__ShareButton {
    all: unset;
  }
  /* @media (min-width: 375px) {
    a {
      display: contents;
      color: #da4567;
    }
  } */
`
const ShareLabel = styled.h3`
  width: 83px;
  height: 15px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: right;
  margin-top: -5px;
  color: #000000;
`
const FacebookIcon = styled.div`
  height: 32px;
  width: 32px;
  margin-left: 19px;
  background-image: url(${FbBlackIcon});
  cursor: pointer;
  &:hover {
    background-image: url(${FbBlueIcon});
  }
`
const LinkdinIcon = styled.div`
  height: 32px;
  width: 32px;
  margin-left: 19px;
  background-image: url(${LinkdinBlackIcon});
  cursor: pointer;
  &:hover {
    background-image: url(${LinkedinBlueIcon});
  }
`

const Calculators = ({ pageContext }) => {
  const [display, setDisplay] = useState({
    salary: false,
    vacation: false,
    nonWorking: false,
    final: false,
    mortgage: false,
    carCustoms: false,
    carSell: false,
    carPropTax: false,
  })
  const { calculator } = useTranslations()
  let urlShared

  const toggleDisplay = name => {
    const data = { ...display }

    for (let property in data) {
      data[property] = false
    }

    data[name] = !display[name]

    setDisplay(data)
  }

  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/calculators/"
    } else if (lng === "ru") {
      return "http://triple-c.algorithm.am/ru/calculators"
    } else {
      return "http://triple-c.algorithm.am/arm/calculators/"
    }
  }

  const hookComponent = () => {
    urlShared = getSharedUrl(pageContext.locale)
  }

  hookComponent()

  return (
    <>
      <SEO
        title={calculator.title}
        description={calculator.paragraph}
        pageContext={pageContext}
      />
      <HeaderRow>
        <Col
          xxl={{ span: 8, offset: 4 }}
          xl={{ span: 9, offset: 4 }}
          lg={{ span: 8, offset: 3 }}
          md={{ span: 15, offset: 1 }}
          sm={16}
          span={16}
        >
          <H1Styled>{calculator.title}</H1Styled>
        </Col>
      </HeaderRow>
      <Row gutter={[1, 60]}>
        <Col
          xxl={{ span: 16, offset: 4 }}
          xl={{ span: 14, offset: 4 }}
          lg={{ span: 15, offset: 3 }}
          md={{ span: 22, offset: 1 }}
          sm={24}
          span={24}
        >
          <TextStyled>{calculator.paragraph}</TextStyled>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={6}>
          <CalculatorNav t={calculator} />
        </Col>
        <Col span={18}>
          <Location>
            {({ location }) => {

              console.log('location')
              console.log(location)
              return (
                <Router location={location}>
                  <SalaryCalculator
                    path="/salary"
                    toggleForm={() => toggleDisplay("salary")}
                    showForm={display.salary}
                    langText={calculator.salary_calculator}
                  />
                </Router>
              )
            }}
          </Location>
        </Col>
      </Row>

      <SharedWrapperCol span={5} offset={3}>
        <ShareLabel>{calculator.share}</ShareLabel>
        <FacebookShareButton url={urlShared} children={<FacebookIcon />} />
        <LinkedinShareButton
          children={<LinkdinIcon />}
          url={urlShared}
        ></LinkedinShareButton>
      </SharedWrapperCol>
    </>
  )
}

export default Calculators
