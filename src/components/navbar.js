import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.nav`
  background-color: #000;
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
`;

const NavLink = styled(Link)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 1px;
`;

const Side = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
`;

const LeftTop = styled.div`
  height: 20px;
  flex-grow: 1;
`;

const LeftBottom = styled.div`
  flex-grow: 3;
  display: flex;
`;

const RightTop = styled.div`
  height: 20px;
  flex-grow: 1;
`;

const RightBottom = styled.div`
  flex-grow: 3;
  display: flex;
`;

const Navbar = () => {
  return (
    <Wrapper>
      <Side>
        <LeftTop />
        <LeftBottom>
          <NavLink to="/services/">
            Ծառայություններ
          </NavLink>
          <NavLink to="/reports/">
            Հաշվետվության<br /> տրամադրում
          </NavLink>
          <NavLink to="/">
            Հաշվիչ
          </NavLink>
        </LeftBottom>
      </Side>
      <NavLink to="/">
        Home
      </NavLink>
      <Side>
        <RightTop />
        <RightBottom>
          <NavLink to="/">
            Օգրակար<br /> տեղեկություն
          </NavLink>
          <NavLink to="/">
            Միացիր<br /> մեր թիմին
          </NavLink>
          <NavLink to="/">
            Կապ մեզ հետ
          </NavLink>
        </RightBottom>
      </Side>
    </Wrapper>
  );
};

export default Navbar;