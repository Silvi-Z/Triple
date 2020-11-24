import React, { useState } from "react"
import {
  NavLink,
  H2Styled,
  PStyled,
  SeemoreWrapper,
  ServiceNameWrapper,
  ResponsWrapper,
  Borders,
  ContainerRow,
  ServiceTitle
} from "./homeServiceStyle.js"
import { AnchorLink } from "gatsby-plugin-anchor-links";

const HomeServices = ({ langText, lang }) => {
  // const [clickedItems, setClickedItems] = useState(null)
  return (
    <>
      <ServiceTitle>
        <H2Styled>{langText.title}</H2Styled>
        <PStyled>{langText.sub_title}</PStyled>
      </ServiceTitle>
      <ResponsWrapper>
        <ContainerRow>
            <Borders
              borderRight
              borderBottom
            >
              <AnchorLink to={`/${lang}/services#test_1`} >
                <ServiceNameWrapper>
                  {langText.serviceName_1}
                </ServiceNameWrapper>
              </AnchorLink>
            </Borders>
            <Borders
              borderBottom
              borderRight
              borderLeft
            >
              <AnchorLink to={`/${lang}/services#test_2`} >
                <ServiceNameWrapper>
                  {langText.serviceName_2}
                </ServiceNameWrapper>
              </AnchorLink>
            </Borders>
            <Borders
              borderBottom
              borderLeft
            >
              <AnchorLink to={`/${lang}/services#test_3`} >
                <ServiceNameWrapper>
                  {langText.serviceName_3}
                </ServiceNameWrapper>
              </AnchorLink>
            </Borders>
            <Borders
              borderRight
              borderTop
              borderBottom
            >
              <AnchorLink to={`/${lang}/services#test_4`} >
                <ServiceNameWrapper>
                  {langText.serviceName_4}
                </ServiceNameWrapper>
              </AnchorLink>
            </Borders>
            <Borders
              borderRight
              borderTop
              borderLeft
              borderBottom
            >
              <AnchorLink to={`/${lang}/services#test_5`} >
                <ServiceNameWrapper>
                  {langText.serviceName_5}
                </ServiceNameWrapper>
              </AnchorLink>
            </Borders>
            <Borders
              borderLeft
              borderTop
              borderBottom
            >
              <AnchorLink to={`/${lang}/services#test_6`} >
                <ServiceNameWrapper>
                  {langText.serviceName_6}
                </ServiceNameWrapper>
              </AnchorLink>
            </Borders>
            <Borders
              borderRight
              borderTop
            >
              <AnchorLink to={`/${lang}/services#test_7`} >
                <ServiceNameWrapper>
                  {langText.serviceName_7}
                </ServiceNameWrapper>
              </AnchorLink>
            </Borders>
          <Borders
              borderRight
              borderTop
              borderLeft
            >
            <AnchorLink to={`/${lang}/calculators/salary`} >
              <ServiceNameWrapper>
                {langText.serviceName_8}
              </ServiceNameWrapper>
            </AnchorLink>
            </Borders>
          <Borders
              borderTop
              borderLeft
            >
            <AnchorLink to={`/${lang}/services#test_9`} >
              <ServiceNameWrapper>
                {langText.serviceName_9}
              </ServiceNameWrapper>
            </AnchorLink>
            </Borders>


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
