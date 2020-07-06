/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
/*eslint-disable */
import React, { useState } from "react"
import PropTypes from "prop-types"
// import { I18nextProvider, useTranslation } from 'react-i18next';
import i18next from 'i18next';
// import { useStaticQuery, graphql } from 'gatsby';
import { withTrans } from "../i18n/withTrans"
import { Layout as CustomLayout } from "antd"
import styled from "styled-components"
import Navbar from "./navbar/navbar"
import FooterBlack from "./footer/footerblack"
import FooterWhite from "./footer/footerwhite"
import "./layout.css"

const { Content, Footer } = CustomLayout

const ContentStyled = styled(Content)`
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
  height: ${props => (props.backcolor === "true" ? "130px" : "208px")};
  background-color: ${props =>
    props.backcolor === "true" ? "#1c1d21" : "white"};
  border-top: ${props =>
    props.backcolor === "true" ? null : "0.01em solid #ebebeb"};
  border-top-width: 80% thin;
  @media (max-width: 768px) {
    padding-left: 0px;
    padding-right: 0px;
  }
  @media (max-width: 380px) {
    height: 234px;
  }
`
const Main = styled.div`
  margin: 0 auto;
  min-height: ${props => (props.setheight === true ? "100vh" : "0vh")};
`

const Layout = ({ children, t, i18n, location, pageContext }) => {




  const [responsWrapper, setResponsWrapper] = useState(true)
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);
  const openMenu = () => {
    setResponsWrapper(!responsWrapper)
  }

  return (
    <>
      <Navbar open={openMenu} responswrapper={responsWrapper} pageContext={pageContext} />
      <Main setheight={responsWrapper}>
        <ContentStyled>{responsWrapper ? children : null}</ContentStyled>
      </Main>
      <FooterCust
        backcolor={responsWrapper.toString()}
        texttranslate={t(`site.footer`)}
      >
        {!responsWrapper ? (
          <FooterWhite />
        ) : (
            <FooterBlack texttranslate={t(`site.footer`)} />
          )}
      </FooterCust>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withTrans(Layout)
