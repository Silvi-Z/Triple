import React from "react"
import useTranslations from "../../components/useTranslations"
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper"
import CurrencyCalculator from "../../components/calculators/CurrencyCalculator"

const carTax = ({ pageContext }) => {
  const { calculator } = useTranslations()

  return (
    <CalculatorWrapper ctx={pageContext}>
      <CurrencyCalculator lang={calculator.currency} />
    </CalculatorWrapper>
  )
}

export default carTax
