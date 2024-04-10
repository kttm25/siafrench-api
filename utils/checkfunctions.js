exports.Email = function(email){
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    //console.log('email : ' + !regexExp.test(email));
    if(!regexExp.test(email))
        return true;
    else
        return false;
};

exports.Password = function(password){
    var regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    //console.log('Password : ' + !regPassword.test(password));
    if(!regPassword.test(password))
        return true;
    else
        return false;
};

exports.ApiKey = function(apikey){
    if((apikey == null || apikey == null || apikey == undefined))
        return true;
    else
        return false;
};