import React, { useState, useEffect, useRef } from "react"
import Layout from "../components/layout"
import { Col } from "antd"
import { apiHelper } from "../helpers/apiHelper"
import ServiceDropWrap from "../components/servicecomponents/serviceDrop/servicedrop"
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
import { useTranslation } from "react-i18next"
const Services = ({ location, ...props }) => {
  const { t, i18n } = useTranslation()
  const [servicedata, setservicedata] = useState([
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
        name_arm: "string",
        name_ru: "string",
        name_en: "string",
      },
      open: false,
    },
    // {
    //
    //   data: {
    //     id: 2,
    //     image: AuditImg,
    //     paragraph: 'Հարկային աուդիտ',
    //     text:
    //       'Իրականացնելով հարկային աուդիտ, կստուգենք կազմված հարկային հաշվետվությունների ճշտությունը, կհայտնաբերենբք հարկային ռիսկեր պարունակող գործարքները, կօգնենք ընտրել Ձեր ընկերության համար ամենաշահեկան հարկման դաշտը եւ ճիշտ պլանավորել հարկերը՝ խուսափելով հավելյալ հարկային պարտավորություններից, տարատեսակ տույժերից եւ տուգանքներից։',
    //     name_arm: 'string',
    //     name_ru: 'string',
    //     name_en: 'string',
    //   },
    //   open: false,
    // },
    {
      data: {
        id: 2,
        image: ClientImg,
        paragraph: "Խորհրդատվություն",
        text:
          "Ձեզ հետաքրքրող հարցերի շուրջ խորհրդատվություն ստանալու համար կարողեք դիմել մեզ, եւ մենք կտրամադրենք բարձրակարգ մասնագիտական խորհրդատվություն։",
        name_arm: "string",
        name_ru: "string",
        name_en: "string",
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
        name_arm: "string",
        name_ru: "string",
        name_en: "string",
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
        name_arm: "string",
        name_ru: "string",
        name_en: "string",
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
        name_arm: "string",
        name_ru: "string",
        name_en: "string",
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
        name_arm: "string",
        name_ru: "string",
        name_en: "string",
      },
      open: false,
    },
  ])
  const [Apistate, setApistate] = useState([])
  const [titleHelmet, setTitleHelmet] = useState("Ծառայություններ")

  //this function gets Api data from swagger endpoints
  // const getServiceData = async () => {
  //   try {
  //     let res = await apiHelper.get("/api/service").then(
  //       res => {
  //         setApistate(res.data.data)
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
    console.log(lng)
    if (lng === "en") {
      return "http://triple-c.algorithm.am/services/?lng=en"
    } else if (lng === "ru") {
      return "http://triple-c.algorithm.am/services/?lng=ru"
    } else {
      return "http://triple-c.algorithm.am/services/?lng=arm"
    }
  }
  const getSharedTitle = lng => {
    console.log(lng)
    if (lng === "en") {
      return "Services"
    } else if (lng === "ru") {
      return "Сервисы"
    } else {
      return "Ծառայություններ"
    }
  }

  useEffect(() => {
    // getServiceData()
    setservicedata([
      ...servicedata,
      (servicedata[0].data = {
        id: 0,
        image: CalcImg,
        paragraph: `${t("services.Firstdata.paragraph")}`,
        text: `${t("services.Firstdata.text")}`,
      }),
    ])
    setTitleHelmet(`${t("services.Firstdata.paragraph")}`)
    if (location.state !== null && location.state.clickedItems >= 2) {
      setTimeout(function () {
        window.scrollTo(0, 500)
      }, 2)
    }
    toggleFromHomePage(location.state)
  }, [t])
  const toggle = current => {
    setTitleHelmet(current.data.paragraph)
    const data = servicedata.map(d =>
      d.data.id === current.data.id && d.open === false
        ? { ...d, open: true }
        : d.data.id !== current.data.id && d.open === true
          ? { ...d, open: false }
          : { ...d, open: false }
    )
    setservicedata(data)
  }
  const toggleFromHomePage = state => {
    state === null ? (state = 0) : state
    const data = servicedata.map(d =>
      d.data.id === state.clickedItems ? { ...d, open: true } : { ...d }
    )
    setservicedata(data)
  }
  return (
    <>
      <Helmet
        defer={false}
        onChangeClientState={newState => console.log(newState)}
      >
        <meta charSet="utf-8" />
        <title>{t("services.title")}</title>
        <meta property="og:title" content={t("services.title")} />
        {/* <meta http-equiv="cache -control" content="no-cache" /> */}
        <meta
          property="og:description"
          content={
            "Թրիփլ Քոնսալթինգի կողմից մատուցվող հաշվապահական համալիր ծառայությունների միջոցով մոռացեք հաշվապահական հաշվառման հետկապած խնդիրների մասին"
          }
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="http://triple-c.algorithm.am/services/?lng=en" />
        <html lang={i18n.language} amp />
      </Helmet>
      <HeadingParagraphRow>
        <Col
          xs={{ span: 24, offset: 0 }}
          lg={{ span: 22, offset: 2 }}
          xl={{ span: 24, offset: 2 }}
          xxl={{ span: 18, offset: 4 }}
        >
          <h1>{t("services.title")}</h1>
          <PStyled>{t("services.paragraph")}</PStyled>
        </Col>
      </HeadingParagraphRow>
      {servicedata.map((d, id) => (
        <ServiceDropWrap showServiceForm={toggle} data={d} key={id} />
      ))}
      <SharedWrapperCol span={5} offset={3}>
        <ShareLabel>Կիսվել</ShareLabel>
        <FacebookShareButton
          url={getSharedUrl(i18n.language)}
          children={<FacebookIcon />}
        />
        <LinkedinShareButton
          children={<LinkdinIcon />}
          url="http://triple-c.algorithm.am/services/?lng=en"
        />
      </SharedWrapperCol>
    </>
  )
}
export default Services
