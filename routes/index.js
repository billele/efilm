var express = require('express');
var router = express.Router();
const mdb = require('moviedb')('82248dd3d910226b4bba6bdb2b4f5df4');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mon ciné/film' });
});

module.exports = router;
