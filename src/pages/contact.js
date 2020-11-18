/*eslint-disable */
import React, { useState } from "react"
import { Row } from "antd"
import FormindIviduals from "../components/contactcomponts/contactForm/formindividuals"
import FormOrganizations from "../components/contactcomponts/contactFormOrgaznitations/formorganizations"
import EnvironmentImg from "../assets/footericons/location.svg"
import CallPhoneImg from "../assets/footericons/phone-call.svg"
import { FacebookShareButton, LinkedinShareButton } from "react-share"
import useTranslations from "../components/useTranslations"
import SEO from "../components/seo"
import {
  ParagraphRow,
  H2Styled,
  PStyled,
  AdressMapCol,
  MapCol,
  Mapiframe,
  HeadingParagrCol,
  FormRow,
  InfoColumn,
  FormColumn,
  SharedWrapperCol,
  ShareLabel,
  FacebookShare,
  LinkdinIcon,
  FacebookIcon,
  LinkedinShare,
  H1Email,
  H3Element,
  PElement,
  AdressColumn,
  ContactColumn,
  ShareColumn
} from "../components/contactcomponts/contactMainStyle"
import "../components/contactcomponts/contactModal/modalStyle.css"
import { ContactPageWrapper } from "../components/contactcomponts/contactForm/formStyle"
import WhatsappImg from "../assets/footericons/brandIcons/whatsapp (header).svg"
import ViberImg from "../assets/footericons/brandIcons/viber(header)svg.svg"
import TelegramImg from "../assets/footericons/brandIcons/telegram (header).svg"
import styled from "styled-components"

const WhatsappWrapper = styled.img`
  width: 22px;
  height: 22px;
  margin-right:16px;
  @media only screen and (max-width: 292px){
    margin-right: 7px;
  }
`
const ViberWrapper = styled.img`
  width: 20px;
  height: 21px;
  margin-right:16px;
  @media only screen and (max-width: 292px){
    margin-right: 7px;
  }
`
const TelegramWrapper = styled.img`
  width: 20px;
  margin-right:16px;
  height: 20px;
  @media only screen and (max-width: 292px){
    margin-right: 7px;
  }
`
const Contact = ({ pageContext }) => {
  const { contact } = useTranslations()
  let urlShared

  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/contact/"
    } else if (lng === "ru") {
      return "http://triple-c.algorithm.am/ru/contact"
    } else {
      return "http://triple-c.algorithm.am/arm/contact/"
    }
  }

  const hookComponent = () => {
    urlShared = getSharedUrl(pageContext.locale)
  }

  hookComponent()

  return (
    <>
    <ContactPageWrapper>
      <SEO
        title={contact.title}
        description={contact.paragraph}
        pageContext={pageContext}
      />
      <ParagraphRow>
        <HeadingParagrCol lg={{ span: 24 }} xxl={{ span: 8, offset: 4 }}>
          <H2Styled>{contact.title}</H2Styled>
          <PStyled>{contact.paragraph}</PStyled>
        </HeadingParagrCol>
      </ParagraphRow>
      <FormRow align="middle">
          <>
          <InfoColumn>
            <H1Email>info@triple-c.am</H1Email>
            <Row>
          <AdressColumn >
            <H3Element>Հասցե</H3Element>
            <PElement>Հր․ Քոչար 44/54</PElement>
          </AdressColumn>
            <ContactColumn style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap'}}>
            <H3Element style={{width:'100%'}}>Հեռ․</H3Element>
              <TelegramWrapper src={TelegramImg} />
              <ViberWrapper src={ViberImg} />
              <WhatsappWrapper src={WhatsappImg} />
            <PElement>+374 98553533</PElement>
              </ContactColumn>
              <ShareColumn xl={24} lg={24} md={24} sm={5} >
            <SharedWrapperCol>
              <H3Element>Հետևեք մեզ</H3Element>
              <FacebookShare
                url={urlShared}
                children={<FacebookIcon />}
              />
              <LinkedinShare
                url={urlShared}
                children={<LinkdinIcon />}
              />
            </SharedWrapperCol>
                </ShareColumn>
              </Row>
          </InfoColumn>
          <FormColumn>
            <FormindIviduals langtext={contact.form_content} lang={pageContext.locale} />
          </FormColumn>
          </>
      </FormRow>
    </ContactPageWrapper>
      <>
        <AdressMapCol>
          <>
            <MapCol>
              <Mapiframe
                frameborder="0"
                src="https://maps.google.com/maps?q=Armenia%2C%20Yerevan%20Hrachya%20Qochar%2044%2F54&t=&z=17&ie=UTF8&iwloc=&output=embed"
              />
            </MapCol>
          </>
        </AdressMapCol>
      </>
</>
  )
}

export default Contact
