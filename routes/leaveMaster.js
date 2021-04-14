
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();


const {
  getLeaveData,
  getLeaveDataByLeaveId,
  addLeaveData,
  updateLeaveDataByLeaveId

} = require('../controllers/leaveMasterController');

router.get('/leave', getLeaveData);
router.get('/leave/:leave_id', getLeaveDataByLeaveId);
router.post('/leave',  addLeaveData);
router.put('/leave/:leave_id', updateLeaveDataByLeaveId);


 module.exports = router;