import React from "react"
import {
  BigImage,
  ImagePart,
  InformationSection,
  PElement,
  SliderAboutUs,
  SliderText,
  TextComponent,
  TextOrder,
  TextWrapper,
  TripleIcon,
  TripleIconWrapper,
} from "./homeAboutUsStyle"
import PhoneImg from "../../../assets/homeImages/phone.png"
import Icon from "../../../assets/homeImages/tripleIcon.png"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const HomeAboutUs = ({ pageContext }) => {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    rows: 3,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          infinite: true,
          dots: true,
          rows: 1,
          slidesPerRow: 1,
          customPaging: (i) => <>{`0${++i}/06`}</>,
        },
      }],
    customPaging: (i) => <>{`0${++i}/02`}</>,
  }
  const slides = pageContext.localeResources.translation.home
  return (
    <>
      <InformationSection>
        <ImagePart>
          <BigImage src={PhoneImg} />
          <TextWrapper>
            <PElement>
              {slides.aboutUs}
            </PElement>
          </TextWrapper>
        </ImagePart>
        <TripleIconWrapper>
          <TripleIcon src={Icon} />
        </TripleIconWrapper>
        <SliderAboutUs {...settings}>
          {slides.slide.map((slide, index) => (
            <TextComponent key={`about_${index}`}>
              <TextOrder>{slide.order}</TextOrder>
              <SliderText>{slide.context}</SliderText>
            </TextComponent>
          ))}
        </SliderAboutUs>
      </InformationSection>
    </>
  )
}

export default HomeAboutUs
