import React from 'react';
import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';
import Slideshow from '../components/slideshow';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Slideshow />
  </Layout>
);

export default IndexPage;
