import styled from "styled-components"
import { Row, Col } from "antd"
import { Link } from "gatsby"
import BlackRightOutlined from "../../../assets/blackRightOutlined.png"
import WhiteRightOutlined from "../../../assets/whiteRightOutlined.png"
export const ContainerUseful = styled(Row)`
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  width: 100%;
  margin-bottom:15px;
  padding:0 20px;
  a:last-child>&{
    margin-bottom:0
  }
`
export const GeneralLink = styled(Link)`
  width:100%
`

export const DownloadLink = styled(Link)``

export const IconWrapper = styled.button`
  height: 40px;
  width: 40px;
  cursor:pointer;
  transition-duration: .5s;
  background-color: black;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image:url(${WhiteRightOutlined});
  background-repeat: no-repeat;
  background-position: center;
  &:hover{
    background-image:url(${BlackRightOutlined});
    background-color:white;
  }
  @media only screen and (max-width: 770px){
    height:30px;
    width:30px;
    font-size:10px;
  }
`
export const TextWrapper = styled(Col)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 0 !important;
  h2 {
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
`
export const ListWrapper = styled(Col)`
  ul {
    list-style: none;
    margin-left: 0;
    line-height: 25px;
  }
  
  @media only screen and (max-width: 320px) {
    ul {
      font-family: ArialAMU;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #009db8;
    }
  }
`
export const Img = styled.img`
  width: 20px;
  height: 15px;
  margin-left: 1.5%;
  margin-top: 0.5%;
  cursor: pointer;
  object-fit: contain;
  font-weight: bold;
`
export const Hr = styled.hr`
  width: 150%;
  height: 1px;
  background-color: #d7d7d7;
  margin-bottom:0
`
