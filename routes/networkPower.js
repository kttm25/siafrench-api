var express = require('express');
var router = express.Router();
var SiadController = require('../controller/siad')


/* GET network storage state data*/
router.get('/storagestate', function(req, res, next) {
    SiadController.networkStorageState(res)
});

/* GET network actives hosts data*/
router.get('/activeshosts', function(req, res, next) {
    SiadController.networkActivesHosts(res)
});

/* GET network usage ratio data*/
router.get('/usageratio', function(req, res, next) {
    SiadController.networkUsageRatio(res)
});

module.exports = router;
