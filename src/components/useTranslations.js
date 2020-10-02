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
            layout {
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
              services {
                title
                sub_title
                button_text
                icon_text_calc
                icon_text_aud_1
                icon_text_aud_2
                icon_text_consult
                icon_text_registr
                icon_text_individ
                icon_text_trans
                icon_text_hr
              }
              our_partners {
                title
                sub_title
                button_text
              }
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
                passport
                pass_id_label
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
              reportForm2 {
                subParagraph
                pass_label
                auto_label
                attorney_label
                submitButton
                back_button
                forward_button
              }
              reportForm3 {
                paragraph
                subParagraph_1
                subParagraph_2
                closeButton
              }
              share
            }
            information {
              title
              paragraph
              news_button
              useInf_button
              doc_button
              share 
            }
            career {
              title
              paragraph
            }
            careerForm {
              textare_label
              file_label
              send_button
              share
            }
            contact {
              title
              paragraph
              form_content {
                name_label
                email_label
                file_label
                title_label
                textare_label
                send_button
              }
              address
              share
            }
            calculator {
              title
              paragraph
              nav {
                title
              }
              salary_calculator {
                title
                clean_salary_button
                dirty_salary_button
                tax_label
                tax_label_common
                tax_label_enterprise
                tax_label_it
                salary_label
                bonus_label
                pensioner_label
                stamp_label
                yes_volunteer
                yes
                no
                count_button
                result_title
                general_storage_label
                income_tax_label
                pension_paymet_label
                stamp_duty_label
                dirty_to_clean_salary
                clean_dirty_to_salary
                result_duty_bonus
              }
              vacation {
                title
                salary_label
                static_salary_label
                pensioner_label
                tax_label_common
                tax_label_enterprise
                tax_label_it
                tax_label
                yes_volunteer
                yes
                no
                start
                end
                month
                year
                gross_salary
                bonus
                surcharge
                date_from_placeholder
                date_to_placeholder
                vacation_days
                working_schedule
                five_days
                six_days
                calculate
                result {
                  title
                  gross_vacation_amount
                  income_tax
                  pension_fee
                  stamp_fee
                  total_fee
                  pure_vacation_amount
                }
              }
              final_calculator {
                title
              }
              mortgage {
                title
                clean_salary
                dirty_salary
                salary_label
                salary_type_label
                static_salary_label
                interest_amount_label
                pensioner_label
                tax_label_common
                tax_label_enterprise
                tax_label_it
                tax_label
                yes_volunteer
                yes
                no
                quarter_months
                gross_salary
                bonus
                surcharge
                calculate
                result {
                  title
                  income_tax_back
                }
              }
              car_customs_calculator {
                title
              }
              car_sell {
                title,
                achievement
                alienation
                price
                power
                horsepower
                kilowatts
                calculate
                tax_label
              }
              car_prop_tax_calculator {
                title
              }
              share
            }
            link
          }
        }
      }
    }
  }
`
