import React, { useEffect, useRef, useState } from "react"
import { Col, Row, Tooltip } from "antd"
import styled from "styled-components"
import Svg from "../../../assets/note.svg"
import SEO from "../../../components/seo"
import CalculatorNav from "../../../components/navbar/CalculatorNav"
import useTranslations from "../../../components/useTranslations"
import { H1Styled, SvgWrapper, TextStyled } from "../styled"
import apiUrl from "../../../api/api"
import { BY_FIELD_TABLE } from "../utilities/salary"
//share button container
export const SharedWrapperCol = styled(Col)`
  padding: 0 1%;
  display: flex;
  justify-content: end;
  margin-top: 2%;
  .react-share__ShareButton {
    all: unset;
  }
`

const CalculatorsContent = styled(Col)`
  padding-right: 35px;
  @media only screen and (max-width:1200px){
    padding-right: 0;
    border-radius: 10px;
    margin-bottom:60px;
  }
`

const CalculatorWrapper = ({ ctx, children }) => {
  const { calculator } = useTranslations()
  const [headTitle, setHeadTitle] = useState(true)
  const [singleTitle, setSingleTitle] = useState("")
  let urlShared
  const link = useRef()


  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/calculators/"
    } else {
      return "http://triple-c.algorithm.am/arm/calculators/"
    }
  }

  const hookComponent = () => {
    urlShared = getSharedUrl(ctx.locale)
  }

  hookComponent()
// const Svg = styled(InfoCircleTwoTone)`
//    margin-left:5px;
//    & * {
//     height:20px;
//     width:20px;
//    }
// `

  // const childrenWithProps = () => React.Children.map(children, child => {
  //   //   if (React.isValidElement(child)) {
  //   //     return React.cloneElement(child, { doSomething: "ok" })
  //   //   }
  //   //   return child
  //   // })

  const getSalaryType = (title) => {
    setHeadTitle(title)
  }

  const getTaxType = (title) => {
    setHeadTitle(title === 2 && true)
  }

  const getTitle = (title) => {
    setSingleTitle(title ? title : "")
  }

  const childrenWithProps = React.cloneElement(children, {
    getSalaryType: getSalaryType,
    getTaxType: getTaxType,
    getTitle,
  })

  const selectCalculator = calculator[ctx.originalPath.split("/")[2].replace("-", "_")]
  const htmlString = `${selectCalculator.paragraph}`

  useEffect(() => {
    const link = document && document.querySelector(".link")
    link.setAttribute('href',`${apiUrl.apiUrl}documents/Աշխատաժամանակի հաշվարկի տեղեկագիր.xls`)
    link.setAttribute('download',`true`)
  }, [])

  return (
    <>
      <SEO
        title={singleTitle ? singleTitle : calculator.title}
        description={calculator.paragraph}
        pageContext={ctx}
      />
      <Row className="textSec">
        {(typeof window !== `undefined` && window.innerWidth > 768) ? (
          <>
            <H1Styled>{selectCalculator.title}</H1Styled>
            <TextStyled dangerouslySetInnerHTML={{ __html: htmlString }} />
          </>
        ) : (
          <Tooltip trigger={"click"} className="tooltip title"
                   title={headTitle ? selectCalculator.paragraph : selectCalculator.paragraphType} color="black">
            <H1Styled>{selectCalculator.title}</H1Styled>
            <SvgWrapper style={{ backgroundImage: `url(${Svg})` }} />
          </Tooltip>
        )}
      </Row>
      <Row gutter={0}>
        <Col className="calculatorsMenu" xl={6}>
          <CalculatorNav t={calculator} locale={ctx.locale} />
        </Col>
        <CalculatorsContent span={24} xl={18}>
          {childrenWithProps}
        </CalculatorsContent>
      </Row>

    </>
  )
}

export default CalculatorWrapper
