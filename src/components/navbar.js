import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

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

const GridWrapper = styled.nav`
  padding: 1px;
  background-color: #ebebeb;
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-areas:
    'lang addr addr bla1 bla1 bla1 bla1 bla1 bla1 home home home home bla2 bla2 bla2 bla2 bla2 bla2 phon phon phon'
    'serv serv serv repo repo repo calc calc calc home home home home info info info join join join cont cont cont';
  grid-template-rows: 8fr 18fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1px;
  > div {
    background-color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const GridLang = styled.div`grid-area: lang;`;
const GridAddress = styled.div`grid-area: addr;`;
const GridBlank1 = styled.div`grid-area: bla1;`;
const GridHome = styled.div`grid-area: home`;
const GridBlank2 = styled.div`grid-area: bla2;`;
const GridPhone = styled.div`grid-area: phon;`;
const GridService = styled.div`grid-area: serv;`;
const GridReport = styled.div`grid-area: repo;`;
const GridCalc = styled.div`grid-area: calc;`;
const GridInfo = styled.div`grid-area: info;`;
const GridJoin = styled.div`grid-area: join;`;
const GridContact = styled.div`grid-area: cont;`;

const activeStyle = {
  color: '#009db8',
};

const Navbar = () => {
  return (
    <>
      <GridWrapper>
        <GridLang>
          <select id="lang">
            <option value="hy">Հայ</option>
            <option value="en">Eng</option>
            <option value="ru">Рус</option>
          </select>
        </GridLang>
        <GridAddress>Հր Քոչար 44</GridAddress>
        <GridBlank1 />
        <GridHome>
          <NavLink to="/" activeStyle={activeStyle}>
            Triple Consulting
          </NavLink>
        </GridHome>
        <GridBlank2 />
        <GridPhone>374 93 00 00 00</GridPhone>
        <GridService>
          <NavLink to="/services/" activeStyle={activeStyle}>
            Ծառայություններ
          </NavLink>
        </GridService>
        <GridReport>
          <NavLink to="/reports/" activeStyle={activeStyle}>
            Հաշվետվության<br /> տրամադրում
          </NavLink>
        </GridReport>
        <GridCalc>
          <NavLink to="/calculator/" activeStyle={activeStyle}>
            Հաշվիչ
          </NavLink>
        </GridCalc>
        <GridInfo>
          <NavLink to="/information/" activeStyle={activeStyle}>
            Օգտակար<br /> տեղեկություն
          </NavLink>
        </GridInfo>
        <GridJoin>
          <NavLink to="/career/" activeStyle={activeStyle}>
            Միացիր<br /> մեր թիմին
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