import React, { useEffect, useState } from "react"
import {
  H2Styled,
  IconWrapper,
  NavLink,
  PartnerspHeadingColumn,
  PStyled,
  ResponseWrapper,
  SeemoreWrapper,
} from "./homePartStyle.js"
import {
  ContentContainer,
  Div,
  InfoAboutPartners,
  PartnersContainer,
  ServiceNameWrapper,
} from "../homeServices/homeServiceStyle"
import triple from "../../../api/triple"
import apiUrl from "../../../api/api.json"

const Homepartners = ({ langText, lang }) => {
  const [partners, setPartners] = useState([])
  const settings = {
    // infinite: true,
    // arrows: false,
    // pauseOnFocus: true,
    // // pauseOnHover: true,
    // // autoplay: true,
    // // autoplaySpeed: 0,
    // slidesToScroll: 0.4,
    // autoplay: true,
    // autoplaySpeed: 0,
    // swipe:true,
    // speed: 5000,
    // // speed: 7000,
    // cssEase: 'linear',
    autoplay: true,
    infinite: true,
    swipe: true,
    pauseOnFocus: true,
    slidesToShow:2,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    arrows: false,
    autoplaySpeed: 0,
    speed: 7000,
    rows:1,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
        },
      }],
  }
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
      <ResponseWrapper {...settings}>
        {partners.map((item, index) => (
          <PartnersContainer key={`partner_${index}`}>
            <Div href={item.url} target='_blank'>
              <ServiceNameWrapper>
                <IconWrapper src={apiUrl.apiUrl + item.image} alt={"icon"} />
              </ServiceNameWrapper>
              <InfoAboutPartners>
                {item[`name_${lang}`]}
                <p>{item[`sphere_${lang}`]}</p>
              </InfoAboutPartners>
            </Div>
          </PartnersContainer>
        ))}
      </ResponseWrapper>
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
