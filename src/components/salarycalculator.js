import React from 'react';
import { Typography, Row, Col, Button, Form, Input } from 'antd';
import styled from 'styled-components';
import AccountImg from '../assets/account.png';

const H2Styled = styled.h2`
  font-size: 25px;
  font-weight: 400;
`;

const ButtonBase = styled(Button)`
  height: 55px;
`;

const ButtonLarge = styled(Button)`
  height: 70px;
`;

const SalaryCalculator = () => {
  return (
    <>
      <Row align="middle" gutter={[20, 10]}>
        <Col span={2} offset={2}>
          <img src={AccountImg} alt={'lol'} />
        </Col>
        <Col span={16}>
          <H2Styled>Աշխատավարձի հաշվիչ</H2Styled>
        </Col>
        <Col span={2}>
          <Button block>Toggle</Button>
        </Col>
      </Row>

      <Row align="middle" gutter={[20, 10]}>
        <Col span={6} offset={4}>
          <ButtonBase size="large" block>Մաքուր</ButtonBase>
        </Col>
        <Col span={6}>
          <ButtonBase size="large" block>Կեղտոտ</ButtonBase>
        </Col>
      </Row>

      <Row align="middle" gutter={[20, 10]}>
        <Col span={3} offset={4}>
          <ButtonLarge size="large" block>Ընդհանուր<br />հարկման դաշտ</ButtonLarge>
        </Col>
        <Col span={4}>
          <ButtonLarge size="large" block>Միկրոձեռնարկատիրության<br />սուբյեկտ</ButtonLarge>
        </Col>
        <Col span={3}>
          <ButtonLarge size="large" block>ՏՏ ոլորտի<br />Արտոնագիր</ButtonLarge>
        </Col>
      </Row>

      <Row align="middle" gutter={[20, 10]}>
        <Col span={10} offset={4}>
          <Form.Item label="Աշխատավարձ">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row align="middle" gutter={[20, 10]}>
        <Col span={10} offset={4}>
          <Form.Item label="Պարգևավճար">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row align="middle" gutter={[10, 10]}>
        <Col span={8} offset={4}>
          <Typography>Մասնակցու՞մ եք կուտակային կենսաթոշակայինին</Typography>
        </Col>
        <Col span={1}>
          <ButtonBase size="large" block>Այո</ButtonBase>
        </Col>
        <Col span={1}>
          <ButtonBase size="large" block>Ոչ</ButtonBase>
        </Col>
      </Row>

      <Row align="middle" gutter={[10, 40]}>
        <Col span={8} offset={4}>
          <Typography>Մասնակցու՞մ եք կուտակային կենսաթոշակայինին</Typography>
        </Col>
        <Col span={1}>
          <ButtonBase size="large" block>Այո</ButtonBase>
        </Col>
        <Col span={1}>
          <ButtonBase size="large" block>Ոչ</ButtonBase>
        </Col>
      </Row>

      <Row align="middle" gutter={[10, 40]}>
        <Col span={4} offset={4}>
          <ButtonLarge size="large" block>Հաշվել</ButtonLarge>
        </Col>
      </Row>
    </>
  );
};

export default SalaryCalculator;