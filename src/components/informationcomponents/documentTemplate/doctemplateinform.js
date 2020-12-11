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

  const [ wrapperClass , setWrapperClass] = useState({})

  const selectFormat = (e) => {
    let element = e.target.id;
    console.log(wrapperClass[element])
    console.log(element);
      (wrapperClass[element]===true)?
      setWrapperClass({}):
      setWrapperClass({[element]: true})
  }
  return (
    <ContainerUseful>
      {usedata.data.links.map(({label, id}) => (
        <ContainerNews key={id}>
          <Row>
            <LineWrapper>
              <TextWrapper>
                <H2text>{label}</H2text>
              </TextWrapper>
              <FormatsWrapper>
                <FormatsIcons className={wrapperClass[id] ? 'shown' : ''}>
                  <Image alt="pdf" className={wrapperClass[id] ? 'transform' : ''}/>
                  <Image alt="word" className={wrapperClass[id] ? 'transform' : ''}/>
                  <Image alt="excel" className={wrapperClass[id] ? 'transform' : ''}/>
                </FormatsIcons>
                <DownloadingIcon id={id} onClick={selectFormat}/>
              </FormatsWrapper>
            </LineWrapper>
          </Row>
        </ContainerNews>
      ))}
    </ContainerUseful>
  )
}

export default DocTemplateInform
