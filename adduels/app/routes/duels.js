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

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(401);
    }
}

/*
GET /duels listing. 
returns a list of all the duels id
*/
//todo: depricate soon
app.get('/api/duels/', ensureAuthenticated, function(req, res, next) {
  Duel.find(function (err, duels) {
    if (err) return next(err);
    var duelIDs = duels.map(function(duel){
      return duel._id;
    });
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(duelIDs);
  });
});

/* GET /duels/voter/status/:status
returns the ids of all the duels
the user(:userid) has not voted on
with the status(:status)
*/
app.get('/api/duels/voter/status/:status', ensureAuthenticated, function(req, res, next) {
  
  var subtractArrays = function(a,b) {
    var subtacted = [];
    a.forEach(function(element) {
      if (b.indexOf(String(element)) === -1) subtacted.push(element);
    });
    return subtacted;
  };

  Duel.find({status: req.params.status}, function (err, duels) {
    if (err) return next(err);
    var duelIDs = duels.map(function(duel) {
      return duel._id;
    });

    Vote.find({voterID: req.user.id}, function (err, votes) {
      if (err) return next(err);
      var votedDuelIDs = votes.map(function(vote) {
        return vote.duelID;
      });

      var toVoteOn = subtractArrays(duelIDs,votedDuelIDs);

      res.statusCode = 200;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json(toVoteOn);
    });
  });
  
});


/* GET /duels/analyst/:analystid/status/:status
returns the ids of all the duels for the analyst (analystid)
the user(:userid) has not voted on
with the status(:status)
*/
///todo: update the analyst api same as the voter api
app.get('/api/duels/analyst/status/:status', ensureAuthenticated, function(req, res, next) {

  Duel.find({analystID: req.user.id, status:req.params.status}, function (err, duels) {
    if (err) return next(err);
    var duelIDs = duels.map(function(duel) {
      return duel._id;
    });
    
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(duelIDs);
  });
});

/* GET /duels/analyst/:analystid
returns all the duels
the analyst(:analystid) 
*/
///todo: update the analyst api same as the voter api
app.get('/api/duels/analyst/', ensureAuthenticated, function(req, res, next) {
  Duel.find({analystID: req.user.id}, function (err, duels) {
    // if (err) return next(err);
    // var duelIDs = duels.map(function(duel) {
    //   return duel._id;
    // });

    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(duels);
  });
});

/*
GET /duels/status/:status
returns all the duels with that status
*/

app.get('/api/duels/status/:status', ensureAuthenticated, function(req, res, next) {

    Duel.find(function (err, duels) {
      if (err) return next(err);
      var duelIDs = duels.map(function(duel){
        return duel._id;
      });
      res.statusCode = 200;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json(duelIDs);
    });

});


/* GET /duels/id 
return duel details*/
app.get('/api/duels/:id', ensureAuthenticated, function(req, res, next) {
  Duel.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(post);
  });
});

/* PUT /duels/:id 
update the duel with the user vote */
app.put('/api/duels/:id', ensureAuthenticated, function(req, res, next) {
    ///todo: request body sanity check
  Duel.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
      if (err) return next(err);
      res.statusCode = 200;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json(post);
  });

});

/* POST /duels */
app.post('/api/duels/', ensureAuthenticated, function(req, res, next) {
  ///todo: additional check: only user type analysts can create duels
  if (String(req.user.role) === 'analyst') {
    Duel.create(req.body, function (err, post) {
      if (err) return next(err);
      res.statusCode = 200;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json(post);
    });
  } else {
    res.sendStatus(403);
  }
});

/* DELETE /duels/:id */
app.delete('/api/duels/:id', ensureAuthenticated, function(req, res, next) {
  ///todo: authentication check
  if (String(req.user.role) === 'analyst') {
    Duel.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.statusCode = 200;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json(post);
    });
  } else {
    res.sendStatus(403);
  }
});

};