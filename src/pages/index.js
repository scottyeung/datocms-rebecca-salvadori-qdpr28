import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Layout from "../components/layout"
import JobsGrid from '../components/JobsGrid'
import 'twin.macro'

const IndexPage = ({ data: {about, features, screenings, shorts } }) => (
  <Layout>
    <HelmetDatoCms seo={about.seoMetaTags} />
    <div tw="grid grid-cols-2 bg-red-500">
      <div tw="h-screen overflow-scroll bg-white pt-10 px-2">
      <div tw="py-10">
        email: <a href={`mailto:${about.eMail}`}>{about.eMail}</a> 
      </div>
      <JobsGrid jobs={features} title='Features / Publications' noYear />
      <JobsGrid jobs={screenings} title='Screenings / Installations / Exhibitions' />
      <JobsGrid jobs={shorts} title={"Selected Short Documentaries\nDirector | Editor"} />
      </div>
      <div>
      </div>
    </div>
  </Layout>
)

export default IndexPage

// export const query = graphql`
//   query AboutQuery {
//     about: datoCmsAboutPage {
//       seoMetaTags {
//         ...GatsbyDatoCmsSeoMetaTags
//       }
//       title
//       subtitle
//       photo {
//         fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
//           ...GatsbyDatoCmsSizes
//         }
//       }
//       bioNode {
//         childMarkdownRemark {
//           html
//         }
//       }
//     }
//   }
// `

export const query = graphql`
  query IndexQuery {
    about: datoCmsAboutPage {
      seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
      } 
      eMail
    }
    features: allDatoCmsFeature {
      nodes {
        title
      }
    }
    screenings: allDatoCmsScreening {
      nodes {
        year
        work
        place
        country
      }
    }
    shorts: allDatoCmsSelectedShort {
      nodes {
        year
        work
        commission
      }
    }
  }
`

{/*
<div className="sheet__inner">
  <h1 className="sheet__title">{about.title}</h1>
  <p className="sheet__lead">{about.subtitle}</p>
  <div className="sheet__gallery">
    <Img fluid={about.photo.fluid} />
  </div>
  <div
    className="sheet__body"
    dangerouslySetInnerHTML={{
      __html: about.bioNode.childMarkdownRemark.html,
    }}
  />
</div> */}
