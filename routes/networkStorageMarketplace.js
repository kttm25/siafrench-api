var express = require('express');
var router = express.Router();
var SiadController = require('../controller/siad')


/* GET network mining profitability data*/
router.get('/storagepricing', function(req, res, next) {
    SiadController.networkStoragePricing(res)
});

module.exports = router;
