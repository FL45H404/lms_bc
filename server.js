const express = require('express')
const app = express()
var cors = require("cors");
const db = require('./db');
const router=require('./routes/leaveRoute')
var cors = require("cors");
//const leaveType = require('./helper/leaveType');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const LeaveRoute = require('./routes/leaveRoute');
const departmentRoute = require('./routes/department');
const designationRoute = require('./routes/designation');
const employeeCategoryRoute = require('./routes/employeeCategory');
const roleRoute = require('./routes/role');
const qualificationTypeRoute = require('./routes/qualificationType');
const qualificationSpecRoute = require('./routes/qualificationSpecialization');
const qualificationRoute = require('./routes/employeeQualification');
const empPerformanceRoute = require('./routes/employeePerformance');
const empPromotionRoute = require('./routes/employeePromotion');
const empAddressRoute = require('./routes/employeeAddress');
const empDependentRoute = require('./routes/employeeDependents');
const empContactRoute = require('./routes/employeeContacts');
const empExperienceRoute = require('./routes/employeeExperience');
const empBankRoute = require('./routes/employeeBank');
const cmpProfileRoute = require('./routes/companyProfile');
const cmpBranchRoute = require('./routes/companyBranch');
const empProfileRoute = require('./routes/employeeProfile');
const leaveMasterRoute = require('./routes/leaveMaster');
const leaveCreditRoute = require('./routes/leaveCredit');
const otpLoginRoute = require('./routes/otpLogin');
const cmpMasterRoute = require('./routes/companyMaster');
const deptMasterRoute = require('./routes/departmentMaster');
const empMasterRoute = require('./routes/employeeMaster');
const employeeProfileRoute = require('./routes/employeeProfile');
const companyProfileRoute = require('./routes/companyProfile');
const holidayMasterRoute = require('./routes/holidayMaster');
const employeeleaveRoute=require('./routes/employeeLeave');
const loginroute=require('./routes/loginMaster');

var corsoption={
origin:'https://hrisui.herokuapp.com','https://hrlms.herokuapp.com',
optionsSuccessStatus:200,
methods:"GET,PUT,POST,DELETE"
}

app.use(cors(corsoption));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    next();
});
app.use("/",employeeleaveRoute);
//app.use("/", LeaveRoute);
app.use("/", employeeProfileRoute);
app.use("/", companyProfileRoute);
app.use("/", departmentRoute);
app.use("/", designationRoute);
app.use("/", employeeCategoryRoute);
app.use("/", roleRoute);
app.use("/", qualificationTypeRoute);
app.use("/", qualificationSpecRoute);
app.use("/", qualificationRoute);
app.use("/", empPerformanceRoute);
app.use("/", empPromotionRoute);
app.use("/", empAddressRoute);
app.use("/", empDependentRoute);
app.use("/", empContactRoute);
app.use("/", empExperienceRoute);
app.use("/", empBankRoute);
app.use("/", cmpProfileRoute);
app.use("/", cmpBranchRoute);
app.use("/", empProfileRoute);
app.use("/", leaveMasterRoute);
app.use("/", leaveCreditRoute);
app.use("/", otpLoginRoute);
app.use("/", cmpMasterRoute);
app.use("/", deptMasterRoute);
app.use("/", empMasterRoute);
app.use("/", holidayMasterRoute);
app.use("/",loginroute);


const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log('server is listening on port', PORT))
