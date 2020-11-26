import React from "react";
import styled from "styled-components"
import CalculatorHomePage from "../../components/calculators/CalculatorHomePage"

const CalcPageWrapper = styled.div`
  padding: 50px 95px 90px 95px;
  max-width:1440px;
  margin:0 auto;
  @media only screen and (max-width:1024px){
    padding:50px 40px 60px 40px;
  }
  @media only screen and (max-width:768px){
    padding:50px 10px 60px 10px;
  }
`
const H1Element = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 0.15px;
  @media only screen and (max-width:1024px){
    font-size:20px;
  }
`
const PElement = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 0.15px;
  color: #000000;
  margin-bottom:50px;
  @media only screen and (max-width:1024px){
    font-size:16px;
  }
`

const Index = ({ pageContext }) => {
  return(
    <>
      <CalcPageWrapper ctx={pageContext}>
        <H1Element>Հաշվիչներ</H1Element>
        <PElement>Թրիփլ Քոնսալթինգի կողմից մատուցվող հիմնական ծառայություններն են։ </PElement>
        <CalculatorHomePage > </CalculatorHomePage>
      </CalcPageWrapper>
      </>
  )
}

export default Index