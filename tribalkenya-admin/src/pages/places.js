import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import NavBar from '../components/NavBar';
import Alert from '../components/Alert';

const Sites = () => (
  <Layout>
    <SEO title="Sites" />
    <NavBar />
    <Alert />
    <h1>Places</h1>
  </Layout>
);

export default Sites;
