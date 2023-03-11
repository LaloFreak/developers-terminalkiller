const express = require('express');
const app = express();

app.get('/getdevprojects', (req, res) => {
  res.status(200).send('¡Hola desde tu API de Node.js en Firebase Hosting!');
});

exports.developers = functions.https.onRequest(app);