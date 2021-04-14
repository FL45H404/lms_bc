
var companyProfileController = require('../controllers/companyProfileController');
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');

const express = require("express");
var app = express();
const router = express.Router();

const {
    getCompanyProfile,
    getCompanyProfileById,
    addCompanyProfile,
    updateCompanyProfileById,
    deleteCompanyProfileById
} = require('../controllers/companyProfileController');

router.get("/companyProfile", getCompanyProfile);
router.get("/companyProfile/:company_id", getCompanyProfileById);
router.post("/companyProfile",addCompanyProfile);
router.put("/companyProfile/:company_id",updateCompanyProfileById);
router.delete("/companyProfile/:company_id",deleteCompanyProfileById);

 module.exports = router;
