import React from 'react';
import { Col } from 'antd';
import styled from 'styled-components';

const HeadIconWrapper = styled.div`
  width: 25px;
  height: 25px;
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
  }
  @media (min-width: 992px) {
    width: 35px;
    height: 35px;
  }
  @media (min-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 1600px) {
    width: 50px;
    height: 50px;
  }
`;

const HeadIcon = styled.img`
  width: 25px;
  height: 25px;
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
  }
  @media (min-width: 992px) {
    width: 35px;
    height: 35px;
  }
  @media (min-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 1600px) {
    width: 50px;
    height: 50px;
  }
`;

export const FormIcon = ({iconImg}) => {
  return (
    <Col
      xxl={{ offset: 4 }}
      xl={{ offset: 4 }}
      lg={{ offset: 3 }}
      md={{ offset: 1 }}
    >
      <HeadIconWrapper>
        <HeadIcon src={iconImg} alt={'icon'} />
      </HeadIconWrapper>
    </Col>
  );
};
