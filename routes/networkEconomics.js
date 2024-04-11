var express = require('express');
var router = express.Router();
var SiadController = require('../services/siad');
var UserController = require("../middleware/user");


/* GET network mining profitability data*/
router.get('/miningprofitability', UserController.AuthenticateKey, function(req, res, next) {
    SiadController.networkMiningProfitability(res)
});

router.get('/totalsupply', UserController.AuthenticateKey, function(req, res, next) {
    SiadController.networkTotalSupply(res)
});

router.get('/profitspaidbyrenters', UserController.AuthenticateKey, function(req, res, next) {
    SiadController.networkProfitsPaidByRenters(res)
});

router.get('/siafundprofitability', UserController.AuthenticateKey, function(req, res, next) {
    SiadController.networkSiaFundProfitability(res)
});

module.exports = router;
