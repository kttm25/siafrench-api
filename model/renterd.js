
var Wallet = require('./wallet');
var SiaNetworkData = require('./renterdnetworkdata');

//Define structure of Siad object
module.exports = class Renterd{
    constructor(config){
        this.host = config.host,
        this.agent = config.agent,
        this.password = config.password
        this.wallet = new Wallet(this)
        this.siaNetworkData = new SiaNetworkData(this)
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
