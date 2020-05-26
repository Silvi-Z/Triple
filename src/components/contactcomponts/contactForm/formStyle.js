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
export const StyledForm = styled(Form)`
  .ant-form-item-has-error .ant-input {
    border-color: #d9d9d9 !important;
  }
  @media ${device.mobileS} {
    #submitbotton {
      margin: 0 18%;
    }
  }
  @media ${device.mobileM} {
    #submitbotton {
      margin: 0 19%;
    }
  }
  @media ${device.tablet} {
    #submitbotton {
      margin: 0 33%;
    }
    #basic_textarea {
      height: 98px;
      min-height: 98px;
      max-height: 186px;
      overflow-y: hidden;
      width: 500px;
    }
  }
  @media ${device.tablet} {
    #submitbotton {
      margin: 0 33%;
    }
    #basic_textarea {
      height: 98px;
      min-height: 98px;
      max-height: 186px;
      overflow-y: hidden;
      width: 500px;
    }
    .ant-upload {
      width: 100%;
    }
  }
  @media ${device.laptop} {
    .ant-upload {
      width: 100%;
    }
  }
  @media only screen and (min-width: 1366px) {
    #basic_textarea {
      height: 98px;
      min-height: 98px;
      max-height: 186px;
      overflow-y: hidden;
      width: 512px;
    }
  }
`;
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
