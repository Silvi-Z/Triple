import React from 'react';
import { Typography, Row, Col, InputNumber } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-color: #009db8;
  font-size: 13px;
  font-family: ArialAMU;
  color: #000;
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

export const CalcTableRow = ({
  month,
  year,
  value1,
  value2,
  value3,
  handler1,
  handler2,
  handler3,
  gutter,
}) => {
  return (
    <>
      <Row align="middle" gutter={[10, gutter ? 30 : 10]}>
        <Col
          xxl={{ span: 2, offset: 6 }}
          xl={{ span: 3, offset: 5 }}
          lg={{ span: 3, offset: 4 }}
          md={{ span: 4, offset: 2 }}
          sm={{ span: 5, offset: 1 }}
          span={5}
        >
          <FormLabelCell>
            <Label fontcolor="#000">
              {month}
            </Label>
          </FormLabelCell>
        </Col>
        <Col xxl={2} xl={2} lg={2} md={3} sm={3} span={4}>
          <FormLabelCell>
            <Label fontcolor="#000">
              {year}
            </Label>
          </FormLabelCell>
        </Col>
        <Col xxl={3} xl={3} lg={3} md={4} sm={5} span={5}>
          <StyledInputNumber
            size="large"
            min={0}
            type="number"
            onChange={handler1}
            value={value1}
          />
        </Col>
        <Col xxl={3} xl={3} lg={3} md={4} sm={5} span={5}>
          <StyledInputNumber
            size="large"
            min={0}
            type="number"
            onChange={handler2}
            value={value2}
          />
        </Col>
        <Col xxl={3} xl={3} lg={3} md={4} sm={5} span={5}>
          <StyledInputNumber
            size="large"
            min={0}
            type="number"
            onChange={handler3}
            value={value3}
          />
        </Col>
      </Row>
    </>
  );
};
