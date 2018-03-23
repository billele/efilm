var express = require('express');
var router = express.Router();
const mdb = require('moviedb')('82248dd3d910226b4bba6bdb2b4f5df4');
var mongoose = require('mongoose');



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mon ciné/film', test: { results: [] } });
});

router.post('/',function functionName(req,res,next) {
  var tests = [];
  var query = req.body.wanted ;
  mdb.searchMovie({ query:query,language: 'fr' }, (err, reponse) => {
    tests = reponse
    console.log(tests);
    res.render('index', {test: tests} );

  });
});

module.exports = router;
