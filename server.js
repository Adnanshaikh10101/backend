const express=require("express");
const app=express();
require("dotenv").config();
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongoose working"))
.catch(err=>console.log(err))
const routes=require("./routes/userroutes");
app.use(express.json());
app.use("/",routes);
app.listen(process.env.PORT);