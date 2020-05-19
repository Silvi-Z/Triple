import React from 'react';
import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';
import Slideshow from '../components/slideshow';
import Homeservices from '../components/homecomponents/homeServices/homeservices';
import Homepartners from '../components/homecomponents/homePartners/homepartners';

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

const IndexPage = () => {
  return (
    <Layout>
      <SEO title='Triple Consulting' meta={siteMetada} />
      <Slideshow />
      <Homeservices />
      <Homepartners />
    </Layout>
  );
};

export default IndexPage;
