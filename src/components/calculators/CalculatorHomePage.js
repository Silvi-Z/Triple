import React from "react";
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

const CalculatorHomePage = () =>{
  return(
    <>
    <ResponsWrapper>
      <ContainerRow>
        {contentData.map(item => (
          <ContentContainer>
            <ContentLink to={item.link}>
              <CalcImagesWrapper>
                <IconWrapper src={item.src} alt={"icon"}/>
                <PElement>{item.text}</PElement>
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
