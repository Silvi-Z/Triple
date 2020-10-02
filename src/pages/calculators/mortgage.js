import React from "react"
import useTranslations from "../../components/useTranslations"
import MortgageCalculator from "../../components/calculators/MortgageCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper"

const mortgage = ({ pageContext }) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <MortgageCalculator lang={calculator.mortgage} />
    </CalculatorWrapper>
  )
};

export default mortgage;
