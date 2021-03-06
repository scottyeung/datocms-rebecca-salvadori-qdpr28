import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Layout from "../components/layout"
import JobsGrid from '../components/JobsGrid'
import 'twin.macro'

import {
  isMobile
} from "react-device-detect";

const IndexPage = ({ data: {about, features, screenings, shorts, docs, mv, quali } }) => {
  
  return !isMobile ? (
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
      <JobsGrid jobs={docs} title={"Selected Documentary\nDirector, Editor"} />
      <JobsGrid jobs={mv} title={"Selected Music Videos\nDirector, Editor"} />
      <JobsGrid jobs={quali} title={"Academic Qualifications"} />
      </div>
      <div>
      </div>
    </div>
  </Layout>
  ): (
    <Layout tw="overflow-scroll">
      <div tw="py-10">
        <a href={`mailto:${about.eMail}`}>{about.eMail}</a>
        <JobsGrid jobs={features} title='Features / Publications' noYear />
        <JobsGrid jobs={screenings} title='Screenings / Installations / Exhibitions' />
        <JobsGrid jobs={shorts} title={"Selected Short Documentaries\nDirector | Editor"} />
        <JobsGrid jobs={docs} title={"Selected Documentary\nDirector, Editor"} />
        <JobsGrid jobs={mv} title={"Selected Music Videos\nDirector, Editor"} />
        <JobsGrid jobs={quali} title={"Academic Qualifications"} />
      </div>
    </Layout>
  )
}

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
    docs: allDatoCmsSelectedDoc {
      nodes {
        year
        work
        premiere
      }
    }
    mv: allDatoCmsSelectedMv {
      nodes {
        year
        work
        premiere
      }
    }
    quali: allDatoCmsAcademicQualification {
      nodes {
        year
        qualification
        place
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
