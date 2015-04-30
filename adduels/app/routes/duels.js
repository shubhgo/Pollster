'use strict';

/**
 * Module dependencies.
 */
// var passport = require('passport');

module.exports = function(app) {
	// var Duel = require('../models/Duel.js');
	// var Vote = require('../models/Vote.js');
var mongoose = require('mongoose');
var Duel = mongoose.model('Duel');
var Vote = mongoose.model('Vote');
	// Setting up the duels api
/*
GET /duels listing. 
returns a list of all the duels id
*/
app.get('/api/duels/', function(req, res, next) {
  Duel.find(function (err, duels) {
    if (err) return next(err);
    var duelIDs = duels.map(function(duel){
      return duel['_id'];
    });
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(duelIDs);
  });
});

/* GET /duels/user/:userid/status/:status
returns the ids of all the duels
the user(:userid) has not voted on
with the status(:status)
*/
app.get('/api/duels/user/:userid/status/:status', function(req, res, next) {
  function subtractArrays(a,b) {
    var subtacted = [];
    a.forEach(function(element) {
      if (b.indexOf(String(element)) == -1) subtacted.push(element);
    });
    return subtacted;
  };

  Duel.find({status: req.params.status}, function (err, duels) {
    if (err) return next(err);
    var duelIDs = duels.map(function(duel) {
      return duel['_id'];
    });

    Vote.find({voterID: req.params.userid}, function (err, votes) {
      if (err) return next(err);
      var votedDuelIDs = votes.map(function(vote) {
        return vote['duelID'];
      });

      var toVoteOn = subtractArrays(duelIDs,votedDuelIDs);

      res.statusCode = 200;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json(toVoteOn);
    });
  });
});

/*
GET /duels/status/:status
returns all the duels with that status
*/
app.get('/api/duels/status/:status', function(req, res, next) {
  ///todo: add filters: user, status: running 
  Duel.find(function (err, duels) {
    if (err) return next(err);
    var duelIDs = duels.map(function(duel){
      return duel['_id'];
    });
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(duelIDs);
  });
});


/* GET /duels/id 
return duel details*/
app.get('/api/duels/:id', function(req, res, next) {
  Duel.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(post);
  });
});

/* PUT /duels/:id 
update the duel with the user vote */
app.put('/api/duels/:id', function(req, res, next) {
  ///todo: request body sanity check
  Duel.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
      if (err) return next(err);
      res.statusCode = 200;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json(post);
  });
});

/* POST /duels */
app.post('/api/duels/', function(req, res, next) {
  Duel.create(req.body, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(post);
  });
});

/* DELETE /duels/:id */
app.delete('/api/duels/:id', function(req, res, next) {
  Duel.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(post);
  });
});

};