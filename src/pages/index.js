import React, { useState } from "react"
import Layout from "../components/layout"
// import Image from '../components/image';
import SEO from "../components/seo"
import Slideshow from "../components/slideshow"
import Homeservices from "../components/homecomponents/homeservices"
import Homepartners from "../components/homecomponents/homepartners"
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Slideshow />
      <Homeservices />
      <Homepartners />
    </Layout>
  )
}

export default IndexPage
