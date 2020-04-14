import React from 'react'
import { Input } from 'antd';
import { UploadOutlined } from "@ant-design/icons"
import styled from "styled-components"


const H6Styled = styled.h6`
  width: 319px;
  height: 31px;
  font-family: ArialAMU;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`

const ReportForm2 = () => {
    return (
        <div>
            <H6Styled>Խնդրում ենք ներբեռնել լիազորագիրը, ստրոագրել
             և հաջորդ քայլում վերբեռնել այն *</H6Styled>
            <a href="/images/myw3schoolsimage.jpg" download>
                <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
            </a>
        </div>
    )
}

export default ReportForm2
