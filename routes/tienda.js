var express = require('express');
var router = express.Router();

/* GET tienda page. */
router.get('/', function(req, res, next) {
  res.render('tienda', {
    isTienda:true
  });
});

module.exports = router;