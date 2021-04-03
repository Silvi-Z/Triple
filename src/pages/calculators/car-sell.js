import React from "react";
import useTranslations from "../../components/useTranslations";
import CarSellCalculator from "../../components/calculators/CarSellCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const carSell = ({ pageContext }) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <CarSellCalculator lang={calculator.car_sell} locale={pageContext.locale}/>
    </CalculatorWrapper>
  )
};

export default carSell;
