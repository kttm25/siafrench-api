var express = require('express');
var router = express.Router();
var siadService = require('../controller/siad')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/init', function(req, res, next) {
    res.send("1");
});

module.exports = router;
