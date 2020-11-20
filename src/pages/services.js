import React, { useState, useEffect } from "react"
import { AnchorLink } from "gatsby-plugin-anchor-links";
import useTranslations from "../components/useTranslations"
import ServiceDropWrap from "../components/servicecomponents/serviceDrop/servicedrop"
import TaxImg from "../assets/homeImages/icons/tax.svg"
import CalcImg from "../assets/homeImages/icons/calculator.svg"
import ClientImg from "../assets/homeImages/icons/client.svg"
import BrowserImg from "../assets/homeImages/icons/browser.svg"
import UserImg from "../assets/homeImages/icons/user.svg"
import LawImg from "../assets/homeImages/icons/law.svg"
import TeamImg from "../assets/homeImages/icons/teamwork.svg"
import {
  HeadingParagraphRow,
  H2Styled,
  PStyled,
} from "../components/servicecomponents/serviceMainStyle"
import { useTranslation } from "react-i18next"
import SEO from "../components/seo"
import {
  SevicePageWrapper
} from "../components/servicecomponents/serviceDrop/servicedropStyle"


const Services = ({ location, pageContext }) => {
  const { services } = useTranslations();
  const { t, i18n } = useTranslation()
  const [serviceData, setServiceData] = useState([
    {
      data: {
        id: 0,
        scroll_id: `test_1`,
        image: CalcImg,
        paragraph: `Հաշվապահական հաշվառում`,
        text: `Հաշվապահական հաշվառման ճշգրիտ վարումը բիզնեսի կարեւորագույն գործառույթներից է, որը օգնում է զերծ մնալ տարատեսակ ֆինանսական կորուստներից։ Հաշվապահական հաշվառումը իրականացվում է միջազգային ստանդարտներին համապատասխան՝ ՀԾ եւ 1C հաշվապահական ծրագրերի միջոցով։`,
      },
      open: false,
    },
    {
      data: {
        id: 1,
        scroll_id: "test_2",
        paragraph: "Հարկային աուդիտ",
        text:
          "Իրականացնելով հարկային աուդիտ, կստուգենք կազմված հարկային հաշվետվությունների ճշտությունը, կհայտնաբերենբք հարկային ռիսկեր պարունակող գործարքները, կօգնենք ընտրել Ձեր ընկերության համար ամենաշահեկան հարկման դաշտը եւ ճիշտ պլանավորել հարկերը՝ խուսափելով հավելյալ հարկային պարտավորություններից, տարատեսակ տույժերից եւ տուգանքներից։",
      },
      open: false,
    },
    {
      data: {
        id: 2,
        scroll_id: "test_3",
        paragraph: "Խորհրդատվություն",
        text:
          "Ձեզ հետաքրքրող հարցերի շուրջ խորհրդատվություն ստանալու համար կարողեք դիմել մեզ, եւ մենք կտրամադրենք բարձրակարգ մասնագիտական խորհրդատվություն։",
      },
      open: false,
    },
    {
      data: {
        id: 3,
        scroll_id: "test_4",
        paragraph: "Ֆիզիկական անձանց մատուցվող ծառայություններ",
        text:
          "Բիզնես գործունություն ծավալելու ամենատարածված եղանակը կազմակերպության, հիմնականում, ՍՊԸ գրանցումն է: ՍՊԸ գրանցման միջոցով բիզնես գործունություն ծավալելու նպատակահարմարությունը պայմանավորված է առաջին հերթին սահմանափակ պատասխանատվություն կրելու օրենսդրական հնարավորությամբ: Մեր մասնագետները կօգնեն Ձեր կազմակերությանը հանդես գալ իր անունից, ունենալ սեփականության իրավունքով իրեն ամրակցված գույք և պատասխանատվություն կրել միայն այդ գույքի համար: Պետական գրանցում ստանալու պահից Ձեր կազմակերությունը ձեռք կբերի իրավունքներ և կստանձնի պարտականություններ:",
      },
      open: false,
    },
    {
      data: {
        id: 4,
        scroll_id: "test_5",
        paragraph: "Մաքսային գոծարքներ",
        text:
          "Դիմեք մեզ ապրանքների ներմուծման եւ արտահանման գործարքների համար անհրաժեշտ հարկային եւ մաքսային փաստաթղթերի կազմման եւ համապատասխան պետական մարմիններ ներկայացման համար։",
      },
      open: false,
    },
    {
      data: {
        id: 5,
        scroll_id: "test_6",
        paragraph: "Կադրային աշխատանք",
        text:
          "Մենք կհեշտացնենք Ձեր կազմակերպության աշխատանքը՝ ամբողջությամբ մեզվրա վերցնելով կադրային աշխատանքի վարումը: Մենք առաջարկում ենք հետեւյալ ծառայությունները ՝ աշխատանքային եւ ծառայությունների մատուցման պայմանագրերի, ինչպես նաեւ համաձայնագրերի կազմում, գործատուի ներքին եւ անհատական իրավական ակտերի կազմում, աշխատաժամանակի եւ աշխատավարձի հաշվարկում, տեղեկագրերի կազմում,եկամտային հարկի եւ սոցիալական վճարի անձնավորված հաշվառում։",
      },
      open: false,
    },
    {
      data: {
        id: 6,
        scroll_id: "test_7",
        paragraph: "Պետական և Միջազգային գնումներ",
        text:
          "Մենք կհեշտացնենք Ձեր կազմակերպության աշխատանքը՝ ամբողջությամբ մեզվրա վերցնելով կադրային աշխատանքի վարումը: Մենք առաջարկում ենք հետեւյալ ծառայությունները ՝ աշխատանքային եւ ծառայությունների մատուցման պայմանագրերի, ինչպես նաեւ համաձայնագրերի կազմում, գործատուի ներքին եւ անհատական իրավական ակտերի կազմում, աշխատաժամանակի եւ աշխատավարձի հաշվարկում, տեղեկագրերի կազմում,եկամտային հարկի եւ սոցիալական վճարի անձնավորված հաշվառում։",
      },
      open: false,
    },
  ])
  const getSharedTitle = lng => {
    if (lng === "en") {
      return "Services"
    } else if (lng === "ru") {
      return "Сервисы"
    } else {
      return "Ծառայություններ"
    }
  }
  let urlShared

  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/services/"
    } else if (lng === "ru") {
      return "http://triple-c.algorithm.am/ru/services"
    } else {
      return "http://triple-c.algorithm.am/arm/services/"
    }
  }


  useEffect(() => {
    // gets Translated texts from Json static files and set it to Locale state
    let serviceTransText = pageContext.localeResources.translation.services
    let images = [CalcImg, TaxImg, ClientImg, BrowserImg, LawImg, UserImg, TeamImg]
    serviceTransText.contentData.map((obj, index) => {
      setServiceData([
        ...serviceData,
        (serviceData[index].data = {
          id: index,
          scroll_id: `${obj.scroll_id}`,
          image: images[index],
          paragraph: `${obj.paragraph}`,
          text: `${obj.text}`,
        }),
      ])

        serviceData.map((scroll_element)=>{
          if ('#'+scroll_element.data.scroll_id === location.hash){
            scroll_element.open = true
          }
        })

    })
    toggleFromHomePage(location.state)
  }, [t]);

  const toggle = current => {
    const data = serviceData.map(d =>
       d.data.id === current.data.id && d.open === false
        ? { ...d, open: true }
        : d.data.id !== current.data.id && d.open === true
          ? { ...d, open: false }
          : { ...d, open: false }
    )
    console.log(current)
    setServiceData(data)
  }

  const toggleFromHomePage = state => {
    state === null ? (state = 0) : state
    const data = serviceData.map(d =>
      d.data.id === state.clickedItems ? { ...d, open: true } : { ...d }
    )
    setServiceData(data)
  }

  const hookComponent = () => {
    urlShared = getSharedUrl(pageContext.locale)
  }
  hookComponent()

  return (
    <SevicePageWrapper>
      <SEO
        title={services.title}
        description={services.paragraph}
        pageContext={pageContext} />
      <HeadingParagraphRow>
          <H2Styled>{services.title}</H2Styled>
          <PStyled>{services.paragraph}</PStyled>
      </HeadingParagraphRow>

      {serviceData.map((d, id) => (
        <ServiceDropWrap showServiceForm={toggle} data={d} key={id} />
      ))}

    </SevicePageWrapper>
  )
}
export default Services
