/*eslint-disable */
import React, { useState, useEffect } from "react"
import RightSectionUseInform from "../components/informationcomponents/useFullInform/usefulinformation"
import LeftSectionUseInform from "../components/informationcomponents/useFullInform/LeftSectionUseInfo"
import InformDocTemplate from "../components/informationcomponents/documentTemplate/doctemplateinform"
import useTranslations from "../components/useTranslations"
import SEO from "../components/seo"
import {
  InformationParagraphRow,
  InformationDocumentCol,
  InformationPageWrapper,
  InformationUsfulCol,
  InformationNavRow,
  InformSectionRow,
  RightSection,
  LeftSection,
  H2Styled,
  PStyled,
} from "../components/informationcomponents/informMainStyle"

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
        }
      ]
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
              id: 0,
              label: "Աշխատաժամանակի հաշվարկի տեղեկագիր",
            },
            {
              id: 1,
              label: "Արձանագրություն ընկերության մասնակիցների փոփոխության",
            },
            {
              id: 2,
              label: "Բեռնատար ավտոմեքենայի երթուղային թերթ",
            },
            {
              id: 3,
              label: "Գործուղման վկայական",
            },
            {
              id: 4,
              label:"Դրամարկղի ելքի օրդեր  (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
            },
            {
              id: 5,
              label:
                "Դրամարկղի մուտքի օրդեր  (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
            },
            {
              id: 6,
              label: "Ծառայությունների մատուցման պայմանագիր",
            },
            {
              id: 7,
              label: "Լիազորագիր",
            },
            {
              id: 8,
              label:"Հարկ վճարողների կողմից տեղեկություններ փակցնելու հայտարարության օրինակելի ձև",
            },
            {
              id: 9,
              label:
                "Հաշիվ ապրանքագիր (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
            },
            {
              id: 10,
              label: "Հարկային հաշիվը անվավեր ճանաչելու  ակտ",
            },
            {
              id: 11,
              label: "Հիմնադրի որոշում",
            },
            {
              id: 12,
              label: "Հայտարարություն գործունեության դադարեցման",
            },
            {
              id: 13,
              label:
                "Վճարման հանձնարարագիր  (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
            },
            {
              id: 14,
              label: "Մարդատար ավտոմեքենայի երթուղային թերթ",
            },
            {
              id: 15,
              label: "Որոշում ընկերության միակ մասնակցի փոփոխության",
            },
            {
              id: 16,
              label: "Պարունակության թերթիկ",
            },
            {
              id: 17,
              label:
                "Վճարային տեղեկագիր   (Փաստաթուղթը արտահանված է ՀԾ հաշվապահ 6 համակարգից)",
            },
            {
              id: 18,
              label: "Տեղեկանք աշխատանքի վայրից (հայերեն)",
            },
            {
              id: 19,
              label: "Տեղեկանք աշխատանքի վայրից (անգլերեն)",
            },
            {
              id: 20,
              label:
                "ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ Էլեկտրոնային փոստով վիճակագրական փաստաթղթերի ներկայացման",
            },
          ],
        },
      },
    ])
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
            {leftdataUseInfo.map((d, id) =>(
            <LeftSectionUseInform usedata={d} key={id}/>
          ))}
          </LeftSection>
          <RightSection>
            {dataUseInfo.map((d, id) => (
            <RightSectionUseInform usedata={d} key={id} />
          ))}
          </RightSection>

        </InformSectionRow>
      ) : openDocTemp ? (
        <InformSectionRow>
          {dataDoctempInfo.map((d, id) => (
            <InformDocTemplate usedata={d} key={id} />
          ))}
        </InformSectionRow>
      ) : null}
    </InformationPageWrapper>
      </>
  )
}

export default Information
