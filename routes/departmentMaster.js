
var departmentMasterController = require('../controllers/departmentMasterController');
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');

const express = require("express");
var app = express();
const router = express.Router();

const {
  getDepartmentCode,
  getDepartmentMaster,
  getDepartmentMasterById,
  addDepartmentMaster,
  updateDepartmentMasterById

} = require('../controllers/departmentMasterController');

router.get('/departmentMaster', getDepartmentMaster);
router.get('/departmentMaster/:department_id', getDepartmentMasterById);
router.post('/departmentMaster',  addDepartmentMaster);
router.put('/departmentMaster/:department_id', updateDepartmentMasterById);
router.get("/departmentCode",getDepartmentCode);

 module.exports = router;