/*eslint-disable */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import withI18next from "../i18n/withI18next"
import { Layout as CustomLayout } from "antd"
import styled from "styled-components"
import Navbar from "./navbar/navbar"
import FooterBlack from "./footer/footerblack"
import FooterWhite from "./footer/footerwhite"
import useTranslations from "../components/useTranslations"
import "./layout.css"

const { Content, Footer } = CustomLayout

const Main = styled(Content)`
  margin: 0 auto;
`
const FooterCust = styled(Footer)`
padding:50px 115px;
height:196px;
  // height: ${props => (props.backcolor === "true" ? "130px" : "208px")};
  background-color: ${props =>
    props.backcolor === "true" ? "#1c1d21" : "white"};
  border-top: ${props =>
    props.backcolor === "true" ? null : "0.01em solid #ebebeb"};
  border-top-width: 80% thin;
  @media (max-width: 1040px){
    padding:50px 20px;
  }
  @media (max-width: 900px){
    padding:40px 25px;
  }
  @media (max-width: 768px) {
  height:253px;
  }
  @media (max-width: 427px) {
    height: 368px;
  }
`


const Layout = ({ children, location, pageContext: { locale, originalPath, localeResources } }) => {
  const { i18n, t } = useTranslation();
  const { layout } = useTranslations();
  
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [location, i18n, locale]);

  const [responseWrapper, setResponseWrapper] = useState(true)
  
  const openMenu = () => {
    setResponseWrapper(!responseWrapper)
  }
  
  return (
    <>
      <Navbar
        open={openMenu}
        originalPath={originalPath}
        responseWrapper={responseWrapper}
        lang={locale}
        langText={localeResources.translation.layout}
      />
      
      <Main>{children}</Main>

      <FooterCust
        backcolor={responseWrapper.toString()}
        langtext={layout}
      >
        {!responseWrapper ? <FooterWhite/> : <FooterBlack langtext={layout}/>}
      </FooterCust>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withI18next()(Layout)
