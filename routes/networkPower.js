var express = require('express');
var router = express.Router();
var SiadController = require('../controller/siad')


/* GET home page. */
router.get('/storagestate', function(req, res, next) {
    SiadController.networkStorageState(res)
});

router.get('/activeshosts', function(req, res, next) {
    SiadController.networkActivesHosts(res)
});

router.get('/usageratio', function(req, res, next) {
    SiadController.networkUsageRatio(res)
});

module.exports = router;
