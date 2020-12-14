var express = require('express');
var router = express.Router();

/* GET multimedia page. */
router.get('/', function(req, res, next) {
  res.render('multimedia', {
    isMultimedia:true
  });
});

module.exports = router;