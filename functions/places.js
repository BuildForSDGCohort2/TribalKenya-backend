const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const serviceAccount = require("./key/key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tribalkenya-ff470.firebaseio.com"
});

const places = express();
places.use(cors({ origin: true }));
const db = admin.firestore();

// Get places/sites

