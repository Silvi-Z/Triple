import React, { useState } from "react"
import { Row, Col } from "antd"
// import * as Yup from 'yup';
import CalcImg from "../../../assets/homeImages/icons/calculator.svg"
import TaxImg from "../../../assets/homeImages/icons/tax.svg"
import AuditImg from "../../../assets/homeImages/icons/audit.svg"
import ClientImg from "../../../assets/homeImages/icons/client.svg"
import BrowserImg from "../../../assets/homeImages/icons/browser.svg"
import UserImg from "../../../assets/homeImages/icons/user.svg"
import LawImg from "../../../assets/homeImages/icons/law.svg"
import TeamImg from "../../../assets/homeImages/icons/teamwork.svg"
import RightArrowImg from "../../../assets/homeImages/right-arrow.png"
import {
  NavLink,
  NavLinkItems,
  H2Styled,
  PStyled,
  SeemoreWrapper,
  SeemoreSpan,
  Seemoreimg,
  IconWrapper,
  TextWrapperSmall,
  TextWrapperBig,
  ResponsWrapper,
  SeemoreColumn,
  IconWrapperCol,
  IconWrapperColLast,
  IconWrapperSecondLastCol,
  IconWrapperSecondCol,
  ContainerRow,
} from "./homeServiceStyle.js"

const Homeservices = () => {
  const [clickedItems, setClickedItems] = useState(null)

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={24} xs={24}>
          <H2Styled>Ծառայություններ</H2Styled>
          <PStyled>
            Թրիփլ Քոնսալթինգի կողմից մատուցվող հիմնական ծառայություններն են։
          </PStyled>
        </Col>
        <SeemoreColumn ls={12} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <SeemoreWrapper>
            <NavLink to="/services/">
              <SeemoreSpan>Տեսնել ավելին</SeemoreSpan>
              <Seemoreimg src={RightArrowImg} alt={"icon"}></Seemoreimg>
            </NavLink>
          </SeemoreWrapper>
        </SeemoreColumn>
      </Row>
      <ResponsWrapper>
        <ContainerRow>
          <Col span={24}>
            <Row style={{ width: "100%", height: "100%" }}>
              <IconWrapperCol lg={6} md={12} xl={6} sm={12} xs={12}>
                <NavLinkItems to="/services/" state={{ clickedItems: 0 }}>
                  <IconWrapper src={CalcImg} alt={"icon"}></IconWrapper>
                  <TextWrapperBig>Հաշվապահական հաշվառում</TextWrapperBig>
                </NavLinkItems>
              </IconWrapperCol>
              <IconWrapperCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <NavLinkItems to="/services/" state={{ clickedItems: 1 }}>
                  <IconWrapper src={TaxImg} alt={"icon"}></IconWrapper>
                  <TextWrapperBig>Հարկային հաշվառում</TextWrapperBig>
                </NavLinkItems>
              </IconWrapperCol>
              <IconWrapperCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <NavLinkItems to="/services/" state={{ clickedItems: 1 }}>
                  <IconWrapper src={AuditImg} alt={"icon"}></IconWrapper>
                  <TextWrapperBig>Հարկային աուդիտ</TextWrapperBig>
                </NavLinkItems>
              </IconWrapperCol>
              <IconWrapperColLast lg={6} xl={6} sm={12} md={12} xs={12}>
                <NavLinkItems to="/services/" state={{ clickedItems: 2 }}>
                  <IconWrapper src={ClientImg} alt={"icon"}></IconWrapper>
                  <TextWrapperBig>Խորհրդատվություն</TextWrapperBig>
                </NavLinkItems>
              </IconWrapperColLast>
            </Row>
          </Col>
          <Col span={24}>
            <Row style={{ width: "100%", height: "100%" }}>
              <IconWrapperSecondCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <NavLinkItems to="/services/" state={{ clickedItems: 3 }}>
                  <IconWrapper src={BrowserImg} alt={"icon"}></IconWrapper>
                  <TextWrapperBig>Կազմակերպության գրանցում</TextWrapperBig>
                </NavLinkItems>
              </IconWrapperSecondCol>
              <IconWrapperSecondCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <NavLinkItems to="/services/" state={{ clickedItems: 4 }}>
                  <IconWrapper src={UserImg} alt={"icon"}></IconWrapper>
                  <TextWrapperBig>Ֆիզիկական անձանց</TextWrapperBig>
                </NavLinkItems>
              </IconWrapperSecondCol>
              <IconWrapperSecondCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <NavLinkItems to="/services/" state={{ clickedItems: 5 }}>
                  <IconWrapper src={LawImg} alt={"icon"}></IconWrapper>
                  <TextWrapperBig>Մաքսային գոծարքներ</TextWrapperBig>
                </NavLinkItems>
              </IconWrapperSecondCol>
              <IconWrapperSecondLastCol lg={6} xl={6} sm={12} md={12} xs={12}>
                <NavLinkItems to="/services/" state={{ clickedItems: 6 }}>
                  <IconWrapper src={TeamImg} alt={"icon"}></IconWrapper>
                  <TextWrapperBig>Կադրային աշխատանքի վարում</TextWrapperBig>
                </NavLinkItems>
              </IconWrapperSecondLastCol>
            </Row>
          </Col>
        </ContainerRow>
      </ResponsWrapper>
    </>
  )
}

export default Homeservices
