import React from "react";
import useTranslations from "../../components/useTranslations";
import CarSellCalculator from "../../components/calculators/carSellCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const carSell = ({ pageContext }) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <CarSellCalculator langText={calculator.car_sell_calculator} />
    </CalculatorWrapper>
  )
};

export default carSell;
