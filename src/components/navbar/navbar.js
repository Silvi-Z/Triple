import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { Row, Col, Dropdown } from "antd"
import CallImg from "../../assets/homeImages/phone-call3.png"
import MainLogo from "../../assets/homeImages/3c.png"
import EnvironmentImg from "../../assets/footericons/location.svg"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
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
  AdressSpan,
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

const Navbar = ({ open, responswrapper, location }) => {
  const { t, i18n } = useTranslation()
  const [languageText, setlanguageText] = useState(["Հայ", "Eng", "Рус"])
  const [lang, setLang] = useState({
    language: "en",
  })

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

  const handleChangeLanguage = (e, id) => {
    let elem = document.getElementById(id)

    if (elem.innerText === "Рус") {
      i18n.changeLanguage("ru").then(() => {
        navigate("/services/?lng=ru")
      })
    } else if (elem.innerText === "Eng") {
      i18n.changeLanguage("en").then(() => {
        navigate("/services/?lng=en")
      })
    } else if (elem.innerText === "Հայ") {
      i18n.changeLanguage("arm").then(() => {
        navigate("/services/?lng=arm")
      })
    }

    let newtext = languageText.filter(text => text !== elem.innerText)
    newtext.unshift(elem.innerText)
    setlanguageText(newtext)

    setLang(oldValues => ({
      ...oldValues,
      [event.target.name]: elem.innerText,
    }))
  }

  return (
    <>
      <ResponsiveNavWrapper>
        <Col lg={8} md={8} sm={6} xs={6}>
          <HeadIcon src={CallImg} alt={"icon"} />
        </Col>
        <Col lg={8} md={8} sm={12} xs={12} style={{ textAlign: "center" }}>
          <RespNavLink to="/">
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
                to="/services/"
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
                state={{ clickedItems: 0 }}
                // onClick={() => setResponswrapper()}
              >
                Ծառայություններ
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to="/reports/"
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
                // onClick={() => setResponswrapper()}
              >
                Հաշվետվության տրամադրում
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to="/calculators/"
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
              >
                Հաշվիչ
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to="/information/"
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
              >
                Օգտակար տեղեկություն
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to="/career/"
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
              >
                Միացիր մեր թիմին
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to="/contact/"
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
              >
                Կապ մեզ հետ
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
          <AdressSpan>Հր Քոչար 44</AdressSpan>
        </GridAddress>
        <GridBlank1 />
        <GridHome>
          <NavLink to="/">
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
            to="/services/?lng=arm"
            activeStyle={activeStyle}
            state={{ responswrapper }}
          >
            Ծառայություններ
          </NavLink>
        </GridService>
        <GridReport>
          <NavLink to="/reports/" activeStyle={activeStyle}>
            Հաշվետվության
            <br /> տրամադրում
          </NavLink>
        </GridReport>
        <GridCalc>
          <NavLink to="/calculators/" activeStyle={activeStyle}>
            Հաշվիչ
          </NavLink>
        </GridCalc>
        <GridInfo md={{ span: 0, offset: 2 }}>
          <NavLink to="/information/" activeStyle={activeStyle}>
            Օգտակար
            <br /> տեղեկություն
          </NavLink>
        </GridInfo>
        <GridJoin md={{ span: 0, offset: 2 }}>
          <NavLink to="/career/" activeStyle={activeStyle}>
            Միացիր
            <br /> մեր թիմին
          </NavLink>
        </GridJoin>
        <GridContact>
          <NavLink to="/contact/" activeStyle={activeStyle}>
            Կապ մեզ հետ
          </NavLink>
        </GridContact>
      </GridWrapper>
    </>
  )
}
export default Navbar
