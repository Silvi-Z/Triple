import React, { useEffect, useState } from "react"
import { Row, Col } from "antd";
import styled from "styled-components";
import FbBlueIcon from "../../../assets/career/facebookBlueCareer.svg";
import FbBlackIcon from "../../../assets/career/facebookCareer.svg";
import LinkdinBlackIcon from "../../../assets/career/linkedinCareer.svg";
import LinkedinBlueIcon from "../../../assets/career/linkedinBlueCareer.svg";
import SEO from "../../../components/seo";
import CalculatorNav from "../../../components/navbar/CalculatorNav";
import useTranslations from "../../../components/useTranslations";
import { FacebookShareButton, LinkedinShareButton } from "react-share";
import { H1Styled, TextStyled } from "../styled"

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
        <TextStyled>{selectCalculator.paragraph}</TextStyled>
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
