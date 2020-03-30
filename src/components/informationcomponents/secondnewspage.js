import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { Typography, Row, Col, Button, InputNumber } from "antd"

const ContainerNews = styled(Row)`
  border: 1px solid;
  border-color: red;
`

const NewsCol = styled(Col)`
  border: 1px solid;
`
const Images = styled(Col)`
  border: 1px solid;
`
const UsefulNews = () => {
  return (
    <ContainerNews>
      <NewsCol span={16}></NewsCol>
      <Images span={8}></Images>
    </ContainerNews>
  )
}

export default UsefulNews
