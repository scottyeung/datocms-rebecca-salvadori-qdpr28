/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles } from 'twin.macro'

import {
  isBrowser,
  isMobile
} from "react-device-detect";

const Header = tw.div`flex flex-row justify-start p-0 md:w-1/2 sm:w-full`
const Sidebar = tw.div`flex flex-row md:w-1/2 md:fixed w-full md:w-min sm:justify-between`
const Container = tw.div`flex flex-col`
const Menu = tw.ul`flex flex-row px-2 justify-between w-full`

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
            <div css={isMobile && tw`bg-yellow-500`}>
              <Header>
                <Sidebar>
                  <Menu>
                    <li tw="md:mr-5 underline">
                      <Link to="/works">Works</Link>
                    </li>
                    <li tw="md:mr-5 underline">
                      <Link to="/">CV</Link>
                    </li>
                  </Menu>
                </Sidebar>
              </Header>
              <Container>
                {children}
              </Container>
            </div>
        </div>
      )}
    />
  );
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/
