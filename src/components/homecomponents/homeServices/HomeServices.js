import React from "react"
import {
  ContainerRow,
  ContentContainer,
  H2Styled,
  Link,
  NavLink,
  PStyled,
  ResponseWrapper,
  SeemoreWrapper,
  ServiceNameWrapper,
  ServiceTitle,
} from "./homeServiceStyle.js"
import { ServicesContainer } from "./homeServiceStyle"

const HomeServices = ({ pageContext, langText, lang }) => {
  return (
    <>
      <ServiceTitle>
        <H2Styled>{langText.title}</H2Styled>
        <PStyled>{langText.sub_title}</PStyled>
      </ServiceTitle>
      <ResponseWrapper>
        <ContainerRow>
          {pageContext.map((item, index) => (
            <ServicesContainer
              key={`services_${index}`}
              className="servicesContainer"
            >
              <Link to={`/${lang}/${item.link}`}>
                <ServiceNameWrapper>
                  {item.paragraph}
                </ServiceNameWrapper>
              </Link>
            </ServicesContainer>
          ))}
        </ContainerRow>
      </ResponseWrapper>
      <NavLink to={`/${lang}/services/`}>
        <SeemoreWrapper className="submit_button">
          {langText.button_text}
        </SeemoreWrapper>
      </NavLink>
    </>
  )
}

export default HomeServices
