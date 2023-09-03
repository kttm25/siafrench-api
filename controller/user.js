const database = require('../lib/database');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const messages = require("../utils/messages");
const response = require("../utils/response");
const checkfunctions = require("../utils/checkfunctions");

//Create new user
exports.CreateAccount = async function CreateAccount(req, res){
    const email = req.body.email;
    const password = req.body.password;
    if(!checkfunctions.Email(email)){
        response._ErrorResponse(res, messages.incorrect_parameter, messages.incorrect_parameter)
    }else if(!checkfunctions.Password(password)){
        response._ErrorResponse(res, messages.incorrect_parameter, messages.incorrect_parameter)
    }else{
        //Create random API Key for user
        const size = 32;
        const  format = 'base64'
        const apikey = crypto.randomBytes(size).toString(format);
    
        await database.GetDatabaseData({email: email}).then(result => {
            if(result != null){
                response._ErrorConflict(res,  messages.Account_already_exist, messages.error)
            }else{
                //Hash password
                bcrypt.genSalt(10, (err, salt) => {
                    if(err)    
                        response._ErrorResponse(res, err.toString(), messages.error)

                    bcrypt.hash(password, salt, async function(err, hash) {
                        if(err)    
                            response._ErrorResponse(res, err.toString(), messages.error)
                            const maxCallAPI = 10000;
                            // Store hash in the database
                        await database.InsertDatabaseData({email: email, passwordHash: hash, passwordSalt : salt, apiCallRemain: maxCallAPI, apiKey: apikey}).then(result => {
                            response._SuccessResponse(res, {
                                _id : result._id, 
                                email : result.email, 
                                apikey : result.apikey,
                                apiCallRemain: 10000,
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

//authentification of user
exports.Login = async function Login(req, res){
    const email = req.body.email;
    const password = req.body.password;
    if(!checkfunctions.Email(email)){
        response._ErrorResponse(res, messages.incorrect_parameter, messages.incorrect_parameter)
    }else if(!checkfunctions.Password(password)){
        response._ErrorResponse(res, messages.incorrect_parameter, messages.incorrect_parameter)
    }else{
        await database.GetDatabaseData({email: email}).then(result => {
            if(result == null){
                response._ErrorResponse(res,  messages.incorrect_credentials, messages.error)
            }else{
                bcrypt.hash(password, result.passwordSalt, async function(err, hash) {
                    if(err)    
                        response._ErrorResponse(res, err.toString(), messages.error)
                    else if(hash != result.passwordHash)
                        response._ErrorResponse(res,  messages.incorrect_credentials, messages.error)
                    else
                        // Retrieve Data
                        response._SuccessResponse(res, {
                            _id : result._id, 
                            email : result.email, 
                            apikey : result.apiKey,
                            transactions : result.transactions,
                            timestamp: new Date().getTime(),
                        })
                });
            }

        }).catch(error => {
            response._ErrorResponse(res, error.toString(), messages.error)
        })
    }
}

//Apply API key verification to API Route
exports.AuthenticateKey = async function authenticateKey(req, res, next){
    //Check if API auth is enable
    if(process.env.API_AUTHENTIFICATION != "true"){
        next();
    }else{
        //Add API key to headers
        let apiKey = req.header('x-api-key'); 
        
        //Check API Key format
        if(!checkfunctions.ApiKey(apiKey)){
            response._ErrorNotAllowedResponse(res, messages.invalid_api_key, messages.error)
        }else{
            //let user = users.find((user) => user.api_key == api_key);
            await database.FindWithApiKey(apiKey).then((user)=>{
                // find() returns an object or undefined
                if (user) {
                    //If API Call is on max
                    if (user.apiCallRemain <= 0) {
                        //stop if the usage exceeds max API calls
                        response._ErrorMaxAPICallResponse(res, messages.max_api_call, messages.error)
                    } else {
                        //have not hit todays max usage
                        database.UpdateDatabaseData({_id: user._id, apiCallRemain: user.apiCallRemain - 1})
                        next();
                    }
                } else {
                    //Reject request if API key doesn't match
                    response._ErrorNotAllowedResponse(res, messages.invalid_api_key, messages.error)
                }
            }).catch((error)=>{
                response._ErrorResponse(res, error.toString(), messages.error)
            })
        }
    }
};

