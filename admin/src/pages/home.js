import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import NavBar from '../components/NavBar';
import Home from '../components/home-page/Home';

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <NavBar />
    <Home />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default SecondPage;
