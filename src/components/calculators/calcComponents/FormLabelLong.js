import React from 'react';
import { Typography, Col } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

const Label = styled(Text)`
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

const FormLabelCell = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #d7d7d7;
  background-color: #fff;
`;

export const FormLabelLong = ({text}) => {
  return (
    <Col
      xxl={{ span: 7, offset: 6 }}
      xl={{ span: 9, offset: 5 }}
      lg={{ span: 10, offset: 4 }}
      md={{ span: 13, offset: 2 }}
      sm={{ span: 17, offset: 1 }}
      span={17}
    >
      <FormLabelCell>
        <Label fontcolor="#000">
          {text}
        </Label>
      </FormLabelCell>
    </Col>
  );
};
