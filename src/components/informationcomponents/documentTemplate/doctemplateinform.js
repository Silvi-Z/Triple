import React, { useState } from "react"
import {
  ContainerNews,
  DownloadingIcon,
  FormatsIcons,
  FormatsWrapper,
  H2text,
  Image,
  LineWrapper,
  TextWrapper,
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
    <ContainerNews key={usedata.id}>
      <Row>
        <LineWrapper>
          <TextWrapper>
            <H2text>{usedata.label}</H2text>
          </TextWrapper>
          <FormatsWrapper>
            <FormatsIcons className={wrapperClass[usedata.id] ? "shown" : "none"}>
              {usedata.link_pdf && (<a href={usedata.link_pdf} download>
                <Image  alt="pdf" className={wrapperClass[usedata.id] ? "transform pdf" : "none pdf"} />
              </a>)}
              {usedata.link_word && (<a href={usedata.link_word} download>
                <Image alt="word" className={wrapperClass[usedata.id] ? "transform word" : "none word"} />
              </a>)}
              {usedata.link_exc && (<a href={usedata.link_exc} download>
                <Image alt="excel" className={wrapperClass[usedata.id] ? "transform excel" : "none excel"} />
              </a>)}
            </FormatsIcons>
            <DownloadingIcon id={usedata.id} onClick={selectFormat} />
          </FormatsWrapper>
        </LineWrapper>
      </Row>
    </ContainerNews>
  )
}

export default DocTemplateInform
