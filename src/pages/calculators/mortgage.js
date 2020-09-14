import React from "react"
import useTranslations from "../../components/useTranslations"
import MortgageCalculator from "../../components/calculators/mortgageCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper"

const mortgage = ({ pageContext }) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <MortgageCalculator langText={calculator.mortgage_calculator} />
    </CalculatorWrapper>
  )
};

export default mortgage;
