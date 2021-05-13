const express = require("express");
const router = express.Router();
const db = require("../db");
const httpCodes = require('../helper/httpCodes');
const moment = require('moment');
const bcrypt = require("bcryptjs");
const sendEmails = require('../helper/sendEmail');
SALT_WORK_FACTOR = 10;
const Speakeasy = require("speakeasy");
const sendMsg = require('../helper/smsApi');
const jwt = require('jsonwebtoken')

// 
  // Created By: Garima Jain 
  // Created Date: 31/10/2020
  // Task: Create company Profile
  // Description: Insert company_name, company_registration_number, company_registration_number,
  // company_registered_address, company_logo, created_by, created_date into company_profile
  // Return: NA
//
 
router.post("/companyProfile",function(req,res){
  var created_date=new Date();
  var data=[
  req.body.company_name,
  req.body.company_registration_number,
  req.body.company_registered_address,
  req.body.company_logo,
  req.body.created_by,
  created_date
]
            db.query('INSERT INTO company_profile(company_name, company_registration_number, company_registered_address, company_logo, created_by, created_date) VALUES ($1, $2, $3, $4, $5, $6)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Get all Company Profile
router.get("/companyProfile", async (req, res) => {
  const sql = await db.query('SELECT * FROM company_profile')
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Get Company Profile by company_id
router.get("/companyProfile/:company_id", async (req, res) => {
  var CompanyId = req.params.company_id;
  data=[CompanyId]
     db.query('SELECT * FROM company_profile where company_id=$1',data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Update Company Profile by company_id
router.put("/companyProfile/:company_id",function(req,res){
  var CompanyId = req.params.company_id;
  var updated_date=new Date();
  var data=[
  req.body.company_name,
  req.body.company_registration_number,
  req.body.company_registered_address, 
  req.body.company_logo,
  req.body.updated_by,
  updated_date,
  CompanyId
]
            db.query('UPDATE company_profile SET company_name=$1, company_registration_number=$2, company_registered_address=$3, company_logo=$4, updated_by=$5, updated_date=$6 WHERE company_id=$7 RETURNING *',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Updated Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Delete Company Profile by company_id 
router.delete("/companyProfile/:company_id", async (req, res) => {
  var CompanyId = req.params.company_id;
    const sql = 'DELETE FROM company_profile WHERE company_id = $1'
    db.query(sql, [CompanyId])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Create new Employee
router.post("/employeeProfile",function(req,res){
  var created_date=new Date();
  var data=[
  req.body.employee_name,
  req.body.role_id,
  req.body.department_id, 
  req.body.designation_id,
  req.body.reporting_manager_id,
  req.body.company_id,
  req.body.date_of_birth,
  req.body.gender,
  req.body.joining_date,
  req.body.nationality,
  req.body.emp_photo,
  req.body.marital_status,
  req.body.blood_group,
  req.body.employee_status,
  req.body.base_location,
  req.body.hr_point_of_contact_id,
  req.body.employee_category_id,
  req.body.aadhar_card_number,
  req.body.pan_card_number,
  req.body.passport_number,
  req.body.passport_issued_date,
  req.body.passport_expiry_date,
  created_date,
  req.body.created_by
]
            db.query('INSERT INTO employee_master (employee_name, role_id, department_id, designation_id, reporting_manager_id, company_id, date_of_birth, gender, joining_date, nationality, emp_photo, marital_status, blood_group, employee_status, base_location, hr_point_of_contact_id, employee_category_id, aadhar_card_number, pan_card_number, passport_number, passport_issued_date, passport_expiry_date, created_date, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Get all Employee
router.get("/employeeProfile", async (req, res) => {
  const sql = await db.query('SELECT * FROM employee_master')
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Get Employee by employee_id
router.get("/employeeProfile/:employee_id", async (req, res) => {
  var EmployeeId = req.params.employee_id;
  data=[EmployeeId]
     db.query('SELECT * FROM employee_master where employee_id=$1',data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Update Employee by employee_id
router.put("/employeeProfile/:employee_id",function(req,res){
  var EmployeeId = req.params.employee_id;
  var updated_date=new Date();
var data=[
  req.body.employee_name,
  req.body.role_id,
  req.body.department_id, 
  req.body.designation_id,
  req.body.reporting_manager_id,
  req.body.company_id,
  req.body.date_of_birth,
  req.body.gender,
  req.body.joining_date,
  req.body.nationality,
  req.body.emp_photo,
  req.body.marital_status,
  req.body.blood_group,
  req.body.employee_status,
  req.body.base_location,
  req.body.hr_point_of_contact_id,
  req.body.employee_category_id,
  req.body.aadhar_card_number,
  req.body.pan_card_number,
  req.body.passport_number,
  req.body.passport_issued_date,
  req.body.passport_expiry_date,
  updated_date,
  req.body.updated_by,
  EmployeeId
]
            db.query('UPDATE employee_master SET employee_name=$1, role_id=$2, department_id=$3, designation_id=$4, reporting_manager_id=$5, company_id=$6, date_of_birth=$7, gender=$8, joining_date=$9, nationality=$10, emp_photo=$11, marital_status=$12, blood_group=$13, employee_status=$14, base_location=$15, hr_point_of_contact_id=$16, employee_category_id=$17, aadhar_card_number=$18, pan_card_number=$19, passport_number=$20, passport_issued_date=$21, passport_expiry_date=$22, updated_date=$23, updated_by=$24 where employee_id=$25 RETURNING *',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Delete Employee by employee_id 
router.delete("/employeeProfile/:employee_id", async (req, res) => {
  var EmployeeId = req.params.employee_id;
    const sql = 'DELETE FROM employee_master WHERE employee_id = $1'
    db.query(sql, [EmployeeId])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//get Leave by manager_id
router.get("/leaveByManagerId/:manager_id",  async (req, res) =>{
  var ManagerId = req.params.manager_id;
  Status="Pending"
  var data=[
    ManagerId,
    Status
  ]
  db.query('select * from leave where emp_id in(select emp_id from emp where manager=$1 AND status=$2)',
  data)
  .then(result => { 
    res.status(httpCodes.OK).json(result.rows)        
  })
  .catch(err => {
      res.status(httpCodes.NotFound).json(err)
  })
})

//login
router.get("/login", function(req, res) {
  var password=req.body.password
  var data=[
    req.body.emp_id
  ]
  db.query('select * from emp where emp_id=$1',
  data)
  .then(result => { 
    if (result.rows.length == 0 || null) {
      console.log(req.body.emp_id + " " + "Emp Id doesnot exist");
      res.status(httpCodes.BadRequest).json({
          error_message: "Emp_id doesnot exist",
      });
  } else {
    hassed=result.rows[0].password;
    if(bcrypt.compareSync(password, hassed)){
      console.log("Login Successfully!!!")
      res.status(httpCodes.OK).json(result.rows)  
      } 
      else{
        console.log("Password Mismatch")
        res.status(httpCodes.BadRequest).json({
        error_message: "Password mismatch",
        });
      } 
  }
  })
  .catch(err => {
      console.log(err)
      res.status(httpCodes.NotFound).json(err)
  })
})

//Registration
router.post("/register",function(req,res){
  var emp_id;
  bcrypt.hash(req.body.password, SALT_WORK_FACTOR, (err, hashed)=>{
    if(err){
        console.log("password cannot be hased")
    }
var data=[
  req.body.emp_name,
  req.body.role,
  req.body.phone1, 
  req.body.phone2,
  req.body.email1,
  req.body.email2,
  req.body.dob,
  req.body.gender,
  req.body.joindate,
  req.body.address1,
  req.body.address2,
  req.body.area,
  req.body.city,
  req.body.state,
  req.body.pincode,
  req.body.bankac,
  req.body.bankifsc,
  req.body.bankupi,
  req.body.aadhar,
  req.body.pan,
  req.body.bloodgroup,
  req.body.referred,
  req.body.comments,
  req.body.file,
  req.body.date,
  hashed,
  req.body.has_manager,
  req.body.manager
]
            db.query('INSERT INTO emp (emp_name,role,phone1,phone2,email1,email2,dob,gender,joindate,address1,address2,area,city,state,pincode,bankac,bankifsc,bankupi,aadhar,pan,bloodgroup,referred,comments,file,date,password,has_manager,manager) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Added Successfully',
                body: {
                  data: { data }
                }
              }) 
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})
})

//Update Registered data by emp_id
router.put("/updateEmp/:emp_id",  async (req, res) => {
  var EmpId = req.params.emp_id;
  console.log(EmpId)
  bcrypt.hash(req.body.password, SALT_WORK_FACTOR, (err, hashed)=>{
    if(err){
        console.log("password cannot be hased")
    }
    const data = [
      req.body.emp_name,
req.body.role,
req.body.phone1, 
req.body.phone2,
req.body.email1,
req.body.email2,
req.body.dob,
req.body.gender,
req.body.joindate,
req.body.address1,
req.body.address2,
req.body.area,
req.body.city,
req.body.state,
req.body.pincode,
req.body.bankac,
req.body.bankifsc,
req.body.bankupi,
req.body.aadhar,
req.body.pan,
req.body.bloodgroup,
req.body.referred,
req.body.comments,
req.body.file,
req.body.date,
hashed,
req.body.has_manager,
req.body.manager,
EmpId
    ]
    db.query('UPDATE emp SET emp_name=$1,role=$2,phone1=$3,phone2=$4,email1=$5,email2=$6,dob=$7,gender=$8,joindate=$9,address1=$10,address2=$11,area=$12,city=$13,state=$14,pincode=$15,bankac=$16,bankifsc=$17,bankupi=$18,aadhar=$19,pan=$20,bloodgroup=$21,referred=$22,comments=$23,file=$24,date=$25,password=$26,has_manager=$27,manager=$28' +
      'WHERE emp_id = $29 RETURNING *', data)
      .then(response => {
        res.status(httpCodes.OK).json({
          message: 'Updated Successfully',
          body: {
            data: { data }
          }
        })
      })
      .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
      })
  }) })

  //Create leave
router.post("/leave", function(req, res) {
            var status="Pending";
            end= new Date(req.body.end_date);
            start=new Date( req.body.start_date);
      
             var time_difference;
             var leave_count;
            var emp_id=req.body.emp_id;
                 time_difference=  end.getTime()-start.getTime();
                 leave_count=time_difference/(1000 * 3600 * 24);
                 console.log(leave_count);
            var data = [
              req.body.emp_name, 
              req.body.leave_type,
              req.body.leave_desc,
              req.body.start_date,
              req.body.end_date,
              leave_count,
              new Date(),
              status,
              req.body.emp_id
            ]
            db.query('INSERT INTO leave (emp_name,leave_type,leave_desc,start_date,end_date,leave_count,created_date,status,emp_id) VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9)',
              data)
              .then(result => {
                  res.status(httpCodes.OK).json({
                  message: 'Added Successfully',
                  body: {
                    data: { data }
                  }
                })
                data2=[
                  emp_id
                ]
                
                db.query('select * from emp where emp_id=(select manager from emp where emp_id=$1)',data2)
                .then(result1 =>{
                  
                  sendEmails.sendMailer(
                    result1.rows[0].email1,
                    "Leave for Approval",
                     "Hii " +
                     req.body.emp_name+
                     " applied for the leave" 
                  
                   )
                })
                .catch(err => {
                  console.log(err)
                  res.status(httpCodes.NotFound).json(err)
                })
                
              })
              .catch(err => {
                console.log(err)
                res.status(httpCodes.NotFound).json(err)
              })
      });

//get all leave
      router.get("/getLeave", async (req, res) => {
        console.log('inside getleave')
        const sql = await db.query('SELECT * FROM leave')
          .then(result => { 
            res.status(httpCodes.OK).json(result.rows)        
          })
          .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
          })
      })

//get leave by leave_id
      router.get("/getLeave/:leave_id", async (req, res) => {
        var leaveId = req.params.leave_id;
        data=[leaveId]
        db.query('SELECT * FROM leave where leave_id=$1',data)
          .then(result => { 
            res.status(httpCodes.OK).json(result.rows)        
          })
          .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
          })
      })
      
//update leave by leaveId
      router.put("/update/:leave_id",  async (req, res) => {
        var leaveId = req.params.leave_id;

        end= new Date(req.body.end_date);
            start=new Date( req.body.start_date);
             var time_difference;
             var leave_count;
                 time_difference=  end.getTime()-start.getTime();
                 leave_count=time_difference/(1000 * 3600 * 24);
                 console.log(leave_count);
          const data = [
            req.body.emp_name, 
            req.body.leave_type,
            req.body.leave_desc,
            req.body.start_date,
            req.body.end_date,
            leave_count,
            leaveId,
            req.body.emp_id
          ]
          db.query('UPDATE leave SET emp_name=$1, leave_type = $2, leave_desc = $3, start_date = $4, end_date = $5, leave_count = $6, emp_id=$8' +
            'WHERE leave_id = $7 RETURNING *', data)
            .then(response => {
              res.status(httpCodes.OK).json({
                message: 'Updated Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
        })

//Delete leave by leave_id   
router.delete("/delete/:leave_id", async (req, res) => {
    var leaveId = req.params.leave_id;
    console.log(leaveId)
      const sql = 'DELETE FROM leave WHERE leave_id = $1'
      db.query(sql, [leaveId])
      .then( result => {
        res.status(httpCodes.OK).json(result.rows)
      })
      .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
      })
  })

  //Status update by Manager by leave_id
router.put("/updateStatus/:leave_id", async (req,res)=>{
  var leaveId = req.params.leave_id;
  var Status=req.body.status;
  var data = [
    req.body.status,
    leaveId
  ]
  db.query('UPDATE leave SET status=$1 WHERE leave_id = $2 RETURNING *', data)
  .then( result => {
    res.status(httpCodes.OK).json(result.rows);
    data2=[
      leaveId
    ]
    db.query('select * from emp where emp_id=(select emp_id from leave where leave_id=$1)',data2)
    .then(result1 =>{
      sendEmails.sendMailer(
        result1.rows[0].email1,
        "Leave Status",
         "Hii " +
         result1.rows[0].emp_name+
         " your leave having leave id: "+
         leaveId+
         " is changed to "+
        Status
       )
    })
    .catch(err => {
      console.log(err)
      res.status(httpCodes.NotFound).json(err)
    })
  })
  .catch(err => {
      console.log(err)
      res.status(httpCodes.NotFound).json(err)
  })
})

//Create department
router.post("/department",function(req,res){
  var created_date=new Date();
  var data=[
  req.body.department_name,
  req.body.created_by,
  created_date
]
            db.query('INSERT INTO department(department_name, created_by, created_date) VALUES ($1, $2, $3)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Department record added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})
//Get all Department names
/*router.get("/department", async (req, res) => {
  const sql = await db.query('SELECT * FROM department')
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})
*/

//Get Department by department_id
router.get("/department/:department_id", async (req, res) => {
  var departmentId = req.params.department_id;
  data=[departmentId]
     db.query('SELECT * FROM department where department_id=$1',data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Update Department by department_id
router.put("/department/:department_id",function(req,res){
  var departmentId = req.params.department_id;
  var updated_date=new Date();
  var data=[
  req.body.department_name,
  req.body.updated_by,
  updated_date ,
  departmentId 
]
            db.query('UPDATE department SET department_name=$1, updated_by=$2, updated_date=$3 WHERE department_id=$4 RETURNING *',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Department record updated Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Delete Department by department_id 
router.delete("/department/:department_id", async (req, res) => {
  var departmentId = req.params.department_id;
    const sql = 'DELETE FROM department WHERE department_id = $1'
    db.query(sql, [departmentId])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Create designation
router.post("/designation",function(req,res){
  var created_date=new Date();
  var data=[
  req.body.designation_name,
  req.body.created_by,
  created_date
]
            db.query('INSERT INTO designation(designation_name, created_by, created_date) VALUES ($1, $2, $3)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Designation record added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})
//Get all Designation names
router.get("/designation", async (req, res) => {
  const sql = await db.query('SELECT * FROM designation')
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Get Designation by designation_id
router.get("/designation/:designation_id", async (req, res) => {
  var designationId = req.params.designation_id;
  data=[designationId]
     db.query('SELECT * FROM designation where designation_id=$1',data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Update Designation by designation_id
router.put("/designation/:designation_id",function(req,res){
  var designationId = req.params.designation_id;
  var updated_date=new Date();
  var data=[
  req.body.designation_name,
  req.body.updated_by,
  updated_date,
  designationId 
]
            db.query('UPDATE designation SET designation_name=$1, updated_by=$2, updated_date=$3 WHERE designation_id=$4 RETURNING *',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Designation record updated Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Delete Designation by designation_id 
router.delete("/designation/:designation_id", async (req, res) => {
  var designationId = req.params.designation_id;
    const sql = 'DELETE FROM designation WHERE designation_id = $1'
    db.query(sql, [designationId])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Create Role
router.post("/role",function(req,res){
  var created_date=new Date();
  var data=[
  req.body.role_description,
  req.body.created_by,
  created_date
]
            db.query('INSERT INTO role_master(role_description, created_by, created_date) VALUES ($1, $2, $3)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Role record added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})
//Get all Role names
router.get("/role", async (req, res) => {
  const sql = await db.query('SELECT * FROM role_master')
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Get Role by role_id
router.get("/role/:role_id", async (req, res) => {
  var roleId = req.params.role_id;
  data=[roleId]
     db.query('SELECT * FROM role_master where role_id=$1',data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Update Role by role_id
router.put("/role/:role_id",function(req,res){
  var roleId = req.params.role_id;
  var updated_date=new Date();
  var data=[
  req.body.role_description,
  req.body.updated_by,
  updated_date,
  roleId 
]
            db.query('UPDATE role_master SET role_description=$1, updated_by=$2, updated_date=$3 WHERE role_id=$4 RETURNING *',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Role record updated Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Delete Role by role_id 
router.delete("/role/:role_id", async (req, res) => {
  var roleId = req.params.role_id;
    const sql = 'DELETE FROM role_master WHERE role_id = $1'
    db.query(sql, [roleId])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Create Employee categories
router.post("/employeeCategory",function(req,res){
  var created_date=new Date();
  var data=[
  req.body.employee_category_name,
  req.body.created_by,
  created_date
]
            db.query('INSERT INTO employee_category(employee_category_name, created_by, created_date) VALUES ($1, $2, $3)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee Category record added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})
//Get all Employee categories
router.get("/employeeCategory", async (req, res) => {
  const sql = await db.query('SELECT * FROM employee_category')
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Get Employee Category by employee_category_id
router.get("/employeeCategory/:employee_category_id", async (req, res) => {
  var employee_categoryId = req.params.employee_category_id;
  data=[employee_categoryId]
     db.query('SELECT * FROM employee_category where employee_category_id=$1',data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Update Employee Category by employee_category_id
router.put("/employeeCategory/:employee_category_id",function(req,res){
  var employee_categoryId = req.params.employee_category_id;
  var updated_date=new Date();
  var data=[
  req.body.employee_category_name,
  req.body.updated_by,
  updated_date,
  employee_categoryId 
]
            db.query('UPDATE employee_category SET employee_category_name=$1, updated_by=$2, updated_date=$3 WHERE employee_category_id=$4 RETURNING *',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee Category record updated Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Delete Employee Category by employee_category_id 
router.delete("/employeeCategory/:employee_category_id", async (req, res) => {
  var employee_categoryId = req.params.employee_category_id;
    const sql = 'DELETE FROM employee_category WHERE employee_category_id = $1'
    db.query(sql, [employee_categoryId])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Create Employee qualification type
router.post("/qualificationType",function(req,res){
  var created_date=new Date();
  var data=[
  req.body.qualification_type,
  req.body.created_by,
  created_date
]
            db.query('INSERT INTO qualification_type(qualification_type, created_by, created_date) VALUES ($1, $2, $3)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee qualification type record added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})
//Get all Employee qualification type
router.get("/qualificationType", async (req, res) => {
  const sql = await db.query('SELECT * FROM qualification_type')
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Get Employee qualification type by qualification_type_id
router.get("/qualificationType/:qualification_type_id", async (req, res) => {
  var qualification_typeId = req.params.qualification_type_id;
  data=[qualification_typeId]
     db.query('SELECT * FROM qualification_type where qualification_type_id=$1',data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Update Employee qualification type by qualification_type_id
router.put("/qualificationType/:qualification_type_id",function(req,res){
  var qualification_typeId = req.params.qualification_type_id;
  var updated_date=new Date();
  var data=[
  req.body.qualification_type,
  req.body.updated_by,
  updated_date,
  qualification_typeId 
]
            db.query('UPDATE qualification_type SET qualification_type=$1, updated_by=$2, updated_date=$3 WHERE qualification_type_id=$4 RETURNING *',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee qualification type record updated Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Delete Employee qualification type by qualification_type_id 
router.delete("/qualificationType/:qualification_type_id", async (req, res) => {
  var qualification_typeId = req.params.qualification_type_id;
    const sql = 'DELETE FROM qualification_type WHERE qualification_type_id = $1'
    db.query(sql, [qualification_typeId])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})
//Create Employee qualification Specialization
router.post("/qualificationSpecialization",function(req,res){  
  var data=[
  req.body.qualification_specialization_type,
  req.body.qualification_type_id

]
            db.query('INSERT INTO qualification_specialization(qualification_specialization_type, qualification_type_id) VALUES ($1, $2)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee qualification specialization record added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})
//Get all Employee qualification Specialization
router.get("/qualificationSpecialization", async (req, res) => {
  const sql = await db.query('SELECT qualSpec.qualification_Specialization_id,qualSpec.qualification_specialization_type,qualSpec.qualification_type_id,qualType.qualification_type FROM qualification_specialization qualSpec,qualification_type qualType WHERE qualSpec.qualification_type_id=qualType.qualification_type_id')
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Get Employee qualification Specialization by qualification_Specialization_id
router.get("/qualificationSpecialization/:qualification_Specialization_id", async (req, res) => {
  var qualification_specializationId = req.params.qualification_specialization_id;
  data=[qualification_specializationId]
     db.query('SELECT qualSpec.qualification_Specialization_id,qualSpec.qualification_specialization_type,qualSpec.qualification_type_id,qualType.qualification_type FROM qualification_specialization qualSpec,qualification_type qualType WHERE qualSpec.qualification_type_id=qualType.qualification_type_id AND qualification_specialization_id=$1',data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Update Employee qualification Specialization by qualification_specialization_id
router.put("/qualificationSpecialization/:qualification_specialization_id",function(req,res){
  var qualification_specializationId = req.params.qualification_specialization_id; 
  var data=[
  req.body.qualification_specialization_type, 
  qualification_specializationId 
]
            db.query('UPDATE qualification_specialization SET qualification_specialization_type=$1 WHERE qualification_specialization_id=$2 RETURNING *',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee qualification specialization record updated Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Delete Employee qualification specialization by qualification_specialization_id 
router.delete("/qualificationSpecialization/:qualification_specialization_id", async (req, res) => {
  var qualification_specializationId = req.params.qualification_specialization_id;
    const sql = 'DELETE FROM qualification_specialization WHERE qualification_specialization_id = $1'
    db.query(sql, [qualification_specializationId])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})
//Create Employee qualification 
router.post("/employeeQualification",function(req,res){  
  var data=[
  req.body.employee_id, 
  req.body.qualification_type_id, 
  req.body.qualification_specialization_id, 
  req.body.year_of_pass,
  req.body.specialization,
  req.body.institute_name,
  req.body.university, 
  req.body.grade

]
            db.query('INSERT INTO employee_qualification(employee_id, qualification_type_id, qualification_specialization_id, year_of_pass, specialization, institute_name, university, grade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee qualification record added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})
//Get all Employee qualification 
router.get("/employeeQualification", async (req, res) => {
  const sql = await db.query('SELECT empQual.employee_id, empQual.employee_qualification_id, empQual.qualification_type_id, empQual.qualification_specialization_id,' 
	+' empQual.year_of_pass, empQual.specialization, empQual.institute_name, empQual.university, empQual.grade'
	+' FROM employee_qualification empQual,qualification_specialization qualSpec,qualification_type qualType, employee_master empProf '
	+' WHERE empQual.employee_id = empProf.employee_id '
	+' AND empQual.qualification_type_id = qualType.qualification_type_id'
	+' AND empQual.qualification_specialization_id = qualSpec.qualification_specialization_id'	)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Get Employee qualification  by employee_qualification_id
router.get("/employeeQualification/:employee_qualification_id", async (req, res) => {
  var employee_qualificationId = req.params.employee_qualification_id;
  data=[employee_qualificationId]
     db.query('SELECT empQual.employee_id, empQual.employee_qualification_id, empQual.qualification_type_id, empQual.qualification_specialization_id, ' 
     +' empQual.year_of_pass, empQual.specialization, empQual.institute_name, empQual.university, empQual.grade '
     +' FROM employee_qualification empQual,qualification_specialization qualSpec,qualification_type qualType, employee_master empProf '
     +' WHERE empQual.employee_id = empProf.employee_id '
     +' AND empQual.qualification_type_id = qualType.qualification_type_id '
     +' AND empQual.qualification_specialization_id = qualSpec.qualification_specialization_id ' 	
     +' AND empQual.employee_qualification_id=$1',data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Update Employee qualification by employee_qualification_id
router.put("/employeeQualification/:employee_qualification_id",function(req,res){
  var employee_qualificationId = req.params.employee_qualification_id;  

  var data=[
    req.body.employee_id,
    req.body.qualification_type_id,
    req.body.qualification_specialization_id,
    req.body.year_of_pass,
    req.body.specialization,
    req.body.institute_name,
    req.body.university,
    req.body.grade,
    employee_qualificationId 
]
            db.query('UPDATE employee_qualification SET employee_id=$1, qualification_type_id=$2, qualification_specialization_id=$3, year_of_pass=$4, specialization=$5, institute_name=$6, university=$7, grade=$8 WHERE employee_qualification_id=$9 RETURNING *',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee qualification record updated Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Delete Employee qualification by employee_qualification_id 
router.delete("/employeeQualification/:employee_qualification_id", async (req, res) => {
  var employee_qualificationId = req.params.employee_qualification_id;
    const sql = 'DELETE FROM employee_qualification WHERE employee_qualification_id = $1'
    db.query(sql, [employee_qualificationId])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Create Employee Performance 
router.post("/employeePerformance",function(req,res){  
  var data=[
  req.body.employee_id,   
  req.body.assessment_year, 
  req.body.performance_rating,
  req.body.increment_percentage,
  req.body.bonus_percentage 
]
            db.query('INSERT INTO employee_performance(employee_id, assessment_year, performance_rating, increment_percentage, bonus_percentage) VALUES ($1, $2, $3, $4, $5)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee Performance record added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})
//Get all Employee Performance 
router.get("/employeePerformance", async (req, res) => {
  const sql = await db.query('SELECT empPerform.employee_id, empPerform.employee_performance_id, empPerform.assessment_year, empPerform.performance_rating, empPerform.increment_percentage, empPerform.bonus_percentage'
	+' FROM employee_performance empPerform, employee_master empProf '
	+' WHERE empPerform.employee_id = empProf.employee_id ')
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Get Employee Performance by employee_performance_id
router.get("/employeePerformance/:employee_performance_id", async (req, res) => {
  var employee_performanceId = req.params.employee_performance_id;
  data=[employee_performanceId]
     db.query('SELECT empPerform.employee_id, empPerform.employee_performance_id, empPerform.assessment_year, empPerform.performance_rating, empPerform.increment_percentage, empPerform.bonus_percentage'
     +' FROM employee_performance empPerform, employee_master empProf '
     +' WHERE empPerform.employee_id = empProf.employee_id ' 	
     +' AND empPerform.employee_performance_id=$1',data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Update Employee Performance by employee_performance_id
router.put("/employeePerformance/:employee_performance_id",function(req,res){
  var employee_performanceId = req.params.employee_performance_id;  

  var data=[
  req.body.employee_id, 
  req.body.assessment_year, 
  req.body.performance_rating,
  req.body.increment_percentage,
  req.body.bonus_percentage,
  employee_performanceId 
]
            db.query('UPDATE employee_performance SET employee_id=$1, assessment_year=$2, performance_rating=$3, increment_percentage=$4, bonus_percentage=$5 WHERE employee_performance_id=$6 RETURNING *',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee Performance record updated Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Delete Employee Performance by employee_performance_id 
router.delete("/employeePerformance/:employee_performance_id", async (req, res) => {
  var employee_performanceId = req.params.employee_performance_id;
    const sql = 'DELETE FROM employee_performance WHERE employee_performance_id = $1'
    db.query(sql, [employee_performanceId])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Create Employee Promotion 
router.post("/employeePromotion",function(req,res){  
  var data=[
  req.body.employee_id,   
  req.body.designation_id, 
  req.body.effective_promotion_date,
  req.body.compensation_percentage   
]
            db.query('INSERT INTO employee_promotion(employee_id, designation_id, effective_promotion_date, compensation_percentage) VALUES ($1, $2, $3, $4)',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee Promotion record added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})
//Get all Employee Promotion 
router.get("/employeePromotion", async (req, res) => {
  const sql = await db.query('SELECT empPromotion.promotion_id, empPromotion.employee_id, empPromotion.designation_id, desig.designation_name, empPromotion.effective_promotion_date, empPromotion.compensation_percentage'
	+' FROM employee_promotion empPromotion, employee_master empProf, designation desig'
	+' WHERE empPromotion.employee_id = empProf.employee_id AND empPromotion.designation_id = desig.designation_id ')
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Get Employee Promotion by promotion_id
router.get("/employeePromotion/:promotion_id", async (req, res) => {
  var promotionId = req.params.promotion_id;
  data=[promotionId]
     db.query('SELECT empPromotion.promotion_id, empPromotion.employee_id, empPromotion.designation_id, desig.designation_name, empPromotion.effective_promotion_date, empPromotion.compensation_percentage'
     +' FROM employee_promotion empPromotion, employee_master empProf, designation desig'
     +' WHERE empPromotion.employee_id = empProf.employee_id AND empPromotion.designation_id = desig.designation_id ' 	
     +' AND empPromotion.promotion_id = $1',data)
    .then(result => { 
      res.status(httpCodes.OK).json(result.rows)        
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})

//Update Employee Promotion by promotion_id
router.put("/employeePromotion/:promotion_id",function(req,res){
  var promotionId = req.params.promotion_id;  

  var data=[
  req.body.employee_id, 
  req.body.designation_id, 
  req.body.effective_promotion_date,
  req.body.compensation_percentage,
  promotionId 
]
            db.query('UPDATE employee_promotion SET employee_id=$1, designation_id=$2, effective_promotion_date=$3, compensation_percentage=$4 WHERE promotion_id=$5 RETURNING *',
              data)
              .then(result => {
                res.status(httpCodes.OK).json({
                message: 'Employee Promotion record updated Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})

//Delete Employee Promotion by promotion_id 
router.delete("/employeePromotion/:promotion_id", async (req, res) => {
  var promotionId = req.params.promotion_id;
    const sql = 'DELETE FROM employee_promotion WHERE promotion_id = $1'
    db.query(sql, [promotionId])
    .then( result => {
      res.status(httpCodes.OK).json(result.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(httpCodes.NotFound).json(err)
    })
})
/*
//Generate OTP and Secret Key--
router.post("/otp-generate",(request, response, next) => {
  var secret = Speakeasy.generateSecret({ length: 20 });
  request.otpSecret = secret.base32;
  next()
},(request, response) => {
  const credential = request.body.id
  var isUser = false;
  var patt1 = new RegExp(/[0-9]{10}/g);
  var patt2 = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g);
  var phone = patt1.test(credential);
  var email = patt2.test(credential)
  //Check if Phone OR Email 
  if(phone || email){
    
      isUser = true
  }
  else{
      response.send({
          message:"Not a valid Entry",
          success:false
      })
  }
  setTimeout(()=>{
      console.log(isUser);
      if(isUser){
          request.otp = Speakeasy.totp({
              secret: request.otpSecret,
              encoding: "base32",
              digits:4,
              window: 1,
              step:180

          });
          db.query(`insert into otp (user_credential, otp, secret) values($1,$2,$3)`
              ,[credential, request.otp, request.otpSecret ],
              (err,result)=>{
                  if(err){
                      console.log(err);
                  }
                  //SMS and MAIL -> OTP
                  console.log(credential);
                   sendMsg.sendMessage(
                       `Your OTP is ${request.otp} `,
                       "91" + credential
                   );
                  
                  response.json({message: "OTP sent! Please check SMS or Email for OTP",
                      secret:request.otpSecret,
                      otp:request.otp,
                      success:true
                  });
                  
          })
      }
      } , 250)

});


//Validation Of OTP
router.post("/otp-validate/:secret", (request, response, next) => {

  const otpCode= request.body.OTP;
  const phoneNo = request.body.phoneNo;
  const otpSecret = request.params.secret;
  request.validateOtp = 
          Speakeasy.totp.verify({
              secret: otpSecret,
              encoding: "base32",
              token: otpCode,
              window: 1,
              digits: 4,
              step:180
          });
console.log(request.validateOtp);
  if(request.validateOtp){ 
      let payload = {subject: phoneNo,role:'employee'}
      let token = jwt.sign(payload, '!@#123qwerty')
      request.token = token;
      request.success  = true;
      next();

  }else response.json({
      success:false
  })
},(req,res)=>{
  const sec = req.params.secret

  db.query(`Delete from otp where secret = $1 returning 1`,[sec],(err,result)=>{
      if(err){
          res.json({
              success:true,
              token:req.token
          })
          throw err
      }else if(result.rows.length>1){
          res.json({
              success:true,
              token:req.token
          })
      }else{
          res.json({
              success:true,
              token:req.token
          })
      }
  })
}); */


//Create Contact Detail
router.post("/employeeContact",function(req,res){
  console.log("contact")
  var data=[
  req.body.employee_id,   
  req.body.mobile_phone, 
  req.body.home_phone,
  req.body.alternative_contact_number,
  req.body.personal_email,
  req.body.official_email,  
  req.body.contact_type,
  req.body.contact_relationship,
  req.body.contact_relation_name
]
            db.query('INSERT INTO employee_contacts (employee_id, mobile_phone, home_phone, alternative_contact_number, personal_email, official_email, contact_type, contact_relationship, contact_relation_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
              data)
              .then(result => {
                console.log("Enter");
                res.status(httpCodes.OK).json({
                message: 'Employee Contact record added Successfully',
                body: {
                  data: { data }
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(httpCodes.NotFound).json(err)
            })
})


//Generate OTP and Secret Key--
router.post("/otp-generate",(request, response, next) => {
  var secret = Speakeasy.generateSecret({ length: 20 });
  request.otpSecret = secret.base32;
  next()
},(request, response) => {
  const id = request.body.id;
  console.log("Hii .....");
  var isUser = false;
  db.query('select mobile_phone from employee_contacts where employee_id=$1',
  [id])
  .then(result => { 
    if (result.rows.length == 0 || null) {
      console.log(request.body.id + " " + "Emp Id doesnot exist");
      response.status(httpCodes.BadRequest).json({
          error_message: "Emp_id doesnot exist",
      });
  } else {
    credential=result.rows[0].mobile_phone;

    var patt1 = new RegExp(/[0-9]{10}/g);
    var patt2 = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g);
    var phone = patt1.test(credential);
    var email = patt2.test(credential)
    //Check if Phone OR Email 
    if(phone || email){
      
        isUser = true
    }
    else{
        response.send({
            message:"Not a valid Entry",
            success:false
        })
    }
    setTimeout(()=>{
        console.log(isUser);
        if(isUser){
            request.otp = Speakeasy.totp({
                secret: request.otpSecret,
                encoding: "base32",
                digits:4,
                window: 1,
                step:180
  
            });
            db.query(`insert into otp (user_credential, otp, secret) values($1,$2,$3)`
                ,[credential, request.otp, request.otpSecret ],
                (err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    //SMS and MAIL -> OTP
                    console.log(credential);
                     sendMsg.sendMessage(
                         `Your OTP is ${request.otp} `,
                         "91" + credential
                     );
                    
                    response.json({message: "OTP sent! Please check SMS or Email for OTP",
                        secret:request.otpSecret,
                        otp:request.otp,
                        success:true,
                        phone:credential
                    });
                    
            })
        }
        } , 250)

  }
})
.catch(err => {
  console.log(err)
  response.status(httpCodes.NotFound).json(err)
})

 

});


//Validation Of OTP
router.post("/otp-validate/:secret", (request, response, next) => {

  const otpCode= request.body.OTP;
  const id = request.body.id;
  const otpSecret = request.params.secret;
  request.validateOtp = 
          Speakeasy.totp.verify({
              secret: otpSecret,
              encoding: "base32",
              token: otpCode,
              window: 1,
              digits: 4,
              step:180
          });
console.log(request.validateOtp);
  if(request.validateOtp){ 
      let payload = {subject: id,role:'employee'}
      let token = jwt.sign(payload, '!@#123qwerty')
      request.token = token;
      request.success  = true;
      next();

  }else response.json({
      success:false
  })
},(req,res)=>{
  const sec = req.params.secret

  db.query(`Delete from otp where secret = $1 returning 1`,[sec],(err,result)=>{
      if(err){
          res.json({
              success:true,
              token:req.token
          })
          throw err
      }else if(result.rows.length>1){
          res.json({
              success:true,
              token:req.token
          })
      }else{
          res.json({
              success:true,
              token:req.token
          })
      }
  })
}); 


module.exports = router;