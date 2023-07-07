const { sendEmail } = require("../functions");

const router = require("express").Router();

router.post("/gwerh/sendemail", (req, res) => {
  sendEmail(req.body)
  .then(() => {
    res.status(200).json({ message:{ EN: "Email sent successfully.", ES: "Email enviado exitosamente" } });
  })
  .catch((error) => {
  console.error(error);
    res.status(500).json({ message: { EN: "Failed to send email.", ES: "Error al enviar email" } });
  });
});

module.exports = router;