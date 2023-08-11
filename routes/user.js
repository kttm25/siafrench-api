var express = require('express');
var router = express.Router();
var userController = require('../controller/user')


/* POST create an new user*/
router.post('/createaccount', function(req, res, next) {
    userController.CreateAccount(req, res)
});

/* GET login user*/
router.get('/login', function(req, res, next) {
    userController.Login(req, res)
});

module.exports = router;
