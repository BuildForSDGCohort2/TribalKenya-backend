const { admin } = require('./admin');
const express = require('express');
const cors = require('cors');

const extras = express();
extras.use(cors({ origin: true }));

// Get intro video
extras.get('/intro-video', async (req, res) => {
    try {
        const storageRef = await admin.storage().ref();
        const image = await storageRef.child('extras/intro.mp4');
        const result = await image.getDownloadURL();
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500);
    }
})

module.exports = extras;