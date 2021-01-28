import React from "react";
import useTranslations from "../../components/useTranslations";
import CarTaxCalculator from "../../components/calculators/CarTaxCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const carTax = ({ pageContext }) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <CarTaxCalculator lang={calculator.car_tax} />
    </CalculatorWrapper>
  )
};

export default carTax;
