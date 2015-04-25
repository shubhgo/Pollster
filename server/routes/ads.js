var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Ad = require('../models/Ad.js');

/*
GET /ads listing. 
returns a list of all the ads id
*/
///fix it: for debufing pursposes only. remove later
router.get('/', function(req, res, next) {
  Ad.find(function (err, ads) {
    if (err) return next(err);
    var adIDs = ads.map(function(ad){
      return ad['_id'];
    });
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(adIDs);
  });
});

/* GET /ads/id 
return ad details*/
router.get('/:id', function(req, res, next) {
  Ad.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(post);
  });
});

/* POST /ads */
router.post('/', function(req, res, next) {
  Ad.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /ads/:id */
router.delete('/:id', function(req, res, next) {
  Ad.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /ads/:id 
update the ad with the user vote */
// router.put('/:id', function(req, res, next) {
//   Ad.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
//       if (err) return next(err);
//       res.json(post);
//   });
// });

module.exports = router;