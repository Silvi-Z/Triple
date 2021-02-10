import React from "react"
import useTranslations from "../../components/useTranslations"
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper"
import CalendarCalculator from "../../components/calculators/CalendarCalculator"

const carTax = ({ pageContext }) => {
  const { calculator } = useTranslations()

  return (
    <CalculatorWrapper ctx={pageContext}>
      <CalendarCalculator lang={calculator.calendar} />
    </CalculatorWrapper>
  )
}

export default carTax
