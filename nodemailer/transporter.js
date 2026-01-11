const nodemailer=require("nodemailer");
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAILUSER,
        pass:process.env.USERPASS
    }
});
module.exports=transporter;