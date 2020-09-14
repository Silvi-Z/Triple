import React from "react"
import useTranslations from "../../components/useTranslations"
import FinalCalculator from "../../components/calculators/finalCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper"

const final = ({ pageContext }) => {
  const { calculator } = useTranslations()

  return (
    <CalculatorWrapper ctx={pageContext}>
      <FinalCalculator langText={calculator.final_calculator} />
    </CalculatorWrapper>
  )
};

export default final;
