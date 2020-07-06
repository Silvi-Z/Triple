import React from 'react';
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby';

const LanguagePicker = ({ originalPath }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            supportedLanguages
          }
        }
      }
    `
  );

  return (
    <div className="language-selector-container">
      {site.siteMetadata.supportedLanguages.map(supportedLang => (
        <GatsbyLink
          aria-label={`Change language to ${supportedLang}`}
          to={`/${supportedLang}${originalPath}`}
        >
          {supportedLang.toUpperCase()}
        </GatsbyLink>
      ))}
    </div>
  );
};

export default LanguagePicker;