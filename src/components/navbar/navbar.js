import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import { Dropdown } from "antd"
import { PhoneOutlined, CaretDownOutlined, EnvironmentOutlined } from "@ant-design/icons"
import BlackLogo from "../../assets/homeImages/3c1.png"
import MainLogo from "../../assets/homeImages/3c.svg"
import WhiteLogo  from "../../assets/homeImages/3c_white.png"
import EnvironmentImg from "../../assets/footericons/location.svg"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import "../layout.css"
import {
  NavLink,
  LangSpan,
  PhoneSpan,
  RespNavLink,
  AddressSpan,
  MenuWrapper,
  GridWrapper,
  HeadMainIcon,
  EnvironmentWrapper,
  ResponsiveMenuButton,
  ResponsiveNavWrapper,
  ResponsiveMenuWrapper,
  ResponsiveMenuColumn,
  ResponsiveMenuInfoRow, Coll,
} from "./navbarStyle.js"

const phones = (
  <div className="phonedrop">
    <div className="phonebox">
      <PhoneOutlined
        style={{
          fontSize: "14px",
          marginRight: "4%",
          transform: "rotate(90deg)",
        }}
      />
      <span className="phonenumber">374 98 553533</span>
    </div>
    <div className="phonebox">
      <i
        className="fab fa-whatsapp"
        style={{ fontSize: "15px", color: "green", marginRight: "4%" }}
      />
      <span className="phonenumber">374 98 553533</span>
    </div>
    <div className="phonebox">
      <i
        className="fab fa-viber"
        style={{ fontSize: "15px", color: "purply", marginRight: "4%" }}
      />
      <span className="phonenumber">374 98 553533</span>
    </div>
    <div className="phonebox">
      <PhoneOutlined
        style={{
          fontSize: "14px",
          marginRight: "4%",
          transform: "rotate(90deg)",
        }}
      />
      <span className="phonenumber">374 60 407010</span>
    </div>
  </div>
)

const GridLang = styled.div`
  grid-area: lang;
`
const GridAddress = styled.div`
  grid-area: addr;
`
const GridBlank1 = styled.div`
  grid-area: bla1;
`
const GridHome = styled.div`
  grid-area: home;
  ${NavLink}{
    height:100% !important;
  }
`
const GridBlank2 = styled.div`
  grid-area: bla2;
`
const GridPhone = styled.div`
  grid-area: phon;
`
const GridService = styled.div`
  grid-area: serv;
`
const GridReport = styled.div`
  grid-area: calc;
`
const GridCalc = styled.div`
  grid-area: repo ;
`
const GridInfo = styled.div`
  grid-area: info;
`
const GridJoin = styled.div`
  grid-area: join;
`
const GridContact = styled.div`
  grid-area: cont;
`
const activeStyle = {
  color: "#009db8",
  height: "100%",
  border: "1px solid #009db8",
}

const Navbar = ({ open, menuColor, setMenuColor, responseWrapper, setResponseWrapper,lang, langText, originalPath }) => {
  const [languageText, setLanguageText] = useState(["Հայ", "Eng", "Рус"])

  const language = (
    <div className="languagedrop">
      <div className="languagebox">
        <span
          onClick={e => handleChangeLanguage(e, "langeEn")}
          className="languagetext"
          id="langeEn"
        >
          {languageText[1]}
        </span>
      </div>
      <div className="languagebox">
        <span
          onClick={e => handleChangeLanguage(e, "langeRu")}
          className="languagetext"
          id="langeRu"
        >
          {languageText[2]}
        </span>
      </div>
    </div>
  )

  const checkDefaultLanguage = defaultLang => {
    let lang
    if (defaultLang === "en") {
      lang = "Eng"
    } else if (defaultLang === "ru") {
      lang = "Рус"
    } else if (defaultLang === "arm") {
      lang = "Հայ"
    }
    let newtext = languageText.filter(text => text !== lang)
    newtext.unshift(lang)
    setLanguageText(newtext)
  }

  const changeLanguage = (e, id) =>{
    if (id === "arm"){
      navigate(`/arm${originalPath}`)
    }else if (id === "en"){
      navigate(`/en${originalPath}`)
    }
  }
  const handleChangeLanguage = (e, id) => {
    let elem = document.getElementById(id)
    if (elem.innerText === "Рус") {
      navigate(`/ru${originalPath}`)
    } else if (elem.innerText === "Eng") {
      navigate(`/en${originalPath}`)
    } else if (elem.innerText === "Հայ") {
      navigate(`/arm${originalPath}`)
    }
    let newtext = languageText.filter(text => text !== elem.innerText)
    newtext.unshift(elem.innerText)
    setLanguageText(newtext)
  }

  const resize = () =>{
    const innerWidth = (window.innerWidth);
    (innerWidth>=1021 && !responseWrapper) ? setResponseWrapper(!responseWrapper) : null
  }
  window.addEventListener("resize", resize);

  useEffect(() => {
    checkDefaultLanguage(lang)
  }, [])

  return (
    <>
      <ResponsiveNavWrapper menuColor={menuColor}>
        <div  style={{ textAlign: "center" , display: 'flex'}}>
          <RespNavLink to={`/${lang}/`} onClick={() => !responseWrapper ? open() : ''}>
            <HeadMainIcon src={!responseWrapper ?  WhiteLogo : BlackLogo} alt={"icon"} />
          </RespNavLink>
        </div>
        <div style={{position: "relative"}}>
            <a id="burger" className={!responseWrapper ? "open" : ''}>
              <ResponsiveMenuButton onClick={() => open()} responseWrapper={!responseWrapper} >
                <span> </span>
                <span> </span>
                <span> </span>
              </ResponsiveMenuButton>
            </a>
        </div>
      </ResponsiveNavWrapper>

      {!responseWrapper ? (
      <div id="menu">
        <ResponsiveMenuWrapper >
          <MenuWrapper>
            <ResponsiveMenuColumn>
            <Coll className="coll" style={{ marginBottom: "50px" }}>
              <NavLink
                className="menu_element"
                to={`/${lang}/services/`}
                activeStyle={activeStyle}
                state={{ clickedItems: 0 }}
                onClick={() => open()}
              >
                {langText.header.serveTitle}
              </NavLink>
            </Coll>
            <Coll style={{ marginBottom: "50px" }}>
              <NavLink
                className="menu_element"
                to={`/${lang}/calculators/`}
                activeStyle={activeStyle}
                onClick={() => open()}
              >
                {langText.header.calcTitle}
              </NavLink>
            </Coll>
            <Coll  style={{ marginBottom: "50px" }}>
              <NavLink
                className="menu_element"
                to={`/${lang}/news/`}
                activeStyle={activeStyle}
                onClick={() => open()}
              >
                {langText.header.newsTitle}
              </NavLink>
            </Coll>
            <Coll  style={{ marginBottom: "50px" }}>
              <NavLink
                className="menu_element"
                to={`/${lang}/information/`}
                activeStyle={activeStyle}
                onClick={() => open()}
              >
                {langText.header.infoTitle}
              </NavLink>
            </Coll>
            <Coll  style={{ marginBottom: "50px" }}>
              <NavLink
                className="menu_element"
                to={`/${lang}/career/`}
                activeStyle={activeStyle}
                onClick={() => open()}
              >
                {langText.header.careerTitle}
              </NavLink>
            </Coll>
            <Coll  style={{ marginBottom: "50px" }}>
              <NavLink
                className="menu_element"
                to={`/${lang}/contact/`}
                activeStyle={activeStyle}
                onClick={() => open()}
              >
                {langText.header.contractTitle}
              </NavLink>
            </Coll>
            </ResponsiveMenuColumn>
          </MenuWrapper>
          <ResponsiveMenuInfoRow>
            <div>
              <span
                style={{color:"white"}}
                onClick={e => changeLanguage( e,"arm")}
                className="languagetext"
                id="arm"
              >Հայ |
              </span>
              <span
                style={{color:"white"}}
                onClick={e => changeLanguage(e,"en")}
                className="languagetext"
                id="en"
              > Eng
              </span>
            </div>
            <div>
              <EnvironmentOutlined />
              <AddressSpan lang={lang}> {langText.header.address}</AddressSpan>
            </div>
            <div>
              <PhoneOutlined
                style={{
                  fontSize: "14px",
                  marginRight: "4%",
                  transform: "rotate(90deg)",
                }}
              />
              <PhoneSpan>+374 98 553533,+374 98 553533</PhoneSpan>
            </div>
          </ResponsiveMenuInfoRow>
        </ResponsiveMenuWrapper>
       </div>
      ) : null}

      <GridWrapper>
        <GridLang>
          <Dropdown
            overlay={language}
            trigger={["click"]}
            style={{ marginBottom: "10%" }}
          >
            <GridLang>
              <a
                onClick={e => e.preventDefault()}
                style={{ width: "100%", color: "black" }}
              >
                <LangSpan
                  onClick={e => handleChangeLanguage(e, "langSpan")}
                  id="langSpan"
                >
                  {languageText[0]}
                </LangSpan>{" "}
                <CaretDownOutlined style={{ fontSize: "10px" }} />
              </a>
            </GridLang>
          </Dropdown>
        </GridLang>
        <GridAddress>
          <EnvironmentWrapper src={EnvironmentImg} />
          <AddressSpan lang={lang}>{langText.header.address}</AddressSpan>
        </GridAddress>
        <GridBlank1 />
        <GridHome>
          <NavLink to={`/${lang}/`}>
            <HeadMainIcon src={MainLogo} alt={"icon"} />
          </NavLink>
        </GridHome>
        <GridBlank2 />
        <Dropdown overlay={phones} trigger={["click"]}>
          <GridPhone>
            <a
              onClick={e => e.preventDefault()}
              style={{ width: "100%", color: "black" }}
            >
              <PhoneOutlined
                style={{
                  fontSize: "14px",
                  marginRight: "4%",
                  transform: "rotate(90deg)",
                }}
              />
              <PhoneSpan>374 98 553533</PhoneSpan>{" "}
              <CaretDownOutlined style={{ fontSize: "11px" }} />
            </a>
          </GridPhone>
        </Dropdown>
        <GridService>
          <NavLink
            to={`/${lang}/services/`}
            activeStyle={activeStyle}
            state={{ responseWrapper }}
          >
            {langText.header.serveTitle}
          </NavLink>
        </GridService>
        <GridReport>
          <NavLink to={`/${lang}/news/`} activeStyle={activeStyle}>
            {langText.header.newsTitle}
          </NavLink>
        </GridReport>
        <GridCalc>
          <NavLink to={`/${lang}/calculators/`} activeStyle={activeStyle}>
            {langText.header.calcTitle}
          </NavLink>
        </GridCalc>
        <GridInfo md={{ span: 0, offset: 2 }}>
          <NavLink to={`/${lang}/information/`} activeStyle={activeStyle}>
            {langText.header.infoTitle}
          </NavLink>
        </GridInfo>
        <GridJoin md={{ span: 0, offset: 2 }}>
          <NavLink to={`/${lang}/career/`} activeStyle={activeStyle}>
            {langText.header.careerTitle}
          </NavLink>
        </GridJoin>
        <GridContact>
          <NavLink to={`/${lang}/contact/`} activeStyle={activeStyle}>
            {langText.header.contractTitle}
          </NavLink>
        </GridContact>
      </GridWrapper>
    </>
  )
}

export default Navbar
