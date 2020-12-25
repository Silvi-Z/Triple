import React from "react";
import { Link } from "@reach/router";
import { Card, List, Divider } from "antd";
import styled from "styled-components";

const NavCard = styled(Card)`
  background: transparent;
  box-sizing: border-box;
  padding: 10px 20px;
  margin-bottom: 10px;
  min-height: 80px;
  width: 100%;
`;

const NavTitle = styled.h3`
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 1.15px;
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
  font-family: ArialAMU,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 1.15px;
`;

const NavLink = props => (
  <Link {...props} getProps={({ isCurrent }) => {
      return {
        style: {
          background: isCurrent ? '#BCE7EC' : 'inherit',
          textDecoration: "none",
          color: "#000000",
          padding: '5px 10px',
          borderRadius: '5px',
          display: 'block'
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
          <NavLink className="calc-nav-item" to={`${locale}/calculators/salary`}>{t.salary.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="calc-nav-item" to={`${locale}/calculators/salary-table`}>{t.salary_table.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="calc-nav-item" to={`${locale}/calculators/vacation`}>{t.vacation.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="calc-nav-item" to={`${locale}/calculators/final`}>{t.final.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="calc-nav-item" to={`${locale}/calculators/mortgage`}>{t.mortgage.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="calc-nav-item" to={`${locale}/calculators/car-customs`}>{t.car_customs.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="calc-nav-item" to={`${locale}/calculators/car-sell`}>{t.car_sell.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="calc-nav-item" to={`${locale}/calculators/car-tax`}>{t.car_tax.title}</NavLink>
        </NavItem>
      </List>
    </NavCard>
  );
}

export default CalculatorNav;
