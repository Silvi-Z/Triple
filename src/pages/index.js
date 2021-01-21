import React from "react"
import SEO from "../components/seo"
import { useTranslation } from "react-i18next"
import useTranslations from "../components/useTranslations"
import HomeServices from "../components/homecomponents/homeServices/HomeServices"
import Homepartners from "../components/homecomponents/homePartners/HomePartners"
import HomeAboutUs from "../components/homecomponents/HomeAboutUs/HomeAboutUs.js"
import { HomePageWrapper } from "../components/homecomponents/homeServices/homeServiceStyle"

const siteMetada = [
  {
    name: "Հաշվետվության տրամադրում",
    content:
      "Տրամադրիր անհրաժեշտ ինֆորմացիան և ստացիր Հաշվետվությունտ առանց ավելորդ ջանք գործադրելու",
  },
  {
    property: "Ծառայություններ",
    content:
      "Թրիփլ Քնսալթինգ ընկերություննը մատուցում է  բոլոր հիմնական ծառայությունները կապված հաշվապահության և աւդիտի հետ",
  },
  {
    property: "Հաշվիչ",
    content:
      "Թրիփլ Քնսալթինգ ընկերություննը մատուցում է  բոլոր հիմնական ծառայությունները կապված հաշվապահության և աւդիտի հետ",
  },
  {
    property: "Տեղեկություն",
    content:
      "Ստացեք օգտակար տեղեկություններ և ծանոթացեք ոլորտի ամենաթարմ  նորություններին հենց այստեղ",
  },
  {
    property: "Միացիր մեր թիմին",
    content: "Բաց մի թող եք հնարավորությունը և միացեք մեր դինամիկ թիմին",
  },
]

const IndexPage = ({ pageContext }) => {
  const { t } = useTranslation()
  const { home } = useTranslations()
  return (
    <HomePageWrapper>
      <SEO title='Triple Consulting' meta={siteMetada} pageContext={pageContext} />
      <HomeAboutUs pageContext={pageContext}/>
      <HomeServices langText={home.services} lang={pageContext.locale} />
      <Homepartners langText={home.our_partners} lang={pageContext.locale} />
    </HomePageWrapper>
  )
}

export default IndexPage
