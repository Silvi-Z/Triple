import styled from "styled-components"
import WhiteDownloadingIcon from "../../../assets/useful_information/white-downloading-file.svg"
import BlackDownloadingIcon from "../../../assets/useful_information/black-downloading-file.svg"

export const ContainerUseful = styled.div`
  width: 100%;
`
export const ContainerNews = styled.div`
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-bottom:20px;
  padding:20px;
  @media only screen and (max-width: 340px){
    padding:20px 15px;
    margin-bottom:10px;
  }
`
export const H2text = styled.h2`
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  line-height: 25px;
  text-align: left;
  color: #000000;
  margin-bottom: 0;  
  @media only screen and (max-width: 340px){
    font-size:14px;
  }
`
export const FormatsWrapper = styled.div`
  display:flex;
  *{
    margin-left:10px;
  }
`
export const FormatsIcons = styled.div`
  display: flex;
  width: 0;
  overflow:hidden;
`
export const Image = styled.img`
  transform: rotate(-90deg);
`
export const DownloadingIcon = styled.div`
  cursor:pointer;
  border:1px solid black;
  background-image:url("${WhiteDownloadingIcon}");
  background-position: center;
  height:40px;
  width:40px;
  border-radius:50%;
  transition-duration: .5s;
  background-color:black;
  background-repeat:no-repeat;
  &:hover{
    background-color:white;
    background-image:url("${BlackDownloadingIcon}");
  }
  @media only screen and (max-width: 768px){
    height:30px;
    width:30px;
    background-size:12px;
  }
`
export const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;
  width:100%;
  align-items: end !important;
  `
export const TextWrapper = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  max-width: 85%;
`