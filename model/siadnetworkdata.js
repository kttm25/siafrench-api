var httpRequest = require('../utils/httpRequest');

//Define structure of networkPower object
module.exports = class SiaNetworkData{
    constructor(siad){
        this.httpRequest = new httpRequest(siad);
    }

    async activehosts() {
        return await this.httpRequest.normalGetSync('/hostdb/active');
    };

    async consensus() {
        return await this.httpRequest.normalGetSync('/consensus');
    };
    
    async consensusblock(block) {
        return await this.httpRequest.normalGetSync('/consensus/blocks?height=' + block);
    };

    validateTransactionset(){
        return this.httprequest.post('/consensus/validate/transactionset', {});
    };
}

