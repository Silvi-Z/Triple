import React from "react"
import useTranslations from "../../components/useTranslations"
import FinalCalculator from "../../components/calculators/FinalCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper"

const final = ({ pageContext }) => {
  const { calculator } = useTranslations()

  return (
    <CalculatorWrapper ctx={pageContext}>
      <FinalCalculator lang={calculator.final} locale={pageContext.locale}/>
    </CalculatorWrapper>
  )
};

export default final;
