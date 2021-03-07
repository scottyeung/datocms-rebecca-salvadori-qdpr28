import React from 'react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import { getVideo } from '../utils/video'

import 'twin.macro'

export default ({ data }) => (
  <Layout location="works">
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
      <div className="sheet__inner">
        <div dangerouslySetInnerHTML={{ __html: getVideo(data.datoCmsWork.vimeo?.providerUid) }} />
        <div tw="px-6 py-10">
          <h1 className="sheet__title" tw="text-3xl">{data.datoCmsWork.title}</h1>
          <div tw="text-xl">
            <p className="sheet__lead">{data.datoCmsWork?.year} | {data.datoCmsWork?.duration}</p>
            <p className="sheet__lead">{`Commissioned by ${data.datoCmsWork?.commissionedBy}`}</p>
            <a className="sheet__lead" href={data.datoCmsWork?.url} tw='underline'>{data.datoCmsWork?.url}</a>
          </div>
        </div>
        <div
          className="sheet__body"
          tw="px-2"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html,
          }}
        />
        <div className="sheet__slider">
            {data.datoCmsWork.gallery.map(({ fluid }) => (
              <img alt={data.datoCmsWork.title} key={fluid.src} src={fluid.src} />
            ))}
        </div>
        <div className="sheet__gallery">
          <Img fluid={data.datoCmsWork.coverImage.fluid} />
        </div>
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      year
      url
      duration
      commissionedBy
      excerpt
      vimeo {
        providerUid
      }
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
