const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: false,
    default:0
  },
  qualifications: {
    type: String,
    required: true
  },
  
  address: {
    type: String,
    required : true
  },
  
 
});

const doctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = doctorModel;
