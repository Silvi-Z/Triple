import React from 'react';
// import Image from '../components/image';
import SEO from '../components/seo';
import Slideshow from '../components/slideshow';
import Homeservices from '../components/homecomponents/homeServices/homeservices';
import Homepartners from '../components/homecomponents/homePartners/homepartners';
import { useTranslation } from "react-i18next"
import useTranslations from "../components/useTranslations"

const siteMetada = [
  {
    name: 'Հաշվետվության տրամադրում',
    content:
      'Տրամադրիր անհրաժեշտ ինֆորմացիան և ստացիր Հաշվետվությունտ առանց ավելորդ ջանք գործադրելու',
  },
  {
    property: 'Ծառայություններ',
    content:
      'Թրիփլ Քնսալթինգ ընկերություննը մատուցում է  բոլոր հիմնական ծառայությունները կապված հաշվապահության և աւդիտի հետ',
  },
  {
    property: 'Հաշվիչ',
    content:
      'Թրիփլ Քնսալթինգ ընկերություննը մատուցում է  բոլոր հիմնական ծառայությունները կապված հաշվապահության և աւդիտի հետ',
  },
  {
    property: 'Տեղեկություն',
    content:
      'Ստացեք օգտակար տեղեկություններ և ծանոթացեք ոլորտի ամենաթարմ  նորություններին հենց այստեղ',
  },
  {
    property: 'Միացիր մեր թիմին',
    content: 'Բաց մի թող եք հնարավորությունը և միացեք մեր դինամիկ թիմին',
  },
];

const IndexPage = ({ pageContext }) => {
  const { t } = useTranslation()
  const { home } = useTranslations();
  return (
    <>
      <SEO title='Triple Consulting' meta={siteMetada} pageContext={pageContext} />
      <Slideshow />
      <Homeservices langText={home.services} lang={pageContext.locale} />
      <Homepartners langText={home.our_partners} lang={pageContext.locale} />
    </>
  );
};

export default IndexPage;
