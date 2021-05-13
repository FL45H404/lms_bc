
var employeeLeaveController = require('../controllers/employeeLeaveController');
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');

const express = require("express");
var app = express();
const router = express.Router();

const {
  getEmployeeLeave,
  getEmployeeLeaveById,
  addEmployeeLeave,
  updateEmployeeLeaveById,
  deleteEmployeeLeaveById,
  getEmployeeLeaveByManagerId

} = require('../controllers/employeeLeaveController');

router.get('/EmployeeLeave', getEmployeeLeave);
router.get('/EmployeeLeave/:employee_leave_id', getEmployeeLeaveById);
router.post('/EmployeeLeave',  addEmployeeLeave);
router.put('/EmployeeLeave/:employee_leave_id', updateEmployeeLeaveById);
router.delete('/EmployeeLeave/:employee_leave_id', deleteEmployeeLeaveById);
router.get('/EmployeeLeaveByManager/:manager_id', getEmployeeLeaveByManagerId)

 module.exports = router;