/*eslint-disable */
import React, { useState, useEffect } from "react"
import { Row, Col } from "antd"
import ReportForm from "../components/reportComponents/reportForm/reportForm"
import ReportForm3 from "../components/reportComponents/reportForm3/reportForm3"
import ReportForm2 from "../components/reportComponents/reportForm2/reportForm2"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import CarImg from "../assets/calcImages/carSell.png"
import { Helmet } from "react-helmet"
import useTranslations from "../components/useTranslations"
import SEO from "../components/seo"
import moment from "moment"
import {
  ReportParagraphRow,
  H2Styled,
  H3Styled,
  PStyled,
  HeadIcon,
  ToggleButton,
  ReportDropRow,
  ReportFormRow,
  H3StyledForm,
  SharedWrapperCol,
  FaceLink,
  ShareLabel,
  LinkedinLink,
  FacebookIcon,
  LinkdinIcon,
} from "../components/reportComponents/reportStyle"
import { FacebookShareButton, LinkedinShareButton } from "react-share"

const Reports = ({ pageContext }) => {
  const [showForm, toggleForm] = useState(true)
  const [confirm2, setConfirm2] = useState(false)
  const [confirm3, setConfirm3] = useState(false)
  const [current_tracking_number, setCurrent_tracking_number] = useState(0)
  const [fillform, setfillform] = useState(false)
  const [resetForm, setResetForm] = useState(false)
  const [AllFieldsValues, setAllFieldsValues] = useState({})
  const { reports } = useTranslations();
  let urlShared

  const DropdownForm = () => {
    toggleForm(!showForm)
    setConfirm3(false)
  }

  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/reports/"
    } else if (lng === "ru") {
      return "http://triple-c.algorithm.am/ru/reports"
    } else {
      return "http://triple-c.algorithm.am/arm/reports/"
    }
  }

  const hookComponent = () => {
    urlShared = getSharedUrl(pageContext.locale)
  }
  hookComponent()
  return (
    <>
      <SEO
        title={reports.title}
        description={reports.paragraph}
        pageContext={pageContext} />
      <ReportParagraphRow>
        <Col
          xs={{ span: 9 }}
          sm={{ span: 9 }}
          lg={{ span: 24 }}
          xxl={{ span: 24, offset: 1 }}
        >
          <H2Styled>{reports.title}</H2Styled>
          <PStyled>{reports.paragraph}</PStyled>
        </Col>
      </ReportParagraphRow>
      <ReportDropRow align="middle" gutter={[10, 15]}>
        <Col
          xxl={{ span: 1, offset: 4 }}
          xl={{ span: 1, offset: 3 }}
          lg={{ span: 1, offset: 3 }}
          md={{ span: 2, offset: 3 }}
          sm={{ span: 6, offset: 0 }}
          xs={{ span: 5, offset: 0 }}
        >
          <HeadIcon src={CarImg} alt={"icon"} />
        </Col>
        <Col xxl={14} xl={15} lg={15} md={16} sm={10} xs={14} span={17}>
          <H3Styled>
            {reports.dropParagraph} <span>({reports.currency})</span>
          </H3Styled>
        </Col>
        <Col span={2}>
          <ToggleButton block onClick={DropdownForm}>
            {showForm ? (
              <MinusOutlined style={{ fontSize: "20px" }} />
            ) : (
                <PlusOutlined style={{ fontSize: "20px" }} />
              )}
          </ToggleButton>
        </Col>
      </ReportDropRow>
      <ReportFormRow align="middle">
        {showForm ? (
          <Col
            xxl={{ span: 20, offset: 5 }}
            xl={{ span: 20, offset: 4 }}
            lg={{ span: 20, offset: 4 }}
            md={{ span: 20, offset: 4 }}
            sm={{ span: 22, offset: 0 }}
            xs={{ span: 24, offset: 0 }}
          >
            <H3StyledForm>{reports.subdropParagraph}</H3StyledForm>
            <ReportForm
              setConfirm2={setConfirm2}
              closeForm1={DropdownForm}
              SetAllFieldsValues={setAllFieldsValues}
              allFieldsValues={AllFieldsValues}
              fillform={fillform}
              resetForm={resetForm}
              langText={reports.reportForm}
            />
          </Col>
        ) : confirm2 ? (
          <Col
            xxl={{ span: 18, offset: 5 }}
            xl={{ span: 18, offset: 4 }}
            lg={{ span: 18, offset: 4 }}
            md={{ span: 18, offset: 5 }}
            sm={{ span: 3, offset: 0 }}
            xs={{ span: 3, offset: 0 }}
          >
            <H3StyledForm>{reports.subdropParagraph}</H3StyledForm>
            <ReportForm2
              setConfirm3={setConfirm3}
              setConfirm2={setConfirm2}
              backButton={DropdownForm}
              setResetForm={setResetForm}
              setfillform={setfillform}
              forwardButton={setConfirm3}
              AllFieldsValues={AllFieldsValues}
              setCurrent_tracking_number={setCurrent_tracking_number}
              current_tracking_number={current_tracking_number}
            />
          </Col>
        ) : confirm3 ? (
          <Col
            xxl={{ span: 18, offset: 5 }}
            xl={{ span: 18, offset: 4 }}
            lg={{ span: 18, offset: 4 }}
            md={{ span: 18, offset: 5 }}
            sm={{ span: 3, offset: 0 }}
            xs={{ span: 3, offset: 0 }}
          >
            <ReportForm3
              setresetForm={setResetForm}
              current_tracking_number={current_tracking_number}
              toggleForm={DropdownForm}
            />
          </Col>
        ) : null}
        <SharedWrapperCol span={5} offset={4}>
          <ShareLabel>Կիսվել</ShareLabel>
          <FacebookShareButton
            url={urlShared}
            children={<FacebookIcon />}
            hashtag={"Avag HAshvapah"}
          />
          <LinkedinShareButton
            children={<LinkdinIcon />}
            url={urlShared}
          ></LinkedinShareButton>
        </SharedWrapperCol>
      </ReportFormRow>
    </>
  )
}

export default Reports
