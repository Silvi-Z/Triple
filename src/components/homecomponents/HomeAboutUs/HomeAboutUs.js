import React from "react"
import {
  Slogan,
  ImagePart,
  BigImage,
  TripleIcon,
  SliderAboutUs,
  TextWrapper,
  PElement,
  TextComponent,
  TextOrder,
  InformationSection,
  TripleIconWrapper, SliderText,
} from "./homeAboutUsStyle"
import PhoneImg from "../../../assets/homeImages/phone.png"
import Icon from "../../../assets/homeImages/tripleIcon.png"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import slides from "./sliderDatas"

const HomeAboutUs = () => {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    arrows: true,
    autoplay: false,
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
          customPaging: (i) => <>{`0${++i}/06`}</>
        }
      }],
    customPaging: (i) => <>{`0${++i}/02`}</>
  }

  return (
    <>
      <Slogan>
        TRUST.DEAL.PROFIT!
      </Slogan>
      <InformationSection>
        <ImagePart>
          <BigImage src={PhoneImg} />
          <TextWrapper>
            <PElement>
              Թրիփլ Քոնսալթինգը հիմնադրվել է 2019 թ.-ին ։ Լինելով նոր և երիտասարդ կազմակերպություն ` հասցրել է գրանցել բազմաթիվ հաջողություններ և ձեռք բերել հավատարիմ գործընկերներ։ Մեր թիմը վստահ է, որ մեր հաջողության գրավականը երիտասարդությունն է, գործում նոր շունչ և ոգի մտցնելու կարողությունը։
            </PElement>
          </TextWrapper>
        </ImagePart>
        <TripleIconWrapper>
          <TripleIcon src={Icon} />
        </TripleIconWrapper>
        <SliderAboutUs {...settings}>
          {slides.map((slide ,index)=>(
            <TextComponent key={index}>
              <TextOrder>{slide.order}</TextOrder>
              <SliderText>{slide.context}</SliderText>
            </TextComponent>
          ))}
        </SliderAboutUs>
      </InformationSection>
    </>
  )
}

export default HomeAboutUs;
