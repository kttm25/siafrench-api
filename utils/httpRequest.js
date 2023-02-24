const axios = require('axios');

class httpRequest{
    constructor(config){
        this.host = config.host;
        this.agent = config.agent;
        this.password = config.password;
    
        this.polls = {};
        this.timeout = null;
    }

    async normalPostSync(path, payload) {
        if (!path) {
            throw errors.InvalidParams();
        }

        const data = {
            encryptionpassword:'password',
            force:false
        };

        const options = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'User-Agent': this.agent
            },
            auth: {
                username: '',
                password: this.password
            },
        }
    
        /*if (this.password) {
            var value = 'Basic ' + btoa(':' + this.password);
            options['headers']['Authorization'] = value;
        }*/

        var response, result;
    
        return await axios.post(this.host + path, data, options)
            .then(res => {
                const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
                console.log('Status Code:', res.status);
                console.log('Date in Response header:', headerDate);
            
                //const users = res.data;
        
                return res.data;
            })
            .catch(err => {
                //console.log('Error: ', err.response.data.message);
                console.log(err)
                //console.log(options)
                //throw errors.ErrorMessage(err.response.data.message);
        });
    };

    async normalGetSync(path, payload) {
        if (!path) {
            throw errors.InvalidParams();
        }

        const data = {
            encryptionpassword:'password',
            force:false
        };

        const config = {
            method: 'get',
            url: this.host + path,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'User-Agent': this.agent
            },
            auth: {
                username: '',
                password: this.password
            }
        }
        
        /*if (this.password) {
            var value = 'Basic ' + btoa(':' + this.password);
            options['headers']['Authorization'] = value;
        }*/

        var response, result;
    
        return await axios(config)
            .then(res => {
                const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
                //console.log('Status Code:', res.status);
                //console.log('Date in Response header:', headerDate);
            
                //const users = res.data;
                //console.log(res.data)
                return res.data;
            })
            .catch(err => {
                //console.log('Error: ', err.response.data.message);
                //console.log(err)
                throw err;
                //throw errors.ErrorMessage(err.response.data.message);
        });
    };
}

module.exports = httpRequest;
//exports.module = httpRequest;




/*
var httpRequest = function (host, agent, password) {
    this.host = host;
    this.agent = agent;
    this.password = password;

    this.polls = {};
    this.timeout = null;
};

httpRequest.prototype.normalPostSync = async function (path, payload) {
    if (!path) {
        throw errors.InvalidParams();
    }

    var options = {
        'headers': {
            'User-Agent': this.agent
        }
    };

    if (this.password) {
        var value = 'Basic ' + btoa(':' + this.password);
        options['headers']['Authorization'] = value;
    }

    var response, result;
    
    await axios.post(link, data, options)
        .then(res => {
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.status);
            console.log('Date in Response header:', headerDate);
        
            const users = res.data;
        
            for(user of users) {
                console.log(`Got user with id: ${user.id}, name: ${user.name}`);
            }
            return result;
        })
        .catch(err => {
            console.log('Error: ', err.response.data.message);
            //console.log(err)
            throw errors.ErrorMessage(err.response.data.message);
    });
};

exports.module = httpRequest;
*/