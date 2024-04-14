var express = require('express');
var router = express.Router();
var siadService = require('../services/siad')
var userService = require("../middleware/user");


/* GET network mining profitability data*/
router.get('/storagepricing', userService.AuthenticateKey, function(req, res, next) {
    siadService.networkStoragePricing(res)
});

module.exports = router;
