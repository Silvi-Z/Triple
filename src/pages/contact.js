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
