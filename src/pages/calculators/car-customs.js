import React from "react";
import useTranslations from "../../components/useTranslations";
import CarCustomsCalculator from "../../components/calculators/carCustomsCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const carCustoms = ({ pageContext }) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <CarCustomsCalculator langText={calculator.car_customs_calculator} />
    </CalculatorWrapper>
  )
};

export default carCustoms;
