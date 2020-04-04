import React, { useState } from "react"
import Layout from "../components/layout"
// import Image from '../components/image';
import SEO from "../components/seo"
import Slideshow from "../components/slideshow"
import HomeServices from "../components/homecomponents/homeservices"
import Homepartners from "../components/homecomponents/homepartners"

const IndexPage = () => {
  return (
    <Layout
    // SetResponswrapper={() => setResponswrapper(false)}
    // Responswrapper={responswrapper}
    >
      <SEO title="Home" />
      <Slideshow />
      <HomeServices />
      <Homepartners />
    </Layout>
  )
}

export default IndexPage
