
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();


const {

  getloginMaster,
  getloginDataByloginId,
  addloginMaster,
  updateloginDataByloginId,
  deleteloginById,
  auth

} = require('../controllers/loginMasterController');


router.get('/register/:login_id', getloginDataByloginId);
router.post('/register',  addloginMaster);
router.get('/register',getloginMaster)
router.put('/register/:login_id', updateloginDataByloginId);
router.delete('/register/:login_id',deleteloginById)
router.post('/login',auth);

 module.exports = router;

