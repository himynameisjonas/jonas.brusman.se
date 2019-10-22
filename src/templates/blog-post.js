import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import FullSizeImage from '../components/FullSizeImage'
import { DiscussionEmbed } from 'disqus-react'
import { Textfit } from 'react-textfit'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  photos,
  date,
  tags,
  title,
  slug,
  postClass,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  const classNames = `blog-post section is-medium ${postClass}`
  slug = (slug || '').replace('/blog/', '/')
  const disqusShortname = 'jonasforsberg'
  const disqusConfig = {
    url: `https://jonas.brusman.se${slug}`,
    identifier: slug
      .replace(/(\d{4})-(\d{2})-(\d{2})/, '$1-$2-$3')
      .replace(/\//, ''),
    title: title,
  }

  return (
    <section className={classNames}>
      {helmet || ''}
      <div className="container is-widescreen is-medium">
        <div className="section is-medium">
          <h1 className="title is-size-1 is-centered has-text-centered">
            <Link to={slug}>
              <Textfit max={100} mode={title.length > 12 ? 'multi' : 'single'}>
                {title}
              </Textfit>
            </Link>
          </h1>
        </div>
      </div>

      {photos != null && (
        <div className="full-size-images-wrapper">
          {photos.map(({ childImageSharp }, index) => (
            <FullSizeImage childImageSharp={childImageSharp} key={index} />
          ))}
        </div>
      )}

      <div className="container is-widescreen">
        <div className="columns is-mobile is-multiline is-centered">
          <div className="column is-three-fifths-tablet is-full-mobile">
            <div className="section">
              <PostContent content={content} className="content is-medium" />
            </div>
          </div>
          <div className="column is-three-fifths-tablet is-full-mobile is-medium">
            <div className="section">
              <div className="has-text-centered">
                <p>{date}</p>
                {tags && tags.length ? (
                  <div className="tags">
                    {tags.map(tag => (
                      <span className="tag is-light" key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>#{tag}</Link>
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="section">
              <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
  photos: PropTypes.array,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        photos={post.frontmatter.photos}
        date={post.frontmatter.date}
        helmet={
          <Helmet titleTemplate="%s | Jonas Brusman">
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        postClass={post.frontmatter.class}
        slug={post.fields.slug}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        class
        photos {
          childImageSharp {
            sizes(maxWidth: 2000) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
