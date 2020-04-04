import React from 'react';
import { Typography, Row, Col, Divider } from 'antd';
import styled from 'styled-components';
import Layout from '../components/layout';
import SalaryCalculator from '../components/calcComponents/salarycalculator';
import VacationCalculator from '../components/calcComponents/vacationcalculator';
import CarCustomsCalculator from '../components/calcComponents/carCustomsCalculator';
import CarSellCalculator from '../components/calcComponents/carSellCalculator';

const { Text } = Typography;

const H1Styled = styled.h1`
  font-size: 26px;
  font-weight: 900;
`;

const TextStyled = styled(Text)`
  font-size: 20px;
  font-family: ArialAMU, sans-serif;
`;

const Calculators = () => (
  <Layout>
    <Row>
      <Col
        xxl={{ span: 8, offset: 3 }}
        xl={{ span: 8, offset: 2 }}
        lg={{ span: 8, offset: 1 }}
      >
        <H1Styled>Հաշվիչ</H1Styled>
      </Col>
    </Row>
    <Row gutter={[1, 30]}>
      <Col
        xxl={{ span: 17, offset: 3 }}
        xl={{ span: 18, offset: 2 }}
        lg={{ span: 20, offset: 1 }}
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
    <CarCustomsCalculator />
    <Divider />
    <CarSellCalculator />
  </Layout>
);

export default Calculators;
