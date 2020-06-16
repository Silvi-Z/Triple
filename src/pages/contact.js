/*eslint-disable */
import React, { useState } from "react"
import Layout from "../components/layout"
import { Row } from "antd"
import FormindIviduals from "../components/contactcomponts/contactForm/formindividuals"
import FormOrganizations from "../components/contactcomponts/contactFormOrgaznitations/formorganizations"
import EnvironmentImg from "../assets/footericons/location.svg"
import CallPhoneImg from "../assets/footericons/phone-call.svg"
import { FacebookShareButton, LinkedinShareButton } from "react-share"
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
  ShareLabel
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
        {/* <FaceLink
            onClick={() =>
              window.open(
                "https://www.facebook.com/sharer/sharer.php?u=http://triple-c.algorithm.am/career/",
                "Facebook",
                "Popup",
                "toolbar=yes, location=no, statusbar=no, menubar=yes, scrollbars=1, resizable=0, width=580, height=600, top=30"
              )
            }
            alt="ssds"
            //target="_blank"
            //rel="noopener"
          >
            sdsdsdsd
          </FaceLink> */}
        <FacebookShareButton
          url="http://triple-c.algorithm.am/career/"
          children={<FacebookIcon />}
          hashtag={"Avag HAshvapah"}
        />
        {/* <FacebookIcon /> */}

        {/* <LinkedinLink
            href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/TripleCArmenia/"
            target="_blank"
            rel="noopener"
          >
            <LinkdinIcon />
          </LinkedinLink> */}
        <LinkedinShareButton
          title={`Avag HAshvapah`}
          summary={`Avag HAshvapah`}
          source={`Avag hasvapah`}
          children={<LinkdinIcon />}
          url="http://triple-c.algorithm.am/career/"
        ></LinkedinShareButton>
      </SharedWrapperCol>
    </Layout>
  )
}

export default Contact
