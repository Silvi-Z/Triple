import React from "react"
import {
  ContainerUseful,
  TextWrapper,
  LineWrapper,
  ContainerNews,
  DownloadingIcon,
  H2text
} from "./docStyle"
import { Row } from "antd"
const DocTemplateInform = ({ usedata }) => {

  return (
    <ContainerUseful>
      {usedata.data.links.map(({label}) => (
        <ContainerNews>
          <Row>
            <LineWrapper >
              <TextWrapper>
                <H2text>{label}</H2text>
              </TextWrapper>
              <DownloadingIcon/>
            </LineWrapper>
          </Row>
        </ContainerNews>
      ))}
    </ContainerUseful>
  )
}

export default DocTemplateInform
