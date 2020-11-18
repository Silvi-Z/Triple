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
  ServiceNameWrapper,
  TextWrapperSmall,
  TextWrapperBig,
  ResponsWrapper,
  SeemoreColumn,
  Borders,
  ContainerRow,
  ServiceTitle
} from "./homeServiceStyle.js"

const HomeServices = ({ langText, lang }) => {
  const [clickedItems, setClickedItems] = useState(null)

  return (
    <>
      <ServiceTitle>
        <H2Styled>{langText.title}</H2Styled>
        <PStyled>{langText.sub_title}</PStyled>
      </ServiceTitle>
      <ResponsWrapper>
        <ContainerRow>
            <Borders
              borderRight
              borderBottom
            ><ServiceNameWrapper>{langText.serviceName_1} </ServiceNameWrapper> </Borders>
            <Borders
              borderBottom
              borderRight
              borderLeft
            ><ServiceNameWrapper>{langText.serviceName_2} </ServiceNameWrapper> </Borders>
            <Borders
              borderBottom
              borderLeft
            ><ServiceNameWrapper>{langText.serviceName_3} </ServiceNameWrapper> </Borders>
            <Borders
              borderBottom
              borderRight
              borderTop
            ><ServiceNameWrapper>{langText.serviceName_4} </ServiceNameWrapper> </Borders>
            <Borders
              borderBottom
              borderRight
              borderTop
              borderLeft
            ><ServiceNameWrapper>{langText.serviceName_5} </ServiceNameWrapper> </Borders>
            <Borders
              borderBottom
              borderLeft
              borderTop
            ><ServiceNameWrapper>{langText.serviceName_6} </ServiceNameWrapper> </Borders>
            <Borders
              borderRight
              borderTop
            ><ServiceNameWrapper>{langText.serviceName_7} </ServiceNameWrapper> </Borders>
            <Borders
              borderRight
              borderLeft
              borderTop
            ><ServiceNameWrapper>{langText.serviceName_8} </ServiceNameWrapper> </Borders>
            <Borders
              borderLeft
              borderTop
            ><ServiceNameWrapper>{langText.serviceName_9} </ServiceNameWrapper> </Borders>

        </ContainerRow>
      </ResponsWrapper>
      <NavLink to={`/${lang}/services/`}>
        <SeemoreWrapper className="submit_button">
            {langText.button_text}
        </SeemoreWrapper>
      </NavLink>
    </>
  )
}

export default HomeServices
