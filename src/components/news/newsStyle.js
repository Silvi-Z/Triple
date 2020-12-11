import { Link } from "gatsby"
import styled from "styled-components"
import { Col, DatePicker, Form } from "antd"
import { SeemoreWrapper } from "../homecomponents/homePartners/homePartStyle"

export const ContainerNews = styled.div`
  height: auto;
  overflow: hidden;
  background-color: #f7f7f7;
  flex-direction: column;
  align-items: center;
`

export const NewsPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin:auto;
  p{
    color:black;
  }
  @media only screen and (max-width:1024px){
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width:840px){
    grid-template-columns: 1fr;
  }
`

export const FullNewsPage = styled.div`
  width:100%;
  display:flex;
  justify-content: center;
  p{
    color:black;
  }
}
`

export const NewsRow = styled.div`
  margin-top:40px;
  display:flex;
  >div:first-child{
    margin-left:0
  }
  >div:nth-chi
`

export const NewsItems = styled(Link)`
  background: #FFFFFF;
  border-radius: 10px;
  margin-top: 40px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 0;
  min-width: 30.7%;
  &:hover{
    color:unset
  }
  @media only screen and (max-width:840px){
    margin-left: 0;
    margin-right: 0;
  }
`

export const ImageWrapper = styled.div`
  border-radius: 10px 10px 0 0;
  height:278px;
  >img{
    border-radius: inherit;
    height: 100%;
    object-fit: cover;
    }
`

export const TextPart = styled.div`
  padding: 20px 15px 10px 15px;
`

export const Title = styled.h3`
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 1.15px;
  color: #000000;
  margin-bottom: 15px;
  max-height: 50px;
  overflow: hidden;
  @media only screen and (max-width: 839px){
    font-size:14px;
  }
`

export const NewsText = styled.p`
  margin-bottom:10px;
  max-height: 50px;
  overflow: hidden;
  line-height: 25px;
  @media only screen and (max-width: 839px){
    font-size:12px;
  }
`

export const MoreRow = styled.div`
  padding: 10px 0 0 0; 
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-top: 1px solid #D0D0D0;
`

export const DataItem = styled.p`
  margin-bottom:0;
  text-align: center; 
  align-items: center; 
  display: flex;
`

export const SeeMoreSingleNews = styled(SeemoreWrapper)`
  width: 112px; 
  height: 27px;
  margin-top: 0;
  font-size:14px;
  font-weight: normal;
  margin:unset;
`

export const SeeMoreNews = styled(SeemoreWrapper)`
  display: ${props => props.buttonDisplay ? 'flex' :'none'};
  letter-spacing: 1.15px;
`

export const SearchInput = styled.input`
  height: 40px;
  width: 100%;
  cursor: pointer;
  background-color: white;
  outline: none;
  position: absolute;
  padding-left:10px;
  border-radius: 10px;
  border: .5px solid white;
  @media only screen and (max-width: 839px){
    width: 100%;
    padding-left:10px;
  }
  &:focus{
    border: .5px solid #00B3C7;
  }
`

export const StyledForm = styled(Form)`
  top:0;
  bottom:0;
  margin:auto;
  width:71%;
  height: 40px;
  @media only screen and (max-width: 839px){
    margin-bottom: 40px;
    width: 100%;
  }
`

 export const NewsPageWrapper = styled.div`
    max-width:1440px;
    margin: 0 auto;
    padding: 50px 79px 93px 79px;
    @media only screen and (max-width: 1407px){
        padding: 50px 3% 93px 3%
    }
    @media only screen and (max-width: 1024px){
        padding: 50px 20px 93px 20px;
    }
  `

export const H1Element = styled.h1`
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    letter-spacing: 1.15px;
    color: #000000;
  `

export const NewsDatePicker = styled(DatePicker)`
  height: 40px;
  background: white;
  box-sizing: border-box;
  border:none;
  border-radius: 10px !important;
  .ant-picker-input > input{
    width: 75px !important;
    flex: unset !important;
  }
  .ant-picker-input{
    width:fit-content !important;
  }
`

export const SearchRow = styled.div`
  display:flex;
  justify-content: space-between;
  .ant-picker:hover, .ant-picker-focused {
    box-shadow: none!important;
  }
  .ant-form-item-control-input{
    min-height:unset;
  }
  @media only screen and (max-width: 1024px){
    padding:0 1%;
  }
  @media only screen and (max-width: 839px){
    padding:0;
    flex-wrap:wrap;
  }
`

export const SerachInputWrapper = styled.div`
  position:relative;
  height:30px;
  width: 1px;
`

export const NoResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events:none;
`

export const BigImageInfo = styled.div`
  height:525px;
  width:100%;
  @media only screen and (max-width: 768px){
    height:203px;
  }
`

export const SelectBox = styled.div`
  top: 0;
  bottom: 0;
  margin: auto auto auto 30px;
  .ant-select-selector {
    width: 180px !important;
    height: 40px !important;
    border-radius: 10px !important;
    border: none !important;
    background-color: white !important;
  }
  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    box-shadow: none;
  }
  .ant-select-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(180deg);
  }
  .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
    display: flex;
    align-items: center;
    color: #555555;
  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: white !important;
  }
  .ant-select-open > span:last-child {
    transform: rotate(0deg);
  }
  @media only screen and (max-width: 839px) {
    margin-right: 0;
    margin-left: 0;
  }
`

export const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
`

export const H2 = styled.h2`
  font-size: 24px;
  line-height: 35px;
  letter-spacing: 1.15px;
  max-width: 635px;
  @media only screen and (max-width:1024px){
    font-size: 18px;
  }
  @media only screen and (max-width: 768px){
    margin-bottom:20px;
  }
`

export const TitleRow = styled.div`
  display:flex;
  padding:50px 0 30px 0;
  justify-content: space-between;
  border-bottom: 1px solid #D0D0D0;
  @media only screen and (max-width: 768px){
    flex-direction:column
  }
`

export const P = styled.p`
  color: #555555;
  font-size:14px;
  margin-bottom:0;
`

export const FullInfoText = styled.p`
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 1.15px;
  margin-top:50px;
  @media only screen and (max-width: 1024px){
    margin-top:30px;
  }
`

export const SharedWrapperCol = styled(Col)`
  width:100%;
  flex-wrap:wrap;
  display: flex;
  justify-content: end;
  padding: 30px 0 50px 0;
  border-bottom: 1px solid #D0D0D0;
  .react-share__ShareButtonSharedWrapperCol {
    all: unset;
  }
`

export const NoResultTitle = styled.h2`
  margin-bottom:20px;
  font-size:18px;
  font-weight:bold;
`

export const NoResultText = styled.p`
  margin-bottom:0;
  font-size:18px;
  font-weight:normal;
`