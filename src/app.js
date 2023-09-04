const cors = require("cors");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const gwerhRutes = require('./routes/gwerh');
const { SESSION_SECRET } = require("./config");
const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use((req, res, next)=>{
  console.log('req: ', req.originalUrl)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.get("/home", (req, res) => {
  res.status(200).send("¡Hola, mundo!");
});

app.use('/gwerh', gwerhRutes);

module.exports = app;