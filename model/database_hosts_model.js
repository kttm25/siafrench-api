const mongoose = require('mongoose');
const userSchema = require('./database_user_model')

const hostsSchema = new mongoose.Schema(
  {
    activeHostsNumber : { 
      type: Number,
      required: true
    },
    topSiaHosts: { 
      type: Object,
      required: true
    },
    hosts: [
      {
        acceptingcontracts: {
          type: Boolean,
          required: false,
        },
        maxdownloadbatchsize: {
          type: Number,
          required: false,
        },
        maxduration: {
          type: Number,
          required: false,
        },
        maxrevisebatchsize: {
          type: Number,
          required: false,
        },
        netaddress: {
          type: String,
          required: false,
        },
        remainingstorage: {
          type: Number,
          required: false,
        },
        sectorsize: {
          type: Number,
          required: false,
        },
        totalstorage: {
          type: Number,
          required: false,
        },
        unlockhash: {
          type: String,
          required: false,
        },
        windowsize: {
          type: Number,
          required: false,
        },
        collateral: {
          type: String,
          required: false,
        },
        maxcollateral: {
          type: String,
          required: false,
        },
        baserpcprice: {
          type: String,
          required: false,
        },
        contractprice: {
          type: String,
          required: false,
        },
        downloadbandwidthprice: {
          type: String,
          required: false,
        },
        sectoraccessprice: {
          type: String,
          required: false,
        },
        storageprice: {
          type: String,
          required: false,
        },
        uploadbandwidthprice: {
          type: String,
          required: false,
        },
        ephemeralaccountexpiry: {
          type: Number,
          required: false,
        },
        maxephemeralaccountbalance: {
          type: String,
          required: false,
        },
        revisionnumber: {
          type: Number,
          required: false,
        },
        version: {
          type: String,
          required: false,
        },
        siamuxport: {
          type: String,
          required: false,
        },
        firstseen: {
          type: Number,
          required: false,
        },
        historicdowntime: {
          type: Number,
          required: false,
        },
        historicuptime: {
          type: Number,
          required: false,
        },
        scanhistory: [
          {
            timestamp: {
              type: String,
              required: false,
            },
            success: {
              type: Boolean,
              required: false,
            },
          }
        ],
        historicfailedinteractions: {
          type: Number,
          required: false,
        },
        historicsuccessfulinteractions: {
          type: Number,
          required: false,
        },
        recentfailedinteractions: {
          type: Number,
          required: false,
        },
        recentsuccessfulinteractions: {
          type: Number,
          required: false,
        },
        lasthistoricupdate: {
          type: Number,
          required: false,
        },
        ipnets: {
          type: Array,
          required: false,
        },
        lastipnetchange: {
          type: String,
          required: false,
        },
        publickey: {
          algorithm: {
            type: String,
            required: false,
          },
          key: {
            type: String,
            required: false,
          },
        },
        filtered: {
          type: Boolean,
          required: false,
        },
        publickeystring: {
          type: String,
          required: false,
        },

      }
    ],
    timestamp: { 
      type: Number,
      required: true
    },
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('Hosts', hostsSchema)