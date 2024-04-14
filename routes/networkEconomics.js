var express = require('express');
var router = express.Router();
var siadService = require('../services/siad');
var userService = require("../middleware/user");


/* GET network mining profitability data*/
router.get('/miningprofitability', userService.AuthenticateKey, function(req, res, next) {
    siadService.networkMiningProfitability(res)
});

router.get('/totalsupply', userService.AuthenticateKey, function(req, res, next) {
    siadService.networkTotalSupply(res)
});

router.get('/profitspaidbyrenters', userService.AuthenticateKey, function(req, res, next) {
    siadService.networkProfitsPaidByRenters(res)
});

router.get('/siafundprofitability', userService.AuthenticateKey, function(req, res, next) {
    siadService.networkSiaFundProfitability(res)
});

module.exports = router;
