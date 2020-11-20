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
  const [clickedItems, setClickedItems] = useState(null)
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
              <ServiceNameWrapper>
                <AnchorLink
                  to={`/${lang}/services#test_1`}
                >
                  {langText.serviceName_1}
                </AnchorLink>
              </ServiceNameWrapper>
            </Borders>
            <Borders
              borderBottom
              borderRight
              borderLeft
            >
              <ServiceNameWrapper>
                <AnchorLink
                  to={`/${lang}/services#test_2`}
                >
                  {langText.serviceName_2}
                </AnchorLink>
              </ServiceNameWrapper>
            </Borders>
            <Borders
              borderBottom
              borderLeft
            >
              <ServiceNameWrapper>
                <AnchorLink
                  to={`/${lang}/services#test_3`}
                >
                  {langText.serviceName_3}
                </AnchorLink>
              </ServiceNameWrapper>
            </Borders>
            <Borders
              borderRight
              borderTop
            >
              <ServiceNameWrapper>
                <AnchorLink
                  to={`/${lang}/services#test_4`}
                >
                  {langText.serviceName_4}
                </AnchorLink>
              </ServiceNameWrapper>
            </Borders>
            <Borders
              borderRight
              borderTop
              borderLeft
            >
              <ServiceNameWrapper>
                <AnchorLink
                  to={`/${lang}/services#test_5`}
                >
                  {langText.serviceName_5}
                </AnchorLink>
              </ServiceNameWrapper>
            </Borders>
            <Borders
              borderLeft
              borderTop
            >
              <ServiceNameWrapper>
                <AnchorLink
                  to={`/${lang}/services#test_6`}
                >
                  {langText.serviceName_6}
                </AnchorLink>
              </ServiceNameWrapper>
            </Borders>
            {/*<Borders*/}
            {/*  borderRight*/}
            {/*  borderTop*/}
            {/*  borderLeft*/}
            {/*>*/}
            {/*  <ServiceNameWrapper>*/}
            {/*    <AnchorLink*/}
            {/*      to={`/${lang}/services#test_7`}*/}
            {/*    >*/}
            {/*      {langText.serviceName_7}*/}
            {/*    </AnchorLink>*/}
            {/*  </ServiceNameWrapper>*/}
            {/*</Borders>*/}


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
