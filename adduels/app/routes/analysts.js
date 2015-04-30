'use strict';

module.exports = function(app) {

var mongoose = require('mongoose');
var Analyst = mongoose.model('Analyst');

/*
GET /analyst listing. 
returns a list of all the analyst
*/
///fix it: for debuging pursposes only. remove later
app.get('/api/analyst/', function(req, res, next) {
  Analyst.find(function (err, analysts) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(analysts);
  });
});

/*
POST /analyst 
add new analyst as they are casted
*/
app.post('/api/analyst/', function(req, res, next) {
  Analyst.create(req.body, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(post);
  });
});

/* GET /analyst/:id */
app.get('/api/analyst/:id', function(req, res, next) {
  Analyst.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(post);
  });
});

/* DELETE /analyst/:id */
app.delete('/api/analyst/:id', function(req, res, next) {
  Analyst.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json(post);
  });
});

/* PUT /analyst/:id 
update analyst after a winner is decided
*/
app.put('/api/analyst/:id', function(req, res, next) {
  Analyst.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
      if (err) return next(err);
      res.statusCode = 200;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json(post);
  });
});

};