const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : [3,"PLEASE PROVIDE CORRECT NAME"]
    },
    lastName : {
        type : String,
        required : true,
        minLength : [3,"PLEASE PROVIDE CORRECT NAME"]
    },
    email : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true,
        enum : ["male","female","others"]
    },
    role : {
        type : String,
        required : true,
        enum : ["admin","patient","doctor"]
    },
    phone : {
        type : String,
        required : true,
        minLength : [10,"INCORRECT NUMBER"],
        manLength : [10,"INCORRECT NUMBER"]
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword :{
        type : String,
        required : false
    }
    

})

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;