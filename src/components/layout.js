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
  @media (max-width: 768px) {
    padding-bottom: ${props => (props.Responswrapper ? 50 : 0)};
    padding-top: ${props => (props.Responswrapper ? 50 : 0)};
  }
  @media (min-width: 1600px) {
    padding-left: 100px;
    padding-right: 100px;
  }
`

const FooterCust = styled(Footer)`
  height: 130px;
  background-color: #1c1d21;
  @media (max-width: 768px) {
    padding-left: 0px;
    padding-right: 0px;
  }
  @media (max-width: 380px) {
    height: 234px;
  }
`
const FooterNumberWrap = styled.div`
  width: 238px;
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
  @media only screen and (max-width: 768px) {
    width: 235px;
    height: 16px;
    font-family: Sylfaen;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  }
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
  /* @media only screen and (max-width: 768px) {
    width: 89px;
    height: 16px;
    font-family: Sylfaen;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #009db8;
  } */
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
  width: 100%;
  height: 13px;
  font-family: ArialAMU;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  border-top: 0.01em solid;
  border-color: #ffffff;
  padding-top: 22px;
  color: #e8e8e8;
  /* @media only screen and (min-width: 768px) {
    display: none;
  } */
`
const CallIconWrapper = styled.img`
  width: 20px;
  height: 20px;
  /* @media only screen and (max-width: 768px) {
    background-color: #000000;
  } */
`
const LocationIconWrapper = styled.img`
  /* @media only screen and (max-width: 768px) {
    color: #009db8;
  } */
`
const LinkdinWrapper = styled.img`
  /* @media only screen and (max-width: 768px) {
    color: #009db8;
  } */
`
const FacebookWrapper = styled.img``

const FooterNumberColumn = styled(Col)`
  display: flex;
  padding-left: 15%;
  @media only screen and (max-width: 1524px) {
    padding-left: 7%;
  }
  @media only screen and (max-width: 768px) {
    padding-left: 1%;
  }
  @media (max-width: 380px) {
    padding-left: 10%;
  }
`
const FooterAdressColumn = styled(Col)`
  display: flex;
  padding-left: 12%;
  @media only screen and (max-width: 768px) {
    padding-left: 0%;
    justify-content: center;
  }
`
const FooterFollowUsColumn = styled(Col)`
  display: flex;
  justify-content: space-around;
  padding-right: 17%;
  @media only screen and (max-width: 768px) {
    padding-right: 0%;
  }
`
const FooterCopyRightColumn = styled(Col)``

const Layout = ({ children, SetResponswrapper, Responswrapper }) => {
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
      <Navbar
        setResponswrapper={SetResponswrapper}
        responswrapper={Responswrapper}
      />
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
          <FooterNumberColumn xs={24} sm={24} md={8} lg={8} xl={8}>
            <CallIconWrapper src={CallPhoneImg} alt={"icon"}></CallIconWrapper>
            <FooterNumberWrap>
              <span>+374 93706010,+374 93706010</span>
            </FooterNumberWrap>
          </FooterNumberColumn>
          <FooterAdressColumn xs={24} sm={24} md={8} lg={8} xl={8}>
            <LocationIconWrapper src={LocationImg} alt={"icon"} />
            <FooterAdressWrap>
              <span>Հր, Քոչար 44</span>
            </FooterAdressWrap>
          </FooterAdressColumn>
          <FooterFollowUsColumn xs={24} sm={24} md={8} lg={8} xl={8}>
            <FooterFollowUsWrap>
              <span>Հետևեք մեզ</span>
            </FooterFollowUsWrap>
            <LinkdinWrapper src={LinkedinImg} alt={"icon"} />
            <FacebookWrapper src={FacebookImg} alt={"icon"} />
          </FooterFollowUsColumn>
        </Row>
        <Row>
          <FooterCopyRightColumn lg={24}>
            <FooterCopyRightWrap>
              Copyright © {new Date().getFullYear()} AlgorithmSolutions
            </FooterCopyRightWrap>
          </FooterCopyRightColumn>
        </Row>
      </FooterCust>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
