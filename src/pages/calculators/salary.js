import React from "react";
import useTranslations from "../../components/useTranslations";
import SalaryCalculator from "../../components/calculators/SalaryCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const salary = ({ pageContext }) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <SalaryCalculator langText={calculator.salary} />
    </CalculatorWrapper>
  )
};

export default salary;
