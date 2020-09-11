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

      // create a redirect based on the accept-language header
      createRedirect({
        fromPath: originalPath,
        toPath: localizedPath,
        Language: lang,
        isPermanent: false,
        redirectInBrowser: isEnvDevelopment,
        statusCode: 301,
      });

      // page.matchPath is a special key that's used for matching pages
      // only on the client.
      const reg = new RegExp(``)
      if (page.path.match(/^\/app/)) {
        page.matchPath = "/app/*"

        // Update the page.
        createPage(page)
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
