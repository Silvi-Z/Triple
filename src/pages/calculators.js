import React, { useState } from 'react';
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

const Calculators = () => {
  const [display, setDisplay] = useState({
    salary: false,
    vacation: false,
    nonWorking: false,
    final: false,
    mortgage: false,
    carCustoms: false,
    carSell: false,
    carPropTax: false,
  });

  const toggleDisplay = name => {
    const data = {...display};

    for (let property in data) {
      data[property] = false;
    }

    data[name] = !display[name];

    setDisplay(data);
  };

  return (
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
      <SalaryCalculator toggleForm={() => toggleDisplay('salary')} showForm={display.salary} />
      <Divider />
      <VacationCalculator toggleForm={() => toggleDisplay('vacation')} showForm={display.vacation} />
      <Divider />
      {/* <NonWorkingCalculator toggleForm={() => toggleDisplay('nonWorking')} showForm={display.nonWorking} />
      <Divider /> */}
      <FinalCalculator toggleForm={() => toggleDisplay('final')} showForm={display.final} />
      <Divider />
      <MortgageCalculator toggleForm={() => toggleDisplay('mortgage')} showForm={display.mortgage} />
      <Divider />
      <CarCustomsCalculator toggleForm={() => toggleDisplay('carCustoms')} showForm={display.carCustoms} />
      <Divider />
      <CarSellCalculator toggleForm={() => toggleDisplay('carSell')} showForm={display.carSell} />
      <Divider />
      <CarPropTaxCalculator toggleForm={() => toggleDisplay('carPropTax')} showForm={display.carPropTax} />
    </Layout>
  );
};

export default Calculators;
