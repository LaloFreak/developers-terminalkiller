const functions = require("firebase-functions");
const app = require("./app");

exports.yourExpressApp = functions.https.onRequest(app);