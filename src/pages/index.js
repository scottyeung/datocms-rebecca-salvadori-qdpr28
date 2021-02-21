import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from "../components/layout"
import 'twin.macro'

const IndexPage = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
  <Layout>
    <div tw="grid grid-cols-2 bg-green-400">
      <div tw="h-screen overflow-scroll bg-white pt-10 px-2">
      {data.allDatoCmsWork.edges.map(({ node: work }, idx) => (
       <div key={idx} tw="cursor-pointer" onClick={()=>setCurrentPage(idx)}>
         {work.title}
       </div>
      ))}
      </div>
      <div tw="h-screen overflow-scroll">
        <div tw="w-auto h-auto">
          {data.allDatoCmsWork.edges[currentPage].node.title}
          <Img fluid={data.allDatoCmsWork.edges[currentPage].node.coverImage.fluid} />
          <Img fluid={data.allDatoCmsWork.edges[currentPage].node.coverImage.fluid} />
          <Img fluid={data.allDatoCmsWork.edges[currentPage].node.coverImage.fluid} />
          <Img fluid={data.allDatoCmsWork.edges[currentPage].node.coverImage.fluid} />
        </div>
      </div>
    </div>
  </Layout>
)}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
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
