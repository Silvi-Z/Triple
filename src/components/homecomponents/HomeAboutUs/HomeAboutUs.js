import React from "react"
import {
  H1Element,
  ImagePart,
  BigImage,
  SliderAboutUs,
  TextWrapper,
  PElement,
  TextComponent,
  TextOrder,
  InformationSection,
  TripleIconWrapper,
} from "./homeAboutUsStyle"
import PhoneImg from "../../../assets/homeImages/phone.png"
import TripleIcon from "../../../assets/homeImages/tripleIcon.png"
// import "../../layout.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

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
      <H1Element>
        TRUST.DEAL.PROFIT!
      </H1Element>
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
          <img src={TripleIcon} />
        </TripleIconWrapper>
        <SliderAboutUs {...settings}>
          <TextComponent>
            <TextOrder>01.</TextOrder>
            <p>Թրիփլ Քոնսալթինգը հիմնադրվել է 2019 թ.-ին ։ Լինելով նոր և երիտասարդ կազմակերպություն ` հասցրել է գրանցել բազմաթիվ հաջողություններ և ձերք բերել հավատարիմ գործընկերներ։</p>
          </TextComponent>
          <TextComponent>
            <TextOrder>02.</TextOrder>
            <p>Թրիփլ Քոնսալթինգը հիմնադրվել է 2019 թ.-ին ։ Լինելով նոր և երիտասարդ կազմակերպություն ` հասցրել է գրանցել բազմաթիվ հաջողություններ և ձերք բերել հավատարիմ գործընկերներ։</p>
          </TextComponent>
          <TextComponent>
            <TextOrder>03.</TextOrder>
            <p>Թրիփլ Քոնսալթինգը հիմնադրվել է 2019 թ.-ին ։ Լինելով նոր և երիտասարդ կազմակերպություն ` հասցրել է գրանցել բազմաթիվ հաջողություններ և ձերք բերել հավատարիմ գործընկերներ։</p>
          </TextComponent>
          <TextComponent>
            <TextOrder>01.</TextOrder>
            <p>Թրիփլ Քոնսալթինգը հիմնադրվել է 2019 թ.-ին ։ Լինելով նոր և երիտասարդ կազմակերպություն ` հասցրել է գրանցել բազմաթիվ հաջողություններ և ձերք բերել հավատարիմ գործընկերներ։</p>
          </TextComponent>
          <TextComponent>
            <TextOrder>02.</TextOrder>
            <p>Թրիփլ Քոնսալթինգը հիմնադրվել է 2019 թ.-ին ։ Լինելով նոր և երիտասարդ կազմակերպություն ` հասցրել է գրանցել բազմաթիվ հաջողություններ և ձերք բերել հավատարիմ գործընկերներ։</p>
          </TextComponent>
          <TextComponent>
            <TextOrder>03.</TextOrder>
            <p>Թրիփլ Քոնսալթինգը հիմնադրվել է 2019 թ.-ին ։ Լինելով նոր և երիտասարդ կազմակերպություն ` հասցրել է գրանցել բազմաթիվ հաջողություններ և ձերք բերել հավատարիմ գործընկերներ։</p>
          </TextComponent>
        </SliderAboutUs>
      </InformationSection>
    </>
  )
}

export default HomeAboutUs;
