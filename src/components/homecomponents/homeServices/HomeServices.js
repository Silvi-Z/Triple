import React from "react"
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
const HomeServices = ({pageContext, langText, lang }) => {
  return (
    <>
      <ServiceTitle>
        <H2Styled>{langText.title}</H2Styled>
        <PStyled>{langText.sub_title}</PStyled>
      </ServiceTitle>
      <ResponsWrapper>
        <ContainerRow>
          {pageContext.map(item=>(
            <ContentContainer
              key={item.link}
              className="servicesContainer"
            >
              <Link to={`/${lang}/${item.link}`} >
                <ServiceNameWrapper>
                  {item.paragraph}
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
