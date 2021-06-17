var express = require('express');
var authController = require('../controllers/authController');
var smsController = require('../controllers/codeController');

var authRoutes = express.Router();

authRoutes.post("/varifacation", smsController.varifacationCode);
authRoutes.post("/sendSms", smsController.sendTxt);
authRoutes.get("/getUser/:phoneNumber", authController.getUser);

module.exports = authRoutes;