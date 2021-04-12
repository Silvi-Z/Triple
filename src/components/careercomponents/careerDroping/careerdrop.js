/*eslint-disable */
import React from "react"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import FormCareer from "../careerForm/careerform"
import {
  CareerSection,
  CareerWrapper,
  DropCareer,
  DropHeadingButton,
  DropHeadingTitle,
  FormWrapper,
  ToggleButton,
  ToggleH2Styled,
} from "./dropStyle"

const CareerDropWrapper = ({
                             showCareerForm,
                             data,
                             seotitle,
                             seodescription,
                             seolang,
                             open,
                             formlangtext,
                             lang,
                           }) => {
  return (
    <>
      <DropCareer>
        <DropHeadingTitle>
          <ToggleH2Styled>{data[`title_${lang}`]}</ToggleH2Styled>
          <DropHeadingButton>
            <ToggleButton
              className={data.open ? "whiteButton" : "blackButton"}
              block onClick={() => showCareerForm(data)}
            >
              {data.open ? <UpOutlined /> : <DownOutlined />}
            </ToggleButton>
          </DropHeadingButton>
        </DropHeadingTitle>
      </DropCareer>
      <FormWrapper
        className={data.open ? "openTextCol" : ""}
        xxl={{ span: 19, offset: 5 }}
        xl={{ span: 22, offset: 3 }}
        lg={{ span: 22, offset: 2 }}
        md={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 0 }}
        xs={{ span: 22, offset: 0 }}
      >
        <CareerWrapper>
          <CareerSection>{data[`description_${lang}`]}</CareerSection>
        </CareerWrapper>
        <FormCareer
          data={data}
          seotitle={seotitle}
          seodescription={seodescription}
          seolang={seolang}
          formlangtext={formlangtext}
          lang={lang}
        />
      </FormWrapper>
    </>
  )
}
export default CareerDropWrapper
