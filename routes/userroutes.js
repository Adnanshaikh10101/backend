const express=require("express");
const router=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");
const transporter=require("../nodemailer/transporter");
router.post("/forgot-password",async(req,res)=>{
    const {email}=req.body;
    const user=await User.findOne({email});
    if(!user)return res.json({message:"User not found"});
    const otp=generateotp();
    user.resetotp=otp;
    user.resetexpire=Date.now()+10*60*1000;
    await user.save();
    await transporter.sendMail({
        to:email,
        subject:"Password reset",
        text:`your otp is ${otp}`
    });
    res.json({
        msg:"otp sent to your email"
    });
});
router.post("/reset-password",async(req,res)=>{
    const {email,otp,newpassword}=req.body;
    const user=await User.findOne({
        email,
        resetotp:otp,
        resetexpire:{$gt:Date.now()}
    });
    if(!user)return res.json({msg:"Invalid otp"});
    user.password=bcrypt.hash(newpassword,10);
    user.resetotp=null;
    user.resetexpire=null;
    await user.save();
    res.json({msg:"Password Updated"});

});
function generateotp(){
    return Math.floor(10000+Math.random()*90000);
}
module.exports=router;