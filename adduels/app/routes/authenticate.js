'use strict';

module.exports = function(app) {

var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('lodash');
var User = mongoose.model('User');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
}

function ensureUnAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.sendStatus(403);
  } else {
    next();
  }
}


/*
 * POST /auth/signup
 * create user account | Signup
 */

app.post('/auth/signup', ensureUnAuthenticated, function(req, res, next) {
  if (req.isAuthenticated()) {
    res.status(200);
  }
  var user = new User(req.body);

  user.save(function(err) {
    if (err) return next(err);
    // remove senstive data before login
    user.password = undefined;
    user.salt = undefined;
    
    req.login(user, function(err) {
      if (err) return next(err);
      res.status(201);
      res.json(user);
    });
  });
});

/*
 * POST /auth/signin
 * login after passport authentication
 */
app.post('/auth/signin', ensureUnAuthenticated, function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log('auth.signin failed at err');
      res.status(400).send(info);
    } else if (!user) {
      console.log('auth.signin failed at !user');
      res.status(400).send(info);
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
          console.log('auht.sign failed at req.login()');
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
});

/*
 * GET /auth/signout
 * Logout the user
 */
 app.get('/auth/signout', ensureAuthenticated, function(req, res, next) {
  req.session.destroy();
  req.logout();
  res.json('success');
 });
};