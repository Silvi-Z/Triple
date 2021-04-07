import React, { useState } from "react"
import {
  H2text,
  TextWrapper,
  LineWrapper,
  ContainerNews,
  DownloadingIcon,
  ContainerUseful,
  FormatsWrapper,
  FormatsIcons,
  Image,
} from "./docStyle"
import { Row } from "antd"

const DocTemplateInform = ({ usedata }) => {

  const [wrapperClass, setWrapperClass] = useState({})

  const selectFormat = (e) => {
    let element = e.target.id;
    (wrapperClass[element] === true) ?
      setWrapperClass({}) :
      setWrapperClass({ [element]: true })
  }
  return (
    <ContainerUseful>
      {usedata.links.map(({ label, id }) => (
        <ContainerNews key={id}>
          <Row>
            <LineWrapper>
              <TextWrapper>
                <H2text>{label}</H2text>
              </TextWrapper>
              <FormatsWrapper>
                <FormatsIcons className={wrapperClass[id] ? "shown" : "none"}>
                  <Image alt="pdf" className={wrapperClass[id] ? "transform" : "none"} />
                  <Image alt="word" className={wrapperClass[id] ? "transform" : "none"} />
                  <Image alt="excel" className={wrapperClass[id] ? "transform" : "none"} />
                </FormatsIcons>
                <DownloadingIcon id={id} onClick={selectFormat} />
              </FormatsWrapper>
            </LineWrapper>
          </Row>
        </ContainerNews>
      ))}
    </ContainerUseful>
  )
}

export default DocTemplateInform
