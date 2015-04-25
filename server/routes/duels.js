var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Duel = require('../models/Duel.js');
var Vote = require('../models/Vote.js');
/*
GET /duels listing. 
returns a list of all the duels id
*/
router.get('/', function(req, res, next) {
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
router.get('/user/:userid/status/:status', function(req, res, next) {
  function subtractArrays(a,b) {
    var subtacted = [];
    a.forEach(function(element) {
      if (b.indexOf(element) == -1) subtacted.push(element);
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
router.get('/status/:status', function(req, res, next) {
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
router.get('/:id', function(req, res, next) {
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
router.put('/:id', function(req, res, next) {
  ///todo: request body sanity check
  Duel.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
      if (err) return next(err);
      res.json(post);
  });
});

/* POST /duels */
router.post('/', function(req, res, next) {
  Duel.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /duels/:id */
router.delete('/:id', function(req, res, next) {
  Duel.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;