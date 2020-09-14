import React from "react";
import useTranslations from "../../components/useTranslations";
import SalaryCalculator from "../../components/calculators/salarycalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const salary = ({ pageContext }) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <SalaryCalculator langText={calculator.salary_calculator} />
    </CalculatorWrapper>
  )
};

export default salary;
