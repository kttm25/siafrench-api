var express = require('express');
var router = express.Router();
var SiadController = require('../controller/siad')
var UserController = require("../middleware/user");


/* GET network mining Total Hashrate*/
router.get('/miningtotalhashrate', UserController.AuthenticateKey, function(req, res, next) {
    SiadController.networkMiningTotalHashrate(res)
});

/* GET network mining difficulty*/
router.get('/miningdifficulty', UserController.AuthenticateKey, function(req, res, next) {
    SiadController.networkMiningDifficulty(res)
});

module.exports = router;
