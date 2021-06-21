const express = require("express");
const userController = require('../controllers/userController');
const smsController = require('../controllers/codeController');
var userRoutes = express.Router();

const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "cd040200",
  apiSecret: "ofHyW6HzPK2NtZkb"
})

userRoutes.post("/getAllUsers", userController.getAllUsers);
userRoutes.put("/updateUsers", userController.updateUsers);
userRoutes.put("/updateUser", userController.updateUser);


module.exports = userRoutes;
