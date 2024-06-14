
// db connection
const mongoose = require("mongoose")

const dbConnection = ()=>{
   mongoose.connect("mongodb://localhost:27017/Hospital_Management")
   .then(()=>{
    console.log("SERVER IS CONNECTED WITH DB")
   })
   .catch((err)=>{
    console.log("GETTING AN ERROR WHILE CONNECTING WITH DB :", err)
   })
}

module.exports = dbConnection