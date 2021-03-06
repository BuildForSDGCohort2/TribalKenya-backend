const functions = require('firebase-functions');
const auth = require('./auth');
const categories = require('./categories')
const places = require('./places');
const extras = require('./extras');
const treks = require('./treks');

module.exports = {
  'auth': functions.https.onRequest(auth),
  'categories' : functions.https.onRequest(categories),
  'places' : functions.https.onRequest(places),
  'extras' : functions.https.onRequest(extras),
  'treks' : functions.https.onRequest(treks)
};
