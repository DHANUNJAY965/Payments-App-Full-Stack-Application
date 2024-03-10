const mongoose = require("mongoose");
const {User}=require("../Models/User")
const ministatement = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    transactions: [
      {
        amount: {
          type: Number,
        },
        TransType: {
          type: String,
        },
        ByWhom:{
          type:String
        }
      },
    ],
  });

const MiniStatement = mongoose.model("MiniStatement", ministatement);

module.exports = {
    MiniStatement,
  };
