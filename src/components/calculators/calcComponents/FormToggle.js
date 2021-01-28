import React from 'react';
import { Col, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ToggleButton = styled(Button)`
  height: 48px;
  width: 48px;
  @media (min-width: 992px) {
    height: 60px;
    width: 60px;
  }
`;

const StyledMinus = styled(MinusOutlined)`
  color: #009db8;
  font-size: 16px;
  @media (min-width: 992px) {
    font-size: 20px;
  }
`;

const StyledPlus = styled(PlusOutlined)`
  color: #009db8;
  font-size: 16px;
  @media (min-width: 992px) {
    font-size: 20px;
  }
`;

export const FormToggle = ({ onClick, showForm }) => {
  return (
    <Col>
      <ToggleButton block onClick={onClick}>
        {showForm ? <StyledMinus /> : <StyledPlus />}
      </ToggleButton>
    </Col>
  );
};
