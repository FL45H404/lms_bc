var bodyParser = require('body-parser');
const httpCodes = require('../helper/httpCodes');

const express = require("express");
var app = express();
const router = express.Router();

const {
    getLeave,
    getLeaveByLeaveId,
    addLeave,
    updateLeaveById,
    deleteLeaveById,
    getLeaveByManagerId,
    updateLeaveStatusByLeaveId
} = require('../controllers/leaveController');

router.get("/getLeave", getLeave);
router.get("/getLeave/:leave_id", getLeaveByLeaveId);
router.post("/leave", addLeave);
router.put("/update/:leave_id", updateLeaveById);
router.delete("/delete/:leave_id", deleteLeaveById);
router.get("/leaveByManagerId/:manager_id", getLeaveByManagerId);
router.put("/updateStatus/:leave_id", updateLeaveStatusByLeaveId);

 module.exports = router;