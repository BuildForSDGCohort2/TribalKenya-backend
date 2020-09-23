import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import NavBar from '../components/NavBar';
import Home from '../components/home-page/Home';
import HomeProvider from '../components/home-page/Home.context';
import Alert from '../components/Alert';

const HomePage = () => (
  <Layout>
    <SEO title="Home" />
    <NavBar />
    <Alert />
    <HomeProvider>
      <div className="p-1">
        <Home />
      </div>
    </HomeProvider>
  </Layout>
);

export default HomePage;
