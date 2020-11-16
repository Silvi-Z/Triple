import { Col, Button, Row } from "antd"
import styled from "styled-components"
import  '../../layout.css'

export const ToggleH2Styled = styled.h2`
  font-family: ArialAMU;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin:0;
  @media only screen and (max-width:770px){
  font-size:20px;
  }
`
export const SubmitButton = styled.button`
  position:relative;
  overflow: hidden;
  background:${props => props.color ? "white" : "black"};
  width:260px;
  height:49px ;
  outline:none;
  font-weight:bold;
  border-style: outset;
  border-radius: 30px;
  border:1px solid ${props => props.color ? "white" : "black"};
  font-size:16px;
  color: ${props => props.color ? "black" : "white"};
  background-position: 50% 50%;
  display: inline-block;
  background-image:linear-gradient( ${props => props.color ? `#000000, #000000` : `#ffffff, #ffffff` });
  background-repeat: no-repeat;
  transition: background-size .5s, color .5s;
  background-size: 0% 100%;
  &:hover{
  background-size: 100% 100%;
  color: ${props => props.color ? "white" : "black"};
  cursor:pointer;
  outline:none;
  }
  &:focus{
  outline:none;
  }
  @media only screen and (max-width:770px){
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
  background: ${(props) => props.isOpen ? '#FFFFFF' : '#1C1D21'};
  border-color:#1C1D21;
  width: 40px;
  height: 40px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  color: ${(props) => props.isOpen ? '#1C1D21' : '#FFFFFF'};
  border: 1px solid #1C1D21;
  box-sizing: border-box;
  border-radius:50%;
  padding:0;
  --antd-wave-shadow-color:none;
  &.ant-btn:hover{
    background: ${(props) => props.isOpen ? '#1C1D21' : '#FFFFFF'};
    color: ${(props) => props.isOpen ? '#FFFFFF' : '#1C1D21'};
    border-color:#1C1D21;
  }
  &.ant-btn:focus{
    background: ${(props) => props.isOpen ? '#FFFFFF' : '#1C1D21'};
    color: ${(props) => props.isOpen ? '#1C1D21' : '#FFFFFF'};
    border-color: #1C1D21;
  }
`
export const HeadIcon = styled.img`
  width: 30px;
  height: 30px;
  @media (min-width: 1170px) {
    width: 40px;
    height: 40px;
  }
`
export const DropHeadingTitle = styled.div``
export const DropHeadingButton = styled.div``
export const FormWrapper = styled.div`
  display:flex;
  justify-content:space-between;
  border-bottom:1px solid #D0D0D0;
  width:100%;
  border-top:1px solid black;
  padding: 40px 100px 53px 0;
  @media only screen and (max-width:1200px){
  padding: 40px 50px 29px 0;
  }
  @media only screen and (max-width:970px){
  padding: 40px 20px 29px 0;
  }
  @media only screen and (max-width:770px){
  flex-direction:column;
  }
  @media only screen and (max-width:320px){
  padding-top: 30px;
  }
`
export const OrderListWrapper = styled.div`
  justify-content:flex-start;
  padding:0 20px 30px 20px;
  display:flex;
  flex-direction:column;
  @media only screen and (max-width: 770px){
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
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media only screen and (max-width: 375px) {
    font-family: ArialAMU;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`
export const DropCareer = styled.div`
    padding: 48px 20px;
    display:flex;
    align-items:start;
    justify-content:space-between;
    border-bottom: 1px solid;
    border-color: #d7d7d7;
    position:relative;
  @media only screen and (max-width: 770px){
    padding: 48px 0;
    }
`