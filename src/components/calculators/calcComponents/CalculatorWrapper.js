import React, { useEffect, useState } from "react"
import { Row, Col, Tooltip } from "antd"
import styled from "styled-components";
import FbBlueIcon from "../../../assets/career/facebookBlueCareer.svg";
import FbBlackIcon from "../../../assets/career/facebookCareer.svg";
import LinkdinBlackIcon from "../../../assets/career/linkedinCareer.svg";
import LinkedinBlueIcon from "../../../assets/career/linkedinBlueCareer.svg";
import Svg from "../../../assets/note.svg"
import SEO from "../../../components/seo";
import CalculatorNav from "../../../components/navbar/CalculatorNav";
import useTranslations from "../../../components/useTranslations";
import { FacebookShareButton, LinkedinShareButton } from "react-share";
import { H1Styled, SvgWrapper, TextStyled } from "../styled"
import { InfoCircleTwoTone } from "@ant-design/icons"

//share button container
export const SharedWrapperCol = styled(Col)`
  padding: 0 1%;
  display: flex;
  justify-content: end;
  margin-top: 2%;
  .react-share__ShareButton {
    all: unset;
  }
`;

const CalculatorsContent = styled(Col)`
  padding-right: 35px;
  @media only screen and (max-width:1200px){
    padding-right: 0;
    border-radius: 10px;
    margin-bottom:60px;
  }
`

const CalculatorWrapper = ({ ctx, children}) => {
  const { calculator } = useTranslations();
  let urlShared;

  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/calculators/"
    }else {
      return "http://triple-c.algorithm.am/arm/calculators/"
    }
  };

  const hookComponent = () => {
    urlShared = getSharedUrl(ctx.locale)
  };

  hookComponent();
// const Svg = styled(InfoCircleTwoTone)`
//    margin-left:5px;
//    & * {
//     height:20px;
//     width:20px;
//    }
// `
  const selectCalculator = calculator[ctx.originalPath.split('/')[2].replace('-' , '_')]
  return (
    <>
      <SEO
        title={calculator.title}
        description={calculator.paragraph}
        pageContext={ctx}
      />
      <Row className="textSec">
        <H1Styled>{selectCalculator.title}</H1Styled>
        {(typeof window !== `undefined` && window.innerWidth>768) ? (
        <TextStyled>{selectCalculator.paragraph}</TextStyled>
        ) : (
        <Tooltip title={selectCalculator.paragraph} color="black">
          <SvgWrapper style={{backgroundImage: `url(${Svg})`}} />
        </Tooltip>
        )}
      </Row>
      <Row gutter={0}>
        <Col className="calculatorsMenu" xl={6}>
          <CalculatorNav t={calculator} locale={ctx.locale} />
        </Col>
        <CalculatorsContent span={24} xl={18}>
          {children}
        </CalculatorsContent>
      </Row>

    </>
  )
}

export default CalculatorWrapper;
