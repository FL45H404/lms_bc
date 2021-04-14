
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getemployeeContacts,
  getemployeeContactsById,
  addemployeeContacts,
  updateemployeeContactsById

} = require('../controllers/employeeContactController');

router.get('/employeeContact', getemployeeContacts);
router.get('/employeeContact/:employee_contact_id', getemployeeContactsById);
router.post('/employeeContact',  addemployeeContacts);
router.put('/employeeContact/:employee_contact_id', updateemployeeContactsById);

 module.exports = router;

