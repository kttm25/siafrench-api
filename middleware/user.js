const { InsertDatabaseData, GetDatabaseSingleRecord, FindWithApiKey, UpdateDatabaseData } = require('../lib/database');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const messages = require("../utils/messages");
const response = require("../utils/response");
const checkfunctions = require("../utils/checkfunctions");
const jwt = require('jsonwebtoken');
const model = require('../model/database_user_model')

const JWTtokenExpirationTime = process.env.JWT_TOKEN_EXPIRATION_TIME

//Create new user
exports.CreateAccount = async function CreateAccount(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (checkfunctions.Email(email)) {
        response._ErrorResponse(res, messages.incorrect_parameter, messages.incorrect_parameter)
    } else if (checkfunctions.Password(password)) {
        response._ErrorResponse(res, messages.incorrect_parameter, messages.incorrect_parameter)
    } else {
        //Create random API Key for user
        const size = 32;
        const format = 'base64'
        const apikey = crypto.randomBytes(size).toString(format);

        await GetDatabaseSingleRecord({ email: email.toLowerCase() }, model).then(result => {
            if (result != null) {
                response._ErrorConflict(res, messages.account_already_exist, messages.error)
            } else {
                //Hash password
                bcrypt.genSalt(10, (err, salt) => {
                    if (err)
                        response._ErrorResponse(res, err.toString(), messages.error)

                    bcrypt.hash(password, salt, async function (err, hash) {
                        if (err)
                            response._ErrorResponse(res, err.toString(), messages.error)
                        const maxCallAPI = 10000;
                        // Store hash in the database
                        await InsertDatabaseData({ email: email.toLowerCase(), passwordHash: hash, passwordSalt: salt, apiCallRemain: maxCallAPI, apiKey: apikey }, model).then(result => {
                            response._SuccessResponse(res, {
                                _id: result._id,
                                email: result.email,
                                apikey: result.apikey,
                                apiCallRemain: result.apiCallRemain,
                                timestamp: new Date().getTime(),
                            })
                        }).catch(error => {
                            response._ErrorResponse(res, error.toString(), messages.error)
                        })
                    });
                })
            }
        })
    }
}

//Create new user
exports.CreateAdminAccount = async function CreateAdminAccount(req, res) {
    //Create random API Key for user
    const size = 32;
    const format = 'base64'
    const apikey = crypto.randomBytes(size).toString(format);
    const email = "admin@admin.org";
    const password = process.env.JWT_SECRET_KEY;

    if(process.env.DATABASE_ENABLE != 'true')
        return false;

    await GetDatabaseSingleRecord({ email: email.toLowerCase() }, model).then(result => {
        if (result != null) {
            //console.log('admin account doin)
            console.log(`Admin API key is : ${result.apiKey}`);
            console.log(`Admin API Remain Call : ${result.apiCallRemain}`);
        } else {
            //Hash password
            bcrypt.genSalt(10, (err, salt) => {
                if (err)
                    console.log(`Failed to generate Admin salt : ${err}`)

                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err)
                        console.log(`Failed to hash password : ${err}`)

                    const maxCallAPI = 1000000000;
                    // Store hash in the database
                    await InsertDatabaseData({ email: email.toLowerCase(), passwordHash: hash, passwordSalt: salt, apiCallRemain: maxCallAPI, apiKey: apikey }, model).then(result1 => {

                        console.log(`Admin API key is : ${result1.apiKey}`);
                        console.log(`Admin API Remain Call : ${result1.apiCallRemain}`);
                    }).catch(error => {
                        console.log(error);
                    })
                });
            })
        }
    })
}

//authentification of user
exports.Login = async function Login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (checkfunctions.Email(email)) {
        response._ErrorResponse(res, messages.incorrect_parameter, messages.incorrect_parameter)
    } else if (checkfunctions.Password(password)) {
        response._ErrorResponse(res, messages.incorrect_parameter, messages.incorrect_parameter)
    } else {
        await GetDatabaseSingleRecord({ email: email.toLowerCase() }, model).then(result => {
            if (result == null) {
                response._ErrorResponse(res, messages.incorrect_credentials, messages.error)
            } else {
                bcrypt.hash(password, result.passwordSalt, async function (err, hash) {
                    if (err)
                        response._ErrorResponse(res, err.toString(), messages.error)
                    else if (hash != result.passwordHash)
                        response._ErrorResponse(res, messages.incorrect_credentials, messages.error)
                    else {
                        const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET_KEY, {
                            expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME | '1d',
                        });
                        // Retrieve Data
                        //Set cookies header
                        //Set Response data
                        response._SuccessResponse(
                            res.cookie("access_token", token, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === "production",
                            }),
                            {
                                _id: result._id,
                                email: result.email,
                                apikey: result.apiKey,
                                transactions: result.transactions,
                                timestamp: new Date().getTime(),
                            }
                        )
                    }
                });
            }

        }).catch(error => {
            response._ErrorResponse(res, error.toString(), messages.error)
        })
    }
}

//logout user
exports.Logout = async (req, res, next) => {
    return response._SuccessResponse(res.clearCookie("access_token"), {}, messages.logout_success)
}

exports.user = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return response._ErrorNotAllowedResponse(res, messages.user_not_logged, messages.error)
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(data)

        await GetDatabaseSingleRecord({ _id: data._id }, model).then(result => {
            if (result == null) {
                return response._ErrorResponse(res, messages.incorrect_credentials, messages.error)
            } else {
                return response._SuccessResponse(
                    res,
                    {
                        _id: result._id,
                        email: result.email,
                        apikey: result.apiKey,
                        transactions: result.transactions,
                        timestamp: new Date().getTime(),
                    }
                )
            }
        })
    } catch {
        return res.sendStatus(403);
    }
};


//Middleware
//Apply API key verification to API Route
exports.AuthenticateKey = async function authenticateKey(req, res, next) {
    //Check if API auth is enable
    if (process.env.API_AUTHENTIFICATION != "true") {
        next();
    } else {
        //Add API key to headers
        let apiKey = req.header('x-api-key');

        //Check API Key format
        if (checkfunctions.ApiKey(apiKey)) {
            response._ErrorNotAllowedResponse(res, messages.invalid_api_key, messages.error)
        } else {
            //let user = users.find((user) => user.api_key == api_key);
            await FindWithApiKey(apiKey, model).then((user) => {
                // find() returns an object or undefined
                if (user) {
                    //If API Call is on max
                    if (user.apiCallRemain <= 0) {
                        //stop if the usage exceeds max API calls
                        response._ErrorMaxAPICallResponse(res, messages.max_api_call, messages.error)
                    } else {
                        //have not hit todays max usage
                        UpdateDatabaseData({ _id: user._id, apiCallRemain: user.apiCallRemain - 1 }, model)
                        next();
                    }
                } else {
                    //Reject request if API key doesn't match
                    response._ErrorNotAllowedResponse(res, messages.invalid_api_key, messages.error)
                }
            }).catch((error) => {
                response._ErrorResponse(res, error.toString(), messages.error)
            })
        }
    }
};

