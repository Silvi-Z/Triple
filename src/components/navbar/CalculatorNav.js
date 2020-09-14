import React from "react";
import { Link } from "@reach/router";
import { Card, List, Divider } from "antd";
import styled from "styled-components";

const NavCard = styled(Card)`
  background: transparent;
  box-sizing: border-box;
  padding: 10px 20px;
  margin-bottom: 10;
  height: 80;
  width: 100%;
`;

const NavTitle = styled.h3`
  font-family: Arial AMU;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.15px;
  color: #000000;
  padding: 0;
  margin: 0;
`;

const NavItem = styled(List.Item)`
  border: none !important;
  margin-bottom: 0;
  padding-bottom: 15px;
  padding-top: 0;
`;

const UnderLine = styled(Divider)`
  margin: 5px 0 15px!important;
  border-top: 1px solid #000000;
  font-family: Arial AMU;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.15px;
`;

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          color: isCurrent ? "#00B3C7" : "#000000",
          textDecoration: "underline"
        }
      };
    }}
  />
);

const CalculatorNav = ({ t, locale }) => {
  return (
    <NavCard
      bordered={false}
      bodyStyle={{ padding: 0 }}
    >
      <NavTitle>{t.nav.title}</NavTitle>

      <UnderLine />

      <List bordered={false} itemLayout="vertical">
        <NavItem>
          <NavLink to={`${locale}/calculators/salary`}>{t.salary_calculator.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={`${locale}/calculators/vacation`}>{t.vacation_calculator.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={`${locale}/calculators/final`}>{t.final_calculator.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={`${locale}/calculators/mortgage`}>{t.mortgage_calculator.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={`${locale}/calculators/car-customs`}>{t.car_customs_calculator.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={`${locale}/calculators/car-sell`}>{t.car_sell_calculator.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={`${locale}/calculators/car-tax`}>{t.car_prop_tax_calculator.title}</NavLink>
        </NavItem>
      </List>
    </NavCard>
  );
}

export default CalculatorNav;
