const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) =>{
  res.render('login')
});

//auth logout
router.get('/logout', (req, res) =>{
  res.send('logging out')
});

//auth google
router.get('/google', passport.authenticate('google',{
  scope:['profile']
}));


//callback route for google to redirect to
router.get("/google/redirect",passport.authenticate("google"),function(err, req, res, next){ // custom error handler to catch any errors, such as TokenError
    if (err.name === 'TokenError') {
     res.redirect('/auth/google'); // redirect them back to the login page
    } else {
     // Handle other errors here
    }
  },
  (req, res) => { // On success, redirect back to '/'
    res.redirect('/');
  }


)﻿
module.exports = router
