const mongoose = require('mongoose');
const networkAnalysisSchema = new mongoose.Schema(
  {
    networkTotalSupply: {
      type: Object,
      required: false,
    },
    networkProfitsPaidByRenters: {
      type: Object,
      required: false,
    },
    networkSiafundProfitability: {
      type: Object,
      required: false,
    },
    allMiners: {
      allMiningAddress: [
        {
          minerHash: {
            type: String,
            required: false,
          },
          iteration: {
            type: Number,
            required: false,
          }
        }
      ],
      timestamp: {
        type: String,
        required: false,
      }
    },
    topMiners: {
      topMiningAddress: [
        {
          minerHash: {
            type: String,
            required: false,
          },
          iteration: {
            type: Number,
            required: false,
          }
        }
      ],
      timestamp: {
        type: String,
        required: false,
      }
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('NeworkAnalysis', networkAnalysisSchema)