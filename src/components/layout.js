/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles } from 'twin.macro'

import {
  isMobile
} from "react-device-detect";

const Header = tw.div`flex flex-row justify-start p-0 md:w-1/2 sm:w-full`
const Sidebar = tw.div`flex flex-row md:w-1/2 md:fixed w-full md:w-min sm:justify-between`
const Container = tw.div`flex flex-col px-2 pt-20 md:pt-0 md:px-0`
const Menu = tw.ul`flex flex-row px-2 justify-between w-full`

const CustomGlobalStyles = createGlobalStyle`
  body {
    ${tw`overflow-scroll md:overflow-hidden border-gray-900`}
    font-family: "Times New Roman";
  }
  .customLink {
    ${tw`mt-6 md:mt-0`}
  }
`;

const TemplateWrapper = ({ location, children }) => {
  const [bg, setBg] = useState(tw`bg-primary text-black min-h-screen`)

  useEffect(() => {
    if(location === 'works') {
      setBg(tw`bg-works text-white min-h-screen`)
    }
  },[location])

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
          datoCmsAboutPage { 
            eMail
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
            <div css={isMobile && bg}>
              <Header>
                <Sidebar>
                  <Menu>
                    <li tw="md:mr-5 text-4xl md:text-base underline">
                      <Link to="/works">Works</Link>
                    </li>
                    <li tw="md:mr-5 text-4xl md:text-base underline">
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
