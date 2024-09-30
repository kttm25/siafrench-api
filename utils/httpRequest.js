const axios = require('axios');

// Define Http Handler object
module.exports = class httpRequest{
    constructor(config){
        this.host = config.host;
        this.password = config.password;
    
        this.polls = {};
        this.timeout = null;
    }

    async normalPostSync(path) {
        if (!path) {
            throw errors.InvalidParams();
        }

        const data = {
            encryptionpassword:'password',
            force:false
        };

        const options = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: '',
                password: this.password
            },
        }
    
        return await axios.post(this.host + path, data, options)
            .then(res => {
                const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
                console.log('Status Code:', res.status);
                console.log('Date in Response header:', headerDate);
            
                //const users = res.data;
        
                return res.data;
            })
            .catch(err => {
                console.log(err)
        });
    };

    async normalGetSync(path) {
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
    
        return await axios(config)
            .then(res => {
                const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
                return res.data;
            })
            .catch(err => {
                throw err;
        });
    };
}

