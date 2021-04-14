
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getEmployeeCode,
  getemployeeMaster,
  getemployeeMasterById,
  addemployeeMaster,
  updateemployeeMasterById

} = require('../controllers/employeeMasterController');

 router.get("/getEmployeeCodee",getEmployeeCode);
router.get('/employeeMaster', getemployeeMaster);
router.get('/employeeMaster/:employee_id', getemployeeMasterById);
router.post('/employeeMasterr',  addemployeeMaster);
router.put('/employeeMaster/:employee_id', updateemployeeMasterById);
//router.get("/getEmployeeCode",getEmployeeCode);


 module.exports = router;

