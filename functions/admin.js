const admin = require("firebase-admin");

const serviceAccount = require("./key/key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tribalkenya-78cfa.firebaseio.com",
});

const db = admin.firestore();

module.exports = { db, admin }