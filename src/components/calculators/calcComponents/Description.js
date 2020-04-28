import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const H3Styled = styled.h3`
  font-size: 14px;
  line-height: 30px;
  font-weight: bold;
  font-family: ArialAMU;
  color: #000;
  margin-bottom: 0px;
`;

export const Description = ({text, small}) => {
  return (
    <Row align="middle" gutter={[10, small ? 10 : 30]}>
      <Col
        xxl={{span: 10, offset: 6}}
        xl={{span: 13, offset: 5}}
        lg={{span: 15, offset: 4}}
        md={{span: 19, offset: 2}}
        sm={{span: 19, offset: 1}}
        span={24}
      >
        <H3Styled>{text}</H3Styled>
      </Col>
    </Row>
  );
};
