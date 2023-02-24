var httpRequest = require('../utils/httpRequest');

module.exports = class networkPower{
    constructor(siad){
        this.httpRequest = new httpRequest(siad);
    }

    async activehosts() {
        return await this.httpRequest.normalGetSync('/hostdb/active');
    };

    async consensus() {
        return await this.httpRequest.normalGetSync('/consensus');
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

