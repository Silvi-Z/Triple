import React from "react"
import styled from "styled-components"
import Slider from "react-slick"
import "./layout.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Img from "../assets/homeImages/icons/home_slidephoto.jpg"
const Slide = styled.div`
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    margin-left: 0;
    margin-top: -50px;
  }
`

const Slideshow = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
  }

  return (
    <Slider {...settings}>
      <Slide>
        <img src={Img} />
      </Slide>
      <Slide>
        <img src={Img} />
      </Slide>
      <Slide>
        <img src={Img} />
      </Slide>
    </Slider>
  )
}

export default Slideshow
