import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Row, Col, Dropdown } from 'antd';
import CallImg from '../assets/homeImages/phone-call3.png';
import MainLogo from '../assets/homeImages/3c.png';
import EnvironmentImg from '../assets/footericons/location.svg';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import './layout.css';

const phones = (
  <div className="phonedrop">
    <div className="phonebox">
      <PhoneOutlined
        style={{
          fontSize: '14px',
          marginRight: '4%',
          transform: 'rotate(90deg)',
        }}
      />
      <span className="phonenumber">374 98 553533</span>
    </div>
    <div className="phonebox">
      <i
        className="fab fa-whatsapp"
        style={{ fontSize: '15px', color: 'green', marginRight: '4%' }}
      ></i>
      <span className="phonenumber">374 98 553533</span>
    </div>
    <div className="phonebox">
      <i
        className="fab fa-viber"
        style={{ fontSize: '15px', color: 'purply', marginRight: '4%' }}
      ></i>
      <span className="phonenumber">374 98 553533</span>
    </div>
  </div>
);
const language = (
  <div className="languagedrop">
    <div className="languagebox">
      <span className="languagetext">Eng</span>
    </div>
    <div className="languagebox">
      <span className="languagetext">Рус</span>
    </div>
  </div>
);

const NavLink = styled(Link)`
  flex-grow: 1;
  flex-basis: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 1px;
  color: #000;
  text-decoration: none;
`;
const RespNavLink = styled(Link)`
  height: 33px;
  align-items: center;
  background-color: #fff;
  text-decoration: none;
  text-align: center;
`;
const ResponsiveMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 7% 20%;
  /* z-index: 999; */
  background-color: white;
  @media only screen and (min-width: 968px) {
    display: none;
  }
  @media only screen and (min-width: 375px) {
    padding: 7% 8%;
  }
  @media only screen and (min-width: 320px) {
    padding: 7% 6%;
  }
`;

const AdressSpan = styled.span`
  width: 67px;
  height: 13px;
  font-family: Sylfaen;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  margin-bottom: 4%;
`;
const PhoneSpan = styled.span`
  width: 93px;
  height: 10px;
  font-family: ArialAMU;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`;
const LangSpan = styled.span`
  width: 19px;
  height: 12px;
  font-family: ArialAMU;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`;

const GridWrapper = styled.nav`
  padding: 1px;
  background-color: #ebebeb;
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-areas:
    "lang addr addr bla1 bla1 bla1 bla1 bla1 bla1 home home home home bla2 bla2 bla2 bla2 bla2 bla2 phon phon phon"
    "serv serv serv repo repo repo calc calc calc home home home home info info info join join join cont cont cont";
  grid-template-rows: 8fr 18fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1px;
  > div {
    background-color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const HeadIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 10%;
  margin-left: 2%;

  @media (max-width: 375px) {
    margin-top: 35%;
    margin-left: 5%;
  }
`;
const HeadMainIcon = styled.img`
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-color: #ebebeb;
  padding-top: 7%;
  @media (min-width: 1600px) {
    border-left: 0px solid;
    border-right: 0px solid;
    padding-top: 5%;
  }
  @media only screen and (max-width: 1366px) {
    border-left: 0px solid;
    border-right: 0px solid;
  }
  @media only screen and (max-width: 768px) {
    height: 500%;
    padding-top: 0%;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0px;
  }
  @media only screen and (max-width: 375px) {
    height: 115px;
    width: 185px;
    padding-top: 0%;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0px;
    margin-top: -6%;
  }
`;
const ResponsiveNavWrapper = styled(Row)`
  display: none;
  width: 100%;
  height: 90px;
  background-color: white;
  @media only screen and (max-width: 768px) {
    display: flex;
    > div {
      width: 642px;
      height: 20px;
      padding: 0.2% 2%;
      background-color: #fff;
      align-items: center;
      justify-content: center;
    }
  }
`;
const Label = styled.label`
  display: block;
  cursor: pointer;
  margin: 0 10px 0 0;
  font-size: 32px;
  font-family: ArialAMU;
  line-height: 70px;
  float: right;
  @media (max-width: 380px) {
    margin-top: 7%;
  }
`;
const EnvironmentWrapper = styled.img`
  width: 14px;
  height: 19px;
  margin-right: 5%;
  margin-top: 19%;
  @media (min-width: 1600px) {
    margin-top: 11%;
  }
`;
const GridLang = styled.div`
  grid-area: lang;
`;
const GridAddress = styled.div`
  grid-area: addr;
`;
const GridBlank1 = styled.div`
  grid-area: bla1;
`;
const GridHome = styled.div`
  grid-area: home;
`;
const GridBlank2 = styled.div`
  grid-area: bla2;
`;
const GridPhone = styled.div`
  grid-area: phon;
`;
const GridService = styled.div`
  grid-area: serv;
`;
const GridReport = styled.div`
  grid-area: repo;
`;
const GridCalc = styled.div`
  grid-area: calc;
`;
const GridInfo = styled.div`
  grid-area: info;
`;
const GridJoin = styled.div`
  grid-area: join;
`;
const GridContact = styled.div`
  grid-area: cont;
`;
const activeStyle = {
  color: '#009db8',
  height: '100%',
  border: '1px solid #009db8',
};

const Navbar = ({ open, responswrapper }) => {
  return (
    <>
      <ResponsiveNavWrapper>
        <Col lg={8} md={8} sm={6} xs={6}>
          <HeadIcon src={CallImg} alt={'icon'} />
        </Col>
        <Col lg={8} md={8} sm={12} xs={12} style={{ textAlign: 'center' }}>
          <RespNavLink to="/">
            <HeadMainIcon src={MainLogo} alt={'icon'} />
          </RespNavLink>
        </Col>
        <Col lg={8} md={8} sm={6} xs={6}>
          {!responswrapper ? (
            <Label htmlFor="toggle" onClick={() => open()}>
              &#x2573;
            </Label>
          ) : (
              <Label htmlFor="toggle" onClick={() => open()}>
                &#9776;
              </Label>
            )}
        </Col>
      </ResponsiveNavWrapper>

      {!responswrapper ? (
        <ResponsiveMenuWrapper>
          <Row>
            <Col span={24} style={{ marginBottom: '4.6%' }}>
              <NavLink
                to="/services/"
                activeStyle={activeStyle}
                style={{ fontSize: '20px' }}
                state={{ clickedItems: 0 }}
              // onClick={() => setResponswrapper()}
              >
                Ծառայություններ
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: '4.6%' }}>
              <NavLink
                to="/reports/"
                activeStyle={activeStyle}
                style={{ fontSize: '20px' }}
              // onClick={() => setResponswrapper()}
              >
                Հաշվետվության տրամադրում
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: '4.6%' }}>
              <NavLink
                to="/calculators/"
                activeStyle={activeStyle}
                style={{ fontSize: '20px' }}
              >
                Հաշվիչ
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: '4.6%' }}>
              <NavLink
                to="/information/"
                activeStyle={activeStyle}
                style={{ fontSize: '20px' }}
              >
                Օգտակար տեղեկություն
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: '4.6%' }}>
              <NavLink
                to="/career/"
                activeStyle={activeStyle}
                style={{ fontSize: '20px' }}
              >
                Միացիր մեր թիմին
              </NavLink>
            </Col>
            <Col span={24} style={{ marginBottom: '4.6%' }}>
              <NavLink
                to="/contact/"
                activeStyle={activeStyle}
                style={{ fontSize: '20px' }}
              >
                Կապ մեզ հետ
              </NavLink>
            </Col>
          </Row>
        </ResponsiveMenuWrapper>
      ) : null}

      <GridWrapper>
        <GridLang>
          <Dropdown
            overlay={language}
            trigger={['click']}
            style={{ marginBottom: '10%' }}
          >
            <GridLang>
              <a
                onClick={e => e.preventDefault()}
                style={{ width: '100%', color: 'black' }}
              >
                <LangSpan>Հայ</LangSpan>{' '}
                <CaretDownOutlined style={{ fontSize: '10px' }} />
              </a>
            </GridLang>
          </Dropdown>
        </GridLang>
        <GridAddress>
          <EnvironmentWrapper src={EnvironmentImg} />
          <AdressSpan>Հր Քոչար 44</AdressSpan>
        </GridAddress>
        <GridBlank1 />
        <GridHome>
          <NavLink to="/">
            <HeadMainIcon src={MainLogo} alt={'icon'} />
          </NavLink>
        </GridHome>
        <GridBlank2 />
        <Dropdown overlay={phones} trigger={['click']}>
          <GridPhone>
            <a
              onClick={e => e.preventDefault()}
              style={{ width: '100%', color: 'black' }}
            >
              <PhoneOutlined
                style={{
                  fontSize: '14px',
                  marginRight: '4%',
                  transform: 'rotate(90deg)',
                }}
              />
              <PhoneSpan>374 98 553533</PhoneSpan>{' '}
              <CaretDownOutlined style={{ fontSize: '11px' }} />
            </a>
          </GridPhone>
        </Dropdown>
        <GridService>
          <NavLink
            to="/services/"
            activeStyle={activeStyle}
            state={{ responswrapper }}
          >
            Ծառայություններ
          </NavLink>
        </GridService>
        <GridReport>
          <NavLink to="/reports/" activeStyle={activeStyle}>
            Հաշվետվության
            <br /> տրամադրում
          </NavLink>
        </GridReport>
        <GridCalc>
          <NavLink to="/calculators/" activeStyle={activeStyle}>
            Հաշվիչ
          </NavLink>
        </GridCalc>
        <GridInfo md={{ span: 0, offset: 2 }}>
          <NavLink to="/information/" activeStyle={activeStyle}>
            Օգտակար
            <br /> տեղեկություն
          </NavLink>
        </GridInfo>
        <GridJoin md={{ span: 0, offset: 2 }}>
          <NavLink to="/career/" activeStyle={activeStyle}>
            Միացիր
            <br /> մեր թիմին
          </NavLink>
        </GridJoin>
        <GridContact>
          <NavLink to="/contact/" activeStyle={activeStyle}>
            Կապ մեզ հետ
          </NavLink>
        </GridContact>
      </GridWrapper>
    </>
  );
};

export default Navbar;
