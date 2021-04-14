var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');

const express = require("express");
var app = express();
const router = express.Router();

const {
    getEmployeeCode,
    getEmployeeProfile,
    getEmployeeProfileById,
    addEmployeeProfile,
    updateEmployeeProfileById,
    deleteEmployeeProfileById
} = require('../controllers/employeeProfileController');

//router.get("/getemployeeCode",getEmployeeCode);
router.get("/employeeProfile",getEmployeeProfile);
router.get("/employeeProfile/:employee_id",getEmployeeProfileById);
router.post("/employeeProfile",addEmployeeProfile);
router.put("/employeeProfile/:employee_id",updateEmployeeProfileById);
router.put("/deleteEmployeeProfile/:employee_id",deleteEmployeeProfileById);

 module.exports = router;
