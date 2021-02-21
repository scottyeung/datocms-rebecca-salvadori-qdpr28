import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import scrollTo from 'gatsby-plugin-smoothscroll';

import Layout from "../components/layout"
import tw, { css } from 'twin.macro'

import { getVideo } from '../utils/video'

const About = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
  <Layout>
    <div tw="grid grid-cols-2 bg-green-400">
      <div tw="h-screen overflow-scroll bg-white pt-10 px-2">
      {data.allDatoCmsWork.edges.map(({ node: work }, idx) => (
       <div key={idx} tw="cursor-pointer" onClick={()=>{
          scrollTo('#top', 'start')
          setCurrentPage(idx);
        }
       }>
         {work.title}
       </div>
      ))}
      </div>
      <div css={[tw`h-screen overflow-scroll`, css`background-color: ${data.allDatoCmsWork.edges[currentPage].node.bgColor?.hex}`]}>
        <div tw="w-auto h-auto" id="top">
        <div dangerouslySetInnerHTML={{ __html: getVideo(data.allDatoCmsWork.edges[currentPage].node.vimeo?.providerUid) }} />
          <div tw="pt-5 pl-5">
            <p>
              {data.allDatoCmsWork.edges[currentPage].node.title}
              {data.allDatoCmsWork.edges[currentPage].node.duration}
              {data.allDatoCmsWork.edges[currentPage].node.commissionedBy}
              {data.allDatoCmsWork.edges[currentPage].node.description}
            </p>
          </div>
          <Img fluid={data.allDatoCmsWork.edges[currentPage].node.coverImage.fluid} />
          {data.allDatoCmsWork.edges[currentPage].node.gallery.map(({ fluid }) => (
              <img alt={data.allDatoCmsWork.edges[currentPage].node.title} key={fluid.src} src={fluid.src} />
          ))}
        </div>
      </div>
    </div>
  </Layout>
)}

export default About

export const query = graphql`
  query CvQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          duration
          vimeo {
            providerUid
          }
          commissionedBy
          url
          bgColor {
            hex
          }
          gallery {
            fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
              src
            }
          }
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
