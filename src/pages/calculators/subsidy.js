import React from "react";
import useTranslations from "../../components/useTranslations";
import SubsidyCalculator from "../../components/calculators/SubsidyCalculator"
import CalculatorWrapper from "../../components/calculators/calcComponents/CalculatorWrapper";

const vacation = ({pageContext}) => {
  const { calculator } = useTranslations();

  return (
    <CalculatorWrapper ctx={pageContext}>
      <SubsidyCalculator lang={calculator.subsidy} locale={pageContext.locale}/>
    </CalculatorWrapper>
  )
};

export default vacation;
