module.exports = {
  siteMetadata: {
    supportedLanguages: ["en", "arm"],
    defaultLanguage: "arm",
    title: "Triple Consulting",
    description:
      "Թարմ մտածողությունը և նորարական լուծումները այն դրդապատճառներներից մեկն են, որի վրա հիմնվելով կազմակերպությունները ընտրում են Triple Consulting-ը",
    author: "@algorithmSolutions",
    siteUrl: "http://triple-c.algorithm.am"
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet-async`,
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-lodash`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/arm/",
        background_color: "#f7f7f7",
        theme_color: "#f7f7f7",
        display: "minimal-ui",
        icon: "src/assets/title.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true
      }
    },
    {
      resolve: "gatsby-plugin-less",
      options: {
        javascriptEnabled: true,
        modifyVars: {
          "primary-color": "#00b3c7",
          "font-family": ["ArialAMU", "sans-serif"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        // add relative path to your layout component
        component: `${__dirname}/src/components/layout.js`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/config/translations`,
        name: `translations`
      }
    },
    `gatsby-transformer-json`,
    {
      resolve: 'gatsby-plugin-htaccess',
      options: {
        www: false,
        host: 'triple-c.algorithm.am',
        redirect: [
          'RewriteRule ^/?$ /arm [R=301,L,NE]',
        ],
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: 0,
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
