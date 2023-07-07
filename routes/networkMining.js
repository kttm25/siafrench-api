var express = require('express');
var router = express.Router();
var SiadController = require('../controller/siad')


/* GET network mining Total Hashrate*/
router.get('/miningtotalhashrate', function(req, res, next) {
    SiadController.networkMiningTotalHashrate(res)
});

/* GET network mining difficulty*/
router.get('/miningdifficulty', function(req, res, next) {
    SiadController.networkMiningDifficulty(res)
});

module.exports = router;
