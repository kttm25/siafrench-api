
var Wallet = require('../siad-api/wallet');

function Siad(config) {
    this._host = config.host || 'http://127.0.0.1:9980';
    this._agent = config.agent || 'Sia-Agent';
    this._password = config.password || /*null*/'9b71d569094b75d7f023805ec9dcb2d4' ;

    this.wallet = new Wallet(this);


    this.isConnected = function(){
        if (this.gateway.status().netaddress) {
            return true;
        }
        return false;
    };

    this.isSynced = function(){
        return this.consensus.status().synced;
    };
}

module.exports = Siad;
