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

const LeftSectionUseInform = ({ usedata }) => {
  return (
    <a href={usedata.data.href} target="_blank">
    <ContainerUseful>
      <TextWrapper span={24}>
          <h2>{usedata.data.first_heading}</h2>
        <IconWrapper><RightOutlined/></IconWrapper>
      </TextWrapper>
      <Hr/>
      <ListWrapper>
        <ul>
          {usedata.data.links.map(({link, id, label}) => (
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

export default LeftSectionUseInform;
