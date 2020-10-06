const { db } = require('./admin');
const express = require('express');
const cors = require('cors');

const places = express();
places.use(cors({ origin: true }));

// Add place/site to a category
places.post('/place/add', async (req, res) => {
  try {
    if (!req.body.name || !req.body.description || !req.body.poster || !req.body.geo || !req.body.category_id || !req.body.images) {
      return res.status(500).send('Missing body');
    }
    const places = db.collection('categories').doc(req.body.category_id).collection('places');
    let instagram, facebook, phone = '';
    req.body.instagram ? instagram = req.body.instagram : instagram = '';
    req.body.facebook ? facebook = req.body.facebook : facebook = '';
    req.body.phone ? phone = req.body.phone : phone = '';
    const placeObj = {
      category_id: req.body.category_id,
      name: req.body.name,
      description: req.body.description,
      poster: req.body.poster,
      geo: req.body.geo,
      images: [...req.body.images],
      location: req.body.location,
      phone: phone,
      facebook: facebook,
      instagram: instagram
    }
    const newPlace = await places.add(placeObj);
    const results = {
      id: newPlace.id,
      ...placeObj
    }
    return res.status(200).send(results);
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

// Get places/sites in a category
places.get('/:category_id', async (req, res) => {
  try {
    const places = await db.collection('categories').doc(req.params.category_id).collection('places').get();
    let results = [];
    places.forEach((place) => {
      const data = place.data();
      const getPlace = {
        id: place.id,
        ...data
      }
      results.push(getPlace);
    })
    return res.status(200).send(results);
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

module.exports = places;
