import React from "react"
import { Link, graphql } from "gatsby"
import { kebabCase, get } from "lodash"

import Bio from "../components/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

import "./blog-post.scss"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  const tags = get(post, "frontmatter.tags", [])

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1)
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1)
          }}
        />
        {tags && tags.length ? (
          <div style={{ marginTop: rhythm(1) }}>
            <h5 style={{marginBottom:rhythm(1/2)}}>Tags</h5>
            <ul className="tagList">
              {tags.map((tag) => (
                <li key={tag + `tag`} style={{ marginRight: rhythm(1/2),marginBottom: rhythm(1/2) }}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                上一篇： {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                下一篇： {next.frontmatter.title}
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY, h:mm:ss a")
                description
                tags
            }
        }
    }
`
