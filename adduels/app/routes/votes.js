'use strict';

module.exports = function(app) {

var mongoose = require('mongoose');
var Vote = mongoose.model('Vote');

/*
GET /votes listing. 
returns a list of all the votes
*/
///fix it: for debufing pursposes only. remove later
app.get('/api/votes/', function(req, res, next) {
  Vote.find(function (err, votes) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(votes);
  });
});

/*
GET /votes/user/:user
return all the duel IDs the user has voted on.
*/
app.get('/api/votes/user/:userid', function(req, res, next) {
  Vote.find({voterID: req.params.userid}, function (err, votes) {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var duelIDs = votes.map(function(vote){
      return vote['duelID'];
    });
    res.json(duelIDs);
  });
});

/*
POST /votes 
add new votes as they are casted
*/
app.post('/api/votes/', function(req, res, next) {
  Vote.create(req.body, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(post);
  });
});

/* DELETE /votes/:id */
app.delete('/api/votes/:id', function(req, res, next) {
  Vote.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(post);
  });
});

/* PUT /votes/:id 
update votes after a winner is decided
*/
app.put('/api/votes/:id', function(req, res, next) {
  Vote.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
      if (err) return next(err);
      res.statusCode = 200;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json(post);
  });
});

};