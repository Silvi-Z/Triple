import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slide = styled.div`
  ${'' /* width: 150px; */}
  ${'' /* height: 500px; */}
  ${'' /* background-color: #548798; */}
`;

const Slideshow = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings}>
      <Slide>
        <img src="https://via.placeholder.com/1920x400?text=Slide+1" />
      </Slide>
      <Slide>
        <img src="https://via.placeholder.com/1920x400?text=Slide+2" />
      </Slide>
      <Slide>
        <img src="https://via.placeholder.com/1920x400?text=Slide+3" />
      </Slide>
    </Slider>
  );
};

export default Slideshow;