
// var bodyParser = require('body-parser');
// const httpCodes = require('../helper/httpCodes');
// const express = require("express");
// var app = express();
// const router = express.Router();


// const {
//   //getLeaveData,
//   getHolidayMaster,
//   getHolidayDataByHolidayId,
//   addHolidayMaster,
//   updateHolidayDataByHolidayId,
//   deleteHolidayById

// } = require('../controllers/holidayMasterController');

// //router.get('/leave', getLeaveData);
// router.get('/holiday-master/:holiday_id', getHolidayDataByHolidayId);
// router.post('/holiday-master',  addHolidayMaster);
// router.get('/holiday-master',getHolidayMaster)
// router.put('/holiday-master/:holiday_id', updateHolidayDataByHolidayId);
// router.delete('/holiday-master/:holiday_id',deleteHolidayById)


//  module.exports = router;


 var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();


const {
  //getLeaveData,
  getHolidayMaster,
  getHolidayDataByHolidayId,
  addHolidayMaster,
  updateHolidayDataByHolidayId,
  deleteHolidayById

} = require('../controllers/holidayMasterController');

router.get('/holidayMaster/:holiday_id', getHolidayDataByHolidayId);
router.post('/holidayMaster',  addHolidayMaster);
router.get('/holidayMaster',getHolidayMaster)
router.put('/holidayMaster/:holiday_id', updateHolidayDataByHolidayId);
router.delete('/holidayMaster/:holiday_id',deleteHolidayById)


 module.exports = router;

