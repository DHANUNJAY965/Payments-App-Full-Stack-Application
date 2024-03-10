const express=require("express");
const user=require("./User");
const account = require('./Account');
const router=express.Router();

router.use("/user",user);
router.use("/account",account);

module.exports= 
    router;
