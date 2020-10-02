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

// Create new user
auth.post("/signup", async (req, res) => {
    try {
        const userData = {
            id: req.body.id,
            email: req.body.email,
            username: req.body.username,
            phoneNumber: req.body.phone,
            photoURL: req.body.profile_pic
        }
        await db.collection('profile').doc(userData.id).set(userData);
        return res.status(200).send('Signed up');
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
})

module.exports = auth;