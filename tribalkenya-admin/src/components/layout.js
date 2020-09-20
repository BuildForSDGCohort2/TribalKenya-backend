import React from 'react';
import PropTypes from 'prop-types';

import './layout.css';
import './font.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

const Layout = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
