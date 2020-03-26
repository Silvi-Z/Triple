import React, { useState } from "react"
import Layout from "../components/layout"
// import Image from '../components/image';
import SEO from "../components/seo"
import Slideshow from "../components/slideshow"
import HomeServices from "../components/homecomponents/homeservices"
import Homepartners from "../components/homecomponents/homepartners"

const IndexPage = () => {
  const [responswrapper, setResponswrapper] = useState(true)
  return (
    <Layout
      SetResponswrapper={() => setResponswrapper(!responswrapper)}
      Responswrapper={responswrapper}
    >
      <SEO title="Home" />
      {responswrapper ? <Slideshow /> : null}
      {responswrapper ? <HomeServices /> : null}
      {responswrapper ? <Homepartners /> : null}
    </Layout>
  )
}

export default IndexPage
