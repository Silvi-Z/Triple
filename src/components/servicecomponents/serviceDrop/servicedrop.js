/*eslint-disable */
import React from "react"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import {
  ServiceDropRow,
  ToggleH2Styled,
  HeadIcon,
  ToggleButton,
  SubParagStyled,
  DropHeadingIconCol,
  DropHeadingParagraphCol,
  DropButtonCol,
  DropTextCol
} from "./servicedropStyle.js"

const Servicedrop = ({ data, showServiceForm }) => {
  return (
    <ServiceDropRow align="middle" gutter={[10, 30]}>
      <DropHeadingIconCol
        xxl={{ span: 2, offset: 4 }}
        xl={{ span: 2, offset: 2 }}
        lg={{ span: 2, offset: 1 }}
        xs={{ span: 3, offset: 0 }}
      >
        <HeadIcon src={data.data.image} alt={"icon"} />
      </DropHeadingIconCol>
      <DropHeadingParagraphCol xxl={13} xl={18} lg={18} xs={16}>
        <ToggleH2Styled>{data.data.paragraph}</ToggleH2Styled>
      </DropHeadingParagraphCol>
      <DropButtonCol lg={2} xl={2} xxl={2} md={2} xs={4}>
        <ToggleButton block onClick={() => showServiceForm(data)}>
          {data.open ? (
            <MinusOutlined style={{ fontSize: "20px" }} />
          ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
        </ToggleButton>
      </DropButtonCol>
      {data.open ? (
        <DropTextCol span={24}>
          <SubParagStyled>{data.data.text}</SubParagStyled>
        </DropTextCol>
      ) : null}
    </ServiceDropRow>
  )
}

export default Servicedrop
