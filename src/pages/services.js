import React, { useState, useEffect, useRef, Suspense } from "react"
import Layout from "../components/layout"
import useTranslations from "../components/useTranslations"
import { Col } from "antd"
import { apiHelper } from "../helpers/apiHelper"
import ServiceDropWrap from "../components/servicecomponents/serviceDrop/servicedrop"
import MainLogo from "../assets/homeImages/3c.png"
import CalcImg from "../assets/homeImages/icons/calculator.svg"
import TaxImg from "../assets/homeImages/icons/tax.svg"
import AuditImg from "../assets/homeImages/icons/audit.svg"
import ClientImg from "../assets/homeImages/icons/client.svg"
import BrowserImg from "../assets/homeImages/icons/browser.svg"
import UserImg from "../assets/homeImages/icons/user.svg"
import LawImg from "../assets/homeImages/icons/law.svg"
import TeamImg from "../assets/homeImages/icons/teamwork.svg"
import {
  HeadingParagraphRow,
  H2Styled,
  PStyled,
  SharedWrapperCol,
  FaceLink,
  ShareLabel,
  LinkedinLink,
  FacebookIcon,
  LinkdinIcon,
} from "../components/servicecomponents/serviceMainStyle"
import { FacebookShareButton, LinkedinShareButton } from "react-share"
import Helmet from "react-helmet"
import i18next from "i18next"
import { useTranslation, Translation } from "react-i18next"
import SEO from "../components/seo"

const Services = ({ location, pageContext, originalPath }) => {
  const { services } = useTranslations();
  const { t, i18n } = useTranslation()
  const [serviceData, setServiceData] = useState([
    {
      data: {
        id: 0,
        image: CalcImg,
        paragraph: `Հաշվապահական հաշվառում`,
        text: `Հաշվապահական հաշվառման ճշգրիտ վարումը`,
      },
      open: false,
    },
    {
      data: {
        id: 1,
        image: TaxImg,
        paragraph: "Հարկային աուդիտ եւ հաշվառում",
        text:
          "Իրականացնելով հարկային աուդիտ, կստուգենք կազմված հարկային հաշվետվությունների ճշտությունը, կհայտնաբերենբք հարկային ռիսկեր պարունակող գործարքները, կօգնենք ընտրել Ձեր ընկերության համար ամենաշահեկան հարկման դաշտը եւ ճիշտ պլանավորել հարկերը՝ խուսափելով հավելյալ հարկային պարտավորություններից, տարատեսակ տույժերից եւ տուգանքներից։",
      },
      open: false,
    },
    {
      data: {
        id: 2,
        image: ClientImg,
        paragraph: "Խորհրդատվություն",
        text:
          "Ձեզ հետաքրքրող հարցերի շուրջ խորհրդատվություն ստանալու համար կարողեք դիմել մեզ, եւ մենք կտրամադրենք բարձրակարգ մասնագիտական խորհրդատվություն։",
      },
      open: false,
    },
    {
      data: {
        id: 3,
        image: BrowserImg,
        paragraph: "Կազմակերպության գրանցում",
        text:
          "Բիզնես գործունություն ծավալելու ամենատարածված եղանակը կազմակերպության, հիմնականում, ՍՊԸ գրանցումն է: ՍՊԸ գրանցման միջոցով բիզնես գործունություն ծավալելու նպատակահարմարությունը պայմանավորված է առաջին հերթին սահմանափակ պատասխանատվություն կրելու օրենսդրական հնարավորությամբ: Մեր մասնագետները կօգնեն Ձեր կազմակերությանը հանդես գալ իր անունից, ունենալ սեփականության իրավունքով իրեն ամրակցված գույք և պատասխանատվություն  կրել միայն այդ գույքի համար: Պետական գրանցում ստանալու պահից  Ձեր  կազմակերությունը ձեռք  կբերի իրավունքներ և կստանձնի պարտականություններ:",
      },
      open: false,
    },
    {
      data: {
        id: 4,
        image: LawImg,
        paragraph: "Ֆիզիկական անձինք",
        text:
          "Ըստ հարկային օրենսգրքի՝ ֆիզիկական անձանց կողմից կատարված որոշակի գործարքների արդյունքում առաջանում են հարկային պարտավորություններ, որոնց համար պետք է ներկայացվեն համապատասխան հաշվետվություններ։ Առաջարկում ենք հաշվետվությունների կազմման եւ հարկային մարմին ներկայացման ծառայություններ։",
      },
      open: false,
    },
    {
      data: {
        id: 5,
        image: UserImg,
        paragraph: "Մաքսային գործարքներ",
        text:
          "Դիմեք մեզ ապրանքների ներմուծման եւ արտահանման գործարքների համար անհրաժեշտ հարկային եւ մաքսային փաստաթղթերի կազմման եւ համապատասխան պետական մարմիններ ներկայացման համար։",
      },
      open: false,
    },
    {
      data: {
        id: 6,
        image: TeamImg,
        paragraph: "Կադրային Աշխատանք",
        text:
          "Մենք կհեշտացնենք Ձեր կազմակերպության աշխատանքը՝ ամբողջությամբ մեզվրա վերցնելով կադրային աշխատանքի վարումը: Մենք առաջարկում ենք հետեւյալ ծառայությունները ՝ աշխատանքային եւ ծառայությունների մատուցման պայմանագրերի, ինչպես նաեւ համաձայնագրերի կազմում, գործատուի ներքին եւ անհատական իրավական ակտերի կազմում, աշխատաժամանակի եւ աշխատավարձի հաշվարկում, տեղեկագրերի կազմում,եկամտային հարկի եւ սոցիալական վճարի անձնավորված հաշվառում։",
      },
      open: false,
    },
  ])
  const [ApiState, setApiState] = useState([])
  const [titleHelmet, setTitleHelmet] = useState("Ծառայություններ")

  //this function gets Api data from swagger endpoints
  // const getServiceData = async () => {
  //   try {
  //     let res = await apiHelper.get("/api/service").then(
  //       res => {
  //         setApiState(res.data.data)
  //       },
  //       reject => {
  //         console.log(reject.response)
  //       }
  //     )
  //   } catch (e) {
  //     console.log("Calculation error: ", e)
  //   }
  // }

  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/services/"
    } else if (lng === "ru") {
      return "http://triple-c.algorithm.am/ru/services"
    } else {
      return "http://triple-c.algorithm.am/arm/services/"
    }
  }
  const getSharedTitle = lng => {
    if (lng === "en") {
      return "Services"
    } else if (lng === "ru") {
      return "Сервисы"
    } else {
      return "Ծառայություններ"
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
          image: images[index],
          paragraph: `${obj.paragraph}`,
          text: `${obj.text}`,
        }),
      ])
    })
    if (location.state !== null && location.state.clickedItems >= 2) {
      setTimeout(function () {
        window.scrollTo(0, 500)
      }, 2)
    }
    toggleFromHomePage(location.state)
  }, [t])

  const toggle = current => {
    setTitleHelmet(current.data.paragraph)
    const data = serviceData.map(d =>
      d.data.id === current.data.id && d.open === false
        ? { ...d, open: true }
        : d.data.id !== current.data.id && d.open === true
          ? { ...d, open: false }
          : { ...d, open: false }
    )
    setServiceData(data)
  }

  const toggleFromHomePage = state => {
    state === null ? (state = 0) : state
    const data = serviceData.map(d =>
      d.data.id === state.clickedItems ? { ...d, open: true } : { ...d }
    )
    setServiceData(data)
  }

  let urlShared
  let title
  const hookComponent = () => {
    urlShared = getSharedUrl(pageContext.locale)
    // title = getSharedTitle(i18n.language)
  }
  hookComponent()

  return (
    <>
      {/* <Helmet
        defer={false}
        onChangeClientState={newState => console.log(newState)}
      >
        <html lang={i18n.language} amp />
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta http-equiv="cache -control" content="no-cache" />
        <meta
          property="og:description"
          content={
            "Թրիփլ Քոնսալթինգի կողմից մատուցվող հաշվապահական համալիր ծառայությունների միջոցով մոռացեք հաշվապահական հաշվառման հետկապած խնդիրների մասին"
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={urlShared} />
        <link rel="canonical" href={urlShared} />
      </Helmet> */}

      <SEO
        title={services.title}
        description={services.paragraph}
        pageContext={pageContext} />
      <HeadingParagraphRow>
        <Col
          xs={{ span: 24, offset: 0 }}
          lg={{ span: 22, offset: 2 }}
          xl={{ span: 24, offset: 2 }}
          xxl={{ span: 18, offset: 4 }}
        >
          <H2Styled>{services.title}</H2Styled>
          <PStyled>{services.paragraph}</PStyled>
        </Col>
      </HeadingParagraphRow>
      {serviceData.map((d, id) => (
        <ServiceDropWrap showServiceForm={toggle} data={d} key={id} />
      ))}
      <SharedWrapperCol span={5} offset={3}>
        <ShareLabel>{services.share}</ShareLabel>
        <FacebookShareButton url={urlShared} children={<FacebookIcon />} />
        <LinkedinShareButton
          children={<LinkdinIcon />}
          url={urlShared}
        />
      </SharedWrapperCol>
    </>
  )
}
export default Services
