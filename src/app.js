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
const { EMAIL_USER, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN, OAUTH_ACCESS_TOKEN } = require("./config/config");

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

app.get("/lalofreak/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(user);
});

app.get("/lalofreak/getdevelop", async (req, res) => {
  res.status(200).send(develop)
});

app.get("/lalofreak/getdesign", async (req, res) => {
  res.status(200).send(design)
});

app.get("/lalofreak/getsound", async (req, res) => {
  res.status(200).send(sound)
});
app.use('/lalofreak/auth/google', auth)

app.use('/lalofreak/mail/google', mail)

app.post("/lalofreak/users/loginwithgoogle", async (req, res) => {
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
    user: EMAIL_USER,
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN,
    accessToken: OAUTH_ACCESS_TOKEN,
  },
});

const sendEmail = (formData) => {
  const { name, email, message } = formData;
  const mailOptions = {
    from: email,
    to: EMAIL_USER,
    subject: `New message from ${name} (${email})`,
    text: message,
  };
  return transporter.sendMail(mailOptions);
};


app.post("/lalofreak/sendemail", (req, res) => {
  sendEmail(req.body)
  .then(() => {
    res.status(200).json({ message:{ EN: "Email sent successfully.", ES: "Email enviado exitosamente" } });
  })
  .catch((error) => {
  console.error(error);
    res.status(500).json({ message: { EN: "Failed to send email.", ES: "Error al enviar email" } });
  });
});

module.exports = app;