const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { db, admin } = require('./admin');

const auth = express();
auth.use(cors({
    origin: true
}));

// Add admin
auth.get("/:userid/admin/add/:adminemail", async (req, res) => {
    try {
        const user = await admin.auth().getUserByEmail(req.params.adminemail);
        if (user.customClaims && user.customClaims.admin === true) {
            await admin.auth().setCustomUserClaims(req.params.userid, {
                admin: true,
            });
            return res.status(200).send("Admin created");
        }
        return res.status(500).send("Access Denied");
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
});
// Confirm if a username exists
auth.get("/confirm-username/:username", async (req, res) => {
    try {
        const query = await db.collection('profile').where("username", "==", req.params.username).get();
        let result = false;
        query.forEach((doc) => {
            if(doc.exists) {
                result = true
            }
        })
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})
// Create new user
auth.post("/signup", async (req, res) => {
    try {
        const userData = {
            id: req.body.id,
            email: req.body.email,
            username: req.body.username,
            phoneNumber: req.body.phone,
            photoURL: req.body.profile_pic,
            location: '',
            bio: '',
            work: '',
            interests: ''
        }
        await db.collection('profile').doc(userData.id).set(userData);
        return res.status(200).send('Signed up');
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
})

// Get user profile
auth.get('/profile/:userid', async (req, res) => {
    try {
        const userProfile = await db.collection('profile').doc(req.params.userid).get();
        const profile = userProfile.data();
        return res.status(200).send(profile);
    } catch (error) {
        return res.status(500);
    }
})

// Update user profile picture
auth.put('/profile-pic/update/:userid', async(req, res) => {
    try {
        await db.collection('profile').doc(req.params.userid).update({
            photoURL: req.body.photoURL
        });
        return res.status(200);
    } catch (error) {
        return res.status(500);
    }
})

// Update user profile details
auth.put('/profile-details/update/:userid', async(req, res) => {
    try {
        await db.collection('profile').doc(req.params.userid).update(req.body);
        return res.status(200);
    } catch (error) {
        return res.status(500);
    }
})

module.exports = auth;
