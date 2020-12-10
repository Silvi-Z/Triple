import React, { useEffect, useState } from "react"
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
import Pdf from "../../../assets/pdf.svg"
import Word from "../../../assets/word.svg"
import Excel from "../../../assets/excel.svg"
import { element } from "prop-types"
const DocTemplateInform = ({ usedata }) => {

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
                <FormatsIcons>
                  <Image src={Pdf} alt="pdf"/>
                  <Image src={Word} alt="word"/>
                  <Image src={Excel} alt="excel"/>
                </FormatsIcons>
                <DownloadingIcon/>
              </FormatsWrapper>
            </LineWrapper>
          </Row>
        </ContainerNews>
      ))}
    </ContainerUseful>
  )
}

export default DocTemplateInform
