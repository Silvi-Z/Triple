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


const ShareLabel = styled.h3`
  width: 83px;
  height: 15px;
  font-family: ArialAMU,serif;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
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
const LinkedinIcon = styled.div`
  height: 32px;
  width: 32px;
  margin-left: 19px;
  background-image: url(${LinkdinBlackIcon});
  cursor: pointer;
  &:hover {
    background-image: url(${LinkedinBlueIcon});
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
  const [sameMarginTop, setSameMarginTop] = useState( '10px')

  // useEffect(()=>{
  //   setSameMarginTop(document.querySelector('.textSec').clientHeight+'px');
  //   document.querySelector(".result").style.marginTop = sameMarginTop
  // })
  // useEffect(()=>{
//   if (document.querySelector('.result')){
//     console.log();
//     let marTop = document.querySelector('.textSec').style.getPropertyValue('--height');
//     document.querySelector('.calculatorsMenu').style.marginTop = marTop;
//   }
// })
  hookComponent();
  // const [selectCalculator, setSelectCalculator] = useState()

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
        {/*{console.log(calculator)}*/}
        {/*{console.log(ctx)}*/}
        {/*{console.log([ctx.originalPath.split('/')[2].replace('-' , '_')])}*/}
        {/*{console.log(selectCalculator.title)}*/}

        <Col className="calculatorsMenu" span={6} style={{paddingRight: '10px', paddingLeft: '35px'}}>
          <CalculatorNav t={calculator} locale={ctx.locale} />
        </Col>
        <Col span={18} style={{paddingRight: '35px'}}>
          {children}
        </Col>
      </Row>

      {/*<Row style={{ marginTop: "25px" }}>*/}
      {/*  <Col span={6} offset={6}>*/}
      {/*    <ShareLabel>{calculator.share}</ShareLabel>*/}

      {/*    <FacebookShareButton url={urlShared} children={<FacebookIcon />} />*/}

      {/*    <LinkedinShareButton children={<LinkedinIcon />} url={urlShared} />*/}
      {/*  </Col>*/}
      {/*</Row>*/}
    </>
  )
}

export default CalculatorWrapper;
