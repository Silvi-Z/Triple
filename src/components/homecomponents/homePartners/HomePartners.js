import React, { useEffect, useState } from "react"
import {
  H2Styled,
  IconWrapper,
  NavLink,
  PartnerspHeadingColumn,
  PStyled,
  ResponsWrapper,
  SeemoreWrapper,
} from "./homePartStyle.js"
import { ContentContainer, Div, InfoAboutPartners, ServiceNameWrapper } from "../homeServices/homeServiceStyle"
import triple from "../../../api/triple"
import apiUrl from "../../../api/api.json"

const Homepartners = ({ langText, lang }) => {
  const [partners, setPartners] = useState([])

  useEffect(() => {
    triple.get("/api/partner")
      .then(res => {
        setPartners(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <PartnerspHeadingColumn>
        <H2Styled>{langText.title}</H2Styled>
        <PStyled>
          {langText.sub_title}
        </PStyled>
      </PartnerspHeadingColumn>
      <ResponsWrapper>
        {partners.map((item, index) => (
          <ContentContainer key={`partner_${index}`}>
            <Div href={item.url} target='_blank'>
              <ServiceNameWrapper>
                <IconWrapper src={apiUrl.apiUrl + item.image} alt={"icon"} />
              </ServiceNameWrapper>
              <InfoAboutPartners>
                {item.name_arm}
                <p>{item.sphere_arm}</p>
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
