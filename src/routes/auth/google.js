require("dotenv").config()
const express = require('express')
const router = express.Router()
const passport = require("passport");
const { User } = require("../../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


router.use(express.json())
router.use(express.urlencoded({ extended: true }));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/auth/google/callback`,   
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/plus.me'
      ],
      accessType: 'offline'
    }, function(accessToken, refreshToken, profile, done) {
      process.nextTick(async function () {
      try {
        const userData = {
          name: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          accessToken: accessToken,
        }
        return done(null, userData)
        } catch (err) {
          return done(err)
        }
      })
    }
  )
);

passport.serializeUser((user, done)=>{
    done(null, user)
});

passport.deserializeUser((user, done)=>{
    done(null, user)
});

router.get('/', passport.authenticate('google', {state: '200'}))

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/auth/google/login/success',
  failureRedirect: '/auth/google/login/failure'
}))

router.get('/login/success', async(req,res) => {
  const user = req.session.passport.user
  console.log('la reqqqq', user)

  const accessToken = user.accessToken;
  const existingUser = await User.findOne({
      where: {
          email: user.email,
      }
  });

  if (existingUser) {
      await User.update(
          { token: user.accessToken },
          { where: { email: user.email, } }
      )
      return res.redirect(`${process.env.CLIENT_URL}/#/lalofreak/auth?token=${accessToken}`)
  }
  await User.create({
    alias: user.name,
    email: user.email,
    method: 'google',
    isVerified: true,
    token: user.accessToken,
    googlePic: user.photo,
  });
  return res.redirect(`${process.env.CLIENT_URL}/#/lalofreak/auth?token=${accessToken}`)
})

router.get('/login/failure', async(req,res) => {
  res.redirect(`${process.env.CLIENT_URL}`)
})

router.get('/logout', (req,res)=>{
  req.logout((err)=>{
    if(err) return;
    res.redirect('/')
  })
})

module.exports = router
