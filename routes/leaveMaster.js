
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();


const {
  //getLeaveData,
  getLeaveMaster,
  getLeaveDataByLeaveId,
  addLeaveMaster,
  updateLeaveDataByLeaveId,
  deleteleaveById

} = require('../controllers/leaveMasterController');

//router.get('/leave', getLeaveData);
router.get('/leaveMaster/:leave_id', getLeaveDataByLeaveId);
router.post('/leaveMaster',  addLeaveMaster);
router.get('/leaveMaster',getLeaveMaster)
router.put('/leaveMaster/:leave_id', updateLeaveDataByLeaveId);
router.delete('/leaveMaster/:leave_id',deleteleaveById)


 module.exports = router;

