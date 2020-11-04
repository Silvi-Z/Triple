/*eslint-disable */
import React from "react"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import CalcImg from "../../../assets/account.png"
import FormCareer from "../careerForm/careerform"
import useTranslations from "../../../components/useTranslations"
import { Helmet } from "react-helmet"
import {
  ToggleH2Styled,
  H2Styled,
  ToggleButton,
  OrderListWrapper,
  HeadIcon,
  DropHeadingIconCol,
  DropHeadingTitle,
  DropHeadingButton,
  FormWrapper,
  OrderList,
  OrderSection,
  DropCareer,
} from "./dropStyle"
import {
  FacebookIcon,
  LinkdinIcon,
  SharedWrapperCol,
  ShareLabel,
  FacebookShare,
  LinkedinShare
} from "../careerForm/formStyle"
const CareerDropWrapper = ({
  showCareerForm,
  data,
  seotitle,
  seodescription,
  seolang,
  formlangtext,
  lang
}) => {
  const { careerForm } = useTranslations()

  return (
    <>
    <DropCareer >
      <DropHeadingTitle>
        <ToggleH2Styled>{data.data.title}</ToggleH2Styled>
      </DropHeadingTitle>
      <DropHeadingButton>
        <ToggleButton isOpen={data.open} block onClick={() => showCareerForm(data)}>
          {data.open ? <UpOutlined/> :  <DownOutlined />}
        </ToggleButton>
      </DropHeadingButton>
    </DropCareer >
      {
        data.open ? (
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
                  <SharedWrapperCol>
                    <ShareLabel>{careerForm.share}</ShareLabel>
                      <FacebookShare
                        url="https://github.com/AlgorithmSolutions/TripleFE"
                        children={<FacebookIcon />}
                      />

                    <LinkedinShare
                      url="https://github.com/AlgorithmSolutions/TripleFE"
                      children={<LinkdinIcon />}
                    />
                  </SharedWrapperCol>
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
