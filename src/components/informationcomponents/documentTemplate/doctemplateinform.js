import React from "react"
import {
  ContainerUseful,
  TextWrapper,
  ListWrapper,
  Hr
} from "./docStyle"
const DocTemplateInform = ({ usedata }) => {
  const linklist = usedata.data.links.map(lin => (
    <a
      href={lin.link}
      target="_blank
    "
      key={lin.id}
    >
      <li>{lin.label}</li>
    </a>
  ))

  return (
    <ContainerUseful>
      <TextWrapper span={24}>
        <h2>{usedata.data.first_heading}</h2>
      </TextWrapper>
      <Hr />
      <ListWrapper>
        <ul>{linklist}</ul>
      </ListWrapper>
    </ContainerUseful>
  )
}

export default DocTemplateInform
