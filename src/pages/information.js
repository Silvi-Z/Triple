/*eslint-disable */
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { Col } from "antd"
import InformNews from "../components/informationcomponents/News/informnews"
import InformUseFul from "../components/informationcomponents/useFullInform/usefulinformation"
import InformDocTemplate from "../components/informationcomponents/documentTemplate/doctemplateinform"
import Img1 from "../assets/informimages/hdm.jpg"
import Img2 from "../assets/informimages/water.jpg"
import Img3 from "../assets/informimages/drosh.jpg"
import News1 from "../components/informationcomponents/News/secondNews/secondnewspage"
import {
  InformationParagraphRow,
  H2Styled,
  PStyled,
  InformationNavRow,
  InformationUsfulCol,
  InformationDocumentCol,
  InformSectionRow,
  InformationNewsCol
} from "../components/informationcomponents/informMainStyle"
const Information = () => {
  const [dataNewsInfo, setDataNewsinfo] = useState([])
  // const [openSecondNews, setopenSecondNews] = useState(false)
  const [dataUseInfo, setdataUseInfo] = useState([])
  const [dataDoctempInfo, setdataDoctempInfo] = useState([])
  const [openNews, setOpenNews] = useState(true)
  const [openUseful, setOpenUseful] = useState(false)
  const [openDocTemp, setOpenDocTemp] = useState(false)

  const GetNewsInfo = () => {
    setDataNewsinfo([
      {
        id: 1,
        paragraph:
          "Պետական եկամուտների կոմիտեն տեղեկացնում է, որ Հայաստանի Հանրապետությունում առկա իրավիճակով պայմանավորված՝ «Հսկիչ-դրամարկղային մեքենաների ներդրման գրասենյակ» ՊՈԱԿ-ը 2020թ. մարտի 24-ից դադարեցնում է թղթային տարբերակով դիմումների և գրությունների ընդունումը։",
        heading: "ՀԴՄ ներդրման գրասենյակը",
        Imgurl: Img1,
      },
      {
        id: 2,
        paragraph:
          "Կառավարությունը 2016 թվականի ապրիլի 28-ի N 429 - Ն որոշմամբ ուժը կորցրած է ճանաչել  2014 թվականի սեպտեմբերի 4-ի N 980-Ն որոշումը, ինչի արդյունքում օրենքով սահմանված դրույթներին համապատասխան պիտանելիության ժամկետը լրացած, սահմանված կարգով դուրս գրված ապրանքների դրոշմապիտակների գծով պարտավորություններ չեն հաշվարկվի:",
        heading: "Պիտանելիության ժամկետը լրացած",
        Imgurl: Img2,
      },
      {
        id: 3,
        paragraph:
          "2016 թվականի ապրիլի 28-ի 413-Ն որոշմամաբ առաջարկվում է նոր սերնդի ՀԴՄ-ների ներ Հիշեցնենք, որ ըստ կառավարության 2013թ. սեպտեմբերի 5-ի որոշման ս.թ մայիսի 1-ից նոր սերնդի ՀԴՄ-ների ներդրումը պարտադիր է 2014թ. արդյունքներով 10.0 մլն դրամից մինչև 58.35 մլն դրամ կամ 2015թ. արդյունքներով 10.0 մլն դրամից մինչև 115.0 մլն դրամ իրացումից հասույթ ունեցող հարկ վճարողների համար:",
        heading: "Նոր սերնդի ՀԴՄ-ների ներդրման ժամկետը նորից հետաձգվել է",
        Imgurl: Img3,
      },
    ])
  }
  const GetUseInfo = () => {
    setdataUseInfo([
      {
        status: true,
        data: {
          id: 0,
          title_arm: "string",
          title_ru: "string",
          title_en: "string",
          url: "string",
          status: true,
          order: 0,
          first_heading: "www.petekamutner.am",
          href: "https://www.petekamutner.am/",
          links: [
            {
              id: 1,
              label: "Բեռնել e-invoicing ծրագիրը",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
            },
            {
              id: 2,
              label:
                "Հարկային հաշվետվությունների և վճարումների վերջնաժամկետները",
              link: "https://www.petekamutner.am/tsOS_TaxCalendar.aspx",
            },
            {
              id: 3,
              label: "Հարկերի վճարման հաշվեհամարների համառոտ ցանկը",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTITaxFeesBankAccounts",
            },
            {
              id: 4,
              label: "ՊԵԿ-ի կողմից նախատեսվող ստուգումների պլանը",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 5,
              label: "Տնտեսական գործունեության տեսակների դասակարգիչներ",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 6,
              label: "Փնտրել հարկ վճարողներին ըստ իրենց անվանման  կամ ՀՎՀՀ-ի",
              link: "https://www.petekamutner.am/tsOS_Taxpayers.aspx",
            },
          ],
        },
      },
      {
        status: true,
        data: {
          id: 1,
          title_arm: "string",
          title_ru: "string",
          title_en: "string",
          url: "string",
          status: true,
          order: 0,
          first_heading: "www.parliament.am",
          href: "http://www.parliament.am/",
          links: [
            {
              id: 1,
              label:
                "ՀՀ օրենքները և դրանց փոփոխությունները, ինչպես նաև նախագծեր/ամբողջությամբ ընդունվածներ բաժնում ամբողջությամբ ընդունված նախաձեռնությունները: ",
              link: "http://www.parliament.am/drafts.php?sel=approved&lang=arm",
            },
          ],
        },
      },
      {
        status: true,
        data: {
          id: 2,
          title_arm: "string",
          title_ru: "string",
          title_en: "string",
          url: "string",
          status: true,
          order: 0,
          first_heading: "www.arlis.am",
          href: "https://www.arlis.am/",
          links: [
            {
              id: 1,
              label:
                "ՀՀ աշխատանքային , քաղաքացիական, վարչական իրավախախտումների վերաբերյալ, մաքսային և մի շարք այլ օրենսգրքեր, ինչպես նաև ՀՀ օրենքներ, որոշումներ, պարզաբանումներ:",
              link: "https://www.arlis.am/",
            },
          ],
        },
      },
      {
        status: true,
        data: {
          id: 3,
          title_arm: "string",
          title_ru: "string",
          title_en: "string",
          url: "string",
          status: true,
          order: 0,
          first_heading: "www.e-gov.am",
          href: "https://www.e-gov.am/",
          links: [
            {
              id: 1,
              label:
                "Այս կայքում դուք կարող եք գտնել կառավարության ընդունած վերջին որոշումները, ինչպես նաև որոշումների արխիվը:",
              link: "https://www.e-register.am/am/",
            },
          ],
        },
      },
    ])
  }
  const GetDoctempInfo = () => {
    setdataDoctempInfo([
      {
        status: true,
        data: {
          id: 0,
          title_arm: "string",
          title_ru: "string",
          title_en: "string",
          url: "string",
          status: true,
          order: 0,
          first_heading: "Փաստաթղթերի ձևանմուշներ",
          second_heading: "Այս կայքում դուք կարող եք գտնել",
          links: [
            {
              id: 1,
              label: "Աշխատաժամանակի հաշվարկի տեղեկագիր",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 2,
              label: "Արձանագրություն ընկերության մասնակիցների փոփոխության",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
            },
            {
              id: 3,
              label: "Բեռնատար ավտոմեքենայի երթուղային թերթ",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
            },
            {
              id: 4,
              label: "Գործուղման վկայական",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 5,
              label:
                "Դրամարկղի ելքի օրդեր  (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
            },
            {
              id: 6,
              label:
                "Դրամարկղի մուտքի օրդեր  (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link: "https://www.petekamutner.am/tsOS_Taxpayers.aspx",
            },
            {
              id: 7,
              label: "Ծառայությունների մատուցման պայմանագիր",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 8,
              label: "Լիազորագիր",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 9,
              label:
                "Հարկ վճարողների կողմից տեղեկություններ փակցնելու հայտարարության օրինակելի ձև",
              link: "ynkerutyan-texekutyunneri-pakcman-dzev (1).txt",
            },
            {
              id: 10,
              label:
                "Հաշիվ ապրանքագիր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTITaxFeesBankAccounts",
            },
            {
              id: 11,
              label: "Հարկային հաշիվը անվավեր ճանաչելու  ակտ",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 12,
              label: "Հիմնադրի որոշում",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 13,
              label: "Հայտարարություն գործունեության դադարեցման",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 14,
              label:
                "Վճարման հանձնարարագիր  (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 15,
              label: "Մարդատար ավտոմեքենայի երթուղային թերթ",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 16,
              label: "Որոշում ընկերության միակ մասնակցի փոփոխության",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 17,
              label: "Պարունակության թերթիկ",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 18,
              label:
                "Վճարային տեղեկագիր   (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
            },
            {
              id: 19,
              label: "Տեղեկանք աշխատանքի վայրից (հայերեն)",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 20,
              label: "Տեղեկանք աշխատանքի վայրից (անգլերեն)",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
            },
            {
              id: 21,
              label:
                "ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ Էլեկտրոնային փոստով վիճակագրական փաստաթղթերի ներկայացման",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
          ],
        },
      },
    ])
  }
  useEffect(() => {
    GetNewsInfo()
    GetUseInfo()
    GetDoctempInfo()
  }, [])

  const ChangePageNews = () => {
    setOpenNews(true)
    setOpenUseful(false)
    setOpenDocTemp(false)
  }
  const ChangePageUse = () => {
    setOpenUseful(true)
    setOpenNews(false)
    setOpenDocTemp(false)
    // setopenSecondNews(false)
  }
  const ChangePageDoc = () => {
    setOpenDocTemp(true)
    setOpenUseful(false)
    setOpenNews(false)
    // setopenSecondNews(false)
  }


  //this function for second news page
  // const openPage = () => {
  //   setOpenDocTemp(false)
  //   setOpenUseful(false)
  //   setOpenNews(false)
  //   setopenSecondNews(true)
  // }

  return (
    <Layout>
      <InformationParagraphRow>
        <Col lg={{ span: 24 }}>
          <H2Styled>Օգտակար տեղեկություններ</H2Styled>
          <PStyled>
            Մեր ընկերությունն իր պարտքն է համարում կիսվել իր հաճախորդների հետ այն օգտակար տեղեկատվությամբ, որին տիրապետում է՝ այդպիսով իր լուման ներդնելով հաճախորդների տեղեկացված և պատրաստված լինելու կարևոր գործառույթին։
          </PStyled>
        </Col>
      </InformationParagraphRow>
      <InformationNavRow>
        <InformationNewsCol
          onClick={ChangePageNews}
          open={openNews}
          xs={24}
        // opensecondnews={openSecondNews.toString()}
        >
          <span>Նորություններ</span>
        </InformationNewsCol>
        <InformationUsfulCol
          offset={0}
          onClick={ChangePageUse}
          open={openUseful}
          xs={24}
        >
          <span>Օգտակար տեղեկություններ</span>
        </InformationUsfulCol>
        <InformationDocumentCol
          offset={0}
          onClick={ChangePageDoc}
          open={openDocTemp}
          xs={24}
        >
          <span>Փաստաթղթերի ձևանմուշներ</span>
        </InformationDocumentCol>
      </InformationNavRow>
      {openUseful ? (
        <InformSectionRow>
          {dataUseInfo.map((d, id) => (
            <InformUseFul usedata={d} key={id} />
          ))}
        </InformSectionRow>
      ) : openDocTemp ? (
        <InformSectionRow>
          {dataDoctempInfo.map((d, id) => (
            <InformDocTemplate usedata={d} key={id} />
          ))}
        </InformSectionRow>
      ) : openNews ? (
        <InformSectionRow>
          {dataNewsInfo.map((d, id) => (
            <InformNews data={d} key={id} />
          ))}
        </InformSectionRow>
      ) : null}
    </Layout>
  )
}

export default Information
