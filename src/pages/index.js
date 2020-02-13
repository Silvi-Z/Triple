import React from 'react';
import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';
import Slideshow from '../components/slideshow';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Slideshow />
    <h1>Home page here</h1>
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
);

export default IndexPage;
