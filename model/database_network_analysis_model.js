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
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('NeworkAnalysis', networkAnalysisSchema)