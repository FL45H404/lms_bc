
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();


const {
  getLeaveCreditData,
  getLeaveCreditDataByLeaveCrId,
  addLeaveCreditData,
  updateLeaveCreditDataByLeaveCrId

} = require('../controllers/leaveCreditController');

router.get('/leaveCredit', getLeaveCreditData);
router.get('/leaveCredit/:leave_credit_id', getLeaveCreditDataByLeaveCrId);
router.post('/leaveCredit',  addLeaveCreditData);
router.put('/leaveCredit/:leave_credit_id', updateLeaveCreditDataByLeaveCrId);


 module.exports = router;