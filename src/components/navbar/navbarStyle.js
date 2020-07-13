import styled from 'styled-components';
import { Row, Col, Dropdown } from 'antd';
import { Link } from 'gatsby';

export const NavLink = styled(Link)`
  flex-grow: 1;
  flex-basis: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 1px;
  color: #000;
  text-decoration: none;
  border: 1px solid white;
}
`;
export const RespNavLink = styled(Link)`
  height: 33px;
  align-items: center;
  background-color: #fff;
  text-decoration: none;
  text-align: center;
`;
export const ResponsiveMenuWrapper = styled.div`
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

export const AdressSpan = styled.span`
  width: 67px;
  height: 13px;
  font-family: Sylfaen;
  font-size: ${props => props.lang !== "arm" ? "11px" : "12px"};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  margin-bottom: 4%;
`;
export const PhoneSpan = styled.span`
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
export const LangSpan = styled.span`
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

export const GridWrapper = styled.nav`
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
export const HeadIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 10%;
  margin-left: 2%;

  @media (max-width: 375px) {
    margin-top: 35%;
    margin-left: 5%;
  }
`;
export const HeadMainIcon = styled.img`
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
export const ResponsiveNavWrapper = styled(Row)`
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
export const Label = styled.label`
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
export const EnvironmentWrapper = styled.img`
  width: 14px;
  height: 19px;
  margin-right: 5%;
  margin-top: 19%;
  @media (min-width: 1600px) {
    margin-top: 11%;
  }
`;