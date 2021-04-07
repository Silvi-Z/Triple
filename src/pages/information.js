/*eslint-disable */
import React, { useEffect, useState } from "react"
import RightSectionUseInform from "../components/informationcomponents/useFullInform/usefulinformation"
import LeftSectionUseInform from "../components/informationcomponents/useFullInform/LeftSectionUseInfo"
import InformDocTemplate from "../components/informationcomponents/documentTemplate/doctemplateinform"
import useTranslations from "../components/useTranslations"
import SEO from "../components/seo"
import {
  H2Styled,
  InformationDocumentCol,
  InformationNavRow,
  InformationPageWrapper,
  InformationParagraphRow,
  InformationUsfulCol,
  InformSectionRow,
  LeftSection,
  PStyled,
  RightSection,
} from "../components/informationcomponents/informMainStyle"
import { ContainerUseful } from "../components/informationcomponents/documentTemplate/docStyle"

const Information = ({ pageContext }) => {
  const [dataUseInfo, setdataUseInfo] = useState([])
  const [leftdataUseInfo, setleftdataUseInfo] = useState([])
  const [dataDoctempInfo, setdataDoctempInfo] = useState([])
  const [openUseful, setOpenUseful] = useState(true)
  const [activeUsefulButton, setactiveUsefulButton] = useState(true)
  const [activeDocTempButton, setactiveDocTempButton] = useState(false)
  const [openDocTemp, setOpenDocTemp] = useState(false)

  const { information } = useTranslations()
  const UseInfoLeftSection = () => {
    setleftdataUseInfo([
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
      ],
    )
  }
  const UseInfoRightSection = () => {
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
          id: 1,
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
          id: 2,
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
    setdataDoctempInfo(
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
              id: 0,
              label: "Գնման ակտ",
              link_exc: `Գնման ակտ.xls`,
            },
            {
              id: 1,
              label: "Գույքագրման ակտ",
              link_word: "Գույքագրման ակտ.docx",
            },
            {
              id: 2,
              label: "Գործուղման վկայական",
              link_word: "Գործուղման վկայական.docx",
            },
            {
              id: 3,
              label: "Բեռնատար ավտոմեքենայի երթուղային թերթ",
              link_exc: "Բեռնատար ավտոմեքենայի երթուղային թերթ.xls",
            },
            {
              id: 4,
              label: "Աշխատաժամանակի հաշվարկի տեղեկագիր",
              link_word: "Աշխատաժամանակի հաշվարկի տեղեկագիր.docx",
            },
            {
              id: 5,
              label: "Դրամարկղի ելքի օրդեր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link_word: "Դրամարկղի ելքի օրդեր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից).docx",
            },
            {
              id: 6,
              label: "Լիազորագիր",
              link_word: "Լիազորագիր.docx",
            },
            {
              id: 7,
              label: "Դրամարկղի մուտքի օրդեր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link_exc: "Դրամարկղի մուտքի օրդեր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից).xls",
            },
            {
              id: 8,
              label: "Լիազորագիր հարկային մարմիններ ներկայանալու համար",
              link_word: "Լիազորագիր հարկային մարմիններ ներկայանալու համար.docx",
            },
            {
              id: 9,
              label: "Հանձնման-ընդունման ակտ",
              link_word: "Հանձնման-ընդունման ակտ.docx",
            },
            {
              id: 10,
              label: "Հայտարարություն գործունեության դադարեցման",
              link_word: "Հայտարարություն գործունեության դադարեցման.docx",
            },
            {
              id: 11,
              label: "Ծառայությունների մատուցման պայմանագիր",
              link_word: "Ծառայությունների մատուցման պայմանագիր.docx",
              link_pdf: "Ծառայությունների մատուցման պայմանագիր.pdf",
            },
            {
              id: 12,
              label: "Հաշիվ ապրանքագիր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link_exc: "Հաշիվ ապրանքագիր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից).xlsx",
            },
            {
              id: 13,
              label: "Հաշիվ ապրանքագիր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link_exc: "Հաշիվ ապրանքագիր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից).xlsx",
            },
            {
              id: 14,
              label: "Հաշվետվություն առհաշիվ գումարների ծախսման մասին",
              link_exc: "հաշվետվություն առհաշիվ գումարների ծախսման մասին.xls",
            },
            {
              id: 15,
              label: "Հարկ վճարողների կողմից տեղեկություններ փակցնելու հայտարարության օրինակելի ձև",
              link_word: "Հարկ վճարողների կողմից տեղեկություններ փակցնելու հայտարարության օրինակելի ձև.doc",
            },
            {
              id: 16,
              label: "Հարկային տեղեկանքի դիմում",
              link_word: "Հարկային տեղեկանքի դիմում.doc",
            },
            {
              id: 17,
              label: "Հարկային հաշիվը անվավեր ճանաչելու ակտ",
              link_word: "Հարկային հաշիվը անվավեր ճանաչելու ակտ.docx",
            },
            {
              id: 18,
              label: "Հիմնադրի որոշում",
              link_word: "Հիմնադրի որոշում.docx",
            },
            {
              id: 19,
              label: "Մարդատար ավտոմեքենայի երթուղային թերթ",
              link_exc: "Մարդատար ավտոմեքենայի երթուղային թերթ.xls",
            },
            {
              id: 20,
              label: "Որոշում ընկերության մասնակիցների փոփոխության",
              link_word: "Որոշում ընկերության մասնակիցների փոփոխության.doc",
            },
            {
              id: 21,
              label: "Որոշում ընկերության միակ մասնակցի փոփոխության",
              link_word: "Որոշում ընկերության միակ մասնակցի փոփոխության.doc",
            },
            {
              id: 22,
              label: "Պահանջագիր-բեռնագիր",
              link_exc: "Պահանջագիր-բեռնագիր.xls",
            },
            {
              id: 23,
              label: "Պարունակության թերթիկ",
              link_word: "Պարունակության թերթիկ.doc",
            },
            {
              id: 24,
              label: "Վճարման հանձնարարագիր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
              link_exc: "Վճարման հանձնարարագիր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից).xlsx",
            },
            {
              id: 25,
              label: "Տեղեկանք աշխատանքի վայրից (հայերեն)",
              link_word: "Տեղեկանք աշխատանքի վայրից (հայերեն).docx",
            },
            {
              id: 26,
              label: "Տեղեկանք աշխատանքի վայրից (անգլերեն)",
              link_word: "Տեղեկանք աշխատանքի վայրից (անգլերեն).doc",
            },
            {
              id: 27,
              label: "Տեղեկանք գործատուին փոխհատուցման ենթակա գումարների մասին",
              link_word: "Տեղեկանք գործատուին փոխհատուցման ենթակա գումարների մասին.docx",
            },
            {
              id: 27,
              label: "Տեղեկատվություն Էլեկտրոնային փոստով վիճակագրական փաստաթղթերի ներկայացման",
              link_exc: "ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ Էլեկտրոնային փոստով վիճակագրական փաստաթղթերի ներկայացման.xls",
            },
          ],
        },
      },
    )
  }

  useEffect(() => {
    UseInfoRightSection()
    UseInfoLeftSection()
    GetDoctempInfo()
  }, [])

  const ChangePageUse = () => {
    setactiveUsefulButton(true)
    setactiveDocTempButton(false)
    setOpenUseful(true)
    setOpenDocTemp(false)

  }
  const ChangePageDoc = () => {
    setactiveUsefulButton(false)
    setactiveDocTempButton(true)
    setOpenDocTemp(true)
    setOpenUseful(false)
  }

  return (
    <>
      <SEO
        title={information.title}
        description={information.paragraph}
        pageContext={pageContext}
      />
      <InformationPageWrapper>
        <InformationParagraphRow>
          <H2Styled>{information.title}</H2Styled>
          <PStyled>{information.paragraph}</PStyled>
        </InformationParagraphRow>
        <InformationNavRow>
          <InformationUsfulCol
            className="submit_button"
            offset={0}
            onClick={ChangePageUse}
            open={openUseful}
            xs={24}
            active={activeUsefulButton}
          >
            {information.useInf_button}
          </InformationUsfulCol>
          <InformationDocumentCol
            className="submit_button"
            offset={0}
            onClick={ChangePageDoc}
            open={openDocTemp}
            xs={24}
            active={activeDocTempButton}
          >
            {information.doc_button}
          </InformationDocumentCol>

        </InformationNavRow>
        {openUseful ? (
          <InformSectionRow>
            <LeftSection>
              {information.usefulInformation.map((d, id) => (
                <LeftSectionUseInform usedata={d} key={id} />
              ))}
            </LeftSection>
            <RightSection>
              {information.dataUseInfo.map((d, id) => (
                <RightSectionUseInform usedata={d} key={id} />
              ))}
            </RightSection>

          </InformSectionRow>
        ) : openDocTemp ? (
          <InformSectionRow>
            <ContainerUseful>
              {dataDoctempInfo.data.links.map((item) => (
                <InformDocTemplate usedata={item} />
              ))}
            </ContainerUseful>
          </InformSectionRow>
        ) : null}
      </InformationPageWrapper>
    </>
  )
}

export default Information
