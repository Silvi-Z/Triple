import React from "react"
import Layout from "../components/layout"
// import Image from '../components/image';
import SEO from "../components/seo"
import Slideshow from "../components/slideshow"
import HomeServices from "../components/homeservices"
import HomePartners from "../components/homepartners"
import Homepartners from "../components/homepartners"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Slideshow />
    <HomeServices />
    <Homepartners />
  </Layout>
)

export default IndexPage
