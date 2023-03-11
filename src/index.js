const express = require('express');
const app = express();

// Define una ruta de ejemplo para tu API
app.get('/api/example', (req, res) => {
  res.send('¡Hola desde tu API de Node.js en Firebase Hosting!');
});

// Exporta tu app de Express como una función
exports.yourExpressApp = functions.https.onRequest(app);
