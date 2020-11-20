import styled from "styled-components"
import Slider from "react-slick"

export const SliderAboutUs = styled(Slider)`
 height:fit-content;
  @media only screen and (max-width: 1094px) {
    .slick-slide {
      display:flex;
    }
  }
`
export const H1Element = styled.h1`
  font-weight: bold;
  font-size: 44px;
  display: flex;
  justify-content: center;
  letter-spacing: 16.65px;
  @media only screen and (max-width: 1094px) {
    display:none;
  }
 `
export const InformationSection= styled.div`
  display:flex;
  position: relative;
  height: fit-content;
  justify-content: space-between;
  @media only screen and (max-width: 1094px) {
    flex-direction: column;
    justify-content:center;
  }
`
export const TripleIconWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1094px){
   display:none;
  }
`
export const ImagePart = styled.div`
  position: relative;
  height: 666px;
  align-items: center;
  display: flex;
  width: 50%;
  @media only screen and (max-width: 1094px){
   position: inherit;
   width:100%;
   justify-content: center;
   height: 419px;
  }
  @media only screen and (max-width: 768px){
   flex-direction:column;
   min-height:615px;
   height:auto;
  }
 `
export const BigImage = styled.img`
  position: absolute;
  z-index: 1;
  margin-bottom:0;
  @media only screen and (max-width: 1094px){
   position: inherit;
  }
 `
export const TextPart = styled.div`
  // width: 33%;
  // padding-top: 38px;
  // max-width: 394px;
  @media only screen and (max-width: 1094px){
   display:flex !important;
   justify-content: center;
  }
 `
export const TextWrapper = styled.div`
  height: 666px;
  width: 363px;
  background-color:white;
  position: absolute;
  top: 0;
  left: 280px;
  z-index: 0;
  padding: 127px 40px 126px 110px;
  @media only screen and (max-width: 1094px){
    position: initial;
    background-color: transparent;
    height: auto;
    width: auto;
    padding: 127px 40px 126px 35px;
  }
  @media only screen and (max-width: 768px){
    width: 100%;
    padding: 25px 0;
  }
 `
export const PElement = styled.p`
  max-width: 213px;
  letter-spacing: 0.15px;
  line-height: 30px;
  font-weight: bold !important;
  font-size:16px;
  color:black;
  @media only screen and (max-width: 1094px){
   max-width: 280px;
   width:100%
  }
  @media only screen and (max-width: 768px){
   max-width: 100%;
  }
 `
export const TextComponent = styled.div`
 p{
  margin-bottom:40px;
  }
  @media only screen and (max-width: 1094px){
  padding:0 17px;
   p{
    width:100%;
    }
  }
 `
export const TextOrder = styled.h3`
   color: #00B3C7;
   letter-spacing: 0.15px;
 `