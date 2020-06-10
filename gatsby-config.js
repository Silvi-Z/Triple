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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
