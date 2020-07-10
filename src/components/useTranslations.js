import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import LocaleContext from "../localeContext"

function useTranslations() {
  // Grab the locale (passed through context) from the Context Provider
  const { locale } = React.useContext(LocaleContext)
  // Query the JSON files in <rootDir>/i18n/translations
  const { rawData } = useStaticQuery(query)

  // Simplify the response from GraphQL
  const simplified = rawData.edges.map(item => {
    return {
      name: item.node.name,
      translations: item.node.translations,
    }
  })
  console.log("simplified", simplified)
  // Only return translations for the current locale
  const { translations } = simplified.filter(lang => lang.name === locale)[0]

  return translations
}

export default useTranslations

const query = graphql`
  query useTranslations {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
      edges {
        node {
          name
          translations: childTranslationsJson {
            site {
              header {
                serveTitle
                reportTitle
                calcTitle
                infoTitle
                careerTitle
                contractTitle
                address
              },
              footer {
                follow
                address
              }
            }
            home {
              test
            }
            services {
              title
              paragraph
              share
            }
            reports {
              title
              paragraph
              dropParagraph
              currency
              subdropParagraph
              reportForm {
                full_name
                city
                address
                passport_series
                given
                when
                ID_card_number
                birthday
                psn
                tin
                phone
                email
                SubmitSpan
                submitButton
              }
            }
            link
          }
        }
      }
    }
  }
`
