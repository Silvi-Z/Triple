/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { useStaticQuery, graphql } from 'gatsby';
import { Layout as CustomLayout } from 'antd';
import styled from 'styled-components';

import Navbar from './navbar';
import './layout.css';

const { Content, Footer } = CustomLayout;

const ContentStyled = styled(Content)`
  padding: 50px 100px;
`;

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  return (
    <>
      <Navbar />
      <div
        style={{
          margin: '0 auto',
          // maxWidth: 960,
          // padding: '0 1.0875rem 1.45rem',
        }}
      >
        <ContentStyled>{children}</ContentStyled>
      </div>
      <Footer>
        © {new Date().getFullYear()}, Built with
        {' '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
