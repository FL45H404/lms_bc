
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getemployeeCategory,
  getemployeeCategoryById,
  addemployeeCategory,
  updateemployeeCategoryById,
  deleteCategoryById

} = require('../controllers/employeeCategoryController');

router.get('/employeeCategory', getemployeeCategory);
router.get('/employeeCategory/:employee_category_id', getemployeeCategoryById);
router.post('/employeeCategory',  addemployeeCategory);
router.put('/employeeCategory/:employee_category_id', updateemployeeCategoryById);
router.delete('/employeeCategory/:employee_category_id', deleteCategoryById);
 module.exports = router;

