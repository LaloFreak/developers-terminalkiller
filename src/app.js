const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const programming = require('../programming-api.json');
const sound = require('../sound-api.json');
const auth = require('./routes/auth/google')

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next)=>{
  console.log('req: ', req.originalUrl)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.get("/home", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  // ... Lógica para obtener usuario con ID "id" ...
  res.send(user);
});

app.get("/getprogramming", async (req, res) => {
  res.status(200).send(programming)
});

app.get("/getdesign", async (req, res) => {
  res.status(200).send(design)
});

app.get("/getsound", async (req, res) => {
  res.status(200).send(sound)
});
app.use('/auth/google', auth)



module.exports = app;