import React from "react"
import { Button, Row, Col } from "antd"
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import styled from "styled-components"

const H5Styled = styled.h5`
  width: 555px;
  height: 36px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`
const H6Styled = styled.h6`
  width: 286px;
  height: 35px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  span {
    font-weight: bold;
    color: #009db8;
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
const ReportForm3 = ({
  toggleForm,
  current_tracking_number,
  setresetForm,
  langText
}) => {
  const onClose = () => {
    setresetForm(true)
    toggleForm()
  }
  return (
    <Row gutter={[10, 25]}>
      <Col span={24}>
        <H5Styled>
          {langText.paragraph}
        </H5Styled>
        <H6Styled>
          {langText.subParagraph_1}  <span> {current_tracking_number} </span> <br />
          {langText.subParagraph_2}
        </H6Styled>
      </Col>
      <Col span={24}>
        <Button type="primary" id="registerSubmit" onClick={onClose}>
          <ConfirmSpan>{langText.closeButton}</ConfirmSpan>
        </Button>
      </Col>
    </Row>
  )
}

export default ReportForm3
