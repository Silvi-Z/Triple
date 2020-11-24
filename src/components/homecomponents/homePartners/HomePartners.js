import React from "react"
import {
  NavLink,
  PStyled,
  H2Styled,
  IconWrapper,
  SeemoreWrapper,
  ResponsWrapper,
  PartnerspHeadingColumn,
} from "./homePartStyle.js"
import { Borders, ServiceNameWrapper } from "../homeServices/homeServiceStyle"
import OSN from "../../../assets/homeImages/partners/osn.png"
import Sky from "../../../assets/homeImages/partners/sky.png"
import AbcImg from "../../../assets/homeImages/partners/abc.png"
import KochonImg from "../../../assets/homeImages/partners/kochon.png"
import Digilabs from "../../../assets/homeImages/partners/digilabs.png"
import Digilite from "../../../assets/homeImages/partners/digilite.png"
import Elev8rPeach from "../../../assets/homeImages/partners/elev8r_peach.png"
import AlgorithmImg from "../../../assets/homeImages/partners/algorithm-logo.png"
import BestSolutions from "../../../assets/homeImages/partners/best_solutions.png"





const Homepartners = ({ langText, lang }) => {
  return (
    <>
      <PartnerspHeadingColumn>
        <H2Styled>{langText.title}</H2Styled>
        <PStyled>
          {langText.sub_title}
        </PStyled>
      </PartnerspHeadingColumn>
      <ResponsWrapper>
            <Borders
              borderRight
              borderBottom
            >
              <ServiceNameWrapper>
                <IconWrapper src={AlgorithmImg} alt={"icon"}/>
              </ServiceNameWrapper>
            </Borders>
            <Borders
              borderBottom
              borderRight
              borderLeft
            ><ServiceNameWrapper>
              <IconWrapper src={AbcImg} alt={"icon"}/>
            </ServiceNameWrapper> </Borders>
            <Borders
              borderBottom
              borderLeft
            ><ServiceNameWrapper>
              <IconWrapper src={KochonImg} alt={"icon"}/>
            </ServiceNameWrapper> </Borders>
            <Borders
              borderBottom
              borderRight
              borderTop
            ><ServiceNameWrapper>
              <IconWrapper src={OSN} alt={"icon"}/>
            </ServiceNameWrapper> </Borders>
            <Borders
              borderBottom
              borderRight
              borderTop
              borderLeft
            ><ServiceNameWrapper>
              <IconWrapper src={BestSolutions} alt={"icon"}/>
            </ServiceNameWrapper> </Borders>
            <Borders
              borderBottom
              borderLeft
              borderTop
            ><ServiceNameWrapper>
              <IconWrapper src={Sky} alt={"icon"}/>
            </ServiceNameWrapper> </Borders>
            <Borders
              borderRight
              borderTop
            ><ServiceNameWrapper>
              <IconWrapper src={Digilite} alt={"icon"}/>
            </ServiceNameWrapper> </Borders>
            <Borders
              borderRight
              borderLeft
              borderTop
            ><ServiceNameWrapper>
              <IconWrapper src={Elev8rPeach} alt={"icon"}/>
            </ServiceNameWrapper> </Borders>
            <Borders
              borderLeft
              borderTop
            ><ServiceNameWrapper>
              <IconWrapper src={Digilabs} alt={"icon"}/>
            </ServiceNameWrapper> </Borders>
      </ResponsWrapper>
      <NavLink to={`/${lang}/contact`}>
        <SeemoreWrapper
          className="submit_button">
          {langText.button_text}
        </SeemoreWrapper>
      </NavLink>
    </>
  )
}

export default Homepartners
