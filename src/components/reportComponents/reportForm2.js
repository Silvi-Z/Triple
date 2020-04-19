import React from "react"
import { Button, Row, Col } from "antd"
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import DownloadImage from "../../assets/download.svg"
import styled from "styled-components"

const H6Styled = styled.h6`
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
const CustomButton = styled(Button)`
  width: 448px;
  height: 40px;
  border: solid 1px #009db8;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  @media (min-width: 320px) {
    width: 290px;
    border: solid 1px #009db8;
  }
    @media (min-width: 375px) {
    width: 290px;
    border: solid 1px #009db8;
  }
`
const DownloadWrapper = styled.img`
  width: 20px;
  height: 20px;
`
const NavigateWrapper = styled.div`
  width: 180px;
  display: flex;
  justify-content: space-between;
`
const NavigateBackButton = styled(Button)`
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
const NavigateForwardButton = styled(Button)`
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
const ConfirmSpan = styled.span`
  height: 12px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: white;
`
const BackSpan = styled.span`
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
const ForwardSpan = styled.span`
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
const ReportForm2 = ({ setConfirm2, setConfirm3, backButton }) => {
  const onFinish = () => {
    setConfirm2(false)
    setConfirm3(true)
  }
  const goBack = () => {
    backButton(true)
  }
  const goForward = () => {
    setConfirm2(false)
    setConfirm3(true)
  }
  return (
    <Row gutter={[10, 25]}>
      <Col span={24}>
        <H6Styled>
          Խնդրում ենք ներբեռնել լիազորագիրը, ստրոագրել և հաջորդ քայլում
          վերբեռնել այն *
        </H6Styled>
        <a href="../../assets/Liazoragir.pdf" download>
          <CustomButton size="large">
            <span>Լիազորագիր</span>
            <DownloadWrapper src={DownloadImage} />
          </CustomButton>
        </a>
      </Col>
      <Col span={24}>
        <Button type="primary" id="registerSubmit" onClick={() => onFinish()}>
          <ConfirmSpan>Հաստատել</ConfirmSpan>
        </Button>
      </Col>
      <Col span={24}>
        <NavigateWrapper>
          <NavigateBackButton onClick={goBack}>
            <ArrowLeftOutlined style={{ color: "#009db8", fontSize: "15px" }} />
            <BackSpan>Հետ</BackSpan>
          </NavigateBackButton>
          <NavigateForwardButton onClick={goForward}>
            <ForwardSpan>Առաջ</ForwardSpan>
            <ArrowRightOutlined
              style={{ color: "#009db8", fontSize: "15px" }}
            />
          </NavigateForwardButton>
        </NavigateWrapper>
      </Col>
    </Row>
  )
}

export default ReportForm2
