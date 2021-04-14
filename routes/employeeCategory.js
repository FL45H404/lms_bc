
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getemployeeCategory,
  getemployeeCategoryById,
  addemployeeCategory,
  updateemployeeCategoryById

} = require('../controllers/employeeCategoryController');

router.get('/employeeCategory', getemployeeCategory);
router.get('/employeeCategory/:employee_category_id', getemployeeCategoryById);
router.post('/employeeCategory',  addemployeeCategory);
router.put('/employeeCategory/:employee_category_id', updateemployeeCategoryById);

 module.exports = router;

