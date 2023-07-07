const router = require('express').Router();
const passport = require("passport");
const userSchema = require("../models/User");
const { loginMail } = require('../integrations/google');
const { CLIENT_URL_GWERH } = require("../config/config");

passport.use('login-mail', loginMail);

passport.serializeUser((user, done)=>{
  done(null, user)
});

passport.deserializeUser((user, done)=>{
  done(null, user)
});

router.get('/google', passport.authenticate('login-mail', {state: '200'}))

router.get('/google/callback', passport.authenticate('login-mail', {
  successRedirect: '/gwerh/auth/mail/google/login/success',
  failureRedirect: '/gwerh/auth/mail/google/login/failure'
}))

router.get('/google/login/success', async(req,res) => {
  try {
    const user = req.session.passport.user;
    const existingUser = await userSchema.findOne({ email: user.email });
    const accessToken = user.accessToken;
    
    if (existingUser) {
      existingUser.token = accessToken;
      await existingUser.save();
      return res.status(200).redirect(`${CLIENT_URL_GWERH}/#/mail/auth?token=${accessToken}`);
    }
    const userData = {
      alias: user.name,
      email: user.email,
      method: 'google',
      googlePic: user.photo,
      isVerified: true,
      token: user.accessToken,
    }
    const newUser = new userSchema(userData);
    await newUser.save();
    return res.status(200).redirect(`${CLIENT_URL_GWERH}/#/mail/auth?token=${accessToken}`);

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})

router.get('/google/login/failure', async(req,res) => {
  res.redirect(`${CLIENT_URL_GWERH}`)
})

module.exports = router