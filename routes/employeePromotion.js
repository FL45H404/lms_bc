
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getEmployeePromotion,
  getEmployeePromotionById,
  addEmployeePromotion,
  updateEmployeePromotionById

} = require('../controllers/employeePromotionController');

router.get('/employeePromotion', getEmployeePromotion);
router.get('/employeePromotion/:promotion_id', getEmployeePromotionById);
router.post('/employeePromotion',  addEmployeePromotion);
router.put('/employeePromotion/:promotion_id', updateEmployeePromotionById);


 module.exports = router;