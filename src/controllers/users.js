const router = require('express').Router();
const passport = require("passport");
const userSchema = require("../models/User");
const { CLIENT_URL_LALOFREAK } = require("../config/config");
const { loginResume } = require('../integrations/google');
const { googleLogin } = require('../functions/googleLogin');

router.post("/login-with-google", async (req, res) => {
  try {
    const { accessToken } = req.body
    const response = await googleLogin(accessToken)
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