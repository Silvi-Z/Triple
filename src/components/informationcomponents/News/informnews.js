/*eslint-disable */
import React, { useState, useEffect } from "react"
import { Row } from "antd"
import {
  ContainerNews,
  TextWrapper,
  ImgWrapper,
  Ptext,
  WrapperImg,
  H2text,
} from "./newsStyle"
import ReadMoreReact from "read-more-react"

const News = ({ data, openpage }) => {
  const [seeMore, setseeMore] = useState(false)
  useEffect(() => {

  }, [seeMore])
  return (
    <ContainerNews seemore={seeMore.toString()} ls={24}>
      <Row>
        <ImgWrapper xl={6} lg={6} md={6} xs={24}>
          <WrapperImg src={data.Imgurl} alt={"img"} />
        </ImgWrapper>
        <TextWrapper xl={18} lg={18} md={18} xs={24}>
          <H2text>{data.heading}</H2text>
          <hr width="10%" style={{ marginBottom: "9px" }} />
          <ReadMoreReact
            id="seeMore"
            readMoreText=" ... տեսնել ավելին"
            min={100}
            ideal={120}
            max={150}
            text={data.paragraph}
            onClick={() => setseeMore(!seeMore)}
          />
        </TextWrapper>
      </Row>
    </ContainerNews>
  )
}

export default News
