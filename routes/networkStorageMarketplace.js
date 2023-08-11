var express = require('express');
var router = express.Router();
var SiadController = require('../controller/siad')
var UserController = require("../controller/user");


/* GET network mining profitability data*/
router.get('/storagepricing', UserController.AuthenticateKey, function(req, res, next) {
    SiadController.networkStoragePricing(res)
});

module.exports = router;
