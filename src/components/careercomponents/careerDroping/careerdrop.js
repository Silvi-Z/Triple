/*eslint-disable */
import React from "react"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import CalcImg from "../../../assets/account.png"
import FormCareer from "../careerForm/careerform"
import { Helmet } from "react-helmet"
import {
  ToggleH2Styled,
  H2Styled,
  ToggleButton,
  HeadIcon,
  DropHeadingIconCol,
  DropHeadingTitleCol,
  DropHeadingButtonCol,
  FormWrapperCol,
  OrderList,
  OrderSection,
  DropCareerRow,
} from "./dropStyle"
const CareerDropWrapper = ({ showCareerForm, data }) => {
  return (
    <DropCareerRow gutter={[10, 30]}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Career</title>
        <meta property="og:title" content={data.data.title_arm} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="http://triple-c.algorithm.am/career/" />
      </Helmet>
      <DropHeadingIconCol
        xxl={{ span: 2, offset: 4 }}
        xl={{ span: 2, offset: 3 }}
        lg={{ span: 2, offset: 2 }}
        md={{ span: 2, offset: 0 }}
      >
        <HeadIcon src={CalcImg} alt={"icon"} />
      </DropHeadingIconCol>
      <DropHeadingTitleCol xxl={13} xl={12} lg={17} span={17}>
        <ToggleH2Styled>{data.data.title_arm}</ToggleH2Styled>
      </DropHeadingTitleCol>
      <DropHeadingButtonCol xl={5} span={2}>
        <ToggleButton block onClick={() => showCareerForm(data)}>
          {data.open ? (
            <MinusOutlined style={{ fontSize: "20px" }} />
          ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
        </ToggleButton>
      </DropHeadingButtonCol>
      {data.open ? (
        <FormWrapperCol
          xxl={{ span: 18, offset: 5 }}
          xl={{ span: 18, offset: 4 }}
          lg={{ span: 18, offset: 3 }}
          md={{ span: 23, offset: 1 }}
          sm={{ span: 24, offset: 0 }}
          xs={{ span: 24, offset: 0 }}
        >
          <H2Styled>Պահանջվող հմտություններ</H2Styled>
          <OrderList>
            <OrderSection>{data.data.description_arm_1}</OrderSection>
            <OrderSection>{data.data.description_arm_2}</OrderSection>
            <OrderSection>{data.data.description_arm_3}</OrderSection>
            <OrderSection>{data.data.description_arm_4}</OrderSection>
            <OrderSection>{data.data.description_arm_5}</OrderSection>
            <OrderSection>{data.data.description_arm_6}</OrderSection>
          </OrderList>
          <FormCareer />
        </FormWrapperCol>
      ) : null}
    </DropCareerRow>
  )
}
export default CareerDropWrapper
