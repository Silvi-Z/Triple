import React from 'react';
import { Typography, Row, Col } from 'antd';
import styled from 'styled-components';
import Layout from '../components/layout';
import SalaryCalculator from '../components/salarycalculator';

const { Text } = Typography;

const H1Styled = styled.h1`
  font-size: 26px;
  font-weight: 900;
`;

const TextStyled = styled(Text)`
  font-size: 20px;
`;

const Calculator = () => (
  <Layout>
    <Row>
      <Col offset={3}>
        <H1Styled>Հաշվիչ</H1Styled>
      </Col>
    </Row>
    <Row gutter={[1, 30]}>
      <Col span={17} offset={3}>
        <TextStyled>
          “Թրիփլ Քնսալթինգ” ընկերությունը տրամադրում է “Հաշվիչ” ծառայություն, որի միջոցով դուք կարող եք կատարել առցանց հաշվարկում։
        </TextStyled>
      </Col>
    </Row>
    <SalaryCalculator />
  </Layout>
);

export default Calculator;