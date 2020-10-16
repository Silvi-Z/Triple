import React from "react";
import useTranslations from "../../components/useTranslations";
import CarCustomsCalculator from "../../components/calculators/CarCustomsCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const carCustoms = ({ pageContext }) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <CarCustomsCalculator lang={calculator.car_customs} />
    </CalculatorWrapper>
  )
};

export default carCustoms;
