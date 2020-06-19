/*eslint-disable */
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { Row, Col } from "antd"
import ReportForm from "../components/reportComponents/reportForm/reportForm"
import ReportForm3 from "../components/reportComponents/reportForm3/reportForm3"
import ReportForm2 from "../components/reportComponents/reportForm2/reportForm2"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import CarImg from "../assets/calcImages/carSell.png"
import { Helmet } from "react-helmet"
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

const Reports = () => {
  const [showForm, toggleForm] = useState(true)
  const [confirm2, setConfirm2] = useState(false)
  const [confirm3, setConfirm3] = useState(false)
  const [current_tracking_number, setCurrent_tracking_number] = useState(0)
  const [fillform, setfillform] = useState(false)
  const [resetForm, setResetForm] = useState(false)
  const [AllFieldsValues, setAllFieldsValues] = useState({})

  const DropdownForm = () => {
    toggleForm(!showForm)
    setConfirm3(false)
  }
  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        //eslint-disable-line
        appId: "323009385338778",
        cookie: true,
        xfbml: true,
        version: "v6.0",
      })
    }
    ;(function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src =
        "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v7.0&appId=323009385338778&autoLogAppEvents=1"
      fjs.parentNode.insertBefore(js, fjs)
    })(document, "script", "facebook-jssdk")
  })
  const Fbinit = () => {
    console.log(FB)
    // FB.init({
    //   appId: '323009385338778',
    //   status: true,
    //   xfbml: true,
    //   version: 'v2.7' // or v2.6, v2.5, v2.4, v2.3
    // });
    FB.ui(
      {
        method: "share",
        href: "http://triple-c.algorithm.am/reports/",
        title: "your_title",
        caption: "your_caption",
        description: "your_description",
      },
      function(response) {
        console.log(response)
      }
    )
  }
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Report</title>
        <meta property="og:title" content="Հաշվետվության տրամադրում" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="http://triple-c.algorithm.am/reports/" />
      </Helmet>
      <ReportParagraphRow>
        <Col
          xs={{ span: 9 }}
          sm={{ span: 9 }}
          lg={{ span: 24 }}
          xxl={{ span: 24, offset: 1 }}
        >
          <H2Styled>Հաշվետվության տրամադրում</H2Styled>
          <PStyled>
            Ստացեք Ձեր ցանկալի հաշվետվությունը առցանց՝ առանց ավելորդ
            քաշքշուկների: Լրացրեք պահանջվող տեղեկատվության դաշտերը և մեր
            մասնագետները կարձագանքեն հաշված րոպեների ընթացքում։
          </PStyled>
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
            Ավտոմեքենայի վաճառքի հաշվետվություն <span>( 5000 դր )</span>
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
            <H3StyledForm>Պահանջվող տեղեկատվություն</H3StyledForm>
            <ReportForm
              setConfirm2={setConfirm2}
              closeForm1={DropdownForm}
              SetAllFieldsValues={setAllFieldsValues}
              allFieldsValues={AllFieldsValues}
              fillform={fillform}
              resetForm={resetForm}
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
            <H3StyledForm>Պահանջվող տեղեկատվություն</H3StyledForm>
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
          {/* <FaceLink
            onClick={Fbinit}
            onClick={() =>
              window.open(
                "https://www.facebook.com/sharer/sharer.php?u=http://triple-c.algorithm.am/career/",
                "Facebook",
                "Popup",
                "toolbar=yes, location=no, statusbar=no, menubar=yes, scrollbars=1, resizable=0, width=580, height=600, top=30"
              )
            }
            alt="ssds"
            target="_blank"
            rel="noopener"
          >
            <FacebookIcon />
          </FaceLink> */}
          <FacebookShareButton
            url="http://triple-c.algorithm.am/reports/"
            children={<FacebookIcon />}
            hashtag={"Avag HAshvapah"}
          />
          {/* <FacebookIcon />

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
            url="http://triple-c.algorithm.am/report/"
          ></LinkedinShareButton>
        </SharedWrapperCol>
      </ReportFormRow>
    </Layout>
  )
}

export default Reports
