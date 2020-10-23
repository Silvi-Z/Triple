import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { Row, Col, Dropdown } from "antd"
import CallImg from "../../assets/homeImages/phone-call3.png"
import MainLogo from "../../assets/homeImages/3c.png"
import EnvironmentImg from "../../assets/footericons/location.svg"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import useTranslations from "../../components/useTranslations"
import {
  EnvironmentOutlined,
  PhoneOutlined,
  CaretDownOutlined,
} from "@ant-design/icons"
import "../layout.css"
import {
  NavLink,
  RespNavLink,
  ResponsiveMenuWrapper,
  AddressSpan,
  PhoneSpan,
  LangSpan,
  GridWrapper,
  HeadIcon,
  HeadMainIcon,
  ResponsiveNavWrapper,
  Label,
  EnvironmentWrapper,
} from "./navbarStyle.js"

import { useTranslation } from "react-i18next"

import LanguagePicker from "../LanguagePicker/LanguagePicker"

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
      ></i>
      <span className="phonenumber">374 98 553533</span>
    </div>
    <div className="phonebox">
      <i
        className="fab fa-viber"
        style={{ fontSize: "15px", color: "purply", marginRight: "4%" }}
      ></i>
      <span className="phonenumber">374 98 553533</span>
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
  grid-area: repo;
`
const GridCalc = styled.div`
  grid-area: calc;
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

const Navbar = ({ open, responswrapper, lang, langtext, originalPath }) => {
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

  const checkDefaultLanguage = (defaultLang) => {
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

  const handleChangeLanguage = (e, id) => {
    let elem = document.getElementById(id)
    if (elem.innerText === "Рус") {
      navigate(`/ru/${originalPath}`)
    } else if (elem.innerText === "Eng") {
      navigate(`/en/${originalPath}`)
    } else if (elem.innerText === "Հայ") {
      navigate(`/arm/${originalPath}`)
    }
    let newtext = languageText.filter(text => text !== elem.innerText)
    newtext.unshift(elem.innerText)
    setLanguageText(newtext)
  }

  useEffect(() => {
    checkDefaultLanguage(lang)
  }, [])

  return (
    <>
      <ResponsiveNavWrapper>
        <Col lg={8} md={8} sm={6} xs={6}>
          <HeadIcon src={CallImg} alt={"icon"} />
        </Col>
        <Col lg={8} md={8} sm={12} xs={12} style={{ textAlign: "center" }}>
          <RespNavLink to={`/${lang}/`}>
            <HeadMainIcon src={MainLogo} alt={"icon"} />
          </RespNavLink>
        </Col>
        <Col lg={8} md={8} sm={6} xs={6}>
          {!responswrapper ? (
            <Label htmlFor="toggle" onClick={() => open()}>
              &#x2573;
            </Label>
          ) : (
              <Label htmlFor="toggle" onClick={() => open()}>
                &#9776;
              </Label>
            )}
        </Col>
      </ResponsiveNavWrapper>

      {!responswrapper ? (
        <ResponsiveMenuWrapper>
          <Row>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to={`/${lang}/services/`}
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
                state={{ clickedItems: 0 }}
              // onClick={() => setResponswrapper()}
              >
                {langtext.header.serveTitle}
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to="/reports/"
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
              // onClick={() => setResponswrapper()}
              >
                {langtext.header.reportTitle}
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to={`/${lang}/calculators/`}
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
              >
                {langtext.header.calcTitle}
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to={`/${lang}/information/`}
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
              >
                {langtext.header.infoTitle}
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to={`/${lang}/career/`}
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
              >
                {langtext.header.careerTitle}
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to={`/${lang}/contact/`}
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
              >
                {langtext.header.contractTitle}
              </NavLink>
            </Col>
          </Row>
        </ResponsiveMenuWrapper>
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
          <AddressSpan lang={lang}>{langtext.header.address}</AddressSpan>
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
            state={{ responswrapper }}
          >
            {langtext.header.serveTitle}
          </NavLink>
        </GridService>
        <GridReport>
          <NavLink to={`/${lang}/reports/`} activeStyle={activeStyle}>
            {langtext.header.reportTitle}
          </NavLink>
        </GridReport>
        <GridCalc>
          <NavLink to={`/${lang}/calculators/salary`} activeStyle={activeStyle}>
            {langtext.header.calcTitle}
          </NavLink>
        </GridCalc>
        <GridInfo md={{ span: 0, offset: 2 }}>
          <NavLink to={`/${lang}/information/`} activeStyle={activeStyle}>
            {langtext.header.infoTitle}
          </NavLink>
        </GridInfo>
        <GridJoin md={{ span: 0, offset: 2 }}>
          <NavLink to={`/${lang}/career/`} activeStyle={activeStyle}>
            {langtext.header.careerTitle}
          </NavLink>
        </GridJoin>
        <GridContact>
          <NavLink to={`/${lang}/contact/`} activeStyle={activeStyle}>
            {langtext.header.contractTitle}
          </NavLink>
        </GridContact>
      </GridWrapper>
    </>
  )
}

export default Navbar
