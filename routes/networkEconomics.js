var express = require('express');
var router = express.Router();
var SiadController = require('../controller/siad')


/* GET network mining profitability data*/
router.get('/miningprofitability', function(req, res, next) {
    SiadController.networkMiningProfitability(res)
});

router.get('/totalsupply', function(req, res, next) {
    SiadController.networkTotalSupply(res)
});

module.exports = router;
