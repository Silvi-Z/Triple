import SEO from "../components/seo"
import { useTranslation } from "react-i18next"
import React, { useState, useEffect } from "react"
import useTranslations from "../components/useTranslations"
import LawImg from "../assets/homeImages/icons/law.svg"
import TaxImg from "../assets/homeImages/icons/tax.svg"
import UserImg from "../assets/homeImages/icons/user.svg"
import TeamImg from "../assets/homeImages/icons/teamwork.svg"
import ClientImg from "../assets/homeImages/icons/client.svg"
import CalcImg from "../assets/homeImages/icons/calculator.svg"
import BrowserImg from "../assets/homeImages/icons/browser.svg"
import ServiceDropWrap from "../components/servicecomponents/serviceDrop/servicedrop"
import {
  PStyled,
  H2Styled,
  ServicePageWrapper,
  HeadingParagraphRow,
} from "../components/servicecomponents/serviceMainStyle"

const Services = ({ location, pageContext }) => {
  const { services } = useTranslations()
  const { t, i18n } = useTranslation()
  const [serviceData, setserviceData] = useState([
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
          "Մրցույթի մասնակից կազմակերպություններին Թրիփլ Քոնսալթինգի մասնագետները կաջակցեն էլեկտրոնային գնումների՝ ինչպես ARMEPS, այնպես էլ այլ էլեկտրոնային հարթակներում հայտարարված տեղական և միջազգային ֆինանսավորմամբ մրցույթներին մասնակցելու գործընթացում՝ ապահովելով գնումներին վերաբերվող ողջ փաստաթղթաշրջանառությունը։",
      },
      open: false,
    },
    {
      data: {
        id: 7,
        scroll_id: "test_8",
        paragraph: "Բիզնեսի ավտոմատացում",
        text:
          "Բիզնեսի ավտոմատացումը 21-րդ դարի  բիզնեսի կառավարման կարևորագույն մարտահրավերներից է, որը անասելի առավելություններ է տալիս՝ ավտոմատացված կառավարման համակարգերի ճիշտ և գրագետ ներդրման դեպքում: Թրիփլ Քոնսալթինգի մասնագետները, լիարժեք ուսումնասիրելով Ձեր բիզնեսի, կառավարչական հաշվառման առանձնահատկությունները, ինչպես նաև ներքին համակարգերն ու պրոցեսները, կնախագծեն և մշակեն ծրագրային փաթեթներ (վեբ ծրագրեր, համակարգչային հավելվածներ և մշակված ու տվյալ գործունեությանը ադապտացված EXCEL ֆորմատի էլեկտրոնային փաստաթղթեր)։ Մշակնած գործիքները  հնարավորություն կտան կրճատել գործառնական ծախսերը, արագացնել և օտիմալացնել բիզնես գործընթացները և պրոցեսները, ինչպես նաև նվազեցնել ռիսկերը ու բարելավել ընդհանուր կառավարման համակարգը։",
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
    let serviceTransText = pageContext.localeResources.translation.services
    let images = [CalcImg, TaxImg, ClientImg, BrowserImg, LawImg, UserImg, TeamImg]
    serviceTransText.contentData.map((obj, index) => {
      setserviceData([
        ...serviceData,
        (serviceData[index].data = {
          id: index,
          scroll_id: `${obj.scroll_id}`,
          image: images[index],
          paragraph: `${obj.paragraph}`,
          text: `${obj.text}`,
        }),
      ])
    })
    toggleFromHomePage(location.state)
  }, [t])

  const toggle = current => {
    const data = serviceData.map(d => {
      if (d.data.id === current.data.id && d.open === false) {
        location.hash ='#'+current.data.scroll_id
        return { ...d, open: true }
      }
      return { ...d, open: false }
    })
    setserviceData(data)
  }
  useEffect(() => {
    if (location.hash && typeof window !== `undefined`){
      window.addEventListener("scroll", handleScroll);
    }
  }, [])

  function handleScroll() {
    const hash = location.hash;
    const serviceDataNew = [...serviceData];
    if (hash && typeof window !== `undefined`){
      const foundIndex = serviceDataNew.findIndex(el => "#" + el.data.scroll_id === hash)
      const foundElement = serviceDataNew[foundIndex];
      const distance = document.getElementById(foundElement.data.scroll_id) && document.getElementById(foundElement.data.scroll_id).getBoundingClientRect()
      const bodyScrollPart = window.scrollY
      const windowHeight = window.outerHeight
      const bodyHeight = document.documentElement.scrollHeight
      if (foundIndex > -1 && distance.top < 1 || bodyScrollPart + windowHeight >= bodyHeight) {
        serviceDataNew[foundIndex] = {
          ...foundElement,
          open: true
        };
        setserviceData(serviceDataNew)
      }
      serviceDataNew.map(elem=>{
       if (elem.open===true){
         window.removeEventListener("scroll", handleScroll)
       }
      })
    }
  }


  const toggleFromHomePage = state => {
    state === null ? (state = 0) : state
    const data = serviceData.map(d =>
      d.data.id === state.clickedItems ? { ...d, open: true } : { ...d },
    )
    setserviceData(data)
  }

  const hookComponent = () => {
    urlShared = getSharedUrl(pageContext.locale)
  }
  hookComponent()

  return (
    <ServicePageWrapper>
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
    </ServicePageWrapper>
  )
}

export default Services
