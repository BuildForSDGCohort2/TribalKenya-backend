const functions = require('firebase-functions');
const auth = require('./auth');
const categories = require('./categories')

module.exports = {
  'auth': functions.https.onRequest(auth),
  'categories' : functions.https.onRequest(categories)
};
