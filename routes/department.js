
var departmentController = require('../controllers/departmentController');
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');

const express = require("express");
var app = express();
const router = express.Router();

const {
  getDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartmentById,
  deleteDepartmentById

} = require('../controllers/departmentController');

router.get('/department', getDepartments);
router.get('/department/:department_id', getDepartmentById);
router.post('/department',  addDepartment);
router.put('/department/:department_id', updateDepartmentById);
router.delete('/department/:department_id', deleteDepartmentById);

 module.exports = router;