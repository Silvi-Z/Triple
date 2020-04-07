import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { Typography, Row, Col, Button, InputNumber } from "antd"

const ContainerUseful = styled(Row)`
  width: 85%;
  margin-top: 3%;
  padding: 2%;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  @media only screen and (max-width: 1170px) {
    width: 94%;
  }
  @media only screen and (max-width: 768px) {
    width: 97%;
  }
`

const TextWrapper = styled(Col)`
  padding: 1% 1%;
  h2 {
    width: 417px;
    height: 16px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  h3 {
    width: 199px;
    height: 12px;
    font-family: ArialAMU;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media only screen and (max-width: 375px) {
    h2 {
      width: 249px;
      height: 35px;
      font-family: ArialAMU;
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #000000;
    }
    h3 {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 320px) {
    h2 {
      width: 249px;
      height: 35px;
      font-family: ArialAMU;
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #000000;
    }
    h3 {
      font-size: 12px;
    }
  }
`
const ListWrapper = styled(Col)`
  ul {
    list-style: none;
  }
  @media only screen and (max-width: 320px) {
    ul {
      font-family: ArialAMU;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #009db8;
    }
  }
`
const UsefulInform = ({ usedata }) => {
  console.log(usedata)
  const linklist = usedata.data.links.map(lin => (
    <a href={lin.link} download={lin.link} target="_blank">
      <li>{lin.label}</li>
    </a>
  ))

  return (
    <ContainerUseful>
      <TextWrapper span={24}>
        <h2>{usedata.data.first_heading}</h2>
        <h3> {usedata.data.second_heading}</h3>
      </TextWrapper>
      <ListWrapper>
        <ul>{linklist}</ul>
      </ListWrapper>
    </ContainerUseful>
  )
}

export default UsefulInform
