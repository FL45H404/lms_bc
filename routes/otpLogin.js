var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
    generateSecret,
    generateOtp,
    validateOtp,
    deleteOtp,
    verifyToken
}= require('../controllers/otpLoginController')

router.post('/otp-generate', generateSecret, generateOtp)
router.post('/otp-validate/:secret', validateOtp, deleteOtp)
router.post('/token_verification',verifyToken);
module.exports = router;