var express = require('express');
var router = express.Router();

/* GET coleccion page. */
router.get('/', function(req, res, next) {
  res.render('coleccion', {
    isColeccion:true
  });
});

module.exports = router;
