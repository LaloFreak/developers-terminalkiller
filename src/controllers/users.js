const router = require('express').Router();
const { googleLogin, sendEmail } = require('../functions');

router.post("/login-with-google", async (req, res) => {
  try {
    const { accessToken } = req.body;
    const response = await googleLogin(accessToken);
    return res.status(200).json({ msg: response });
  } catch (error) {
    return res.status(400).json({ error: error }); 
  }
});

router.post("/sendemail", (req, res) => {
  sendEmail(req.body)
  .then(() => {
    res.status(200).json({ message:{ EN: "Email sent successfully.", ES: "Email enviado exitosamente" } });
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: { EN: "Failed to send email.", ES: "Error al enviar email" } });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  return res.send(user);
});

module.exports = router