const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const serviceAccount = require("./key/key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tribalkenya-ff470.firebaseio.com"
});

const app = express();
app.use(cors({ origin: true }));
const db = admin.firestore();

app.post("/api/categories/add/:email", async (req, res) => {
  try {
    if (!req.body.name || !req.body.poster) {
      return res.status(500).send("No name and country in body");
    }
    const user = await admin.auth().getUserByEmail(req.params.email);
    // Confirm user is admin
    if(user.customClaims && user.customClaims.admin === true) {
      const categories = db.collection('categories');
      const category = {
        name: req.body.name,
        poster: req.body.poster,
      }
      const newCategory = await categories.add(category);
      const results = {
        id: newCategory.id,
        ...category
      }
      return res.status(200).send(results);
    }
    return res.status(500).send('Access Denied');
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
})

app.get("/:userid/admin/add", async (req, res) => {
  try {
    const userId = req.params.userid;
    await admin.auth().setCustomUserClaims(userId, {
      admin: true,
    });
    return res.status(200).send("Admin created");
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

exports.app = functions.https.onRequest(app);
