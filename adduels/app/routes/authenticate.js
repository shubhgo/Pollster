'use strict';

module.exports = function(app) {

var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('lodash');
var User = mongoose.model('User');

/*
 * POST /auth/signup
 * create user account | Signup
 */

app.post('/auth/signup', function(req, res, next) {
  var user = new User(req.body);

  user.save(function(err) {
    if (err) return next(err);
    // remove senstive data before login
    user.password = undefined;
    user.salt = undefined;
    
    req.login(user, function(err) {
      if (err) return next(err);
      res.json(user);
    });
  });
});

/*
 * POST /auth/signin
 * login after passport authentication
 */
app.post('/auth/signin',function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
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
 app.get('/auth/signout', function(req, res, next) {
  req.logout();
 });


};