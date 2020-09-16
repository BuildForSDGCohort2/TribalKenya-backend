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

app.get("/test/get", async (req, res) => {
  try {
    const test = db.collection("test");
    const getTest = await test.get();
    const results = []; 
    getTest.forEach((t) => {
      const data = t.data();
      const tObject = {
        id: t.id,
        ...data
      }
      results.push(tObject);
    })
    return res.status(200).send(results);
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
