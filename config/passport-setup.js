const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model')

passport.serializeUser((user,done) => {
  done(null,user.id);
})

passport.deserializeUser((id,done) => {
  User.findById(id).then((user) => {
      done(null,user);
  })

})

passport.use(
  new GoogleStategy({
  //options for GoogleStategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, (req,accessToken, refreshToken, profile, done) => {
  //passport callback function
  User.findOne({googleId: profile.id}).then((currentUser) => {
    if(currentUser){
      //if we have the fucking user then don't save it
        console.log('currentUser is' + currentUser)
        done(null,currentUser)
    }
    else{
      //create the new user
      new User({
          username:profile.displayName,
          googleId: profile.id
      }).save().then((newUser) => {
        console.log('new user created:' + newUser)
        done(null, newUser);
      })
    }
  });


})
);
