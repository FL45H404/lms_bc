
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
  updateemployeeMasterById,
  deletemployeeMasterById
} = require('../controllers/employeeMasterController');

 router.get("/getEmployeeCode",getEmployeeCode);
router.get('/employeeMaster', getemployeeMaster);
router.get('/employeeMaster/:employee_id', getemployeeMasterById);
router.post('/employeeMaster',  addemployeeMaster);
router.put('/employeeMaster/:employee_id', updateemployeeMasterById);
router.delete('/employeeMaster/:employee_id', deletemployeeMasterById);
//router.get("/getEmployeeCode",getEmployeeCode);


 module.exports = router;

