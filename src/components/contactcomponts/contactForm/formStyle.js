import { Form } from 'antd';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
  .ant-form-item{
    margin-bottom:0;
  }
  .ant-input:-webkit-autofill,
  .ant-input:-webkit-autofill:hover,
  .ant-input:-webkit-autofill:focus,
  .ant-input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px black inset !important;
    -webkit-text-fill-color: white;
    caret-color: white;
}
`

export const ContactPageWrapper = styled.div`
  margin: 0 auto;
  max-width:1440px;
  padding:50px 118px 40px 118px;
  @media only screen and (max-width: 1024px){
    padding: 50px 60px 40px 60px;
  }
  @media only screen and (max-width: 768px){
    padding: 50px 20px 40px 20px;
  }
`

export const UploadImg = styled.img`
  width: 20px;
  height: 20px;
  color: "#009db8";
  margin-top: 2px;
`;

export const WhatsappWrapper = styled.img`
  width: 22px;
  height: 22px;
  margin-right:16px;
  @media only screen and (max-width: 292px){
    margin-right: 7px;
  }
`
export const ViberWrapper = styled.img`
  width: 20px;
  height: 21px;
  margin-right:16px;
  @media only screen and (max-width: 292px){
    margin-right: 7px;
  }
`
export const TelegramWrapper = styled.img`
  width: 20px;
  margin-right:16px;
  height: 20px;
  @media only screen and (max-width: 292px){
    margin-right: 7px;
  }
`