import React from "react"
import styled from "styled-components"
import { Row, Col } from "antd"
import RightArrowImg from "../../assets/informimages/rightarrow.svg"

const ContainerUseful = styled(Row)`
  width: 85%;
  margin-top: 3%;
  padding: 2%;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.01);
  background-color: #f7f7f7;
  @media only screen and (max-width: 1170px) {
    width: 94%;
  }
  @media only screen and (max-width: 768px) {
    width: 97%;
  }
`

const TextWrapper = styled(Col)`
  padding: 0 1%;
  width: 20%;
  display: flex;

  h2 {
    height: 18px;
    font-family: ArialAMU;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
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
    margin-left: 0;
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
const Img = styled.img`
  width: 20px;
  height: 15px;
  margin-left: 1.5%;
  margin-top: 0.5%;
  cursor: pointer;
  object-fit: contain;
  font-weight: bold;
`
const Hr = styled.hr`
  width: 150%;
  height: 1px;
  background-color: #d7d7d7;
`
const UsefulInform = ({ usedata }) => {
  const linklist = usedata.data.links.map(lin => (
    <a href={lin.link} download={lin.link} target="_blank" key={lin.id}>
      <li>{lin.label}</li>
    </a>
  ))

  return (
    <ContainerUseful>
      <Hr />
      <TextWrapper span={24}>
        <a href={usedata.data.href} target="_blank">
          <h2>{usedata.data.first_heading}</h2>
        </a>
        <Img src={RightArrowImg} />
      </TextWrapper>
      <ListWrapper>
        <ul>{linklist}</ul>
      </ListWrapper>
    </ContainerUseful>
  )
}

export default UsefulInform
