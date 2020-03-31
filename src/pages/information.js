import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { Typography, Row, Col, Button, InputNumber } from "antd"
import InformNews from "../components/informationcomponents/informnews"
import InformUseFul from "../components/informationcomponents/usefulinformation"
import InformDocTemplate from "../components/informationcomponents/doctemplateinform"
import Img1 from "../assets/informimages/src6821.jpg"
import Img2 from "../assets/informimages/water.jpg"
import Img3 from "../assets/informimages/drosh.jpg"
import News1 from "../components/informationcomponents/secondnewspage"

const InformationParagraphRow = styled(Row)`
  padding: 0 13.5%;
  margin-bottom: 2.8%;
`
const H2Styled = styled.h2`
  width: 244px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`
const PStyled = styled.p`
  width: 769px;
  height: 76px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`
const InformationNavRow = styled(Row)`
  padding: 0 16%;
  margin-bottom: 3%;
`
const InformationNewsCol = styled(Col)`
  max-width: 232px;
  height: 50px;
  text-align: center;
  padding-top: 2%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  > span {
    width: 105px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #009db8;
  }
  &:hover {
    background-color: #009db8;
    cursor: pointer;
    span {
      color: white;
    }
  }
`
const InformationUsfulCol = styled(Col)`
  max-width: 232px;
  height: 50px;
  text-align: center;
  padding-top: 2%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-left: 0.7%;
  > span {
    width: 205px;
    height: 16px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #009db8;
  }
  &:hover {
    background-color: #009db8;
    cursor: pointer;
    span {
      color: white;
    }
  }
`
const InformationDocumentCol = styled(Col)`
  max-width: 232px;
  height: 50px;
  text-align: center;
  padding-top: 2%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-left: 0.7%;
  > span {
    width: 214px;
    height: 16px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #009db8;
  }
  &:hover {
    background-color: #009db8;
    cursor: pointer;
    span {
      color: white;
    }
  }
`
const InformSectionRow = styled(Row)`
  padding: 0 12%;
  margin-bottom: 2.8%;
`

const Information = () => {
  const [dataNewsInfo, setDataNewsinfo] = useState([])
  const [open, setopen] = useState(false)
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
          first_heading: "ՀՀ հարկային ծառայության կայք www.petekamutner.am",
          second_heading: "Այս կայքում դուք կարող եք գտնել",
          links: [
            {
              id: 1,
              label:
                " Հարկային հաշվետվությունների և վճարումների վերջնաժամկետները ",
              link: "https://www.petekamutner.am/tsOS_TaxCalendar.aspx",
            },
            {
              id: 2,
              label: "Հարկերի վճարման հաշվեհամարների համառոտ ցանկը",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTITaxFeesBankAccounts",
            },
            {
              id: 3,
              label: " Փնտրել հարկ վճարողներին ըստ իրենց անվանման  կամ ՀՎՀՀ-ի",
              link: "https://www.petekamutner.am/tsOS_Taxpayers.aspx",
            },
            {
              id: 4,
              label: "Բեռնել e-invoicing ծրագիրը",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
            },
            {
              id: 5,
              label: "Բեռնել e-invoicing ծրագիրը",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 6,
              label: " Տնտեսական գործունեության տեսակների դասակարգիչներ",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
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
          first_heading: "Ազգային ժողովի կայք www.parliament.am",
          second_heading: "Այս կայքում դուք կարող եք գտնել",
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
          second_heading: "Այս կայքում դուք կարող եք գտնել",
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
          first_heading: "Կառավարության կայք www.e-gov.am",
          second_heading: "Այս կայքում դուք կարող եք գտնել",
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
              label:
                "Հարկ վճարողների կողմից տեղեկություններ փակցնելու հայտարարության օրինակելի ձև",
              link: "ynkerutyan-texekutyunneri-pakcman-dzev (1).txt",
            },
            {
              id: 2,
              label:
                "Հաշիվ ապրանքագիր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTITaxFeesBankAccounts",
            },
            {
              id: 3,
              label:
                "Դրամարկղի մուտքի օրդեր  (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link: "https://www.petekamutner.am/tsOS_Taxpayers.aspx",
            },
            {
              id: 4,
              label:
                "Դրամարկղի ելքի օրդեր  (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
            },
            {
              id: 5,
              label:
                "Վճարման հանձնարարագիր  (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 6,
              label: "Աշխատաժամանակի հաշվարկի տեղեկագիր",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 7,
              label:
                "Վճարային տեղեկագիր   (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
            },
            {
              id: 8,
              label: "Լիազորագիր",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 9,
              label: "Տեղեկանք աշխատանքի վայրից (հայերեն)",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 10,
              label: "Տեղեկանք աշխատանքի վայրից (անգլերեն)",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
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
              label: "Գործուղման վկայական",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 14,
              label: "Մարդատար ավտոմեքենայի երթուղային թերթ",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 15,
              label: "Բեռնատար ավտոմեքենայի երթուղային թերթ",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
            },
            {
              id: 16,
              label: "Ծառայությունների մատուցման պայմանագիր",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 17,
              label: "Հայտարարություն գործունեության դադարեցման",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 18,
              label: "Պարունակության թերթիկ",
              link: "https://www.petekamutner.am/tsOS_EAClassifier.aspx",
            },
            {
              id: 19,
              label: "Արձանագրություն ընկերության մասնակիցների փոփոխության",
              link: "https://e-invoice.taxservice.am/invoice-homepage/",
            },
            {
              id: 20,
              label: "Որոշում ընկերության միակ մասնակցի փոփոխության",
              link:
                "https://www.petekamutner.am/Content.aspx?itn=tsTIVerificationsPlan",
            },
            {
              id: 21,
              label:
                "ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ Էլեկտրոնային փոստով վիճակագրական փաստաթղթերի ներկայացման ",
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
  }
  const ChangePageDoc = () => {
    setOpenDocTemp(true)
    setOpenUseful(false)
    setOpenNews(false)
  }

  const openPage = () => {
    setopen(!open)
    setOpenDocTemp(false)
    setOpenUseful(false)
    setOpenNews(false)
  }

  return (
    <Layout>
      <InformationParagraphRow>
        <Col lg={{ span: 24 }}>
          <H2Styled>Օգտակար տեղեկություններ</H2Styled>
          <PStyled>
            “Թրիփլ Քնսալթինգ” ընկերությունն իր պարտքն է համարում կիսվել իր
            հաճախորդների հետ այն տեղեկատվությամբ, որին տիրապետում է,այդպիսով իր
            լուման ներդնելով հաճախորդների տեղեկացված և պատրաստված լինելու կարևոր
            գործառույթին։
          </PStyled>
        </Col>
      </InformationParagraphRow>
      <InformationNavRow>
        <InformationNewsCol onClick={ChangePageNews}>
          <span>Նորություններ</span>
        </InformationNewsCol>
        <InformationUsfulCol offset={1.5} onClick={ChangePageUse}>
          <span>Օգտակար տեղեկություններ</span>
        </InformationUsfulCol>
        <InformationDocumentCol offset={1.5} onClick={ChangePageDoc}>
          <span>Փաստաթղթերի ձևանմուշներ</span>
        </InformationDocumentCol>
      </InformationNavRow>
      {openUseful ? (
        <InformSectionRow>
          {dataUseInfo.map(d => (
            <InformUseFul usedata={d} key={d.id}></InformUseFul>
          ))}
        </InformSectionRow>
      ) : openDocTemp ? (
        <InformSectionRow>
          {dataDoctempInfo.map(d => (
            <InformDocTemplate usedata={d} key={d.id} />
          ))}
        </InformSectionRow>
      ) : openNews ? (
        <InformSectionRow>
          {dataNewsInfo.map(d => (
            <InformNews data={d} key={d.id} openpage={openPage} />
          ))}
        </InformSectionRow>
      ) : open ? (
        <News1 />
      ) : null}
    </Layout>
  )
}

export default Information
