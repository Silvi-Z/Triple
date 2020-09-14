import React from "react";
import useTranslations from "../../components/useTranslations";
import VacationCalculator from "../../components/calculators/vacationcalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const vacation = ({pageContext}) => {
  const { calculator } = useTranslations()

  return (
    <CalculatorWrapper ctx={pageContext}>
      <VacationCalculator langText={calculator.vacation_calculator}/>
    </CalculatorWrapper>
  )
};

export default vacation;
