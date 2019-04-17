import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'

import './all.scss'

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="jonas.brusman.se"
            href="https://jonas.brusman.se/rss.xml"
          />
        </Helmet>

        <section className="hero is-large">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title has-text-primary">
                <Link to="/">Jonas Brusman</Link>
              </h1>
              <h2 className="subtitle">
                I like to do high fives, take photographs and make cool things
                with Ruby and JavaScript.
              </h2>
            </div>
          </div>

          <div className="hero-foot">
            <nav className="tabs is-centered">
              <div className="container">
                <ul>
                  <li>
                    <Link to="/">Blog</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </section>

        <div>{children}</div>
      </div>
    )}
  />
)

export default TemplateWrapper
