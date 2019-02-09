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
  date,
  tags,
  title,
  slug,
  postClass,
  helmet
}) => {
  const PostContent = contentComponent || Content;
  slug = (slug || "").replace("/blog/", "/");

  const classNames = `blog-post section is-medium ${postClass}`;
  return (
    <section className={classNames}>
      {helmet || ""}
      <div className="container is-widescreen">
        <h1 className="title is-size-2 is-centered has-text-centered">
          <Link to={slug}>{title}</Link>
        </h1>
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
          <div className="column is-three-fifths">
            <PostContent content={content} className="content is-medium" />
          </div>
          <div className="column is-three-fifths section">
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
`;
