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
const CareerDropWrapper = ({
  showCareerForm,
  data,
  seotitle,
  seodescription,
  seolang,
  formlangtext,
  lang
}) => {

  return (
    < DropCareerRow gutter={[10, 30]} >
      <DropHeadingIconCol
        xxl={{ span: 2, offset: 4 }}
        xl={{ span: 2, offset: 3 }}
        lg={{ span: 2, offset: 2 }}
        md={{ span: 2, offset: 0 }}
      >
        <HeadIcon src={CalcImg} alt={"icon"} />
      </DropHeadingIconCol>
      <DropHeadingTitleCol xxl={13} xl={12} lg={17} span={17}>
        <ToggleH2Styled>{data.data.title}</ToggleH2Styled>
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
      {
        data.open ? (
          <FormWrapperCol
            xxl={{ span: 18, offset: 5 }}
            xl={{ span: 18, offset: 4 }}
            lg={{ span: 18, offset: 3 }}
            md={{ span: 23, offset: 1 }}
            sm={{ span: 24, offset: 0 }}
            xs={{ span: 24, offset: 0 }}
          >
            <H2Styled>{data.data.sub_title}</H2Styled>
            <OrderList>
              <OrderSection>{data.data.description_1}</OrderSection>
              <OrderSection>{data.data.description_2}</OrderSection>
              <OrderSection>{data.data.description_3}</OrderSection>
              <OrderSection>{data.data.description_4}</OrderSection>
              <OrderSection>{data.data.description_5}</OrderSection>
              <OrderSection>{data.data.description_6}</OrderSection>
            </OrderList>
            <FormCareer
              seotitle={seotitle}
              seodescription={seodescription}
              seolang={seolang}
              formlangtext={formlangtext}
              lang={lang}
            />
          </FormWrapperCol>
        ) : null
      }
    </DropCareerRow >
  )
}
export default CareerDropWrapper
