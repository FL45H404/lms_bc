
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getQualificationSpec,
  getQualificationSpecById,
  addQualificationSpec,
  updateQualificationSpecById

} = require('../controllers/qualificationSpecController');

router.get('/qualificationSpecialization', getQualificationSpec);
router.get('/qualificationSpecialization/:qualification_specialization_id', getQualificationSpecById);
router.post('/qualificationSpecialization',  addQualificationSpec);
router.put('/qualificationSpecialization/:qualification_specialization_id', updateQualificationSpecById);


 module.exports = router;