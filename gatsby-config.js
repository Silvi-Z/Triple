module.exports = {
  siteMetadata: {
    title: "Triple Consulting",
    description:
      "Թարմ մտածողությունը և նորարական լուծումները այն դրդապատճառներներից մեկն են, որի վրա հիմնվելով կազմակերպությունները ընտրում են Triple Consulting-ը",
    author: "@algorithmSolutions",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#f7f7f7",
        theme_color: "#f7f7f7",
        display: "minimal-ui",
        icon: "src/assets/title.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-antd",
    {
      resolve: "gatsby-plugin-less",
      options: {
        javascriptEnabled: true,
        modifyVars: {
          "primary-color": "#009db8",
          "font-family": ["ArialAMU", "sans-serif"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-facebook-analytics`,
      options: {
        // Required - set this to the ID of your Facebook app.
        appId: `323009385338778`,

        // Which version of the SDK to load.
        version: `v3.3`,

        // Determines whether XFBML tags used by social plugins are parsed.
        xfbml: true,

        // Determines whether a cookie is created for the session or not.
        cookie: true,

        // Include Facebook analytics in development.
        // Defaults to false meaning the library will only be loaded in production.
        includeInDevelopment: true,

        // Include debug version of sdk
        // Defaults to false meaning the library will load sdk.js
        debug: false,

        // Select your language.
        language: `en_US`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
