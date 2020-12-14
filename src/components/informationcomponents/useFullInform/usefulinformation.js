import React from "react"
import { RightOutlined } from "@ant-design/icons"
import {
  ContainerUseful,
  DownloadLink,
  IconWrapper,
  GeneralLink,
  TextWrapper,
  ListWrapper,
  Hr,
} from "./useStyle"

const UsefulInform = ({ usedata }) => {
  // const linklist =

  return (

    <ContainerUseful>
      <GeneralLink
        to={usedata.data.href}
        target="_blank"
      >
        <TextWrapper span={24}>
          <h2>{usedata.data.first_heading}</h2>
          <IconWrapper/>
        </TextWrapper>
      </GeneralLink>
      <Hr />
      <ListWrapper>
        <ul>
          {usedata.data.links.map(({ link, id, label }) => (
            <DownloadLink
              href={link}
              download={link}
              target="_blank"
              key={id}
            >
              {label}
            </DownloadLink>
          ))}
        </ul>
      </ListWrapper>

    </ContainerUseful>

  )
}

export default UsefulInform
