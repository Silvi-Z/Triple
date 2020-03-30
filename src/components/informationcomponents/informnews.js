import React, { useState } from "react"
import styled from "styled-components"
import { Typography, Row, Col, Button, InputNumber } from "antd"


const ContainerNews = styled(Row)`
  width: 85%;
  height: 150px;
  overflow: hidden;
  margin-top: 5%;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.4);
  background-color: #ffffff;
`
const ImgWrapper = styled(Col)``
const TextWrapper = styled(Col)`
  padding: 1% 1%;
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
const Ptext = styled.p`
  font-family: ArialAMU;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`
const WrapperImg = styled.img``
const H2text = styled.h2`
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`
const News = ({ data, openpage }) => {
  console.log(data)
  //const [open, setopen] = useState(false)

  return (
    <ContainerNews onClick={openpage}>
      <ImgWrapper span={6}>
        <WrapperImg src={data.Imgurl} alt={"img"} />
      </ImgWrapper>
      <TextWrapper span={18}>
        <H2text>{data.heading}</H2text>
        <hr width="10%" />
        <Ptext>{data.paragraph}</Ptext>
      </TextWrapper>
    </ContainerNews>
  )
}

export default News
