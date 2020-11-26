import React, { useState } from "react"
import {
  NavLink,
  Link,
  H2Styled,
  PStyled,
  SeemoreWrapper,
  ServiceNameWrapper,
  ResponsWrapper,
  Borders,
  ContainerRow,
  ServiceTitle
} from "./homeServiceStyle.js"

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
              <Link to={`/${lang}/services#test_1`} >
                <ServiceNameWrapper>
                  {langText.serviceName_1}
                </ServiceNameWrapper>
              </Link>
            </Borders>
            <Borders
              borderBottom
              borderRight
              borderLeft
            >
              <Link to={`/${lang}/services#test_2`} >
                <ServiceNameWrapper>
                  {langText.serviceName_2}
                </ServiceNameWrapper>
              </Link>
            </Borders>
            <Borders
              borderBottom
              borderLeft
            >
              <Link to={`/${lang}/services#test_3`} >
                <ServiceNameWrapper>
                  {langText.serviceName_3}
                </ServiceNameWrapper>
              </Link>
            </Borders>
            <Borders
              borderRight
              borderTop
              borderBottom
            >
              <Link to={`/${lang}/services#test_4`} >
                <ServiceNameWrapper>
                  {langText.serviceName_4}
                </ServiceNameWrapper>
              </Link>
            </Borders>
            <Borders
              borderRight
              borderTop
              borderLeft
              borderBottom
            >
              <Link to={`/${lang}/services#test_5`} >
                <ServiceNameWrapper>
                  {langText.serviceName_5}
                </ServiceNameWrapper>
              </Link>
            </Borders>
            <Borders
              borderLeft
              borderTop
              borderBottom
            >
              <Link to={`/${lang}/services#test_6`} >
                <ServiceNameWrapper>
                  {langText.serviceName_6}
                </ServiceNameWrapper>
              </Link>
            </Borders>
            <Borders
              borderRight
              borderTop
            >
              <Link to={`/${lang}/services#test_7`} >
                <ServiceNameWrapper>
                  {langText.serviceName_7}
                </ServiceNameWrapper>
              </Link>
            </Borders>
          <Borders
              borderRight
              borderTop
              borderLeft
            >
            <Link to={`/${lang}/calculators/salary`} >
              <ServiceNameWrapper>
                {langText.serviceName_8}
              </ServiceNameWrapper>
            </Link>
            </Borders>
          <Borders
              borderTop
              borderLeft
            >
            <Link to={`/${lang}/services#test_9`} >
              <ServiceNameWrapper>
                {langText.serviceName_9}
              </ServiceNameWrapper>
            </Link>
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
