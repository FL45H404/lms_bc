
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getQualificationType,
  getQualificationTypeById,
  addQualificationType,
  updateQualificationTypeById,
  getAllQualifications

} = require('../controllers/qualificationTypeController');

router.get('/qualificationType', getQualificationType);
router.get('/qualificationType/:qualification_type_id', getQualificationTypeById);
router.post('/qualificationType',  addQualificationType);
router.put('/qualificationType/:qualification_type_id', updateQualificationTypeById);
router.get('/qualification', getAllQualifications);


 module.exports = router;