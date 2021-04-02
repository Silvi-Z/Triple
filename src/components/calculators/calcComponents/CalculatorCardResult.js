import React from "react";
import styled from "styled-components";
import { Card, Tooltip } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";
import { SvgWrapper } from "../styled"
import Svg from "../../../assets/note.svg"

const CardTitle = styled.h3`
  display:flex;
  align-items:center;
  // justify-content:center;
  font-family: 'ArialAMU';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 1.15px;
  color: #000000;
  margin-bottom: 10px;
`;

const CardSubtitle = styled.p`
  font-family: ArialAMU;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 25px;
  letter-spacing: 1.15px;
  color: rgba(0,0,0,.45);
`

const CardText = styled.p`
  font-family: ArialAMU;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 25px;
  letter-spacing: 1.15px;
  color: #00B3C7;
  margin: 0;
`

const CalculatorCardResult = ({title, subtitle = '', text, tooltip, loading = false, children, className}) => (
  <Card
    style={{
      border: '0.5px solid #555555',
      boxSizing: 'border-box',
      borderRadius: '5px',
      padding: "10px 20px",
      marginBottom: 10,
      width: '100%',
      className:{className}
    }}
    bodyStyle={{padding: 0}}
    loading={loading}
  >
    {!children ? <>
      <CardTitle>
        {title}

        { tooltip ?
          <Tooltip title="prompt text" color="black">
            <SvgWrapper style={{backgroundImage: `url(${Svg})`}} />
          </Tooltip>
          : null }
      </CardTitle>

      <CardText>{text}</CardText>

      {subtitle ? <CardSubtitle>{subtitle}</CardSubtitle> : null}
    </> : null}

    {children ? children : null}
  </Card>
)

export default CalculatorCardResult;
