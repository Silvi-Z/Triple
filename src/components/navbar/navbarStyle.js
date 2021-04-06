import { Row } from "antd"
import { Link } from "gatsby"
import styled from "styled-components"
import React from "react"

const NavLink = props => (
  <Link {...props} getProps={({ isPartiallyCurrent }) => {
    return {
      style: {
        color: isPartiallyCurrent ? "#22c8d4" : "#000",
      },

    }
  }
  }
  />
)

export const NavLinkMain = styled(NavLink)`
  flex-grow: 1;
  flex-basis: "80px";
  height:fit-content;
  display: flex;
  justify-content: center;
  align-items: left;
  margin: 1px;
  color: #000;
  width:fit-content;
  text-decoration: none;
  border: none !important;
  font-size:16px;
  position: relative;
  @media only screen and (max-width: 1024px){
   font-size:18px;
  }
  @media only screen and (max-width: 768px){
   font-size:16px;
  }
`
export const LogoNavLink = styled(NavLinkMain)`
height:100%
`



export const RespNavLink = styled(Link)`
  align-items: center;
  text-decoration: none;
  text-align: center;
  height: 72px;
`
export const ResponsiveMenuWrapper = styled.div`
  width: 100%;
  animation: .5s respMenu ease forwards;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 80px;
  padding-right: 80px;
  background-color: #1C1D21;
   ${NavLinkMain}{
    color : white;
    transform: translateY(200px);
    opacity: 0;
    animation: .8s slideUp ease forwards .5s;
  }
  @media only screen and (max-width: 768px){
    padding-left: 0;
    padding-right: 0;
    width: 80%;
    margin: auto;
  }
`
export const Coll = styled.div`
  height: 100%;
  overflow: hidden;  
      margin-bottom: 10px;
    margin-top: 10px;
`
export const ResponsiveMenuColumn = styled.div`
   display:flex;
   align-items:end;
   flex-direction:column;
  
`
export const MenuWrapper = styled.div`
   display: flex;
   flex-direction: column;
   // align-items: center;
   // margin: 0 auto;
`
export const AddressSpan = styled.span`
  font-family: ArialAMU, serif;
  font-size: ${props => props.lang !== "arm" ? "11px" : "12px"};sub
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`
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
`
export const ResponsiveMenuInfoRow = styled.div`
   display:flex;
   justify-content:space-between;
   padding-top:30px;
   border-top:1px solid #EAEAEA;
   opacity:0;
   animation: 2s showInfoRow ease forwards .5s;
      @media only screen and (max-width: 768px){
         flex-wrap:wrap;
      }
   >div *{
      color: #EAEAEA;
   }
   >div:not(last-child){
      width:20%;
         @media only screen and (max-width: 535px){
            width:50%;
         }
   }
   >div:last-child{
      width: 42%;
         @media only screen and (max-width: 535px){
            margin-top: 16px;
            width: 100%;
         }
   }
   ${PhoneSpan}{
      width:auto;
   }
`
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
`

export const GridWrapper = styled.nav`
  padding: 1px;
  background-color: #ebebeb;
  width: 100%;
  // height: 100px;
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
`
export const HeadIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 10%;
  margin-left: 2%;

  @media (max-width: 375px) {
    margin-top: 35%;
    margin-left: 5%;
  }
`
export const HeadMainIcon = styled.img`
    border-color: #ebebeb;
    margin:0 !important;
    object-fit: contain;
   @media only screen and (max-width: 1150px){
      padding: 5px;
   }
  @media only screen and (max-width: 768px) {
    height:100%;
  }
`
export const ResponsiveNavWrapper = styled.div`
  display: none;
  width: 100%;
  height: 90px;
  background-color: ${props => props.menuColorProp};
  @media only screen and (max-width: 1024px) {
    display: flex;
    justify-content:space-between;
    > div {
      height: 100%;
      padding: 0.2% 2%;
      align-items: center;
      justify-content: center;
    }
    > div:last-child{
      display:flex;
    }
  }
  @media only screen and (max-width: 768px){
    padding: 0px 20px;
  }
`
export const ResponsiveMenuButton = styled.div`
   height: 40px;
   width: 40px;
   background-color: black;
   border-radius: 50%;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   text-align: end;
   background-color: ${props => props.responseWrapper ? "white" : "black"}
`
export const Label = styled.label`
  position:absolute;
  margin: 37px 20px 0 0;
  display: block;
  cursor: pointer;
  font-size: 32px;
  font-family: ArialAMU;
  line-height: 70px;
  float: right;
`
export const EnvironmentWrapper = styled.img`
  width: 14px;
  margin-right: 10px;
   @media (max-width: 1200px) {
     margin-right: 2px;
   }
`
