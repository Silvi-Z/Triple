import React, { useState } from "react"
import {
  NavLink,
  Link,
  H2Styled,
  PStyled,
  SeemoreWrapper,
  ServiceNameWrapper,
  ResponsWrapper,
  ContentContainer,
  ContainerRow,
  ServiceTitle
} from "./homeServiceStyle.js"
import contentData from "./contentData"
const HomeServices = ({ langText, lang }) => {
  return (
    <>
      <ServiceTitle>
        <H2Styled>{langText.title}</H2Styled>
        <PStyled>{langText.sub_title}</PStyled>
      </ServiceTitle>
      <ResponsWrapper>
        <ContainerRow>
          {contentData.map(item=>(
            <ContentContainer>
              <Link to={`/${lang}/${item.link}`} >
                <ServiceNameWrapper>
                  {item.serviceName}
                </ServiceNameWrapper>
              </Link>
            </ContentContainer>
          ))}
        </ContainerRow>
      </ResponsWrapper>
      <NavLink to={`/${lang}/services/`}>
        <SeemoreWrapper className="submit_button">
            {langText.button_text}
        </SeemoreWrapper>
      </NavLink>
    </>
  )
}

export default HomeServices
