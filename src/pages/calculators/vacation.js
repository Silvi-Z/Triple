import React from "react";
import useTranslations from "../../components/useTranslations";
import VacationCalculator from "../../components/calculators/vacationcalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const vacation = ({pageContext}) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <VacationCalculator lang={calculator.vacation}/>
    </CalculatorWrapper>
  )
};

export default vacation;
