import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import smoothscroll from 'smoothscroll-polyfill';
import {
  Footer,
  Header,
  SEO,
} from 'components';
// Import global styles here
import '../assets/sass/global/styles.scss';

const isClient = typeof window !== 'undefined';
const viewportUnitsBuggyfill = isClient ? require('viewport-units-buggyfill') : null;

class PureLayout extends Component {
  state = {
    navOpen: false,
  };

  componentDidMount() {
    viewportUnitsBuggyfill.init();
    smoothscroll.polyfill();
  }

  componentWillUnmount() {
    if (isClient) window.removeEventListener('scroll', this.handleScroll);
  }

  toggleNav = (event) => {
    event.preventDefault();
    const { navOpen } = this.state;
    if (event) event.preventDefault();
    if (navOpen) document.body.classList.remove('nav-open');
    if (!navOpen) document.body.classList.add('nav-open');
    this.setState({
      navOpen: !navOpen,
    });
  };

  openNav = (event) => {
    if (event) event.preventDefault();
    document.body.classList.add('nav-open');
    this.setState({
      navOpen: true,
    });
  };

  closeNav = () => {
    document.body.classList.remove('nav-open');
    this.setState({
      navOpen: false,
    });
  };

  render() {
    const {
      navOpen,
    } = this.state;
    const {
      children,
      settings,
      location,
      seoData,
    } = this.props;
    const {
      metaTitle = false,
      metaDescription = false,
      openGraphImage = false,
    } = seoData;
    const isHome = Boolean(location.pathname === '/');
    return (
      <>
        <SEO
          title={metaTitle && metaTitle.text}
          desc={metaDescription && metaDescription.text}
          banner={openGraphImage && openGraphImage.url}
        />
        <div id="app" className="app">
          <Header
            navOpen={navOpen}
            location={location}
            navigation={settings.primary_menu}
            toggleNavHandler={event => this.toggleNav(event)}
          />
          <main className={isHome ? 'home' : location.pathname.replace(/\//g, '')}>
            {children}
          </main>
          <Footer
            contactDetails={settings.contact_details}
            socialLinks={settings.social_links}
            portfolioLinks={settings.portfolio_links}
          />
        </div>
      </>
    );
  }
}

class Layout extends Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            settings: prismicSettings {
              data {
                primary_menu {
                  title {
                    text
                  }
                  page_link {
                    link_type
                    uid
                    slug
                    url
                  }
                }
              }
            }
          }
        `}
        render={data => <PureLayout {...this.props} settings={data.settings.data} />}
      />
    );
  }
}

export default Layout;