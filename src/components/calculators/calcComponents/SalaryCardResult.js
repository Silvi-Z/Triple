import React from "react";
import styled from "styled-components";
import { Card, Tooltip } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";

const CardTitle = styled.h3`
  font-family: Arial AMU;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.15px;
  color: #000000;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-family: Arial AMU;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 25px;
  letter-spacing: 0.15px;
  color: #00B3C7;
  margin: 0;
`

const SalaryCardResult = ({title, text, tooltip}) => (
  <Card
    style={{
      border: '0.5px solid #555555',
      boxSizing: 'border-box',
      borderRadius: '5px',
      padding: "10px 20px",
      marginBottom: 10,
      width: 300
    }}
    bodyStyle={{padding: 0}}
  >
    <CardTitle>
      {title}

      { tooltip ?
        <Tooltip title="prompt text" color="black">
          <InfoCircleTwoTone twoToneColor="#00B3C7" style={{marginLeft: 5}} />
        </Tooltip>
      : null }
    </CardTitle>

    <CardText>{text}</CardText>
  </Card>
)

export default SalaryCardResult;
