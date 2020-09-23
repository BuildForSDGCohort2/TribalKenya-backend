const admin = require("firebase-admin");

const serviceAccount = require("./key/key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tribalkenya-ff470.firebaseio.com",
});

const db = admin.firestore();

module.exports = { db, admin }