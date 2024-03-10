// backend/routes/user.js
const express = require("express");
const zod = require("zod");
const router = express.Router();
require("dotenv").config();
const { User } = require("../Models/User");
const { MiniStatement } = require("../Models/MiniStatement");
const { Account } = require("../Models/Account");
const secreat = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const { UserAuth } = require("../Midlewares/UserAuth");
const nodemailer = require("nodemailer");
const { Otpverification } = require("../Mails/Otpverification.js");
const { ForgotPassword } = require("../Mails/ForgotPassword.js");
//route for user signup and genrating the jwt token
const signupvalidate = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});
const verificationCodes = {};
const emailvalidate = zod.object({
  username: zod.string().email(),
});
router.post("/generate-otp", async (req, res) => {
  const { username } = req.body;
  const suceess = emailvalidate.safeParse(req.body);
  console.log("the measssage is : ", suceess);
  if (!suceess.success) {
    return res.json({
      message: "Enter Email Address Correctly",
    });
  }
  const existuser = await User.findOne({ username: req.body.username });
  if (existuser) {
    return res.json({
      message: "Email already taken",
    });
  }
  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Store the OTP and its timestamp
  verificationCodes[username] = {
    otp,
    timestamp: Date.now(),
  };

  await Otpverification(username, otp)
  .then(()=>
  {
     return res.status(200).json({ message: "OTP send to your mail", otp: otp });
  })
  .catch(()=>{
   return res.json({ message: "OTP not sent successfully." });
  })
});


router.post("/signup", async function (req, res) {
  const valide = signupvalidate.safeParse(
    req.body.username,
    req.body.password,
    req.body.firstname,
    req.body.lastname
  );

  if (!valide) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
 
    try{

      const useresponse = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });

      // Save the user document to the database
      await useresponse.save();

      const userid = useresponse._id;

      const randomFloat = (1 + Math.random() * 9999).toFixed(3);
      const account = await Account.create({
        userId: userid,
        balance: parseFloat(randomFloat),
      });
      const mini = await MiniStatement.create({
        userId: userid,
      });
      //  console.log("the mini is : ",mini);
      const token = jwt.sign(
        {
          userid,
        },
        secreat
      );

      res.json({
        message: "Registered Successfully",
        token: token,
      });
    }
    catch(err){
     return res.json({
        message:"Something went wrong with server please try again later"
      })
    }
});

//route for user signin  and generating the jwt token
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userid: user._id,
      },
      secreat
    );

    res.json({
      message: "Sigined Successfully",
      token: token,
    });
    return;
  }

  return res.json({
    message: "Wrong credentials or Email does not exist",
  });
});

//route for updating user details  

const updatedetails = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/Userupdate", UserAuth, async (req, res) => {
  const deatils = updatedetails.safeParse(req.body);
  if (!deatils) {
    res.status(411).json({
      message: "Error while updating details",
    });
  }

  const userupdated = await User.updateOne({ _id: req.userid }, req.body);
  // console.log("updateed details are : " + userupdated);
  if (req.body.password)
    res.json({
      message: "Password Updated Successfully",
    });
  else {
    res.json({
      message: "Profile Details Updated",
    });
  }
});

// route for getting the user details

router.get("/Userdetails", UserAuth, async (req, res) => {
  const userdetails = await User.findOne({ _id: req.userid });

  res.json({
    message: "User details Updated successfully",
    fname: userdetails.firstname,
    lname: userdetails.lastname,
    uname: userdetails.username,
    pass: userdetails.password,
  });
});

// route for getting the transaction history
router.get("/TransactionHistory", UserAuth, async (req, res) => {
  const id = req.userid;
  try {
    const data = await MiniStatement.find({ userId: id }, { transactions: 1 });
    // console.log("The transactions history is : " + data[0].transactions);
    res.json({
      message: "Transaction history",
      history: data[0].transactions,
    });
  } catch (err) {
    res.json({
      message: "falied to load transaction history",
      error: err,
    });
  }
});

// route for filtering the details of the user based on query given in the urls

router.get("/users", async (req, res) => {
  const userfil = req.query.filter || "";

  const filteredusers = await User.find({
    $or: [
      {
        firstname: {
          $regex: userfil,
        },
      },

      {
        lastName: {
          $regex: userfil,
        },
      },
    ],
  });

  res.json({
    users: filteredusers.map((users) => {
      return {
        firstname: users.firstname,
        lastname: users.lastname,
        username: users.username,
        _id: users._id,
      };
    }),
  });
});

// route for forget password
const validtemail = zod.object({
  email: zod.string().email(),
});
router.post("/forgetpassword", async (req, res) => {
  const { email } = req.body;
  const validate = validtemail.safeParse(req.body);
  if (!validate.success) {
    return res.json({
      message: "Enter mail correctly",
    });
  }
  const usernamedetails = await User.findOne({ username: email });
  // console.log(usernamedetails);
  if (usernamedetails) {
    await ForgotPassword(usernamedetails.username, usernamedetails.password);
    return res.json({
      message: "Password Sent to Your Mail",
    });
  } else {
    return res.json({
      message: "Email not registered!",
    });
  }
});

module.exports = router;
