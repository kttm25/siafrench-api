exports.Email = function(email){
    if(email == null || email == '' || email == undefined)
        return false;
    else
        return true;
};

exports.Password = function(password){
    if(password == null || password == null || password == undefined)
        return false;
    else
        return true;
};

exports.ApiKey = function(apikey){
    if(apikey == null || apikey == null || apikey == undefined)
        return false;
    else
        return true;
};