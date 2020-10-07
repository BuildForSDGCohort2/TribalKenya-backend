const functions = require('firebase-functions');
const auth = require('./auth');
const categories = require('./categories')
const places = require('./places');

module.exports = {
  'auth': functions.https.onRequest(auth),
  'categories' : functions.https.onRequest(categories),
  'places' : functions.https.onRequest(places)
};
