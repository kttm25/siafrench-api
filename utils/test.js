const axios = require('axios');
const token = "80be61d5dbc06122e84c5f5254b52598"
const link = 'http://127.0.0.1:9880/wallet/init'
const data = {
    encryptionpassword:'password',
    force:false
};
const options = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        
        'User-Agent': 'Sia-Agent'
    },
    auth: {
        username: '',
        password: token
    },
}

axios.post(link, data, options)
  .then(res => {
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.status);
    console.log('Date in Response header:', headerDate);

    const users = res.data;

    for(user of users) {
      console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    }
  })
  .catch(err => {
    console.log('Error: ', err);
    //console.log(options)
    //console.log(err)
});