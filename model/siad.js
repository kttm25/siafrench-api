
var Wallet = require('./wallet');
var NetworkPower = require('./networkPower');

//Define structure of Siad object
module.exports = class Siad{
    constructor(config){
        this.host = config.host,
        this.agent = config.agent,
        this.password = config.password
        this.wallet = new Wallet(this)
        this.networkPower = new NetworkPower(this)
    }


    isConnected(){
        if (this.gateway.status().netaddress) {
            return true;
        }
        return false;
    };

    isSynced(){
        return this.consensus.status().synced;
    };
}
