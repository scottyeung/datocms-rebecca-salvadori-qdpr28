import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import JobsGrid from '../components/JobsGrid'
import 'twin.macro'

const About = ({ data: {about, features, screenings, shorts } }) => (
  <Layout>
    <HelmetDatoCms seo={about.seoMetaTags} />
    <div tw="grid grid-cols-2 gap-4 bg-red-500">
      <div tw="h-full overflow-hidden bg-white pt-10 px-2">
      <JobsGrid jobs={features} title='Features / Publications' noYear />
      <JobsGrid jobs={screenings} title='Screenings / Installations / Exhibitions' />
      <JobsGrid jobs={shorts} title="Selected Short Documentaries\nDirector | Editor" />
      </div>
      <div>
      </div>
    </div>
  </Layout>
)

export default About

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
  query CvQuery {
    about: datoCmsAboutPage {
      seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
      } 
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

console.log(query)

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