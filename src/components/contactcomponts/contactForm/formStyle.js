import styled from 'styled-components';
import { Form } from 'antd';
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1170px',
  laptopL: '1440px',
  desktop: '2560px',
};
const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
export const StyledForm = styled(Form)``
export const ContactPageWrapper = styled.div`
  margin: 0 auto;
  max-width:1440px;
  padding:50px 118px 40px 118px;
  @media only screen and (max-width: 1400px){
    padding: 50px 70px 40px 120px
  }
  @media only screen and (max-width: 1300px){
    padding: 50px 60px 40px 60px;
  }
  @media only screen and (max-width: 1070px){
    padding: 50px 20px 40px 20px;
  }
  @media only screen and (max-width: 387px){
    padding: 50px 14px 40px 14px;
  }
`
export const Arealabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 32px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
`;
export const UploadImg = styled.img`
  width: 20px;
  height: 20px;
  color: "#009db8";
  margin-top: 2px;
`;
