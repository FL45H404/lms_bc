
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getDesignation,
  getDesignationById,
  addDesignation,
  updateDesignationById

} = require('../controllers/designationController');

router.get('/designation', getDesignation);
router.get('/designation/:designation_id', getDesignationById);
router.post('/designation',  addDesignation);
router.put('/designation/:designation_id', updateDesignationById);

 module.exports = router;