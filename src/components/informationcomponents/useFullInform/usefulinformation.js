import React from "react"
import RightArrowImg from "../../../assets/informimages/rightarrow.svg"
import {
  ContainerUseful,
  TextWrapper,
  ListWrapper,
  Img,
  Hr
} from "./useStyle"
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
