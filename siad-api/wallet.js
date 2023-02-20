var httpRequest = require('../utils/httpRequest');

function Wallet(siad) {
    var self = this;
    this.httpRequest = new httpRequest(siad._host, siad._agent, siad._password);

    // API: /consensus
    this.status = function () {
        return this.httpRequest.normalGetSync('/wallet/init');
    };

    // API: /daemon/stop TODO
    this.validateTransactionset = function () {
        return this.httprequest.post('/consensus/validate/transactionset', {});
    };
}

module.exports = Wallet;