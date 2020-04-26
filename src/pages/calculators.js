import React from 'react';
import { Typography, Row, Col, Divider } from 'antd';
import styled from 'styled-components';
import Layout from '../components/layout';
import SalaryCalculator from '../components/calculators/salarycalculator';
import VacationCalculator from '../components/calculators/vacationcalculator';
import NonWorkingCalculator from '../components/calculators/nonWorkingCalculator';
import CarCustomsCalculator from '../components/calculators/carCustomsCalculator';
import CarSellCalculator from '../components/calculators/carSellCalculator';
import CarPropTaxCalculator from '../components/calculators/carPropTaxCalculator';
import MortgageCalculator from '../components/calculators/mortgageCalculator';
import FinalCalculator from '../components/calculators/finalCalculator';

const { Text } = Typography;

const HeaderRow = styled(Row)`
  @media only screen and (max-width: 768px) {
    padding-top: 49px;
  }
`;

const H1Styled = styled.h1`
  font-size: 18px;
  font-weight: bold;
  font-family: ArialAMU;
  color: #000;
`;

const TextStyled = styled(Text)`
  font-size: 16px;
  font-family: ArialAMU;
  color: #000;
`;

const Calculators = () => (
  <Layout>
    <HeaderRow>
      <Col
        xxl={{ span: 8, offset: 4 }}
        xl={{ span: 9, offset: 4 }}
        lg={{ span: 8, offset: 3 }}
        md={{ span: 15, offset: 1 }}
        sm={16}
        span={16}
      >
        <H1Styled>Հաշվիչ</H1Styled>
      </Col>
    </HeaderRow>
    <Row gutter={[1, 60]}>
      <Col
        xxl={{ span: 16, offset: 4 }}
        xl={{ span: 14, offset: 4 }}
        lg={{ span: 15, offset: 3 }}
        md={{ span: 22, offset: 1 }}
        sm={24}
        span={24}
      >
        <TextStyled>
          “Թրիփլ Քնսալթինգ” ընկերությունը տրամադրում է “Հաշվիչ” ծառայություն,
          որի միջոցով դուք կարող եք կատարել առցանց հաշվարկում։
        </TextStyled>
      </Col>
    </Row>
    <SalaryCalculator />
    <Divider />
    <VacationCalculator />
    <Divider />
    <NonWorkingCalculator />
    <Divider />
    <FinalCalculator />
    <Divider />
    <MortgageCalculator />
    <Divider />
    <CarCustomsCalculator />
    <Divider />
    <CarSellCalculator />
    <Divider />
    <CarPropTaxCalculator />
  </Layout>
);

export default Calculators;
