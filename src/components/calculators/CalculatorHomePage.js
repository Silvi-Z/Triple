import React, { useState } from "react"
import contentData from "./contentData"
import {
  CalcImagesWrapper ,
  IconWrapper
} from "./styled"
import {
  ResponsWrapper,
  CalculatorContainer,
  ContainerRow,
  ContentLink,
  PElement
} from "../homecomponents/homeServices/homeServiceStyle"
import useTranslations from "../useTranslations"

const CalculatorHomePage = ({ pageContext }) => {
  const { calculator } = useTranslations();
  return(
    <>
    <ResponsWrapper>
      <ContainerRow>
        {contentData.map(item => (
          <CalculatorContainer key={item.src}>
            <ContentLink to={`/${pageContext}${item.link}`}>
              <CalcImagesWrapper>
                <IconWrapper src={item.src} alt={"icon"}/>
                <PElement>{item.title[0][`${pageContext}`]}</PElement>
              </CalcImagesWrapper>
            </ContentLink>
          </CalculatorContainer>
        ))}

        </ContainerRow>
    </ResponsWrapper>
    </>
  )
}

export default CalculatorHomePage;
