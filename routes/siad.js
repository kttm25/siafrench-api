var express = require('express');
var router = express.Router();
var Siad = require('../lib/siad')
var siad = new Siad({
    host: 'http://localhost:9980',
    agent: '',
    password: '9b71d569094b75d7f023805ec9dcb2d4'
    // other arguments
})

siad.wallet.statut(function (error, consensusStatus) {
    if (error) {
    // do something
    }
    else {
        console.log(consensusStatus);
    }
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/init', function(req, res, next) {
    res.send("");
});

module.exports = router;
