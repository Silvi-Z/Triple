import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, meta, pageContext }) => {
  const { t } = useTranslation();

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
    `
  );

  const { lang, originalPath} = pageContext;
  const metaDescription = description || t('siteMetadata.description');
  const host = site.siteMetadata.siteUrl;
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      titleTemplate={`%s | ${t('siteMetadata.title')}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:locale',
          content: lang,
        }
      ]/* .concat(meta) */}
      link={[
        {
          rel: 'canonical',
          href: `${host}/${lang}${originalPath}`,
        },
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: `${host}${originalPath}`,
        },
        ...site.siteMetadata.supportedLanguages.map(supportedLang => ({
          rel: 'alternate',
          hrefLang: supportedLang,
          href: `${host}/${supportedLang}${originalPath}`,
        })),
      ]}
    />
  );
};

export default SEO;