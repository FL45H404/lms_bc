
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getEmployeePerformance,
  getEmployeePerformanceById,
  addEmployeePerformance,
  updateEmployeePerformanceById,
  deleteEmployeePerformanceById

} = require('../controllers/employeePerformanceController');

router.get('/employeePerformance', getEmployeePerformance);
router.get('/employeePerformance/:employee_performance_id', getEmployeePerformanceById);
router.post('/employeePerformance',  addEmployeePerformance);
router.put('/employeePerformance/:employee_performance_id', updateEmployeePerformanceById);
router.delete('/employeePerformance/:employee_performance_id', deleteEmployeePerformanceById);


 module.exports = router;