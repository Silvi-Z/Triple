import React from "react"
import contentData from "./contentData"
import {
  NavLink,
  PStyled,
  H2Styled,
  IconWrapper,
  SeemoreWrapper,
  ResponsWrapper,
  PartnerspHeadingColumn,
} from "./homePartStyle.js"
import { ContentContainer, Div, InfoAboutPartners, ServiceNameWrapper } from "../homeServices/homeServiceStyle"

const Homepartners = ({ langText, lang }) => {
  return (
    <>
      <PartnerspHeadingColumn>
        <H2Styled>{langText.title}</H2Styled>
        <PStyled>
          {langText.sub_title}
        </PStyled>
      </PartnerspHeadingColumn>
      <ResponsWrapper>
        {contentData.map(item => (
          <ContentContainer key={item.name}>
            <Div>
              <ServiceNameWrapper>
                <IconWrapper src={item.src} alt={"icon"}/>
              </ServiceNameWrapper>
              <InfoAboutPartners>
                {item.name}
                <p>{item.sphere}</p>
              </InfoAboutPartners>
            </Div>
          </ContentContainer>
        ))}
      </ResponsWrapper>
      <NavLink to={`/${lang}/contact`}>
        <SeemoreWrapper
          className="submit_button">
          {langText.button_text}
        </SeemoreWrapper>
      </NavLink>
    </>
  )
}

export default Homepartners
