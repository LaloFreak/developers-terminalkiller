const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const develop = require('../developers/LaloFreak/develop-api.json');
const sound = require('../developers/LaloFreak/sound-api.json');
const auth = require('./routes/auth/google');
const mail = require('./routes/auth/mail');

const session = require("express-session");
const { loginUserWithGoogle } = require("./controllers/users");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'TU_CLAVE_SECRETA',
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
  res.send("¡Hola, mundo!");
});

app.get("lalofreak/users/:id", (req, res) => {
  const id = req.params.id;
  // ... Lógica para obtener usuario con ID "id" ...
  res.send(user);
});

app.get("lalofreak/getdevelop", async (req, res) => {
  res.status(200).send(develop)
});

app.get("lalofreak/getdesign", async (req, res) => {
  res.status(200).send(design)
});

app.get("lalofreak/getsound", async (req, res) => {
  res.status(200).send(sound)
});
app.use('lalofreak/auth/google', auth)

app.use('lalofreak/mail/google', mail)

app.post("lalofreak/users/loginwithgoogle", async (req, res) => {
  try {
    const response = await loginUserWithGoogle(req, res)
    res.json({ msg: response });
  } catch (error) {
    res.status(400).json({ error: error }); 
  }
});


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    accessToken: process.env.OAUTH_ACCESS_TOKEN,
  },
});

const sendEmail = (formData) => {
  const { name, email, message } = formData;
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name} (${email})`,
    text: message,
  };
  return transporter.sendMail(mailOptions);
};


app.post("lalofreak/sendemail", (req, res) => {
  sendEmail(req.body)
  .then(() => {
    res.status(200).json({ message: "Email sent successfully." });
  })
  .catch((error) => {
  console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  });
});

module.exports = app;