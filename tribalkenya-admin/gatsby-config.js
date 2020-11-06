/* eslint-disable require-unicode-regexp */
module.exports = {
  siteMetadata: {
    title: 'TribalKenya Admin',
    description: 'Admin section for TribalKenya Web App',
    author: '@gatsbyjs'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'tribalkenya-admin',
        short_name: 'tribalkenya',
        start_url: '/',
        background_color: '#434343',
        theme_color: '#434343',
        display: 'minimal-ui',
        icon: 'src/images/flag1.png'
      }
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        // eslint-disable-next-line prefer-named-capture-group
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: 'AIzaSyB8BPdGFKdFvT8GnUfNs6wM6Zko66fCFfc',
          authDomain: 'tribalkenya-78cfa.firebaseapp.com',
          databaseURL: 'https://tribalkenya-78cfa.firebaseio.com',
          projectId: 'tribalkenya-78cfa',
          storageBucket: 'tribalkenya-78cfa.appspot.com',
          messagingSenderId: '998143895886',
          appId: '1:998143895886:web:803fd06de3e16793f2961f',
          measurementId: 'G-DJWP5851WT'
        }
      }
    }

    /*
     * this (optional) plugin enables Progressive Web App + Offline functionality
     * To learn more, visit: https://gatsby.dev/offline
     * `gatsby-plugin-offline`,
     */
  ]
};
