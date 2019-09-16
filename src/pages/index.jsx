import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import { Layout } from '../components';
import { Wrapper, HtmlContent } from '../components/common';
import './index.scss';

export const generateKey = pre => `${pre}_${new Date().getTime()}`;

class Index extends Component {
  render() {
    const {
      data: {
        page: {
          data: pageData,
        },
        faqPages,
      },
      location,
    } = this.props;
    const {
      sections,
      metaTitle,
      metaDescription,
      openGraphImage,
    } = pageData;
    const seoData = {
      metaTitle,
      metaDescription,
      openGraphImage,
    };
    const faqPageData = faqPages.edges.map(page => ({
      slug: page.node.uid,
      title: page.node.data.pageTitle.text,
    }));
    return (
      <Layout location={location} seoData={seoData}>
        <section className="home-hero">
          <Wrapper>
            <div className="container">
              <div className="inner-container">
                <span className="magic-command">yarn add @littleplusbig/gatsby-theme-faqs-prismic</span>
                <h1 className="title">Gatsby Theme FAQs</h1>
                <div className="subtitle">
                  <p>A Frequently Asked Questions page template.</p>
                  <p>Check out the demo below.</p>
                </div>
                <ul className="navigation-buttons">
                  { faqPageData && faqPageData.map(page => (
                    <li className="nav-button">
                      <Link
                        className="styled-button"
                        key={page.slug}
                        to={page.slug}
                      >
                        <span>{`${page.title} Demo`}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Wrapper>
        </section>
        <section className="home-body">
          <Wrapper>
            { sections && sections.map((section, index) => (
              <div key={generateKey(index)} className="body-section">
                <h2 className="section-title">
                  {section.sectionHeading.text}
                </h2>
                <HtmlContent content={section.content.html} />
              </div>
            ))}
          </Wrapper>
        </section>
      </Layout>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    page: prismicHome {
      uid,
      data {
        sections {
          content {
            html
          }
          sectionHeading: section_heading {
            text
          }
        }
        metaTitle: meta_title {
          html
          text
        },
        metaDescription: meta_description {
          html
          text
        },
        openGraphImage: open_graph_image {
          alt
          copyright
          url
        }
      }
    }
    faqPages: allPrismicFrequentlyAskedQuestions {
      edges {
        node {
          uid
          data {
            pageTitle: page_name {
              text
            }
          }
        }
      }
    }
  }
`;
