var express = require('express');
var router = express.Router();
var siadService = require('../services/siad');
var userMiddleware = require("../middleware/user");


/* GET network mining profitability data*/
router.get('/miningprofitability', userMiddleware.AuthenticateKey, function(req, res, next) {
    siadService.networkMiningProfitability(res)
});

router.get('/totalsupply', userMiddleware.AuthenticateKey, function(req, res, next) {
    siadService.networkTotalSupply(res)
});

router.get('/profitspaidbyrenters', userMiddleware.AuthenticateKey, function(req, res, next) {
    siadService.networkProfitsPaidByRenters(res)
});

router.get('/siafundprofitability', userMiddleware.AuthenticateKey, function(req, res, next) {
    siadService.networkSiaFundProfitability(res)
});

module.exports = router;
