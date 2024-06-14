
const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./DBCONNECTION/dbconnection.js");
const routers = require("./mvc_structure/routes/userRouter.js");
const cors = require("cors");
const app = express();


dotenv.config({path:"./config/config.env"});

app.use(express.json())
app.use(cors());

app.use('/app',routers);
app.use('/signin',routers);
app.use('/verify',routers);
app.use('/doctor',routers);
app.use('/doctorlist',routers);
app.use('/pateint',routers);
app.use('/pateintlist',routers)



dbConnection()
app.listen(process.env.PORT_NO,()=>{
    console.log("SERVER IS CONNECTED TO PORT ",process.env.PORT_NO)
})