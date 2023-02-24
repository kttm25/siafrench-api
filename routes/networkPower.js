var express = require('express');
var router = express.Router();
var SiadController = require('../controller/siad')


/* GET home page. */
router.get('/storagecapacity', function(req, res, next) {
    SiadController.networkStorageCapacity(res)
});

router.get('/init', function(req, res, next) {
    res.send("1");
});

module.exports = router;
