var express = require('express');
var router = express.Router();
var userMiddleware = require('../middleware/user')


/* POST create an new user*/
router.post('/createaccount', function(req, res, next) {
    userMiddleware.CreateAccount(req, res)
});

/* POST login user*/
router.post('/login', function(req, res, next) {
    userMiddleware.Login(req, res)
});

/* GET logout user*/
router.get('/logout', function(req, res, next) {
    userMiddleware.Logout(req, res)
});

/* GET lgout user*/
router.get('/getUser', function(req, res, next) {
    userMiddleware.user(req, res)
});

module.exports = router;
