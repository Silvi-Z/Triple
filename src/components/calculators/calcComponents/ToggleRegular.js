import React from 'react';
import { Typography,Col, Button } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

const ButtonBase = styled(Button)`
  height: 40px;
  border-color: #009db8;
  overflow: hidden;
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

export const ToggleRegular = ({ label, toggleState, onClick, start }) => {
  return (
    <Col
      xxl={{ span: 5, offset: start ? 6 : 0 }}
      xl={{ span: 6, offset: start ? 5 : 0 }}
      lg={{ span: 7, offset: start ? 4 : 0 }}
      md={{ span: 9, offset: start ? 2 : 0 }}
      sm={{ span: 11, offset: start ? 1 : 0 }}
      span={12}
    >
      <ButtonBase
        type={toggleState ? 'primary' : 'default'}
        size="large"
        block
        onClick={onClick}
      >
        <Label
          fontcolor={toggleState ? '#fff' : '#000'}
        >
          {label}
        </Label>
      </ButtonBase>
    </Col>
  );
};
