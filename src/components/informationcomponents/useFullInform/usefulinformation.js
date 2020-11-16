import React from "react"
import { RightOutlined } from "@ant-design/icons"
import {
  ContainerUseful,
  TextWrapper,
  ListWrapper,
  Hr,
  IconWrapper,
} from "./useStyle"
import "./useStyle.css"

const UsefulInform = ({ usedata }) => {
  // const linklist =

  return (
    <a href={usedata.data.href}>
    <ContainerUseful>
      <TextWrapper span={24}>
        <a href={usedata.data.href} target="_blank">
          <h2>{usedata.data.first_heading}</h2>
        </a>
        <IconWrapper><RightOutlined/></IconWrapper>
      </TextWrapper>
      <Hr/>
      <ListWrapper>
        <ul>{usedata.data.links.map(({ link, id, label }) => (
          <a
            href={link}
            download={link}
            target="_blank"
            key={id}
          >
            {label}
          </a>
        ))}
        </ul>
      </ListWrapper>

    </ContainerUseful>
    </a>
  )
}

export default UsefulInform
