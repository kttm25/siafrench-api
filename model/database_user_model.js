const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    passwordSalt: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
    apiCallRemain: {
      type: Number,
      required: true,
    },
    transactions: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)