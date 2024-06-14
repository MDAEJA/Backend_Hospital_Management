const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema({
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
  address: {
    type: String,
    required : true
  },
  visitingDate : {
    type : Date,
    required : true
  },
  
  
 
});

const patientModel = mongoose.model('Patient', patientSchema);

module.exports = patientModel;
