var express = require('express');
var router = express.Router();
var siadService = require('../services/siad')
var userMiddleware = require("../middleware/user");


/* GET network storage state data*/
router.get('/storagestate', userMiddleware.AuthenticateKey, function(req, res, next) {
    siadService.networkStorageState(res)
});

/* GET network actives hosts data*/
router.get('/activeshosts', userMiddleware.AuthenticateKey, function(req, res, next) {
    siadService.networkActivesHosts(res)
});

/* GET hosts history data*/
router.get('/hostshistory', userMiddleware.AuthenticateKey, function(req, res, next) {
    siadService.getHostsHistory(res)
});

/* GET network usage ratio data*/
router.get('/usageratio', userMiddleware.AuthenticateKey, function(req, res, next) {
    siadService.networkUsageRatio(res)
});

module.exports = router;
