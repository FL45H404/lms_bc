
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getemployeeAddress,
  getemployeeAddressById,
  addemployeeAddress,
  updateemployeeAddressById

} = require('../controllers/employeeAddressController');

router.get('/employeeAddress', getemployeeAddress);
router.get('/employeeAddress/:employee_address_id', getemployeeAddressById);
router.post('/employeeAddress',  addemployeeAddress);
router.put('/employeeAddress/:employee_address_id', updateemployeeAddressById);

 module.exports = router;

