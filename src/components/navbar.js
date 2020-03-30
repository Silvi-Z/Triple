import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Row, Col } from "antd"
import CallImg from "../assets/homeImages/phone-call3.png"
import MainLogo from "../assets/homeImages/3c.png"
import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons"

const NavLink = styled(Link)`
  flex-grow: 1;
  flex-basis: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 1px;
  color: #000;
  text-decoration: none;
`
const RespNavLink = styled(Link)`
  height: 33px;
  align-items: center;
  background-color: #fff;
  text-decoration: none;
  text-align: center;
`
const ResponsiveMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 7% 20%;
  z-index: 999;
  @media only screen and (min-width: 968px) {
    display: none;
  }
  @media only screen and (min-width: 320px) {
    padding: 7% 8%;
  }
`

const GridWrapper = styled.nav`
  padding: 1px;
  background-color: #ebebeb;
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-areas:
    "lang addr addr bla1 bla1 bla1 bla1 bla1 bla1 home home home home bla2 bla2 bla2 bla2 bla2 bla2 phon phon phon"
    "serv serv serv repo repo repo calc calc calc home home home home info info info join join join cont cont cont";
  grid-template-rows: 8fr 18fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1px;
  > div {
    background-color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`
const HeadIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 10%;
  margin-left: 2%;

  @media (max-width: 380px) {
    margin-top: 25%;
    margin-left: 5%;
  }
`
const HeadMainIcon = styled.img`
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-color: #ebebeb;
  padding-top: 7%;

  @media only screen and (max-width: 1524px) {
    border-left: 0px solid;
  }

  @media only screen and (max-width: 968px) {
    height: 500%;
    padding-top: 0%;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0px;
  }
`
const ResponsiveNavWrapper = styled(Row)`
  display: none;
  width: 100%;
  height: 90px;
  @media only screen and (max-width: 768px) {
    display: flex;
    > div {
      width: 642px;
      height: 20px;
      padding: 0.2% 2%;
      background-color: #fff;
      align-items: center;
      justify-content: center;
    }
  }
`
const Label = styled.label`
  display: block;
  cursor: pointer;
  margin: 0 10px 0 0;
  font-size: 32px;
  font-family: ArialAMU;
  line-height: 70px;
  float: right;
  @media (max-width: 380px) {
    margin-top: 7%;
  }
`
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
}

const Navbar = ({ setResponswrapper, responswrapper }) => {
  return (
    <>
      <ResponsiveNavWrapper>
        <Col lg={8} md={8} sm={8} xs={8} sm={8}>
          <HeadIcon src={CallImg} alt={"icon"} />
        </Col>
        <Col lg={8} md={8} sm={8} xs={8} sm={8} style={{ textAlign: "center" }}>
          <RespNavLink to="/" activeStyle={activeStyle}>
            <HeadMainIcon src={MainLogo} alt={"icon"} />
          </RespNavLink>
        </Col>
        <Col lg={8} md={8} sm={8} xs={8} sm={8}>
          {!responswrapper ? (
            <Label htmlFor="toggle" onClick={setResponswrapper}>
              &#x2573;
            </Label>
          ) : (
            <Label htmlFor="toggle" onClick={setResponswrapper}>
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
                onClick={setResponswrapper}
              >
                Ծառայություններ
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: "4.6%" }}>
              <NavLink
                to="/reports/"
                activeStyle={activeStyle}
                style={{ fontSize: "20px" }}
                onClick={setResponswrapper}
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
          <select id="lang" style={{ border: "0px" }}>
            <option value="hy">Հայ</option>
            <option value="en">Eng</option>
            <option value="ru">Рус</option>
          </select>
        </GridLang>
        <GridAddress>
          <EnvironmentOutlined
            style={{ fontSize: "14px", marginRight: "5%" }}
          />
          <span>Հր Քոչար 44</span>
        </GridAddress>
        <GridBlank1 />
        <GridHome>
          <NavLink to="/" activeStyle={activeStyle}>
            <HeadMainIcon src={MainLogo} alt={"icon"} />
          </NavLink>
        </GridHome>
        <GridBlank2 />
        <GridPhone>
          <PhoneOutlined
            style={{
              fontSize: "14px",
              marginRight: "5%",
              transform: "rotate(90deg)",
            }}
          />
          <span>374 93 00 00 00</span>
        </GridPhone>
        <GridService>
          <NavLink
            to="/services/"
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
