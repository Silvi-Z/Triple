import React from "react"
import {
  ContainerUseful,
  TextWrapper,
  ListWrapper,
  IconWrapper,
  GeneralLink,
  Hr,
} from "./useStyle"

const LeftSectionUseInform = ({ usedata }) => {
  return (

    <ContainerUseful>
      <GeneralLink href={usedata.data.href} target="_blank">
      <TextWrapper span={24}>
          <h2>{usedata.data.first_heading}</h2>
        <IconWrapper/>
      </TextWrapper>
    </GeneralLink>
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

  )
}

export default LeftSectionUseInform;
