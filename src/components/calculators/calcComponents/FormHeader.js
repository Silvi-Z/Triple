import React from 'react';
import { Col } from 'antd';
import styled from 'styled-components';

const H2Styled = styled.h2`
  font-weight: normal;
  margin-bottom: 0;
  margin-left: 10px;
  font-family: ArialAMU;
  color: #000;
  font-size: 17px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

export const FormHeader = ({ headerText }) => {
  return (
    <Col xxl={14} xl={14} lg={15} md={19} sm={19} span={18}>
      <H2Styled>{headerText}</H2Styled>
    </Col>
  );
};
