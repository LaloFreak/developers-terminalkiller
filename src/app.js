const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const gwerhRutes = require('./routes/gwerh');
const mail = require('./integrations/mail');

const session = require("express-session");
const nodemailer = require("nodemailer");
const { EMAIL_USER, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN, OAUTH_ACCESS_TOKEN, SESSION_SECRET } = require("./config/config");

const app = express();
app.use(bodyParser.json());
app.use(cors());
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

app.get("/gwerh/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(user);
});

app.use('/gwerh/mail/google', mail)

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

app.post("/gwerh/sendemail", (req, res) => {
  sendEmail(req.body)
  .then(() => {
    res.status(200).json({ message:{ EN: "Email sent successfully.", ES: "Email enviado exitosamente" } });
  })
  .catch((error) => {
  console.error(error);
    res.status(500).json({ message: { EN: "Failed to send email.", ES: "Error al enviar email" } });
  });
});

app.use('/gwerh', gwerhRutes);

module.exports = app;