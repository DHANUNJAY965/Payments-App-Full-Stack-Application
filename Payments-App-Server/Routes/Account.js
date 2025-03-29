const express = require("express");
const router = express.Router();
const { UserAuth } = require("../Midlewares/UserAuth");
const {User} = require("../Models/User");
const{MiniStatement} = require("../Models/MiniStatement");
const{Account} = require("../Models/Account");
const mongoose = require("mongoose");

// route for getting the user balance

router.get("/balance", UserAuth, async (req, res) => {
  const findaccount = await Account.findOne({ userId: req.userid });
  if (!findaccount) {
    res.json({
      message:
        "some error occcurerd while fectching the data after middleware successed",
    });
  }

  res.json({
    message: "balance fetched successfully",
    balance: findaccount.balance,
  });
});

//route for deleting the account

router.delete("/DeleteAccount", UserAuth, async (req, res) => {
  try {
    const { username, password } = req.body;
     console.log("the req body is ",req.body);
    const finduseraccount = await User.findOne({_id: req.userid });
    if (!finduseraccount) {
      res.json({
        message:
          "User Doesnt Exist",
      });
    }
     else if (
      finduseraccount.username === username &&
      finduseraccount.password === password
    ) {
      await User.findOneAndDelete({ _id: req.userid });
      await Account.findOneAndDelete({ userId: req.userid });
      await MiniStatement.findOneAndDelete({ userId: req.userid });
      res.json({
        message: "Account deleted Successfully",
      });
    } else {
      res.json({message: "Wrong Credientails",
    });
    }
  } 
  catch (error) {
    res.json({
      message: "Internal error in the Database",
      Error: error,
    });
  }
});

router.post("/transferamount", UserAuth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amountTransfer, toID } = req.body;
  try {
    const accountfrom = await Account.findOne({ userId: req.userid }).session(
      session
    );

    if (!accountfrom || accountfrom.balance < amountTransfer) {
      await session.abortTransaction();
      return res
        .json({ message: "Insufficient funds in Your Account" });
    }

    const transferaccount = await Account.findOne({ userId: toID }).session(
      session
    );
    const transaccoudeta=await User.findOne({ _id: toID }).session();

    if (!transferaccount) {
      await session.abortTransaction();
      return res
        .json({ message: "Invalid the account doesnt exist" });
    }

    await Account.updateOne(
      { userId: req.userid },
      { $inc: { balance: -amountTransfer } }
    ).session(session);
    await MiniStatement.updateOne(
      { userId: req.userid },
      {
        $push: {
          transactions: {
            amount: amountTransfer,
            TransType: "Debited",
            ByWhom: "By You",
          },
        },
      }
    ).session(session);
    const details = await User.findOne({ _id: req.userid });
    // console.log("the details are : ", details);
    await Account.updateOne(
      { userId: toID },
      { $inc: { balance: amountTransfer } }
    ).session(session);
    await MiniStatement.updateOne(
      { userId: toID },
      {
        $push: {
          transactions: {
            amount: amountTransfer,
            TransType: "Credited",
            ByWhom: details.firstname,
          },
        },
      }
    ).session(session);

    //commiting the transaction
    await session.commitTransaction();

    res.json({
      message: `Rupees ${amountTransfer} transferred succesfully to ${transaccoudeta.firstname}`,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    res.json({ message: "Internal Server Error" });
  }
});

module.exports = router;
