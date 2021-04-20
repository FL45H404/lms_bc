
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  //getCompanyRegistrationNumber,
  getcompanyMaster,
  getcompanyMasterById,
  addcompanyMaster,
  updatecompanyMasterById,
  getcompanyNames
} = require('../controllers/companyMasterController');

//router.get('/getCompanyRegistrationNumber', getCompanyRegistrationNumber);
router.get('/companyMaster', getcompanyMaster);
router.get('/companyMaster/:company_id', getcompanyMasterById);
router.post('/companyMaster',  addcompanyMaster);
router.put('/companyMaster/:company_id', updatecompanyMasterById);
router.get('/companyMasterCompany', getcompanyNames);

 module.exports = router;

