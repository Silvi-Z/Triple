import { Row } from 'antd';
import { Link } from 'gatsby';
import styled from 'styled-components';

export const NavLink = styled(Link)`
  flex-grow: 1;
  flex-basis: 80px;
  height:fit-content !important;
  display: flex;
  justify-content: center;
  align-items: left;
  // background-color: #1C1D21;
  margin: 1px;
  color: #000;
  width:fit-content;
  text-decoration: none;
  border: none !important;
  @media only screen and (max-width: 500px){
   font-size:16px;
  }
`;
export const RespNavLink = styled(Link)`
  align-items: center;
  background-color: #fff;
  text-decoration: none;
  text-align: center;
  // display:flex;
  // align-items:center;
`;
export const ResponsiveMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding:140px 0 190px 0;
  /* z-index: 999; */
  background-color: #1C1D21;
  // height:0;
  // width:100%;
  // background-color: black;
   ${NavLink}{
    color : white
  }
  // @media only screen and (max-width: 768px) {
  //   display: none;
  // }
`;
export const MenuWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: end;
   margin: 0 auto;
   width: fit-content;
`
export const AddressSpan = styled.span`
  font-family: ArialAMU, serif;
  font-size: ${props => props.lang !== "arm" ? "11px" : "12px"};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
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
  @media only screen and (max-width: 1024px) {
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
    border-color: #ebebeb;
    margin:0 !important;
  @media (min-width: 1600px) {
    border-left: 0px solid;
    border-right: 0px solid;
  }
  @media only screen and (max-width: 1366px) {
    border-left: 0px solid;
    border-right: 0px solid;
  }
  @media only screen and (max-width: 768px) {
    height:100%;
  }
`;
export const ResponsiveNavWrapper = styled(Row)`
  display: none;
  width: 100%;
  height: 90px;
  background-color: white;
  // position: fixed;
  // z-index: 9999999;
  @media only screen and (max-width: 1024px) {
    display: flex;
    justify-content:space-between;
    > div {
      // display:flex;
      // width: 642px;
      height: 100%;
      padding: 0.2% 2%;
      background-color: #fff;
      align-items: center;
      justify-content: center;
    }
    > div:last-child{
      display:flex;
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
  // @media (min-width: 1600px) {
  //   margin-top: 11%;
  // }
`;
