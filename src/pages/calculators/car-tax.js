import React from "react";
import useTranslations from "../../components/useTranslations";
import CarPropTaxCalculator from "../../components/calculators/carPropTaxCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const carTax = ({ pageContext }) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <CarPropTaxCalculator langText={calculator.car_prop_tax_calculator} />
    </CalculatorWrapper>
  )
};

export default carTax;
