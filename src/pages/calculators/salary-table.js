import React from "react";
import useTranslations from "../../components/useTranslations";
import SalaryTableCalculator from "../../components/calculators/SalaryTableCalculator"
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const salary = ({ pageContext }) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <SalaryTableCalculator lang={calculator.salary_table}/>
    </CalculatorWrapper>
  )
};

export default salary;
