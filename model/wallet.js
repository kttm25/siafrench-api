var httpRequest = require('../utils/httpRequest');

//Define structure of Wallet Object
module.exports = class Wallet{
    constructor(siad){
        this.httpRequest = new httpRequest(siad);
    }

    async status() {
        //console.log(this)
        return await this.httpRequest.normalPostSync('/wallet/init');
    };

    validateTransactionset(){
        return this.httprequest.post('/consensus/validate/transactionset', {});
    };
}
