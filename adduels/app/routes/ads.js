'use strict';

/**
 * Module dependencies.
 */
// var passport = require('passport');

module.exports = function(app) {

var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');


/*
GET /ads listing. 
returns a list of all the ads id
*/
///fix it: for debufing pursposes only. remove later
app.get('/api/ads/', function(req, res, next) {
  Ad.find(function (err, ads) {
    if (err) return next(err);
    var adIDs = ads.map(function(ad){
      return ad._id;
    });
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(adIDs);
  });
});

/* GET /ads/id 
return ad details*/
app.get('/api/ads/:id', function(req, res, next) {
  Ad.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(post);
  });
});

/* POST /ads */
app.post('/api/ads/', function(req, res, next) {
  Ad.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /ads/:id */
app.delete('/api/ads/:id', function(req, res, next) {
  Ad.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /ads/:id 
update the ad with the user vote */
// app.put('/:id', function(req, res, next) {
//   Ad.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
//       if (err) return next(err);
//       res.json(post);
//   });
// });
};
