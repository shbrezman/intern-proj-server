const express = require("express");
const userController = require('../controllers/userController');
const smsController = require('../controllers/codeController');
var userRoutes = express.Router();

const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "cd040200",
  apiSecret: "ofHyW6HzPK2NtZkb"
})


// userRoutes.post("/varifacation", smsController.varifacationCode);
// userRoutes.post("/sendSms", smsController.sendTxt);
userRoutes.post("/create", userController.createUser);
userRoutes.post("/getAllUsers", userController.getAllUsers);
// userRoutes.get("/getUser/:phoneNumber", userController.getUser);
userRoutes.put("/updateUser", userController.updateUser);
userRoutes.put("/updateUsers", userController.updateUsers);


module.exports = userRoutes;
