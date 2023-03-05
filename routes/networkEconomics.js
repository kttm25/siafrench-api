var express = require('express');
var router = express.Router();
var SiadController = require('../controller/siad')


/* GET home page. */
router.get('/miningprofitability', function(req, res, next) {
    SiadController.networkMiningProfitability(res)
});

module.exports = router;
