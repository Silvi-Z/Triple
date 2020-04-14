import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import ServiceDropWrap from '../components/servicecomponents/servicedrop';
import CalcImg from '../assets/homeImages/icons/calculator.svg';
import TaxImg from '../assets/homeImages/icons/tax.svg';
import AuditImg from '../assets/homeImages/icons/audit.svg';
import ClientImg from '../assets/homeImages/icons/client.svg';
import BrowserImg from '../assets/homeImages/icons/browser.svg';
import UserImg from '../assets/homeImages/icons/user.svg';
import LawImg from '../assets/homeImages/icons/law.svg';
import TeamImg from '../assets/homeImages/icons/teamwork.svg';

const HeadingParagraphRow = styled(Row)`
  padding: 0 12%;
  margin-bottom: 2.8%;
  @media (min-width: 1600px) {
    padding: 0 0%;
    margin-bottom: 2.8%;
  }
  @media only screen and (max-width: 768px) {
    padding-top: 49px;
    padding-left: 8.8%;
    padding-right: 9%;
  }
`;
const H2Styled = styled.h2`
  width: 155px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  text-align: left;
`;
const PStyled = styled.p`
  width: 517px;
  height: 46px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-top: 26px;
  @media only screen and (max-width: 375px) {
    width: 289px;
    height: 103px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media only screen and (max-width: 320px) {
    width: 289px;
    height: 103px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`;

const Services = ({ location, ...props }) => {
  const [servicedata, setservicedata] = useState([]);

  const getServiceData = () => {
    setservicedata([
      {
        status: true,
        data: {
          id: 0,
          image: CalcImg,
          paragraph: 'Հաշվապահական հաշվառում',
          text:
            '-հաշվապահական հաշվառման քաղաքականության մշակում - հարկային քաղաքականության մշակում',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 1,
          image: TaxImg,
          paragraph: 'Հարկային հաշվառում',
          text:
            '-հաշվապահական հաշվառման քաղաքականության մշակում - հարկային քաղաքականության մշակում',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 2,
          image: AuditImg,
          paragraph: 'Հարկային աուդիտ',
          text:
            '-հաշվապահական հաշվառման քաղաքականության մշակում - հարկային քաղաքականության մշակում',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 3,
          image: ClientImg,
          paragraph: 'Խորհրդատվություն',
          text:
            '-հաշվապահական հաշվառման քաղաքականության մշակում - հարկային քաղաքականության մշակում',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 4,
          image: BrowserImg,
          paragraph: 'Կազմակերպության գրանցում',
          text:
            '-հաշվապահական հաշվառման քաղաքականության մշակում - հարկային քաղաքականության մշակում',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 5,
          image: LawImg,
          paragraph: 'Ֆիզիկական անձանց',
          text:
            '-հաշվապահական հաշվառման քաղաքականության մշակում - հարկային քաղաքականության մշակում',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 6,
          image: UserImg,
          paragraph: 'Մաքսային գոծարքներ',
          text:
            '-հաշվապահական հաշվառման քաղաքականության մշակում - հարկային քաղաքականության մշակում',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 7,
          image: TeamImg,
          paragraph: 'Կադրային աշխատանքի վարում',
          text:
            '-հաշվապահական հաշվառման քաղաքականության մշակում - հարկային քաղաքականության մշակում',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
    ]);
  };

  useEffect(() => {
    getServiceData();
  }, []);

  const toggle = current => {
    const data = servicedata.map(d =>
      d.data.id === current.data.id && d.open === false
        ? { ...d, open: true }
        : d.data.id !== current.data.id && d.open === true
          ? { ...d, open: false }
          : { ...d, open: false }
    );
    setservicedata(data);
  };

  return (
    <Layout>
      <HeadingParagraphRow>
        <Col lg={{ span: 12 }} xxl={{ span: 8, offset: 4 }}>
          <H2Styled>Ծառայություններ</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերության բոլոր հիմնական ծառայությունները կապված
            են հաշվապահական հաշվառման և աուդիտի հետ։
          </PStyled>
        </Col>
      </HeadingParagraphRow>
      {servicedata.map((d, id) => (
        <ServiceDropWrap showServiceForm={toggle} data={d} key={id} />
      ))}
    </Layout>
  );
};
export default Services;
