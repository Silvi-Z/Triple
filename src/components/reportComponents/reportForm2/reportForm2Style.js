import styled from "styled-components"
import { Form, Input, Tooltip, Select, Row, Col, Button, Spin } from "antd"

export const UploadWrapper = styled.img`
  width: 20px;
  height: 20px;
`
export const CustomButton = styled(Button)`
  width: 448px;
  height: 40px;
  border: solid 1px #009db8;
  background-color: #ffffff;
  padding-top: 1.7%;
  display: flex;
  justify-content: space-between;
  span {
    width: 208px;
    height: 31px;
    font-family: ArialAMU;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media (min-width: 320px) {
    width: 290px;
    border: solid 1px #009db8;
    padding-top: 3.7%;
    span {
      width: 208px;
      height: 31px;
      font-family: ArialAMU;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #000000;
    }
  }
  @media (min-width: 375px) {
    width: 290px;
    border: solid 1px #009db8;
    padding-top: 3.7%;
    span {
      width: 208px;
      height: 41px;
      font-family: ArialAMU;
      font-size: 11px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #000000;
    }
  }
`

export const H6Styled = styled.h6`
  width: 319px;
  height: 31px;
  font-family: ArialAMU;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`
export const NavigateWrapper = styled.div`
  width: 180px;
  display: flex;
  justify-content: space-between;
`
export const NavigateBackButton = styled(Button)`
  width: 90px;
  height: 20px;
  border: solid 0px;
  display: flex;
  padding-left: 0;
  justify-content: space-between;
  background-color: rgba(255, 0, 0, 0);
  &:hover {
    background-color: rgba(255, 0, 0, 0);
    cursor: pointer;
  }
`
export const NavigateForwardButton = styled(Button)`
  width: 90px;
  height: 20px;
  border: solid 0px;
  display: flex;
  padding-right: 0;
  justify-content: space-between;
  background-color: rgba(255, 0, 0, 0);
  &:hover {
    background-color: rgba(255, 0, 0, 0);
    cursor: pointer;
  }
`
export const BackSpan = styled.span`
  height: 12px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #009db8;
`
export const ForwardSpan = styled.span`
  height: 12px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #009db8;
`
