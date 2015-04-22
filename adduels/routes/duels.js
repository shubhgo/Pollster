var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Duel = require('../models/Duel.js');

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
    res.json(duelIDs);
  });
});

/* GET /duels 
returns all duel ids for the voter. */
router.get('/user/:userid', function(req, res, next) {
  ///todo: add filters: user, status: running 
  Duel.find(function (err, duels) {
    if (err) return next(err);
    var duelIDs = duels.map(function(duel){
      return duel['_id'];
    });
    res.json(duelIDs);
  });
});

/* GET /duels/id 
return duel details*/
router.get('/:id', function(req, res, next) {
  Duel.findById(req.params.id, function (err, post) {
    if (err) return next(err);
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