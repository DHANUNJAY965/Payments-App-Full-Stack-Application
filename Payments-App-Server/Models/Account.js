const mongoose = require("mongoose");
const {User} = require("../Models/User");
const accountSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: User,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  });

  const Account = mongoose.model("Account", accountSchema);

  module.exports = {
    Account
  };