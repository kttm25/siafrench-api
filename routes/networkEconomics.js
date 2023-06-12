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

router.get('/profitspaidbyrenters', function(req, res, next) {
    SiadController.networkProfitsPaidByRenters(res)
});

router.get('/siafundprofitability', function(req, res, next) {
    SiadController.networkSiaFundProfitability(res)
});

module.exports = router;
