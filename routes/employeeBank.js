
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getemployeeBank,
  getemployeeBankById,
  addemployeeBank,
  updateemployeeBankById,
  deleteemployeeBankById

} = require('../controllers/employeeBankController');

router.get('/employeeBank', getemployeeBank);
router.get('/employeeBank/:bank_details_id', getemployeeBankById);
router.post('/employeeBank',  addemployeeBank);
router.put('/employeeBank/:bank_details_id', updateemployeeBankById);
router.delete('/employeeBank/:bank_details_id', deleteemployeeBankById);

 module.exports = router;

