const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    email:String,
    newpassword:String,
    resetotp:Number,
    resetexpire:Date
});
module.exports=mongoose.model("users",userSchema);
