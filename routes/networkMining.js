var express = require('express');
var router = express.Router();
var siadService = require('../services/siad')
var userMiddleware = require("../middleware/user");


/* GET network mining Total Hashrate*/
router.get('/miningtotalhashrate', userMiddleware.AuthenticateKey, function(req, res, next) {
    siadService.networkMiningTotalHashrate(res)
});

/* GET network mining difficulty*/
router.get('/miningdifficulty', userMiddleware.AuthenticateKey, function(req, res, next) {
    siadService.networkMiningDifficulty(res)
});

module.exports = router;
