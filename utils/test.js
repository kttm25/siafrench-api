const axios = require('axios');
const token = "9b71d569094b75d7f023805ec9dcb2d4"
const link = 'http://127.0.0.1:9880/hostdb/active'
const data = {
    encryptionpassword:'password',
    force:false
};
const options = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',          
      'User-Agent': 'Sia-Agent'
    },
}

/*axios.post(link, data, options)
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
});*/

config = {
  method: 'get',
  url: link,
  headers: {
    'User-Agent': 'Sia-Agent'
  },
  data: data
}
axios(config)
  .then(res => {
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.status);
    console.log('Date in Response header:', headerDate);

    const data = res.data;

    console.log(data)
  })
  .catch(err => {
    console.log('Error: ', err);
    //console.log(options)
    //console.log(err)
});