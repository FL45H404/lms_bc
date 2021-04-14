const httpCodes = require('../helper/httpCodes');
const db = require('../db');
const express = require("express"); 
const router = express.Router(); 



    
/************************************************************************************************************ 
Method Type: getEmployeeProfile
Parameter list: NA
Purpose: Get all Employee Profile
Created By and Date: GarimaJain 24-Oct-2020
Modified By and Date:GarimaJain 13-Nov-2020
Version: V.01
************************************************************************************************************/

exports.getEmployeeProfile =  async (req, res) =>{
  try{
    const sql = db.query('SELECT * FROM employee_profile',(err,result)=>{
      console.log(result)
      res.status(httpCodes.OK).json(result)    
    })
      // .then(result => { 

  }catch(err){
    console.log(err)
    res.status(httpCodes.NotFound).json(err)

  }
        
      // })
      // .catch(err => {
      // })
  }

/************************************************************************************************************ 
Method Type: getEmployeeProfileById
Parameter list: employee_id
Purpose: Get Employee Detail By Id
Created By and Date: Garima Jain 24-Oct-2020
Modified By and Date:Garima Jain 13-Nov-2020
Version: V.01
************************************************************************************************************/ 
  
  exports.getEmployeeProfileById =  async(req, res) => {
    try{

      var data = [req.params.employee_id];
          await db.query('SELECT * FROM employee_profile where employee_id=?',data,(err,result)=>{
            if (err) throw err;
            console.log(result)
            res.status(httpCodes.OK).json(result)        
         })
        // .then(result => { 
    }catch(err){

      console.log(err)
      res.status(httpCodes.NotFound).json(err)
    }
      // })
      // .catch(err => {
      // })
  };

/************************************************************************************************************
Method Name: addEmployeeProfile
Parameter list: employee_name, role_id, department_id, designation_id, reporting_manager_id, company_id, date_of_birth, gender, joining_date, nationality, emp_photo, marital_status, blood_group, employee_status, base_location, hr_point_of_contact_id, employee_category_id, aadhar_card_number, pan_card_number, passport_number, passport_issued_date, passport_expiry_date, created_date, created_by
Purpose: Add record to employee_profile table
Created By and Date: GarimaJain 24-Oct-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
*************************************************************************************************************/

exports.getEmployeeCode= (req,res)=>{
  var employee_code;employee_profile
  db.query('SELECT employee_code FROM  ORDER BY employee_id  DESC')
      .then((result1) => {
          if (result1.rows.length > 0 && result1.rows[0].employee_code!=null ) {
              let lastId = parseInt(result1.rows[0].employee_code);
              employee_code=lastId+1;
              res.status(httpCodes.OK).json(employee_code)
          } else {
            employee_code = 1000001; 
            res.status(httpCodes.OK).json(employee_code)
          }
        })
        .catch(err => {
          console.log(err)
          res.status(httpCodes.NotFound).json(err)
        })
}

exports.addEmployeeProfile =  async (req, res) =>{
  try{

    //var status="Active";
    // console.log(req.employee_code);
    var created_date=new Date();
            var data=[
            req.body.employee_id,
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
          var sql='INSERT INTO employee_profile (employee_id,employee_name, role_id, department_id, designation_id, reporting_manager_id, company_id, date_of_birth, gender, joining_date, nationality, emp_photo, marital_status, blood_group, employee_status, base_location, hr_point_of_contact_id, employee_category_id, aadhar_card_number, pan_card_number, passport_number, passport_issued_date, passport_expiry_date, created_date, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
                      await db.query(sql,data,(err,result)=>{
                        if (err) throw err;
                        console.log("added succesfully")
                        res.status(httpCodes.OK).json({message: 'Added Successfully'})
                    })
                      //   .then(result => {
                         
                      // })
  }catch(err){
    console.log(err)
    res.status(httpCodes.NotFound).json(err)
  }
                      // .catch(err => {
                       
                      // })
         
  };

/************************************************************************************************************
Method Name: updateEmployeeProfileById
Parameter list: employee_name, role_id, department_id, designation_id, reporting_manager_id, company_id, date_of_birth, gender, joining_date, nationality, emp_photo, marital_status, blood_group, employee_status, base_location, hr_point_of_contact_id, employee_category_id, aadhar_card_number, pan_card_number, passport_number, passport_issued_date, passport_expiry_date, updated_by, updated_date
Purpose: Update record to EmployeeProfile table
Created By and Date: GarimaJain 02-Nov-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
*************************************************************************************************************/

  exports.updateEmployeeProfileById =async  (req, res) =>{
    try{
      var EmployeeId = req.params.employee_id;
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
      req.body.created_by,
      EmployeeId
    ]
    var sql='UPDATE employee_profile SET employee_name=? ,role_id=? ,department_id=?, designation_id=?, reporting_manager_id=?, company_id=?, date_of_birth=?, gender=?, joining_date=?, nationality=?, emp_photo=?, marital_status=?, blood_group=?, employee_status=?, base_location=?, hr_point_of_contact_id=?, employee_category_id=?, aadhar_card_number=?, pan_card_number=?, passport_number=?, passport_issued_date=?, passport_expiry_date=?, created_date=?, created_by=? where employee_id=?';
                 await db.query(sql,data,(err,result)=>{
                   if (err) throw err;
                   res.status(httpCodes.OK).json({
                    message: 'updated Successfully'
                  })
                })
                
                  // .then(result => {
                   
                // })
    }catch(err){
      console.log(err)
      res.status(httpCodes.NotFound).json(err)

    }
   
              // .catch(err => {
              //   console.log(err)
              //   res.status(httpCodes.NotFound).json(err)
              // })
  };

/************************************************************************************************************
Method Name: deleteEmployeeProfileById
Parameter list: employee_id
Purpose: Delete record from employee_profile
Created By and Date: GarimaJain 02-Nov-2020
Modified By and Date: GarimaJain 13-Nov-2020
Version: V.01
*************************************************************************************************************/

  exports.deleteEmployeeProfileById =async  (req, res) =>{
    try{
      var EmployeeId = req.params.employee_id;
      var status="Non-Active";
      data=[
          status,
          EmployeeId
      ]
      await db.query('UPDATE employee_profile SET employee_status=? where employee_id = ?',data,(err,result)=>{
        if (err) throw err;
        console.log(result)
        res.status(httpCodes.OK).json(result)
      })

    }catch(err){
      console.log(err)
      res.status(httpCodes.NotFound).json(err)
    }
    
      // .then( result => {
        // res.status(httpCodes.OK).json(result.rows)
      // })
      // .catch(err => {
      //     console.log(err)
      //     res.status(httpCodes.NotFound).json(err)
      // })
  };


/***************************************************************************************************************************************************************************************** 
Method Type: getemployeeProfile
Parameter list: NA
Purpose: Get all Employee Profile
Created By and Date: Santoshkumar 13-NOV-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************/   
exports.getemployeeProfile = async (req, res) => { 
  try{
    const sql='SELECT empProf.employee_id, empProf.employee_name, empProf.role_id,roleMast.role_description, empProf.department_id, dept.department_name, empProf.designation_id,desg.designation_name, empProf.reporting_manager_id, '
    +' empProf.company_id, cmpProf.company_name, empProf.date_of_birth, empProf.gender, empProf.joining_date, empProf.nationality, empProf.emp_photo, empProf.marital_status, empProf.blood_group, empProf.employee_status, empProf.base_location, '
    +' empProf.hr_point_of_contact_id, empProf.employee_category_id, empCateg.employee_category_name, empProf.aadhar_card_number, empProf.pan_card_number, empProf.passport_number, empProf.passport_issued_date, empProf.passport_expiry_date, '
    +' empProf.created_date, empProf.created_by, empProf.updated_date, empProf.updated_by '
  +' FROM employee_profile empProf,role_master roleMast, department dept, designation desg, company_profile cmpProf,employee_category empCateg '
  +' WHERE empProf.role_id = roleMast.role_id AND empProf.department_id = dept.department_id '
  +' AND empProf.designation_id = desg.designation_id AND empProf.company_id = cmpProf.company_id '
    +' AND empProf.employee_category_id = empCateg.employee_category_id ';
    //+' AND empProf.employee_status="Active" ';
    db.query(sql,(err,result)=>{
      if (err) throw err;
      console.log(result);
      res.status(httpCodes.OK).json(result);
    })
  }catch(err){
    res.status(httpCodes.InternalServerError).json({
      error_message: "could not get all Employee Profile",
      error: err
  })
  }   
}
 /**********************************************************************************************************************************************************************
Method Type: getemployeeProfileById
Parameter list: employee_id
Purpose: Get Employee Profile by employee_id
Created By and Date: Santoshkumar 13-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************************************************************************/   
exports.getemployeeProfileById = (req, res) => {
    let employee_Id = req.params.employee_id;  
    let sql = 'SELECT empProf.employee_id, empProf.employee_name, empProf.role_id,roleMast.role_description, empProf.department_id, dept.department_name, empProf.designation_id,desg.designation_name, empProf.reporting_manager_id, '
    +' empProf.company_id, cmpProf.company_name, empProf.date_of_birth, empProf.gender, empProf.joining_date, empProf.nationality, empProf.emp_photo, empProf.marital_status, empProf.blood_group, empProf.employee_status, empProf.base_location, '
    +' empProf.hr_point_of_contact_id, empProf.employee_category_id, empCateg.employee_category_name, empProf.aadhar_card_number, empProf.pan_card_number, empProf.passport_number, empProf.passport_issued_date, empProf.passport_expiry_date, '
    +' empProf.created_date, empProf.created_by, empProf.updated_date, empProf.updated_by '
	+' FROM employee_profile empProf,role_master roleMast, department dept, designation desg, company_profile cmpProf,employee_category empCateg '
	+' WHERE empProf.role_id = roleMast.role_id AND empProf.department_id = dept.department_id '
	+' AND empProf.designation_id = desg.designation_id AND empProf.company_id = cmpProf.company_id '
    +' AND empProf.employee_category_id = empCateg.employee_category_id '
    //+' AND empProf.employee_status="Active" '
    +' AND empProf.employee_id = $1';
    db.query(sql, [employee_Id])
        .then((result) => {            
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Employee Id does not exists" });
            } else {
                res.status(httpCodes.OK).json(result.rows);
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(httpCodes.InternalServerError).json(err.message);
        });
}
