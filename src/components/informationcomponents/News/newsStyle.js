import styled from "styled-components"
import { Col } from "antd"

export const ContainerNews = styled(Col)`
  max-width: 790px;
  height: 150px;
  overflow: hidden;
  margin-top: 5%;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  @media only screen and (max-width: 768px) {
    max-width: 738px;
  }
  @media only screen and (max-width: 375px) {
    max-width: 290px;
    height: 365px;
  }
  @media only screen and (max-width: 320px) {
    max-width: 290px;
    height: 365px;
  }
`
export const ImgWrapper = styled(Col)`
  height: -webkit-fill-available;
`
export const TextWrapper = styled(Col)`
  padding: 2.2% 1%;
  &:hover {
    color: #009db8;
    cursor: pointer;
    h2 {
      color: #009db8;
    }
    p {
      color: #009db8;
    }
  }
`
export const Ptext = styled.p`
  height: auto;
  font-family: ArialAMU;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media only screen and (max-width: 375px) {
    width: 268px;
    height: 133px;
    font-family: ArialAMU;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media only screen and (max-width: 320px) {
    width: 268px;
    height: 133px;
    font-family: ArialAMU;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`
export const WrapperImg = styled.img`
  height: -webkit-fill-available;
  cursor: pointer;
  @media only screen and (max-width: 375px) {
    width: 100%;
    height: 150px;
  }
  @media only screen and (max-width: 320px) {
    width: 100%;
    height: 150px;
  }
`
export const H2text = styled.h2`
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-bottom: 8px;
`
