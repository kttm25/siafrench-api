var httpRequest = require('../utils/httpRequest');

//Define structure of networkPower object
module.exports = class SiaNetworkData{
    constructor(renterd){
        this.httpRequest = new httpRequest(renterd);
    }

    async activehosts() {
        return await this.httpRequest.normalGetSync('/api/bus/hosts');
    };

    async consensus() {
        return await this.httpRequest.normalGetSync('/api/bus/consensus/state');
    };
    
    async consensusblock(block) {
        return await this.httpRequest.normalGetSync('/consensus/blocks?height=' + block);
    };

    validateTransactionset(){
        return this.httprequest.post('/consensus/validate/transactionset', {});
    };
}

