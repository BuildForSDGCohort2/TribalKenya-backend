const { db } = require('./admin');
const express = require('express');
const cors = require('cors');

const treks = express();
treks.use(cors({ origin: true }));

// Add a trek
treks.post('/add', async (req, res) => {
    try {
        const newItem = {...req.body};
        const result = await db.collection('treks').add({...newItem});
        return res.status(200).send({id: result.id});
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

// Get treks
treks.get('/', async(req, res) => {
    try {
        const results = [];
        const treks = await db.collection('treks').orderBy('date_posted', "desc").get();
        treks.forEach((key) => {
            const data = key.data();
            results.push({...data, id: key.id})
        })
        return res.status(200).send(results);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = treks;