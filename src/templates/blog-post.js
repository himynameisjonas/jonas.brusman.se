import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullSizeImage from "../components/FullSizeImage";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  photos,
  tags,
  title,
  slug,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="blog-post section is-medium">
      {helmet || ""}
      <div className="container is-widescreen">
        <h1 className="title is-size-2 is-centered has-text-centered">
          <Link to={slug}>{title}</Link>
        </h1>
      </div>
      {photos != null &&
        photos.map(({ childImageSharp }, index) => (
          <FullSizeImage childImageSharp={childImageSharp} key={index} />
        ))}
      <div className="container is-widescreen">
        <div className="columns is-mobile">
          <div className="column is-three-fifths is-offset-one-fifth">
            <PostContent content={content} className="content is-medium" />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
  photos: PropTypes.array
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        photos={post.frontmatter.photos}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        slug={post.fields.slug}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

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
`;
