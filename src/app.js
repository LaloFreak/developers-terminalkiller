const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/home", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  // ... Lógica para obtener usuario con ID "id" ...
  res.send(user);
});

module.exports = app;