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

const UnderLine = styled(Divider)`
  margin: 5px 0 15px!important;
  border-top: 1px solid #000000;
`;

const CalculatorNav = ({ t }) => {
  return (
    <NavCard
      bordered={false}
      bodyStyle={{ padding: 0 }}
    >
      <NavTitle>{t.nav.title}</NavTitle>

      <UnderLine />

      <List bordered={false}>
        <List.Item>
          <Link to="/arm/calculators/salary">{t.salary_calculator.title}</Link>
        </List.Item>
      </List>
    </NavCard>
  );
}

export default CalculatorNav;
