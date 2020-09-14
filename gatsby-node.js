const config = require('./gatsby-config');
const resources = require('./src/i18n/resources');

exports.onCreatePage = async ({ page, actions: { createPage, deletePage, createRedirect } }) => {
  const isEnvDevelopment = process.env.NODE_ENV === 'development';
  const originalPath = page.path;

  // Delete the original page (since we are gonna create localized versions of it) and add a
  // redirect header
  await deletePage(page);

  await Promise.all(
    config.siteMetadata.supportedLanguages.map(async lang => {
      const localizedPath = `/${lang}${page.path}`;

      console.log('localizedPath')
      console.log(localizedPath)
      // create a redirect based on the accept-language header
      createRedirect({
        fromPath: originalPath,
        toPath: localizedPath,
        Language: lang,
        isPermanent: false,
        redirectInBrowser: isEnvDevelopment,
        statusCode: 301,
      });

      const reg = new RegExp(`^${lang}/calculators`);

      if (page.path.match(/^\/arm\/calculators/)) {
        page.matchPath = `arm/calculators/*`

        // Update the page.
        await createPage(page);
      }

      await createPage({
        ...page,
        path: localizedPath,
        context: {
          ...page.context,
          originalPath,
          locale: lang,
          localeResources: resources[lang] ? resources[lang] : {},
        },
      });
    })
  );



  // Create a fallback redirect if the language is not supported or the
  // Accept-Language header is missing for some reason
  createRedirect({
    fromPath: originalPath,
    toPath: `/${config.siteMetadata.defaultLanguage}${page.path}`,
    isPermanent: false,
    redirectInBrowser: isEnvDevelopment,
    statusCode: 301,
  });
};
