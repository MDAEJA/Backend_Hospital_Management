
// db connection
const mongoose = require("mongoose")

const dbConnection = ()=>{
   //mongodb+srv://mdaejazahmed6692:aejaz@hospitalapp.lhpddiz.mongodb.net/
   //mongodb+srv://mdaejazahmed6692:<password>@hospitalapp.lhpddiz.mongodb.net/
   mongoose.connect("mongodb+srv://mdaejazahmed6692:aejaz@hospitalapp.lhpddiz.mongodb.net/")
   .then(()=>{
    console.log("SERVER IS CONNECTED WITH DB")
   })
   .catch((err)=>{
    console.log("GETTING AN ERROR WHILE CONNECTING WITH DB :", err)
   })
}

module.exports = dbConnection