require("dotenv").config()
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, API_URL } = require("../config");

const loginResume = new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${API_URL}/gwerh/auth/resume/google/callback`,
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
    }
    return done(null, userData)
    } catch (err) {
      return done(err)
    }
  })
});

const loginMail = new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${API_URL}/gwerh/auth/mail/google/callback`,   
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
    }
    return done(null, userData)
    } catch (err) {
      return done(err)
    }
  })
});

module.exports = { 
  loginResume,
  loginMail
}
