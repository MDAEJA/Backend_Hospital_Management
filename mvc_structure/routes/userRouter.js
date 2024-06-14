const express = require("express");
const userController = require("../controller/userController");
const authMiddleWare = require("../../middleware/authmiddleware");

const routers = express.Router();

routers.post("/signup",userController.signup)
routers.post("/login",userController.login)
routers.post("/auth",authMiddleWare)
routers.post("/addnew/doctor",userController.addNewDoctor);
routers.get("/getdoctor",userController.getAllDoctors)
routers.post("/addnew/pateint",userController.addNewPatient)
routers.get("/getpateint",userController.getAllPatients)


module.exports = routers;