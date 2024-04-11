var express = require('express');
var router = express.Router();
var SiadController = require('../services/siad')
var UserController = require("../middleware/user");


/* GET network storage state data*/
router.get('/storagestate', UserController.AuthenticateKey, function(req, res, next) {
    SiadController.networkStorageState(res)
});

/* GET network actives hosts data*/
router.get('/activeshosts', UserController.AuthenticateKey, function(req, res, next) {
    SiadController.networkActivesHosts(res)
});

/* GET network usage ratio data*/
router.get('/usageratio', UserController.AuthenticateKey, function(req, res, next) {
    SiadController.networkUsageRatio(res)
});

module.exports = router;
