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

// Add a category
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

// Get list of categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await db.collection('categories').get();
    const results = [];
    categories.forEach(key => {
      const data = key.data();
      const category = {
        id: key.id,
        ...data
      }
      results.push(category);
    })
    return res.status(200).send(results);
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

// Get a single category
app.get("/api/categories/:id", async (req, res) => {
  try {
    const category = await db.collection('categories').doc(req.params.id).get();
    const data = category.data();
    const result = {
      id: category.id,
      ...data
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

// Delete a category
app.delete("/api/categories/delete/:id", async (req, res) => {
  try {
    const category = db.collection('categories').doc(req.params.id);
    await category.delete();
    return res.status(200);
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

// Update a category
app.put("/api/category/update/:id", async(req, res) => {
  try {
    const category = db.collection('categories').doc(req.params.id);
    if (req.body.name && req.body.poster) {
      await category.update({
        name: req.body.name,
        poster: req.body.poster
      });
    }
    return res.status(200);
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

app.get("/:userid/admin/add/:adminemail", async (req, res) => {
  try {
    const user = await admin.auth().getUserByEmail(req.params.adminemail);
    if(user.customClaims && user.customClaims.admin === true) {
      await admin.auth().setCustomUserClaims(req.params.userid, {
        admin: true,
      });
      return res.status(200).send("Admin created");
    }
    return res.status(500).send('Access Denied');
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

exports.app = functions.https.onRequest(app);
