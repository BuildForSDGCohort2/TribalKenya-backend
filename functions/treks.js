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

// Get public treks
treks.get('/', async(req, res) => {
    try {
        const results = [];
        const treks = await db.collection('treks').where("privacy","==","public").orderBy('date_posted', "desc").get();
        treks.forEach((key) => {
            const data = key.data();
            results.push({...data, id: key.id})
        })
        return res.status(200).send(results);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

// Get private treks
treks.get('/private/:profileId', async(req, res) => {
    try {
        const results = [];
        const treks = await db.collection('treks').where("profileId","==",req.params.profileId).where("privacy","==","private").orderBy('date_posted', "desc").get();
        treks.forEach((key) => {
            const data = key.data();
            results.push({...data, id: key.id})
        })
        return res.status(200).send(results);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

// Delete trek
treks.delete('/delete/:docId', async(req, res) => {
    try {
        await db.collection('treks').doc(req.params.docId).delete();
        return res.status(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

// Update trek
treks.put('/update/:docId', async(req, res) => {
    try {
        await db.collection('treks').doc(req.params.docId).update(req.body);
        return res.status(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = treks;