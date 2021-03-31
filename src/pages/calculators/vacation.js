import React from "react";
import useTranslations from "../../components/useTranslations";
import VacationCalculator from "../../components/calculators/VacationCalculator";
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const vacation = ({pageContext}) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <VacationCalculator lang={calculator.vacation} sameMargin locale={pageContext.locale}/>
    </CalculatorWrapper>
  )
};

export default vacation;
