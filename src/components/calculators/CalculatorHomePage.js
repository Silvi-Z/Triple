import React, { useState } from "react"
import contentData from "./contentData"
import {
  CalcImagesWrapper ,
  IconWrapper
} from "./styled"
import { ResponsWrapper } from "../homecomponents/homePartners/homePartStyle"
import {
  ContentContainer,
  ContainerRow,
  ContentLink,
  PElement
} from "../homecomponents/homeServices/homeServiceStyle"

const CalculatorHomePage = ({ pageContext }) => {
  return(
    <>
    <ResponsWrapper>
      <ContainerRow>
        {contentData.map(item => (
          <ContentContainer key={item.src}>
            <ContentLink to={`/${pageContext}${item.link}`}>
              <CalcImagesWrapper>
                <IconWrapper src={item.src} alt={"icon"}/>
                <PElement>{item.title[0][pageContext]}</PElement>
              </CalcImagesWrapper>
            </ContentLink>
          </ContentContainer>
        ))}

        </ContainerRow>
    </ResponsWrapper>
    </>
  )
}

export default CalculatorHomePage;
