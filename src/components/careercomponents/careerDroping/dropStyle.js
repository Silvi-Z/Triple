import {  Button } from "antd"
import styled from "styled-components"

export const ToggleH2Styled = styled.h2`
  font-family: ArialAMU;
  font-size: 24px;
  font-weight: bold;
  line-height: normal;
  text-align: left;
  color: #000000;
  margin:0;
  align-items: center;
  display: flex;
  max-width: 85%;
  @media only screen and (max-width:1024px){
  font-size:20px;
  }
`

export const SubmitButton = styled.button`
  position:relative;
  overflow: hidden;
  width:260px;
  height:49px ;
  outline:none;
  font-weight:bold;
  background: ${props=> props.backgroundColor === 'black'? 'black' : 'white'};
  border:1px solid ${props=> props.backgroundColor === 'black'? 'black' : 'white'};
  color: ${props=> props.backgroundColor === 'black'? 'white' : 'black'};
  border-style: outset;
  border-radius: 30px;
  font-size:16px;
  background-position: 50% 50%;
  display: inline-block;
  background-repeat: no-repeat;
  letter-spacing: 1.15px;
  transition: background-size .5s, color .5s;
  background-image: linear-gradient(${props=>props.backgroundColor === 'black' ? '#FFFFFF , #FFFFFF' : '#000000 , #000000'});
  background-size: 0 100%;
    &:hover {
      background-size: 100% 100%;
      cursor:pointer;
      color: ${props=> props.backgroundColor === 'black'? 'black' : 'white'};
      outline:none;
    }
    &:focus {
      outline:none;
    }
    @media only screen and (max-width:1024px){
      margin-bottom:19px;
    }
    @media only screen and (max-width:320px){
      margin-bottom:25px;
      width:100%;
    }
`

export const H2Styled = styled.h2`
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-bottom:30px;
`

export const ToggleButton = styled(Button)`
  width: 40px;
  height: 40px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #1C1D21;
  box-sizing: border-box;
  border-radius:50%;
  padding:0;
  transition: unset;
  --antd-wave-shadow-color:none;
  &.ant-btn:hover{
    border-color:#1C1D21;
  }
  &.ant-btn:focus{
    border-color: #1C1D21;
  }
`

export const DropHeadingTitle = styled.div`
  display:flex;
  width:100%;
  justify-content:space-between;
`

export const DropHeadingButton = styled.div``

export const FormWrapper = styled.div`
  display:flex;
  width:100%;
  border-top:1px solid black;
  padding: 40px 24px 53px 24px;
  justify-content:space-between;
  border-bottom:1px solid #D0D0D0;
  .ant-input:-webkit-autofill,
  .ant-input:-webkit-autofill:hover,
  .ant-input:-webkit-autofill:focus,
  .ant-input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: black;
    caret-color: black;
}
    @media only screen and (max-width:1024px){
      flex-direction:column;
      padding: 40px 0 53px 0;
    }
    @media only screen and (max-width:320px){
      padding-top: 30px;
    }
`

export const OrderListWrapper = styled.div`
  justify-content:flex-start;
  display:flex;
  flex-direction:column;
    @media only screen and (max-width: 1024px){
      padding:0;
      width:100%;
    }
`

export const OrderList = styled.ul`
  list-style-type: none;
  margin-left:0;
  margin-bottom:0;
    li {
      text-indent: -5px;
    }
    li:before {
      content: " - ";
      color: black;
      text-indent: -5px;
    }
`

export const OrderSection = styled.li`
  text-indent:0!important;
  font-family: ArialAMU;
  font-size: 18px;
  line-height: 1.88;
  text-align: left;
  color: #000000;
  @media only screen and (max-width: 375px) {
    font-family: ArialAMU;
    color: #000000;
  }
`

export const DropCareer = styled.div`
  padding: 48px 24px;
  display:flex;
  align-items:start;
  justify-content:space-between;
  border-bottom: 1px solid;
  border-color: #d7d7d7;
  position:relative;
    @media only screen and (max-width: 1024px){
      padding: 40px 0;
    }
`