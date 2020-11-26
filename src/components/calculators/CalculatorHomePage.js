import React from "react";
import styled from "styled-components"
import useTranslations from "../useTranslations"
import { ContainerRow } from "../homecomponents/homeServices/homeServiceStyle"
import { ResponsWrapper } from "../homecomponents/homePartners/homePartStyle"
import salary from "../../assets/calcImages/salary.svg"
import vacation from "../../assets/calcImages/vacation.svg"
import final from "../../assets/calcImages/final.svg"
import mortgage from "../../assets/calcImages/mortgage.svg"
import carCustoms from "../../assets/calcImages/car-customs.svg"
import carSell from "../../assets/calcImages/car-sell.svg"
import carTax from "../../assets/calcImages/car-tax.svg"
import salaryTable from "../../assets/calcImages/salary-table.svg"
import calc_9 from "../../assets/calcImages/calc_9.svg"
import { CalcImagesWrapper , IconWrapper , Borders } from "./styled"
import { Link } from "gatsby"

export const PElement = styled.p`
  margin-bottom:0;
  font-size:16px;
  line-height: 35px;
  text-align: center;
  letter-spacing: 0.15px;
  @media only screen and (max-width: 400px){
    line-height:unset
  }
`



const CalculatorHomePage = () =>{
  return(
    <>
    <ResponsWrapper>
      <ContainerRow>
      <Borders
        borderRight
        borderBottom
      >
        <Link style={{width:"100%", transition:"0"}} to={`/arm/calculators/salary`}>
          <CalcImagesWrapper>
          <IconWrapper src={salary} alt={"icon"}/>
          <PElement style={{marginBottom:'0'}}>Աշխատավարձի հաշվիչ</PElement>
        </CalcImagesWrapper>
        </Link>

      </Borders>
      <Borders
        borderBottom
        borderRight
        borderLeft
      >
        <Link style={{width:"100%", transition:"0"}} to={`/arm/calculators/vacation`}>
          <CalcImagesWrapper>
            <IconWrapper src={vacation} alt={"icon"}/>
            <PElement>Արձակուրդայինի հաշվիչ</PElement>
          </CalcImagesWrapper>
        </Link>
        </Borders>
      <Borders
        borderBottom
        borderLeft
      >
        <Link style={{width:"100%", transition:"0"}} to={`/arm/calculators/final`}>
         <CalcImagesWrapper>
            <IconWrapper src={final} alt={"icon"}/>
            <PElement>Վերջնահաշվարկի հաշվիչ </PElement>
         </CalcImagesWrapper>
        </Link>
        </Borders>
      <Borders
        borderBottom
        borderRight
        borderTop
      >
        <Link style={{width:"100%", transition:"0"}} to={`/arm/calculators/mortgage`}>
          <CalcImagesWrapper>
            <IconWrapper src={mortgage} alt={"icon"}/>
            <PElement> Հիփոթեքի տոկոսագումարի ետ վերադարձի հաշվիչ</PElement>
          </CalcImagesWrapper>
        </Link>
        </Borders>
      <Borders
        borderBottom
        borderRight
        borderTop
        borderLeft
      >
        <Link style={{width:"100%", transition:"0"}} to={`/arm/calculators/car-customs`}>
          <CalcImagesWrapper>
            <IconWrapper src={carCustoms} alt={"icon"}/>
            <PElement>Ավտոմեքենայի մաքսազերծման վճարի հաշվիչ </PElement>
          </CalcImagesWrapper>
        </Link>
        </Borders>
      <Borders
        borderBottom
        borderLeft
        borderTop
      >
        <Link style={{width:"100%", transition:"0"}} to={`/arm/calculators/car-sell`}>
          <CalcImagesWrapper>
            <IconWrapper src={carSell} alt={"icon"}/>
            <PElement>Ավտոմեքենայի վաճառքի հաշվիչ </PElement>
          </CalcImagesWrapper>
        </Link>
        </Borders>
      <Borders
        borderRight
        borderTop
      >
        <Link style={{width:"100%", transition:"0"}} to={`/arm/calculators/car-tax`}>
          <CalcImagesWrapper>
            <IconWrapper src={carTax} alt={"icon"}/>
            <PElement>Ավտոմեքենայի գույքահարկի հաշվիչ </PElement>
          </CalcImagesWrapper>
        </Link>
      </Borders>
      <Borders
        borderRight
        borderLeft
        borderTop
      >
        <Link style={{width:"100%", transition:"0"}} to={`/arm/calculators/salary-table`}>
          <CalcImagesWrapper>
            <IconWrapper src={salaryTable} alt={"icon"}/>
            <PElement>Աշխատավարձի հաշվիչ ըստ տաբելի </PElement>
          </CalcImagesWrapper>
        </Link>
      </Borders>
      <Borders
        borderLeft
        borderTop
      >
        <Link style={{width:"100%", transition:"0"}} to={`/arm/calculators/car-sell`}>
          <CalcImagesWrapper>
            <IconWrapper src={calc_9} alt={"icon"}/>
            <PElement>Ավտոմեքենայի վաճառքի հաշվիչ</PElement>
          </CalcImagesWrapper>
        </Link>
      </Borders>
        </ContainerRow>
    </ResponsWrapper>

    </>
  )
}

export default CalculatorHomePage;
