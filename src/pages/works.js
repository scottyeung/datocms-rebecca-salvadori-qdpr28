import React, { useState } from 'react'
import { Link, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'

import scrollTo from 'gatsby-plugin-smoothscroll';

import Layout from "../components/layout"
import tw, { css } from 'twin.macro'

import { getVideo } from '../utils/video'

import { isMobile } from 'react-device-detect'

const About = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  if(isMobile) {
    return (
      <Layout>
        <table tw="min-w-full divide-y md:divide-gray-400 table-fixed">
        <thead>
          <tr tw="opacity-0">
            <th tw="w-3/6"></th>
            <th tw="w-1/6"></th>
          </tr>
        </thead>
          <tbody tw="bg-transparent">
        {
          data.allDatoCmsWork.edges.map(({ node: job }, idx) => (
            <tr tw="divide-y md:divide-gray-400 border-t-2 border-b-2" key={idx} tw="cursor-pointer" onClick={() => navigate(`/works/${job.slug}`)}>
              <td tw="align-top">
              <Link to={`/works/${job.slug}`} tw="no-underline">
                <div tw="text-4xl">{job?.title} {job?.description} </div>
              </Link>
              </td>
              <td tw="whitespace-pre-wrap align-top text-right pb-20 pt-0.5">
                <Link to={`/works/${job.slug}`} tw="no-underline">
                {`${job?.year}\n`}
                </Link>
              </td>
            </tr>
            )
          )
        }
        </tbody>
        </table>
      </Layout>
    ) 
  }

  return (
  <Layout>
    <div tw="grid grid-cols-2 bg-green-400">
      <div tw="h-screen overflow-scroll bg-white pt-10 px-2">
        <div tw="pb-2">
        <table tw="min-w-full divide-y md:divide-gray-400 table-fixed">
        <thead>
          <tr tw="opacity-0">
            <th tw="w-1/12"></th>
            <th tw="w-1/6"></th>
            <th tw="w-1/6"></th>
          </tr>
        </thead>
          <tbody tw="bg-white">
        {
          data.allDatoCmsWork.edges.map(({ node: job }, idx) => (
            <tr tw="divide-y md:divide-gray-400 border-t-2 border-b-2" key={idx} tw="cursor-pointer" onClick={()=>{
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
              <td tw="whitespace-pre-wrap">{`Commissioned by ${job?.commissionedBy}\nProduced by ${job?.produced}`}</td>
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
          <div tw="whitespace-pre-wrap">
          {`${data.allDatoCmsWork.edges[currentPage].node.title}\n${data.allDatoCmsWork.edges[currentPage].node.duration}\n${data.allDatoCmsWork.edges[currentPage].node.commissionedBy}\n${data.allDatoCmsWork.edges[currentPage].node.description}`}
        
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
