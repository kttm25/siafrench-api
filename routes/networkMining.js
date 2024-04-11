var express = require('express');
var router = express.Router();
var siadService = require('../services/siad')
var userService = require("../middleware/user");


/* GET network mining Total Hashrate*/
router.get('/miningtotalhashrate', userService.AuthenticateKey, function(req, res, next) {
    siadService.networkMiningTotalHashrate(res)
});

/* GET network mining difficulty*/
router.get('/miningdifficulty', userService.AuthenticateKey, function(req, res, next) {
    siadService.networkMiningDifficulty(res)
});

module.exports = router;
