import React from "react"
// import { Link } from "@reach/router"
import { Link } from "gatsby"
import { Card, List, Divider } from "antd"
import styled from "styled-components"
import Slider from "react-slick"

const NavCard = styled(Card)`
  background: transparent;
  box-sizing: border-box;
  // padding: 0 20px;
  margin-bottom: 10px;
  min-height: 80px;
  width: 100%;
`

const NavTitle = styled.h3`
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 1.15px;
  color: #000000;
  padding: 0 20px;
  margin: 0;
`

const NavItem = styled(List.Item)`
  border: none !important;
  margin-bottom: 0;
  padding-bottom: 15px;
  padding-top: 0;
  @media only screen and (max-width:1200px){
    padding-bottom: 5px;
  }
`

const UnderLine = styled(Divider)`
  margin: 5px 20px 15px!important;
  border-top: 1px solid #000000;
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  // padding: 0 20px;
  letter-spacing: 1.15px;
  &.ant-divider-horizontal{
    width:unset;
    min-width:unset
  }
`

const NavLink = props => (
  <Link {...props} getProps={({ isCurrent }) => {
    return {
      style: {
        background: isCurrent ? "#BCE7EC" : "inherit",
        textDecoration: "none",
        color: "#000000",
        padding: "5px 10px",
        borderRadius: "5px",
        display: "block",
      },
    }
  }}
  />
)
const settings = {
        dots: false,
        arrows:false,
        infinite: false,
        swipeToSlide:true,
        variableWidth: true,
        focusOnSelect: true,
}
  const SliderList = typeof window !== `undefined` && window.innerWidth <= 768 ? styled(Slider) `
     height:fit-content;
     display:flex;
     height:50px;
     align-items: center;
     & .slick-slider{
      margin-left:0
     }
     & .calc-nav-item{
     margin-left:15px;
     }
    `: styled.div`
     height:50px;
     align-items: center;
     flex-direction:column;
     padding-left: 20px;
`

const CalculatorNav = ({ t, locale }) => {
  return (
    <NavCard
      bordered={false}
      bodyStyle={{ padding: 0 }}
    >
      <NavTitle>{t.nav.title}</NavTitle>

      <UnderLine />

      <List bordered={false} itemLayout="vertical">
        <SliderList {...settings}>
          <NavItem>
            <NavLink className="calc-nav-item" to={`/${locale}/calculators/salary`}>{t.salary.title}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="calc-nav-item"
                     to={`/${locale}/calculators/salary-table`}>{t.salary_table.title}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="calc-nav-item" to={`/${locale}/calculators/vacation`}>{t.vacation.title}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="calc-nav-item" to={`/${locale}/calculators/final`}>{t.final.title}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="calc-nav-item" to={`/${locale}/calculators/subsidy`}>{t.subsidy.title}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="calc-nav-item" to={`/${locale}/calculators/car-customs`}>{t.car_customs.title}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="calc-nav-item" to={`/${locale}/calculators/car-tax`}>{t.car_tax.title}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="calc-nav-item" to={`/${locale}/calculators/car-sell`}>{t.car_sell.title}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="calc-nav-item" to={`/${locale}/calculators/mortgage`}>{t.mortgage.title}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="calc-nav-item" to={`/${locale}/calculators/calendar`}>{t.calendar.title}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="calc-nav-item" to={`/${locale}/calculators/currency`}>{t.currency.title}</NavLink>
          </NavItem>
        </SliderList>
      </List>
    </NavCard>
  )
}

export default CalculatorNav
