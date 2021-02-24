import React from "react"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import {
  Text,
  H2Wrapper,
  DropTextCol,
  DropWrapper,
  ToggleButton,
  ToggleH2Styled,
  ServiceDropRow,
} from "./servicedropStyle.js"

const Servicedrop = ({ data, showServiceForm }) => {
  return (
    <ServiceDropRow  id={data.data.scroll_id}>
      <DropWrapper>
        <H2Wrapper>
          <ToggleH2Styled>{data.data.paragraph}</ToggleH2Styled>
        </H2Wrapper>
          <ToggleButton
            onClick={() => showServiceForm(data)}
            className={data.open ? 'whiteButton' : 'blackButton'}
            block
          >
            {data.open ? <UpOutlined/> :  <DownOutlined />}
          </ToggleButton>
      </DropWrapper>
        <DropTextCol className={data.open ? 'openTextCol' : ''} >
          <Text >
            {data.data.text}
          </Text>
        </DropTextCol>
    </ServiceDropRow>
  )
}

export default Servicedrop
