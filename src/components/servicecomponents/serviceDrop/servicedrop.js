/*eslint-disable */
import React from "react"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import {
  ServiceDropRow,
  ToggleH2Styled,
  ToggleButton,
  DropTextCol,
  DropWrapper,
  FirstTextCol,
  SecondTextCol, H2Wrapper,
} from "./servicedropStyle.js"

const Servicedrop = ({ data, showServiceForm }) => {
  return (
    <ServiceDropRow id={data.data.scroll_id}>
      <DropWrapper>
        <H2Wrapper>
          <ToggleH2Styled>{data.data.paragraph}</ToggleH2Styled>
        </H2Wrapper>
          <ToggleButton isOpen={data.open} block onClick={() => showServiceForm(data)}>
            {data.open ? <UpOutlined/> :  <DownOutlined />}
          </ToggleButton>
      </DropWrapper>
      {data.open ? (
        <DropTextCol>
          <FirstTextCol>{data.data.text}</FirstTextCol>
          {/*<SecondTextCol>{data.data.text}</SecondTextCol>*/}
        </DropTextCol>
      ) : null
      }
    </ServiceDropRow>
  )
}

export default Servicedrop
