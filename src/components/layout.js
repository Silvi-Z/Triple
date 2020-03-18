/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from 'gatsby';
import { Layout as CustomLayout } from "antd"
import { Row, Col } from "antd"
import styled from "styled-components"

import Navbar from "./navbar"
//import FooterCust from "./footer"
import "./layout.css"
import CallPhoneImg from "../assets/footericons/phone-call.png"
import LocationImg from "../assets/footericons/location.png"
import LinkedinImg from "../assets/footericons/linkedin.png"
import FacebookImg from "../assets/footericons/facebook-4.png"

const { Content, Footer } = CustomLayout

const ContentStyled = styled(Content)`
  ${"" /* padding: 50px 100px; */}
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 20px;
  padding-right: 20px;
  @media (min-width: 1200px) {
    padding-left: 50px;
    padding-right: 50px;
  }
  @media (min-width: 1600px) {
    padding-left: 100px;
    padding-right: 100px;
  }
`

const FooterCust = styled(Footer)`
  height: 130px;
  background-color: #1c1d21;
`
const FooterNumberWrap = styled.div`
  // width: 235px;
  height: 15px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  margin-left: 17px;
  color: #ffffff;
`
const FooterAdressWrap = styled.div`
  height: 16px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  margin-left: 17px;
  text-align: center;
`
const FooterFollowUsWrap = styled.div`
  width: 90px;
  height: 15px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`
const FooterCopyRightWrap = styled.div`
  // width: 191px;
  height: 13px;
  font-family: ArialAMU;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  border-top: 1px solid;
  border-color: #ffffff;
  border-width: thin;
  padding-top: 14px;
  color: #e8e8e8;
`
const CallIconWrapper = styled.img`
  width: 20px;
  height: 20px;
`
const LocationIconWrapper = styled.img``
const LinkdinWrapper = styled.img``
const FacebookWrapper = styled.img``

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  return (
    <>
      <Navbar />
      <div
        style={{
          margin: "0 auto",
          // maxWidth: 960,
          // padding: '0 1.0875rem 1.45rem',
        }}
      >
        <ContentStyled>{children}</ContentStyled>
      </div>
      <FooterCust>
        <Row>
          <Col
            xs={2}
            sm={4}
            md={6}
            lg={8}
            xl={10}
            style={{ display: "flex", paddingLeft: "15%" }}
          >
            <CallIconWrapper src={CallPhoneImg} alt={"icon"}></CallIconWrapper>
            <FooterNumberWrap>+374 93706010,+374 93706010</FooterNumberWrap>
          </Col>
          <Col
            xs={20}
            sm={16}
            md={12}
            lg={8}
            xl={4}
            style={{ display: "flex", paddingLeft: "5%" }}
          >
            <LocationIconWrapper src={LocationImg} alt={"icon"} />
            <FooterAdressWrap>Հր, Քոչար 44</FooterAdressWrap>
          </Col>
          <Col
            xs={2}
            sm={4}
            md={6}
            lg={8}
            xl={10}
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingLeft: "11%",
              paddingRight: "17%",
            }}
          >
            <FooterFollowUsWrap>Հետևեք մեզ</FooterFollowUsWrap>
            <LinkdinWrapper src={LinkedinImg} alt={"icon"} />
            <FacebookWrapper src={FacebookImg} alt={"icon"} />
          </Col>
        </Row>
        <Row>
          <Col lg={24}>
            <FooterCopyRightWrap>
              Copyright © {new Date().getFullYear()} AlgorithmSolutions
            </FooterCopyRightWrap>
          </Col>
        </Row>
      </FooterCust>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
