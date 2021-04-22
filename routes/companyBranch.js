
var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');
const express = require("express");
var app = express();
const router = express.Router();

const {
  getcompanyBranch,
  getcompanyBranchById,
  addcompanyBranch,
  updatecompanyBranchById,
  getBranchCode,
  deleteBranchById

} = require('../controllers/companyBranchController');

router.get('/companyBranch', getcompanyBranch);
router.get('/companyBranch/:branch_id', getcompanyBranchById);
router.post('/companyBranch',  addcompanyBranch);
router.put('/companyBranch/:branch_id', updatecompanyBranchById);
router.get("/companyBranchCode",getBranchCode);
router.delete('/companyBranch/:branch_id',deleteBranchById)

 module.exports = router;

