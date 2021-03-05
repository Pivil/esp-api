var express = require('express');
var router = express.Router();
var test = require('../classes/test');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(test.hello());
});

module.exports = router;
