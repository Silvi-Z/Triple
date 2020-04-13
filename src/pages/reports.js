/*eslint-disable */
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import ReportForm from '../components/reportComponents/reportForm'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import CarImg from '../assets/calcImages/carSell.png';

const ReportParagraphRow = styled(Row)`
  padding: 0 12.5%;
  margin-bottom: 2.8%;
  @media only screen and (max-width: 768px) {
    margin-top: 49px;
    padding: 0 3.5%;
  }
  @media only screen and (max-width: 375px) {
    margin-bottom: 70px;
    padding: 0 3.5%;
    margin-top: 39px;
  }
  @media only screen and (max-width: 320px) {
    margin-bottom: 70px;
    padding: 0 3.5%;
    margin-top: 39px;
  }
`;
const H2Styled = styled.h2`
  width: 439px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  span {
    color: #009db8;
    font-family: ArialAMU;
    font-size: 18px;
    font-weight: normal;
  }
`;
const PStyled = styled.p`
  width: 769px;
  height: 76px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media only screen and (max-width: 768px) {
    max-width: 509px;
    max-height: 106px;
    margin-left: 0%;
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 375px) {
    width: 288px;
    height: 226px;
    font-family: ArialAMU;
  }
  @media only screen and (max-width: 320px) {
    width: 288px;
    height: 226px;
    font-family: ArialAMU;
  }
`;
const HeadIcon = styled.img`
  width: 25px;
  height: 25px;
  @media (min-width: 1200px) {
    width: 35px;
    height: 35px;
  }
  @media (min-width: 1600px) {
    width: 35px;
    height: 35px;
  }
`;
const ToggleButton = styled(Button)`
  height: 60px;
  width: 60px;
  margin-top: -16%;
`;
const ReportDropRow = styled(Row)``;
const ReportFormRow = styled(Row)``;
const H3StyledForm = styled.h3`
  width: 239px;
  height: 16px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`;

const Reports = () => {
  const [showForm, toggleForm] = useState(false);
  return (
    <Layout>
      <ReportParagraphRow>
        <Col lg={{ span: 24 }}>
          <H2Styled>Հաշվետվության տրամադրում</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերության “Հաշվետվության տրամադրում” ծառայության միջոցով կարող եք առցանց և շտապ կերպով ստանալ ձեզ հետաքրքրող հաշվետվությունը։
      </PStyled>
        </Col>
      </ReportParagraphRow>
      <ReportDropRow align="middle" gutter={[10, 25]}>
        <Col
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 3 }}
          lg={{ span: 1, offset: 3 }}
        >
          <HeadIcon src={CarImg} alt={'icon'} />
        </Col>
        <Col xxl={15} xl={15} lg={15} md={16} span={17}>
          <H2Styled>Ավտոմեքենայի վաճառքի հաշվետվություն <span>( 5000 դր )</span></H2Styled>
        </Col>
        <Col span={2}>
          <ToggleButton block onClick={() => toggleForm(!showForm)}>
            {showForm ? (
              <MinusOutlined style={{ fontSize: '20px' }} />
            ) : (
                <PlusOutlined style={{ fontSize: '20px' }} />
              )}
          </ToggleButton>
        </Col>
      </ReportDropRow>
      <ReportFormRow align="middle">
        {showForm ? (
          <Col
            xxl={{ span: 18, offset: 4 }}
            xl={{ span: 18, offset: 4 }}
            lg={{ span: 18, offset: 4 }}
          >
            <H3StyledForm>Պահանջվող տեղեկատվություն</H3StyledForm>
            <ReportForm />
          </Col>
        ) : null}
      </ReportFormRow>
    </Layout >
  )
};

export default Reports;