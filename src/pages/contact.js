/*eslint-disable */
import React, { useState } from "react"
import Layout from "../components/layout"
import { Row } from "antd"
import FormindIviduals from "../components/contactcomponts/contactForm/formindividuals"
import FormOrganizations from "../components/contactcomponts/contactFormOrgaznitations/formorganizations"
import EnvironmentImg from "../assets/footericons/location.svg"
import CallPhoneImg from "../assets/footericons/phone-call.svg"
import { FacebookShareButton, LinkedinShareButton } from "react-share"
import { Helmet } from "react-helmet"
import {
  ParagraphRow,
  H2Styled,
  PStyled,
  NumberCol,
  AdressMapCol,
  AddressSpan,
  ContactAdressWrap,
  MapCol,
  Mapiframe,
  EnvironmentWrapper,
  HeadingParagrCol,
  CallIconWrapper,
  ContactNumberWrap,
  FormRow,
  FormColumn,
  ContactNavRow,
  ContactMapRow,
  LinkdinIcon,
  FacebookIcon,
  SharedWrapperCol,
  ShareLabel,
} from "../components/contactcomponts/contactMainStyle"
const Contact = () => {
  const [openIndivid, setopenIndivid] = useState(true)
  const [openComp, setopenComp] = useState(false)

  const ChangeOpenInvid = () => {
    setopenIndivid(true)
    setopenComp(false)
  }
  const ChangeOpenComp = () => {
    setopenIndivid(false)
    setopenComp(true)
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Կապ մեզ հետ</title>
        <meta property="og:title" content="Կապ մեզ հետ" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="http://triple-c.algorithm.am/contact/" />
      </Helmet>
      <ParagraphRow>
        <HeadingParagrCol lg={{ span: 24 }} xxl={{ span: 8, offset: 4 }}>
          <H2Styled>Կապ մեզ հետ</H2Styled>
          <PStyled>
            Հարցերի եւ առաջարկների համար կարող եք լրացնել անհրաժեշտ տվյալները եւ
            մենք սիրով կապ կհաստատենք Ձեզ հետ։
          </PStyled>
        </HeadingParagrCol>
      </ParagraphRow>
      {/* <ContactNavRow>
        <IndividCol
          xxl={{ span: 10, offset: 8 }}
          xl={11}
          lg={9}
          md={9}
          sm={24}
          xs={24}
          offset={2}
          onClick={ChangeOpenInvid}
          open={openIndivid}
        >
          <span>Անհատների համար</span>
        </IndividCol>
        <CompanyCol
          xxl={{ span: 10, offset: 8 }}
          xl={11}
          lg={9}
          md={9}
          sm={24}
          xs={24}
          offset={1}
          onClick={ChangeOpenComp}
          open={openComp}
        >
          <span>Կազմակերպությունների համար</span>
        </CompanyCol>
      </ContactNavRow> */}
      <FormRow align="middle">
        {openIndivid ? (
          <FormColumn
            lg={{ span: 17, offset: 3 }}
            xs={{ span: 17, offset: 3 }}
            xxl={{ span: 17, offset: 3 }}
          >
            <FormindIviduals />
          </FormColumn>
        ) : openComp ? (
          <FormColumn lg={{ span: 17 }} offset={3}>
            <FormOrganizations />
          </FormColumn>
        ) : null}
      </FormRow>
      <ContactMapRow align="middle">
        <NumberCol
          xxl={{ span: 19, offset: 4 }}
          xl={{ span: 19 }}
          lg={{ span: 19 }}
          md={{ span: 19 }}
          xs={{ span: 24 }}
          offset={2}
        >
          <CallIconWrapper src={CallPhoneImg} alt={"icon"} />
          <ContactNumberWrap>
            <span>+374 93706010,+374 93706010</span>
          </ContactNumberWrap>
        </NumberCol>
        <AdressMapCol xl={19} lg={{ span: 19 }} md={{ span: 19 }} offset={2}>
          <Row>
            <ContactAdressWrap span={24}>
              <EnvironmentWrapper src={EnvironmentImg} />
              <AddressSpan>Հր Քոչար 44/54 </AddressSpan>
            </ContactAdressWrap>
            <MapCol span={24}>
              <Mapiframe
                frameborder="0"
                src="https://maps.google.com/maps?q=Armenia%2C%20Yerevan%20Hrachya%20Qochar%2044%2F54&t=&z=17&ie=UTF8&iwloc=&output=embed"
              />
            </MapCol>
          </Row>
        </AdressMapCol>
      </ContactMapRow>
      <SharedWrapperCol xl={{ span: 10, offset: 6 }}>
        <ShareLabel>Կիսվել</ShareLabel>
        <FacebookShareButton
          url="http://triple-c.algorithm.am/contact/"
          children={<FacebookIcon />}
          hashtag={"Avag HAshvapah"}
        />

        <LinkedinShareButton
          children={<LinkdinIcon />}
          url="http://triple-c.algorithm.am/contact/"
        ></LinkedinShareButton>
      </SharedWrapperCol>
    </Layout>
  )
}

export default Contact
