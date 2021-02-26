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
        <div tw="pb-2">
        <table tw="min-w-full divide-y divide-gray-400 table-fixed">
        <thead>
          <tr tw="opacity-0">
            <th tw="w-1/12"></th>
            <th tw="w-1/6"></th>
            <th tw="w-1/6"></th>
          </tr>
        </thead>
          <tbody tw="bg-white divide-y divide-gray-400 border-t-2 border-b-2">
          <tr tw="border-b border-gray-400">
            <td>
              <div tw="w-10">
              </div>
            </td>
            <td tw="py-10 whitespace-pre-wrap">
            </td>
            <td></td>
          </tr>
        {
          data.allDatoCmsWork.edges.map(({ node: job }, idx) => (
            <tr tw="border-none" key={idx} tw="cursor-pointer" onClick={()=>{
              scrollTo('#top', 'start')
              setCurrentPage(idx);
            }
           }>
              <td>
                <div tw="w-10">
                  {job.year}
                </div>
              </td>
              <td>
                <div>{job?.title} {job?.description} </div>
              </td>
              <td>Commissioned by {job?.commissionedBy}{'\n'}Produced by {job?.produced}</td>
            </tr>)
          )
        }
        </tbody>
        </table>
      </div>
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
          year
          title
          duration
          produced
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
