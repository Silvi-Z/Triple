import React from "react"
import { graphql, useStaticQuery } from "gatsby"
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
  // console.log("simplified", simplified)
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
                newsTitle
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
              email_label
              file_label
              send_button
              share
            }
            contact {
              title
              paragraph
              form_content {
                name_label_first
                name_label_second
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
              salary {
                title
                paragraph
                clean_salary_button
                dirty_salary_button
                gross_salary
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
                form {
                  by_date
                  by_table
                  start
                  end
                  working_days
                  working_schedule
                  five_days
                  six_days
                  salary
                }
              }
              salary_table {
                title
                paragraph
                calculate
                form {
                  title
                  by_date
                  by_table
                  upload
                  start
                  end
                  working_days
                  clean_salary
                  dirty_salary
                  tax_label
                  tax_common
                  tax_enterprise
                  tax_it
                  salary
                  bonus
                  pensioner
                  stamp
                  yes_volunteer
                  yes
                  no
                  working_schedule
                  five_days
                  six_days
                }
                table {
                  name
                  day
                  hour
                  social_fee
                  salary
                  yes_volunteer
                  yes
                  no
                }
                result {
                  title
                  gross_salary
                  total_fee
                  income_tax
                  stamp_fee
                  pension_fee
                  dirty_to_clean_salary
                  clean_to_dirty_salary
                  duty_bonus
                  download
                }
              }
              vacation {
                title
                paragraph
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
              final {
                title
                paragraph
                form {
                  acceptance
                  release
                  date_acceptance_placeholder
                  date_release_placeholder
                  working_schedule
                  five_days
                  six_days
                  available_vacation_days
                  total_vacation_days
                  used_vacation_days
                  unused_vacation_days
                  salary
                  static_salary
                  tax
                  tax_common
                  tax_enterprise
                  tax_it
                  pensioner
                  yes_volunteer
                  yes
                  no
                  calculate   
                }
                table {
                  hint
                  month
                  year
                  gross_salary
                  bonus
                  surcharge
                }
                result {
                  title
                  total_amount
                  income_tax
                  pension_fee
                  total_fee
                  net_amount
                }
              }
              mortgage {
                title
                paragraph
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
              subsidy {
                title
                paragraph
                calculate
                form {
                  type
                  maternity
                  disability
                  dates_placeholder
                  dates
                  start
                  end
                  days
                  hired
                  self
                  tax
                  tax_common
                  tax_common_for_self_employed
                  tax_turnover_for_self_employed
                  tax_it
                  tax_enterprise
                  schedule
                  five_days
                  six_days
                  amount
                  amount_self_common
                  amount_self_turnover
                  amount_self_enterprise
                  income
                  static
                }
                gross {
                  month
                  year
                  gross_salary
                  bonus
                  surcharge
                }
                result {
                  title
                  subsidy_emp
                  subsidy_gov
                  pure_subsidy
                  all_pure_subsidy
                  income_tax
                }
              }
              car_customs {
                title
                paragraph
                calculate
                form {
                  imported_eeu
                  imported_third
                  person_physical
                  person_legal
                  year
                  capacity
                  costs
                  price
                }
                result {
                  title
                  currency
                  total
                  fee
                  tax
                  vat
                }
              }
              car_sell {
                title
                paragraph
                achievement
                alienation
                price
                power
                horsepower
                kilowatts
                calculate
                tax_label
                tax_body
                result {
                  title
                }
              }
              car_tax {
                title
                calculate
                form {
                type
                car
                realEstate
                  vehicle {
                    title
                    car
                    van
                    truck
                    motorcycle
                    water_vehicle
                  }
                  estate {
                    title
                    cadastralValue
                    residential
                    public_production
                    garage
                  }
                  year
                  power
                  horsepower
                  kilowatts
                }
                result {
                  title
                  tax
                }
              }
              calendar{
                title
                calculate
                chooseDaysRange
                working_schedule
                year
                form{
                  start
                  end
                }
                calendar {
                  months {
                    january
                    february
                    march
                    april
                    may
                    june
                    july
                    august
                    september
                    october
                    november
                    december
                  }
                  daysOfWeek {
                    monday
                    tuesday
                    wednesday
                    thursday
                    friday
                    saturday
                    sunday
                  }
                  additionalInformation {
                    calendarDays
                    workDays
                    workHours
                    five_days
                    six_days
                  }
                }
                result {
                  title
                  calendarDays
                  workDays
                  workHours
                  nonWorkingDays
                }
              }
              currency {
                title
                calculate
                currency {
                  amd
                  usd
                  rub
                  eur
                  cny
                  gbp
                  gel
                  irr
                }
                form {
                  date
                }
                result {
                  currency
                }
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
