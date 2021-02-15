import React, { useEffect, useState } from "react"
import useTranslations from "../../components/useTranslations";
import CarCustomsCalculator from "../../components/calculators/CarCustomsCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const carCustoms = ({ pageContext}) => {
  const { calculator } = useTranslations();
  const [sameMarginTop, setSameMarginTop] = useState( '10px')

  console.log(sameMarginTop)
  useEffect(()=>{
    setSameMarginTop(document.querySelector('.textSec').clientHeight+'px')
  })
  return (
    <CalculatorWrapper ctx={pageContext} >
      <CarCustomsCalculator lang={calculator.car_customs} sameMarginTop={sameMarginTop}/>
    </CalculatorWrapper>
  )
};

export default carCustoms;
