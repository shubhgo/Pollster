'use strict';

module.exports = function(app) {

var mongoose = require('mongoose');
var Vote = mongoose.model('Vote');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
}

/*
GET /votes listing. 
returns a list of all the votes
*/
///fix it: for debufing pursposes only. remove later

/** depricated **/

// app.get('/api/votes/', function(req, res, next) {
//   if (!req.user) {
//     res.sendStatus(401);
//   } else {
//     req.user.id
//   }
//   Vote.find(function (err, votes) {
//     if (err) return next(err);
//     res.statusCode = 200;
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.json(votes);
//   });
// });

/*
GET /votes/user/:user
return all the duel IDs the user has voted on.
*/
app.get('/api/votes/', ensureAuthenticated, function(req, res, next) {
  Vote.find({voterID: req.user.id}, function (err, votes) {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    var duelIDs = votes.map(function(vote){
      return vote.duelID;
    });
    res.json(duelIDs);
  });
});

/*
POST /votes 
add new votes as they are casted
*/
app.post('/api/votes/', ensureAuthenticated, function(req, res, next) {
  var voteToCreate = req.body;
  voteToCreate.voterID = req.user.id;
  Vote.create(voteToCreate, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(post);
  });
});

/* DELETE /votes/:id */

app.delete('/api/votes/:id', ensureAuthenticated, function(req, res, next) {
  ///update: analyst check
  Vote.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(post);
  });
});

/* PUT /votes/:id 
update votes after a winner is decided
*/
///TODO: remove api when cron job is added
app.put('/api/votes/:id', ensureAuthenticated, function(req, res, next) {
  ///update: only analyst and cron
  Vote.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
      if (err) return next(err);
      res.statusCode = 200;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json(post);
  });
});
};