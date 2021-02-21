/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles } from 'twin.macro'

const Header = tw.div`flex flex-row justify-start p-0 w-1/2`
const Sidebar = tw.div`flex flex-row justify-between w-1/2 fixed`
const Container = tw.div`flex flex-col`

const CustomGlobalStyles = createGlobalStyle`
  body {
    ${tw`overflow-hidden border-gray-900`}
  }
`;

const TemplateWrapper = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
            copyright
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={data => (
      <div>
        <GlobalStyles />
        <CustomGlobalStyles />
        <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          <Header>
            <Sidebar>
              <ul tw="flex flex-row px-2">
                <li tw="mr-5 underline">
                  <Link to="/">Home</Link>
                </li>
                <li tw="mr-5 underline">
                  <Link to="/about">CV</Link>
                </li>
              </ul>
            </Sidebar>
          </Header>
          <Container>
            {children}
          </Container>
        </div>
      )}
    />
  );
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
