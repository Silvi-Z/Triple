/*eslint-disable */
import React from "react"
import { Row } from "antd"
import FormindIviduals from "../components/contactcomponts/contactForm/formindividuals"
import useTranslations from "../components/useTranslations"
import SEO from "../components/seo"
import WhatsappImg from "../assets/footericons/brandIcons/whatsapp (header).svg"
import ViberImg from "../assets/footericons/brandIcons/viber(header)svg.svg"
import TelegramImg from "../assets/footericons/brandIcons/telegram (header).svg"
import {
  ContactPageWrapper,
  WhatsappWrapper,
  TelegramWrapper,
  ViberWrapper,
} from "../components/contactcomponts/contactForm/formStyle"
import {
  HeadingParagrCol,
  SharedWrapperCol,
  FacebookShare,
  LinkedinShare,
  ContactColumn,
  FacebookIcon,
  ParagraphRow,
  AdressColumn,
  AdressMapCol,
  ShareColumn,
  LinkdinIcon,
  InfoColumn,
  FormColumn,
  Mapiframe,
  H3Element,
  H2Styled,
  PElement,
  PStyled,
  FormRow,
  H1Email,
  MapCol,
} from "../components/contactcomponts/contactMainStyle"

const Contact = ({ pageContext }) => {
  const { contact } = useTranslations()
  let urlShared

  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/contact/"
    }else {
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
              <PElement>+374 98553533  +374 60407010</PElement>
              <TelegramWrapper src={TelegramImg} />
              <ViberWrapper src={ViberImg} />
              <WhatsappWrapper src={WhatsappImg} />
              </ContactColumn>
              <ShareColumn>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.2318514992025!2d44.506425015644304!3d40.20390527647907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd5370b9bd47%3A0x65628145929fcd32!2sAlgorithm%20Solutions%20EVN!5e0!3m2!1sen!2s!4v1607688497470!5m2!1sen!2s"
              />
            </MapCol>
          </>
        </AdressMapCol>
      </>
</>
  )
}

export default Contact
