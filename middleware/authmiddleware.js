const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path : '../config/config.env' });

const authMiddleWare = (req,res,next)=>{
    const header = req.headers;
    if(!header.authorization){
        return res.status(404).json({
            status : false,
            message : "Invalid Token"
        })
    }
    try{
        jwt.verify(header.authorization,process.env.SECRET_KEY)
    }
    catch(err){
        res.json({
            status : false,
            message : err.message
        })
    }

    res.json({
        status : true,
        message : "Successfully "
    })


}

module.exports = authMiddleWare
