import React from 'react';
import { Row, Col, Button, Spin } from 'antd';
import styled from 'styled-components';

const CustomButton = styled(Button)`
  height: 46px;
  border-color: #009db8;
  overflow: hidden;
  padding-vertical: 0;
`;

export const SubmitButton = ({disabled, loading, onClick, submitter}) => {
  if (submitter) {
    return (
      <Row align="middle" gutter={[10, 30]}>
        <Col
          xxl={{ span: 4, offset: 6 }}
          xl={{ span: 4, offset: 5 }}
          lg={{ span: 5, offset: 4 }}
          md={{ span: 7, offset: 2 }}
          sm={{ span: 7, offset: 2 }}
          span={8}
        >
          <CustomButton
            disabled={disabled}
            size="large"
            block
            htmlType="submit"
          >
            {loading ? <Spin /> : 'Հաշվել'}
          </CustomButton>
        </Col>
      </Row>
    );
  }
  return (
    <Row align="middle" gutter={[10, 30]}>
      <Col
        xxl={{ span: 4, offset: 6 }}
        xl={{ span: 4, offset: 5 }}
        lg={{ span: 5, offset: 4 }}
        md={{ span: 7, offset: 2 }}
        sm={{ span: 7, offset: 2 }}
        span={8}
      >
        <CustomButton
          disabled={disabled}
          size="large"
          block
          onClick={onClick}
        >
          {loading ? <Spin /> : 'Հաշվել'}
        </CustomButton>
      </Col>
    </Row>
  );
};
