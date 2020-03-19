import React, { useState } from "react"
import Layout from "../components/layout"
import { Typography, Row, Col, Button, InputNumber } from "antd"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import styled from "styled-components"
import CalcImg from "../assets/homeImages/calculator-1.png"
import TaxImg from "../assets/homeImages/tax-1@3x.png"
import AuditImg from "../assets/homeImages/audit@3x.png"
import ClientImg from "../assets/homeImages/client-1@3x.png"
import BrowserImg from "../assets/homeImages/browser@3x.png"
import UserImg from "../assets/homeImages/user-1@3x.png"
import LawImg from "../assets/homeImages/law@3x.png"
import TeamImg from "../assets/homeImages/teamwork@3x.png"

const H2Styled = styled.h2`
  width: 155px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`
const PStyled = styled.p`
  width: 517px;
  height: 46px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-top: 26px;
`
const HeadIcon = styled.img`
  width: 30px;
  height: 30px;
  @media (min-width: 1200px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 1600px) {
    width: 50px;
    height: 50px;
  }
`
const ToggleH2Styled = styled.h2`
  font-size: 25px;
  font-weight: 400;
  margin-left: 2.7%;
`
const ToggleButton = styled(Button)`
  width: 60px;
  height: 60px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  color: #009db8;
`
const SubParagStyled = styled.div`
  width: 517px;
  height: 46px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-left: 13%;
`
const Services = () => {
  //const [result, setResult] = useState(null);
  const [showAccountingForm, toggleAccountingForm] = useState(false)
  const [showTaxForm, toggleTaxForm] = useState(false)
  const [showAuditForm, toggleAuditForm] = useState(false)
  const [showClientForm, toggleClientForm] = useState(false)
  const [showCompRegForm, toggleCompRegForm] = useState(false)
  const [showIndividualForm, toggleIndividualForm] = useState(false)
  const [showLawForm, toggleLawForm] = useState(false)
  const [showTeamForm, toggleTeamForm] = useState(false)

  return (
    <Layout>
      <Row style={{ padding: "0 12%", marginBottom: "2.8%" }}>
        <Col lg={{ span: 12 }}>
          <H2Styled>Ծառայություններ</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերությունն բոլոր հիմնական ծառայությունները՛
            կապված հաշվախահության և աւդիտի հետ։
          </PStyled>
        </Col>
      </Row>
      <Row
        align="middle"
        gutter={[10, 50]}
        style={{ marginBottom: "2.2%", paddingRight: "7%" }}
      >
        <Col
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 2 }}
          lg={{ span: 1, offset: 1 }}
        >
          <HeadIcon src={CalcImg} alt={"icon"} />
        </Col>
        <Col xxl={17} xl={18} lg={19} span={19}>
          <ToggleH2Styled>Հաշվապահական հաշվառում</ToggleH2Styled>
        </Col>
        <Col span={2}>
          <ToggleButton
            block
            onClick={() => toggleAccountingForm(!showAccountingForm)}
          >
            {showAccountingForm ? (
              <MinusOutlined style={{ fontSize: "20px" }} />
            ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
          </ToggleButton>
        </Col>
        {showAccountingForm ? (
          <Col span={24}>
            <SubParagStyled>
              -հաշվապահական հաշվառման քաղաքականության մշակում <br /> -հարկային
              քաղաքականության մշակում
            </SubParagStyled>
          </Col>
        ) : null}
      </Row>

      <Row
        align="middle"
        gutter={[10, 50]}
        style={{
          marginBottom: "2.2%",
          paddingRight: "7%",
          borderTop: "1px solid",
          borderColor: "#d7d7d7",
        }}
      >
        <Col
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 2 }}
          lg={{ span: 1, offset: 1 }}
        >
          <HeadIcon src={TaxImg} alt={"icon"} />
        </Col>
        <Col xxl={17} xl={18} lg={19} span={19}>
          <ToggleH2Styled>Հարկային հաշվառում</ToggleH2Styled>
        </Col>
        <Col span={2}>
          <ToggleButton block onClick={() => toggleTaxForm(!showTaxForm)}>
            {showTaxForm ? (
              <MinusOutlined style={{ fontSize: "20px" }} />
            ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
          </ToggleButton>
        </Col>
        {showTaxForm ? (
          <Col span={24}>
            <SubParagStyled>
              -հարկային պլանավորում <br /> -հարկային հաշվառում և
              հաշվետվությունների ներկայացում
            </SubParagStyled>
          </Col>
        ) : null}
      </Row>
      <Row
        align="middle"
        gutter={[10, 50]}
        style={{
          marginBottom: "2.2%",
          paddingRight: "7%",
          borderTop: "1px solid",
          borderColor: "#d7d7d7",
        }}
      >
        <Col
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 2 }}
          lg={{ span: 1, offset: 1 }}
        >
          <HeadIcon src={AuditImg} alt={"icon"} />
        </Col>
        <Col xxl={17} xl={18} lg={19} span={19}>
          <ToggleH2Styled>Հարկային աուդիտ</ToggleH2Styled>
        </Col>
        <Col span={2}>
          <ToggleButton block onClick={() => toggleAuditForm(!showAuditForm)}>
            {showAuditForm ? (
              <MinusOutlined style={{ fontSize: "20px" }} />
            ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
          </ToggleButton>
        </Col>
        {showAuditForm ? (
          <Col span={24}>
            <SubParagStyled>
              -հարկային քաղաքականության մշակում <br /> -հարկային բեռի նվազեցում
            </SubParagStyled>
          </Col>
        ) : null}
      </Row>
      <Row
        align="middle"
        gutter={[10, 50]}
        style={{
          marginBottom: "2.2%",
          paddingRight: "7%",
          borderTop: "1px solid",
          borderColor: "#d7d7d7",
        }}
      >
        <Col
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 2 }}
          lg={{ span: 1, offset: 1 }}
        >
          <HeadIcon src={ClientImg} alt={"icon"} />
        </Col>
        <Col xxl={17} xl={18} lg={19} span={19}>
          <ToggleH2Styled>Խորհրդատվություն</ToggleH2Styled>
        </Col>
        <Col span={2}>
          <ToggleButton block onClick={() => toggleClientForm(!showClientForm)}>
            {showClientForm ? (
              <MinusOutlined style={{ fontSize: "20px" }} />
            ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
          </ToggleButton>
        </Col>
        {showClientForm ? (
          <Col span={24}>
            <SubParagStyled>
              -հաշվապահական հաշվառման քաղաքականության մշակում <br />
              -հարկային հաշվառման քաղաքականության մշակում <br />
            </SubParagStyled>
          </Col>
        ) : null}
      </Row>
      <Row
        align="middle"
        gutter={[10, 50]}
        style={{
          marginBottom: "2.2%",
          paddingRight: "7%",
          borderTop: "1px solid",
          borderColor: "#d7d7d7",
        }}
      >
        <Col
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 2 }}
          lg={{ span: 1, offset: 1 }}
        >
          <HeadIcon src={BrowserImg} alt={"icon"} />
        </Col>
        <Col xxl={17} xl={18} lg={19} span={19}>
          <ToggleH2Styled>Կազմակերպության գրանցում</ToggleH2Styled>
        </Col>
        <Col span={2}>
          <ToggleButton
            block
            onClick={() => toggleCompRegForm(!showCompRegForm)}
          >
            {showCompRegForm ? (
              <MinusOutlined style={{ fontSize: "20px" }} />
            ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
          </ToggleButton>
        </Col>
        {showCompRegForm ? (
          <Col span={24}>
            <SubParagStyled>
              -հաշվապահական հաշվառման քաղաքականության մշակում <br />
              -կազմակերպության հաշվապահական հաշվառում
            </SubParagStyled>
          </Col>
        ) : null}
      </Row>
      <Row
        align="middle"
        gutter={[10, 50]}
        style={{
          marginBottom: "2.2%",
          paddingRight: "7%",
          borderTop: "1px solid",
          borderColor: "#d7d7d7",
        }}
      >
        <Col
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 2 }}
          lg={{ span: 1, offset: 1 }}
        >
          <HeadIcon src={UserImg} alt={"icon"} />
        </Col>
        <Col xxl={17} xl={18} lg={19} span={19}>
          <ToggleH2Styled>Ֆիզիկական անձանց</ToggleH2Styled>
        </Col>
        <Col span={2}>
          <ToggleButton
            block
            onClick={() => toggleIndividualForm(!showIndividualForm)}
          >
            {showIndividualForm ? (
              <MinusOutlined style={{ fontSize: "20px" }} />
            ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
          </ToggleButton>
        </Col>
        {showIndividualForm ? (
          <Col span={24}>
            <SubParagStyled>
              -հաշվապահական հաշվառման քաղաքականության մշակում <br />
              -կազմակերպության հաշվապահական հաշվառում
            </SubParagStyled>
          </Col>
        ) : null}
      </Row>
      <Row
        align="middle"
        gutter={[10, 50]}
        style={{
          marginBottom: "2.2%",
          paddingRight: "7%",
          borderTop: "1px solid",
          borderColor: "#d7d7d7",
        }}
      >
        <Col
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 2 }}
          lg={{ span: 1, offset: 1 }}
        >
          <HeadIcon src={LawImg} alt={"icon"} />
        </Col>
        <Col xxl={17} xl={18} lg={19} span={19}>
          <ToggleH2Styled>Մաքսային գոծարքներ</ToggleH2Styled>
        </Col>
        <Col span={2}>
          <ToggleButton block onClick={() => toggleLawForm(!showLawForm)}>
            {showLawForm ? (
              <MinusOutlined style={{ fontSize: "20px" }} />
            ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
          </ToggleButton>
        </Col>
        {showLawForm ? (
          <Col span={24}>
            <SubParagStyled>
              -հաշվապահական հաշվառման քաղաքականության մշակում <br />
              -կազմակերպության հաշվապահական հաշվառում
            </SubParagStyled>
          </Col>
        ) : null}
      </Row>
      <Row
        align="middle"
        gutter={[10, 50]}
        style={{
          marginBottom: "2.2%",
          paddingRight: "7%",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "#d7d7d7",
        }}
      >
        <Col
          xxl={{ span: 1, offset: 3 }}
          xl={{ span: 1, offset: 2 }}
          lg={{ span: 1, offset: 1 }}
        >
          <HeadIcon src={TeamImg} alt={"icon"} />
        </Col>
        <Col xxl={17} xl={18} lg={19} span={19}>
          <ToggleH2Styled>Կադրային աշխատանքի վարում</ToggleH2Styled>
        </Col>
        <Col span={2}>
          <ToggleButton block onClick={() => toggleTeamForm(!showTeamForm)}>
            {showTeamForm ? (
              <MinusOutlined style={{ fontSize: "20px" }} />
            ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
          </ToggleButton>
        </Col>
        {showTeamForm ? (
          <Col span={24}>
            <SubParagStyled>
              -աշխատանքային պայմանագրերի կազմում -հրամանների կազմում <br />
              -աշխատաժամանակի, գրաֆիկի ցուցակների կազմում
            </SubParagStyled>
          </Col>
        ) : null}
      </Row>
    </Layout>
  )
}
export default Services
