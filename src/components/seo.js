import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Helmet from "react-helmet"
import { useTranslation } from "react-i18next"
import LocaleContext from "../localeContext"

const SEO = ({ title, description, meta, pageContext }) => {
  const { locale } = React.useContext(LocaleContext)
  const { t } = useTranslation()

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            supportedLanguages
          }
        }
      }
    `,
  )

  const { lang, originalPath } = pageContext
  const metaDescription = description || t("siteMetadata.description")
  const host = site.siteMetadata.siteUrl
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${t("siteMetadata.title")}`}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:locale",
          content: locale,
        },
      ]/* .concat(meta) */}
      link={[
        {
          rel: "canonical",
          href: `${host}/${locale}${originalPath}`,
        },
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: `${host}${originalPath}`,
        },
        ...site.siteMetadata.supportedLanguages.map(supportedLang => ({
          rel: "alternate",
          hrefLang: supportedLang,
          href: `${host}/${supportedLang}${originalPath}`,
        })),
      ]}
    >
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-FQ1MP5J8SM"></script>
      <script defer>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FQ1MP5J8SM');
        `}
      </script>
    </Helmet>
  )
}

export default SEO