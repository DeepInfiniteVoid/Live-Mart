const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: Keys.googleClientID,
      clientSecret: Keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy : true
    },
    async (accessToken, refreshToken, profile, done) => {
      //console.log(profile.displayName);
      const existingUser  = await User.findOne({googleID : profile.id});
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ 
        googleID: profile.id,
        name : profile.name.givenName,
        role : 0
      }).save();
      done(null,profile);
    }
  )
)
