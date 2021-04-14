
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getemployeeDependents,
  getemployeeDependentsById,
  addemployeeDependents,
  updateemployeeDependentsById

} = require('../controllers/employeeDependentsController');

router.get('/employeeDependents', getemployeeDependents);
router.get('/employeeDependents/:employee_dependent_id', getemployeeDependentsById);
router.post('/employeeDependents',  addemployeeDependents);
router.put('/employeeDependents/:employee_dependent_id', updateemployeeDependentsById);

 module.exports = router;

