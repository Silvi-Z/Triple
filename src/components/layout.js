/*eslint-disable */
import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import withI18next from "../i18n/withI18next"
import { Layout as CustomLayout } from "antd"
import styled from "styled-components"
import Navbar from "./navbar/navbar"
import FooterBlack from "./footer/footerblack"
import useTranslations from "../components/useTranslations"
import "./layout.css"
// import Loader from "./loader"

const { Content, Footer } = CustomLayout

const Main = styled(Content)`
  margin: 0 auto;
  overflow: hidden;
`
const FooterCust = styled(Footer)`
  // margin-top: 90px;
  padding:0;
  // height: ${props => (props.backcolor === "true" ? "130px" : "208px")};
  background-color: ${props =>
  props.backcolor === "true" ? "#1c1d21" : "white"};
  border-top: ${props =>
  props.backcolor === "true" ? null : "0.01em solid #ebebeb"};
  border-top-width: 80% thin;
 
  @media (max-width: 768px) {
  height:253px;
  }
  @media (max-width: 427px) {
    height: 368px;
  }
`
const FooterWrapper = styled.div`
  width:100%;
  height:100%;
  padding: 50px 115px;
  @media (max-width: 1040px){
    padding:50px 20px;
  }
  @media (max-width: 900px){
    padding:40px 25px;
  }
`

const Layout = ({ children, location, pageContext: { locale, originalPath, localeResources } }) => {
  const { i18n, t } = useTranslation()
  const { layout } = useTranslations()
  // const [loader, setLoader] = useState(!sessionStorage.getItem("loader"))
  //
  // useEffect(() => {
  //   sessionStorage.setItem("loader", loader)
  // }, [])
  //
  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     setLoader(false)
  //   }, 3000)
  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [])

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [location, i18n, locale])

  const [responseWrapper, setResponseWrapper] = useState(true)
  const [menuColorProp, setMenuColorProp] = useState("")

  const openMenu = () => {
    setResponseWrapper(!responseWrapper);
    (menuColorProp === "") ? setMenuColorProp("#1C1D21") : setMenuColorProp("")
    document.querySelector("body").classList.toggle("opened_response_menu")
  }
  const footerHeight = useRef(null)
  const top = useRef()

  useEffect(() => {
    function resultHeight() {

    }

    // function scrollToResult() {
    //   document.querySelector(".calcButton").addEventListener('onclick', ()=>{
    //     console.log("calcButton" )
    //   })
    // }
    // scrollToResult()
    function fixedPos() {
      const resultWrapper = document.querySelectorAll(".main .result")[0]
      const result = document.querySelectorAll(".main .result > div")[0]
      const rowWrapper = document.querySelectorAll(".rowWrapper")[0]

      if (typeof window !== `undefined` && resultWrapper && result && rowWrapper && window.innerWidth > 1200) {
        if (result.offsetHeight >= footerHeight.current.getBoundingClientRect().top) {
          result.classList.add("absolute")
        } else if (resultWrapper.getBoundingClientRect().top <= 0) {
          resultWrapper.classList.add("fixed")
          result.classList.remove("absolute")
          result.style.width = rowWrapper.clientWidth * 33.3333333 / 100 - 20 + "px"
        } else if (footerHeight.current.getBoundingClientRect().top > window.innerHeight || footerHeight.current.getBoundingClientRect().top > window.innerHeight && resultWrapper.getBoundingClientRect().top <= 0) {
          resultWrapper.classList.remove("fixed")
          result.classList.remove("absolute")
        }
      }
    }

    window.addEventListener("scroll", function() {
      fixedPos()
    })
    window.addEventListener("resize", function() {
      resultHeight()
    })
    fixedPos()
  }, [footerHeight])


  return (
    // loader ?
  /*{<Loader />}*/
      // :
      <>
        <Navbar

          open={openMenu}
          originalPath={originalPath}
          setMenuColor={setMenuColorProp}
          color={menuColorProp}
          responseWrapper={responseWrapper}
          setResponseWrapper={setResponseWrapper}
          lang={locale}
          langText={localeResources.translation.layout}
        />

        < Main className="main">{children}</Main>

        <FooterCust
          backcolor={responseWrapper.toString()}
          langtext={layout}
        >
          <FooterWrapper ref={footerHeight}>
            {responseWrapper && <FooterBlack langtext={layout} />}
          </FooterWrapper>
        </FooterCust>
      </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withI18next()(Layout)
