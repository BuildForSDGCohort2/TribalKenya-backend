const { db } = require('./admin');
const express = require('express');
const cors = require('cors');

const places = express();
places.use(cors({ origin: true }));

// Add place/site to a category
places.post('/place/add', async (req, res) => {
  try {
    if (!req.body.name || !req.body.description || !req.body.poster || !req.body.geo || !req.body.categoryId) {
      return req.status(500).send('Missing body');
    }
    const places = db.collection('categories').doc(req.body.categoryId).collection('places');
    const placeObj = {
      categoryId: req.body.categoryId,
      name: req.body.name,
      description: req.body.description,
      poster: req.body.poster,
      geo: req.body.geo,
      images: db.collection('images').doc(categoryId),
      location: req.body.location,
      phone: req.body.phone,
      facebook: req.body.facebook,
      instagram: req.body.instagram
    }
    const newPlace = await places.add(placeObj);
    const results = {
      id: newPlace.id,
      ...placeObj
    }
    return res.status(200).send(results);
  } catch (error) {
    return res.status(200).send(error.message);
  }
})
