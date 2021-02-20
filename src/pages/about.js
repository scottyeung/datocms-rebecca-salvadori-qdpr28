import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import ReactTextFormat from 'react-text-format';
import JobsGrid from '../components/JobsGrid'

const About = ({ data: {about, features, screenings, shorts } }) => (
  <Layout>
      <HelmetDatoCms seo={about.seoMetaTags} />
      <article className="sheet">
      <div>Features / Publications</div>
      {
        features.nodes.map((feature, idx) => (
          <p key={idx} style={{paddingBottom: '20px'}}>
          <ReactTextFormat>
            {feature.title}
          </ReactTextFormat>
          </p>
        ))
      }
    </article>
    <JobsGrid jobs={screenings} title='Screenings / Installations / Exhibitions' />
    <JobsGrid jobs={shorts} title="Selected Short Documentaries\nDirector | Editor" />
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