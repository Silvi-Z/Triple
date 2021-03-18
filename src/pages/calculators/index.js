import React from "react"
import styled from "styled-components"
import CalculatorHomePage from "../../components/calculators/CalculatorHomePage"
import { ContentContainer } from "../../components/homecomponents/homeServices/homeServiceStyle"


const CalcPageWrapper = styled.div`
${ContentContainer}:nth-child(9){
  border-bottom: 1px solid #D0D0D0;
}
${ContentContainer}:last-child{
    border-left: 1px solid #D0D0D0;
    border-right: 1px solid #D0D0D0;
   }
  padding: 30px 95px 90px 95px;
  max-width:1440px;
  margin:0 auto;
  @media only screen and (max-width:1200px){
    padding:30px 10px 60px 10px;
  }
  @media only screen and (max-width:1024px){
    padding:30px 40px 60px 40px;
  }
  @media only screen and (max-width:768px){
    padding:30px 10px 60px 10px;
  }
  
`
const H1Element = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 1.15px;
  margin-bottom:30px;
  @media only screen and (max-width:1024px){
    font-size:20px;
  }
`
const PElement = styled.p`
  background-color: white;
  padding: 10px 35px;
  border-radius: 10px;
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 25px;
  text-align: center;
  letter-spacing: 0.15px;
  color: #000000;
  margin:0 auto 50px;
  width: 100%;
  @media only screen and (max-width:1024px){
    font-size:16px;
  }
`

const Index = ({ pageContext }) => {
  return (
    <>
      <CalcPageWrapper ctx={pageContext}>
        <H1Element>{pageContext.localeResources.translation.calculator.title}</H1Element>
        <PElement>{pageContext.localeResources.translation.calculator.paragraph}</PElement>
        <CalculatorHomePage pageContext={pageContext.locale} />
      </CalcPageWrapper>
    </>
  )
}

export default Index