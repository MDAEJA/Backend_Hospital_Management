// logic of user 

const userModel = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const doctorModel = require("../model/doctor");
const patientModel = require("../model/patients");

dotenv.config({path:'./config/config.env'})

const signup = async (req,res)=>{
    try{
        const {firstName,lastName,email,gender,role,phone,password,confirmPassword} = req.body;
        if(!firstName || !lastName || !email || !gender || !role || !phone || !password || !confirmPassword){
            return res.status(400).json({
                status : false,
                message : "REQUIRED ALL FIELDS"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                status : false,
                massage : "PASSWORD AND CONFIRM PASSWORD ARE NOT MATCHING"
            })
        }

        const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const specialchar = /[!@#$%^&*()?.,<>]/.test(password);
    const number  = /[0123456789]/.test(password);

    if(!uppercase || !lowercase || !specialchar || !number){
        return res.status(404).json({
            status :false,
            message : "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        })
    }

    if(phone.length !== 10){
        return res.status(404).json({
            status : false,
            message : "Incorrect Number"
        })
    }

    if(!(email.includes("@"))){
        return  res.status(404).json({
            status : false,
            message : "Incorrect Email"
        })
    }

    const emailIsPresent = await userModel.findOne({email});

    if(emailIsPresent){
        return res.status(404).json({
            status : false,
            message : "Email is already registered, please sign in."
        })
    }


    


        



        const userData = {
            firstName,lastName,email,gender,role,phone,password
        };

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);


       const newData = new userModel({
        ...userData ,password : hash
       })
       await newData.save();

       res.json({
        status : true,
        message : 'USER CREATED SUCCESSFULLY'
       })

    }catch(err){
       console.log(err);
       res.status(404).json({
        status : false,
        message : err.message
       })
    }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email exists
      const checkEmail = await userModel.findOne({ email });
  
      if (!checkEmail) {
        return res.status(404).json({
          status: false,
          message: "Resource not found. Please register first",
        });
      }
  
      console.log(checkEmail);
  
      // Check if password matches
      const checkPassword = checkEmail.password;
      if (!checkPassword) {
        return res.status(500).json({
          status: false,
          message: "Error retrieving password from the database",
        });
      }
      
      console.log(checkPassword);
  
      const isPasswordValid = bcrypt.compareSync(password, checkPassword);
      console.log(isPasswordValid);
  
      if (!isPasswordValid) {
        return res.status(401).json({
          status: false,
          message: "Invalid Email OR Password",
        });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: checkEmail._id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
  
      // Send success response
      return res.json({
        status: true,
        message: "Login Successfully",
        userName : checkEmail.firstName,
        token,
      });
    } catch (err) {
      console.error("Server error:", err);
      return res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  };
const auth = (req,res)=>{
    const get_token = localStorage.getItem(validToken)
    if (get_token !== null) {
        console.log(get_token); // Log the retrieved token if it exists
    } else {
        // Handle case where token does not exist
        console.error("No token found in localStorage");
        // You might want to redirect to login or handle this situation appropriately
    }
}

const addNewDoctor = async (req,res)=>{
    const {firstName,lastName,phone,email,gender,specialization,yearsOfExperience,qualifications,address} = req.body

    try{
        if(!firstName || !lastName || !email || !phone  || !gender  || !specialization  ||
            !yearsOfExperience || !qualifications || !address 
        ){
            return res.status(404).json({
                status : false,
                message : "Required All Fields"
            })
        }

        const findEmail = await userModel.findOne({email});

        if(!findEmail){
            return res.status(404).json({
                status : false,
                message : "CREATE AN ACCOUNT FIRST"
            })
        }
        console.log(findEmail)

        const emailFind = await doctorModel.findOne({email});

        if(emailFind){
            return res.status(404).json({
                status : false,
                message : "Doctor is Already Added!!!"
            })
        }

        const addDoctor = new doctorModel({
            firstName,lastName,email,phone,gender,specialization,yearsOfExperience,qualifications,address
        });
        await addDoctor.save();


        res.json({
           status : true,
           message : "Doctor is Added!!!"
        })


    }catch(err){
        res.json({
            status : false,
            message : err.message
        })
    }

}

const getAllDoctors = async (req,res)=>{
    try{
        const getData = await doctorModel.find();
        if(!getData){
            return res.status(404).json({
                status : false,
                message : "No Doctors Has Been Added!!!"
            })
        }
        res.json({
            status : true,
            getData
        })
    }
    catch(err){
        res.json({
            status : false,
            message : err.message

        })

    }
   
}


const getAllPatients = async (req,res)=>{
    try{
        const getData = await patientModel.find();
        if(!getData){
            return res.status(404).json({
                status : false,
                message : "No Doctors Has Been Added!!!"
            })
        }
        res.json({
            status : true,
            getData
        })
    }
    catch(err){
        res.json({
            status : false,
            message : err.message

        })

    }
   
}




const addNewPatient = async (req,res)=>{
    const {firstName,lastName,phone,email,gender,address,visitingDate} = req.body

    try{
        if(!firstName || !lastName || !email || !phone  || !gender  ||  !address || !visitingDate
        ){
            return res.status(404).json({
                status : false,
                message : "Required All Fields"
            })
        }

        const findEmail = await userModel.findOne({email});

        if(!findEmail){
            return res.status(404).json({
                status : false,
                message : "CREATE AN ACCOUNT FIRST"
            })
        }
        console.log(findEmail)

        const emailFind = await patientModel.findOne({email});

        if(emailFind){
            return res.status(404).json({
                status : false,
                message : "Appointment is Already Added!!!"
            })
        }

        const addPatient = new patientModel({
            firstName,lastName,email,phone,gender,address,visitingDate
        });
        await addPatient.save();


        res.json({
           status : true,
           message : "Appoinment is Added!!!"
        })


    }catch(err){
        res.json({
            status : false,
            message : err.message
        })
    }

}

const userController = {
    signup,login,auth,addNewDoctor,getAllDoctors,addNewPatient,getAllPatients
}

module.exports = userController;