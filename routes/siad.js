var express = require('express');
var router = express.Router();
var Siad = require('../lib/siad')
var siad = new Siad({
    host: process.env.SIAD_HOST,
    agent: process.env.SIAD_AGENT,
    password: process.env.SIAD_TOKEN
    // other arguments
})

//console.log(siad)
siad.wallet.status(function (error, consensusStatus) {
    if (error) {
    // do something
        console.log(error)
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
    res.send("1");
});

module.exports = router;
