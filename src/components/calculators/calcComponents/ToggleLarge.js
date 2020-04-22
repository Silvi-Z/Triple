import React from 'react';
import { Typography, Col, Button } from 'antd';
import styled from 'styled-components';
const { Text } = Typography;

const ButtonLarge = styled(Button)`
  height: 54px;
  border-color: #009db8;
  overflow: hidden;
  padding-vertical: 0;
`;

const Label = styled(Text)`
  text-align: ${props => props.left ? 'left' : 'center'};
  font-family: ArialAMU;
  font-weight: bold;
  line-height: 20px;
  color: ${props => props.fontcolor};
  font-size: 12px;
  @media (min-width: 576px) {
    font-size: 13px;
  }
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

export const ToggleLarge = ({ label, toggleState, onClick, start }) => {
  return (
    <Col
      xxl={{ span: 5, offset: start ? 6 : 0 }}
      xl={{ span: 6, offset: start ? 5 : 0 }}
      lg={{ span: 7, offset: start ? 4 : 0 }}
      md={{ span: 9, offset: start ? 2 : 0 }}
      sm={{ span: 11, offset: start ? 1 : 0 }}
      span={12}
    >
      <ButtonLarge
        block
        type={toggleState ? 'default' : 'primary'}
        onClick={onClick}
      >
        <Label fontcolor={toggleState ? '#000' : '#fff'}>
          {label}
        </Label>
      </ButtonLarge>
    </Col>
  );
};
