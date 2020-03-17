import React from "react"
import Layout from "../components/layout"
// import Image from '../components/image';
import SEO from "../components/seo"
import Slideshow from "../components/slideshow"
import HomeServices from "../components/homeservices"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Slideshow />
    <HomeServices />
  </Layout>
)

export default IndexPage
