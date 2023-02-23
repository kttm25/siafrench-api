var httpRequest = require('../utils/httpRequest');

module.exports = class networkPower{
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
/*function Wallet(siad) {
    var self = this;
    this.httpRequest = new httpRequest(siad.host, siad.agent, siad.password);

    // API: /consensus
    this.status = function () {
        return this.httpRequest.normalGetSync('/wallet/init');
    };

    // API: /daemon/stop TODO
    this.validateTransactionset = function () {
        return this.httprequest.post('/consensus/validate/transactionset', {});
    };
}*/

