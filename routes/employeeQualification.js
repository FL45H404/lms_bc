
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getQualification,
  getQualificationById,
  addQualification,
  updateQualificationById,deleteQualificationById

} = require('../controllers/qualificationController');

router.get('/qualification', getQualification);
router.get('/qualification/:employee_qualification_id', getQualificationById);
router.post('/qualification',  addQualification);
router.put('/qualification/:employee_qualification_id', updateQualificationById);
router.delete('/qualification/:employee_qualification_id', deleteQualificationById);


 module.exports = router;