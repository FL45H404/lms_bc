
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getemployeeExperience,
  getemployeeExperienceById,
  addemployeeExperience,
  updateemployeeExperienceById

} = require('../controllers/employeeExperienceController');

router.get('/employeeExperience', getemployeeExperience);
router.get('/employeeExperience/:employee_experience_id', getemployeeExperienceById);
router.post('/employeeExperience',  addemployeeExperience);
router.put('/employeeExperience/:employee_experience_id', updateemployeeExperienceById);

 module.exports = router;

