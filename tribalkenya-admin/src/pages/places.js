import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import NavBar from '../components/NavBar';
import Alert from '../components/Alert';
import PlacesProvider from '../components/places-page/Places.context';
import Places from '../components/places-page/Places';

const Sites = ({ location }) => (
  <Layout>
    <SEO title="Sites" />
    <NavBar />
    <Alert />
    <PlacesProvider>
      <div className="p-1">
        <Places categoryId={location.state.id} />
      </div>
    </PlacesProvider>
  </Layout>
);

export default Sites;
