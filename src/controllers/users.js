const router = require('express').Router();
const { googleLogin } = require('../functions');

router.post("/login-with-google", async (req, res) => {
  try {
    const { accessToken } = req.body;
    const response = await googleLogin(accessToken);
    return res.status(200).json({ msg: response });
  } catch (error) {
    return res.status(400).json({ error: error }); 
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  return res.send(user);
});

module.exports = router