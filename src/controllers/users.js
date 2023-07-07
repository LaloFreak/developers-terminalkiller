const router = require('express').Router();
const { googleLogin } = require('../functions/googleLogin');

router.post("/loginwithgoogle", async (req, res) => {
  try {
    const { accessToken } = req.body
    console.log(accessToken)
    const response = await googleLogin(accessToken)
    res.status(200).json({ msg: response });
  } catch (error) {
    res.status(400).json({ error: error }); 
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(user);
});

module.exports = router