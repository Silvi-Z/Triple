/*eslint-disable */
import React from "react"
import { Row } from "antd"
import {
  ContainerNews,
  TextWrapper,
  ImgWrapper,
  Ptext,
  WrapperImg,
  H2text
} from "./newsStyle"

const News = ({ data, openpage }) => {
  return (
    <ContainerNews ls={24}>
      <Row>
        <ImgWrapper xl={6} lg={6} md={6} xs={24}>
          <WrapperImg src={data.Imgurl} alt={"img"} />
        </ImgWrapper>
        <TextWrapper xl={18} lg={18} md={18} xs={24}>
          <H2text>{data.heading}</H2text>
          <hr width="10%" style={{ marginBottom: "9px" }} />
          <Ptext>{data.paragraph}</Ptext>
        </TextWrapper>
      </Row>
    </ContainerNews>
  )
}

export default News
