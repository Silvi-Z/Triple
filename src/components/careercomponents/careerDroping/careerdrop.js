/*eslint-disable */
import React, { useState } from "react"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import FormCareer from "../careerForm/careerform"
import {
  H2Styled,
  OrderList,
  DropCareer,
  FormWrapper,
  OrderSection,
  ToggleButton,
  ToggleH2Styled,
  OrderListWrapper,
  DropHeadingTitle,
  DropHeadingButton,
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
    <>
      <DropCareer >
        <DropHeadingTitle>
          <ToggleH2Styled>{data.data.title}</ToggleH2Styled>
          <DropHeadingButton>
            <ToggleButton
              className={data.open ? 'whiteButton' : 'blackButton'}
              block onClick={() => showCareerForm(data)}
            >
              {data.open ? <UpOutlined/> : <DownOutlined />}
            </ToggleButton>
          </DropHeadingButton>
        </DropHeadingTitle>
      </DropCareer >
      { data.open ? (
              <FormWrapper
                xxl={{ span: 19, offset: 5 }}
                xl={{ span: 22, offset: 3 }}
                lg={{ span: 22, offset: 2 }}
                md={{ span: 22, offset: 1 }}
                sm={{ span: 22, offset: 0 }}
                xs={{ span: 22, offset: 0 }}
              >
                <OrderListWrapper>
                  <OrderList>
                    <H2Styled>{data.data.sub_title}</H2Styled>
                    <OrderSection>{data.data.description_1}</OrderSection>
                    <OrderSection>{data.data.description_2}</OrderSection>
                    <OrderSection>{data.data.description_3}</OrderSection>
                    <OrderSection>{data.data.description_4}</OrderSection>
                  </OrderList>
                </OrderListWrapper>
                <FormCareer
                  seotitle={seotitle}
                  seodescription={seodescription}
                  seolang={seolang}
                  formlangtext={formlangtext}
                  lang={lang}
                />
              </FormWrapper>
        ) : null
      }
    </>
  )
}
export default CareerDropWrapper;
