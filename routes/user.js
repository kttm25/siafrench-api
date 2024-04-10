var express = require('express');
var router = express.Router();
var userService = require('../middleware/user')


/* POST create an new user*/
router.post('/createaccount', function(req, res, next) {
    userService.CreateAccount(req, res)
});

/* POST login user*/
router.post('/login', function(req, res, next) {
    userService.Login(req, res)
});

/* GET logout user*/
router.get('/logout', function(req, res, next) {
    userService.Logout(req, res)
});

/* GET lgout user*/
router.get('/getUser', function(req, res, next) {
    userService.user(req, res)
});

module.exports = router;
