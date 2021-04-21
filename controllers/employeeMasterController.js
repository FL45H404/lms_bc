const httpCodes = require('../helper/httpCodes');
const db = require('../db');






/*********************************************************************************************************************************************************************************************** 
Method Type: addemployeeMaster
Parameter list: employee_id, employee_fname, employee_mname, employee_lname, employee_code, role_id, department_id, designation_id, reporting_manager_id, date_of_birth, gender, joining_date, nationality, emp_photo, marital_status, 
	blood_group, employee_status, payroll_status, base_location, background_verification_check, id_proof, address_proof, employee_category_id, aadhar_card_number, pan_card_number, passport_number, passport_issued_date,
	passport_expiry_date, created_date, created_by,background_verification_date
Purpose: Create Employee Master
Created By and Date: Santoshkumar 05-DEC-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************************************************************************************************/
exports.addemployeeMaster = async (req, res) => {
  try {
    var created_date = new Date();
    var data = [
      req.body.employee_fname, req.body.employee_mname, req.body.employee_lname, req.body.employee_code, req.body.role_id, req.body.department_id, req.body.designation_id, req.body.reporting_manager_id, req.body.date_of_birth,
      req.body.gender, req.body.joining_date, req.body.nationality, req.body.emp_photo, req.body.marital_status, req.body.blood_group, req.body.employee_status, req.body.payroll_status, req.body.base_location, req.body.background_verification_check,
      req.body.id_proof, req.body.address_proof, req.body.employee_category_id, req.body.aadhar_card_number, req.body.pan_card_number, req.body.passport_number, created_date, req.body.created_by, req.body.background_verification_date, req.body.background_verification_done_by
    ]
    await db.query('INSERT INTO employee_master (employee_fname, employee_mname, employee_lname, employee_code, role_id, department_id, designation_id, reporting_manager_id, date_of_birth, gender, joining_date, nationality, emp_photo, marital_status, '
      + ' blood_group, employee_status, payroll_status, base_location, background_verification_check, id_proof, address_proof, employee_category_id, aadhar_card_number, pan_card_number, passport_number,  '
      + ' created_date, created_by, background_verification_date,background_verification_done_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)',
      data, (err, result) => {
        if (err) throw err;
        console.log(data)
        var employee_id = result.insertId;
        console.log(employee_id)
        if (req.body.qualification_id != "" || null) {
          var insertQuery = 'INSERT INTO employee_education(employee_id, qualification_id, year_of_pass, specialization, institute_name, university, grade) VALUES (?, ?, ?, ?, ?, ?, ?)';
          db.query(insertQuery, [employee_id, req.body.qualification_id, req.body.year_of_pass,
            req.body.specialization, req.body.institute_name, req.body.university, req.body.grade], (err, result1) => {
              if (err) throw err;
              // res.status(httpCodes.Created).json(result1)
            })
        }
        res.status(httpCodes.OK).json({
          message: 'Employee Data added Successfully',
          body: {
            data: { data }
          }
        })
      })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.NotFound).json(err)
  }
  // var employee_code;
  // db.query('SELECT employee_code FROM employee_master ORDER BY employee_id  DESC')
  //     .then((result1) => {
  //       console.log(result1.rows[0].employee_code);
  //         if (result1.rows.length > 0 && result1.rows[0].employee_code!=null ) {
  //             let lastId = parseInt(result1.rows[0].employee_code);
  //             employee_code=lastId+1;
  //             console.log(employee_code);
  //         } else {
  //           employee_code = 1000001;
  //           console.log(employee_code); 
  //         }
  //   var data=[             
  //     req.body.employee_fname,req.body.employee_mname,req.body.employee_lname,req.body.employee_code, req.body.role_id, req.body.department_id, req.body.designation_id, req.body.reporting_manager_id, req.body.date_of_birth,
  //     req.body.gender, req.body.joining_date, req.body.nationality,req.body.emp_photo, req.body.marital_status, req.body.blood_group, req.body.employee_status,req.body.payroll_status, req.body.base_location,req.body.background_verification_check,
  //     req.body.id_proof, req.body.address_proof, req.body.employee_category_id, req.body.aadhar_card_number, req.body.pan_card_number, req.body.passport_number,  created_date, req.body.created_by, req.body.background_verification_date, req.body.background_verification_done_by
  // ]
  //             db.query('INSERT INTO employee_master (employee_fname, employee_mname, employee_lname, employee_code, role_id, department_id, designation_id, reporting_manager_id, date_of_birth, gender, joining_date, nationality, emp_photo, marital_status, '
  //             +' blood_group, employee_status, payroll_status, base_location, background_verification_check, id_proof, address_proof, employee_category_id, aadhar_card_number, pan_card_number, passport_number,  '
  //             +' created_date, created_by, background_verification_date,background_verification_done_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) RETURNING *',
  //                data)
  // .then(result => {
  // console.log(result.rows[0].employee_id);
  //  var employee_id = result.rows[0].employee_id;
  //  if(req.body.qualification_id != "" || null){ 
  // var insertQuery = 'INSERT INTO employee_education(employee_id, qualification_id, year_of_pass, specialization, institute_name, university, grade) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  // db.query(insertQuery, [employee_id, req.body.qualification_id, req.body.year_of_pass,
  //  req.body.specialization, req.body.institute_name, req.body.university, req.body.grade])
  //  .then(result =>{
  // res.status(httpCodes.Created).json({message:"Employee Qualification record added Successfully"})
  // })                                              
  //                             .catch (err => {
  //   console.log(err)
  //   res.status(httpCodes.NotFound).json(err)
  // })

  // }
  //                           else {
  //   res.status(httpCodes.OK).json({
  //     message: 'Employee Data added Successfully',
  //     body: {
  //       data: { data }
  //     }
  //   })
  // }

  // })
  // .catch (err => {
  // console.log(err)
  // res.status(httpCodes.NotFound).json(err)
  // })
  //})
  // .catch (err => {
  // console.log(err)
  // res.status(httpCodes.NotFound).json(err)
  // })
}
/***********************************************************************************************************************************************************************************************************************************************************************************************************
Method Type: getemployeeMaster
Parameter list: NA
Purpose: Get all Employee Master
Created By and Date: Santoshkumar 05-DEC-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************************************************************************************************************************/
exports.getemployeeMaster =async (req, res) => {
  try{
   await db.query('SELECT empProf.employee_id, empProf.employee_fname, empProf.employee_mname,empProf.employee_lname,empProf.employee_code, empProf.role_id,roleMast.role_description, empProf.department_id, dept.department_name, empProf.designation_id,desg.designation_name, empProf.reporting_manager_id, '
    + ' empProf.date_of_birth, empProf.gender, empProf.joining_date, empProf.nationality, empProf.emp_photo, empProf.marital_status, empProf.blood_group, empProf.employee_status,empProf.payroll_status, empProf.base_location, '
    + ' empProf.background_verification_check, empProf.id_proof, empProf.address_proof, empProf.employee_category_id, empCateg.employee_category_name, empProf.aadhar_card_number, empProf.pan_card_number, empProf.passport_number, '
    + ' empProf.created_date, empProf.created_by,empProf.background_verification_date, empProf.background_verification_done_by,empEdu.employee_education_id,empEdu.qualification_id, qualMast.qualification,empEdu.year_of_pass,empEdu.specialization, '
    + ' empEdu.institute_name, empEdu.university, empEdu.grade '
    + ' FROM employee_master empProf LEFT OUTER JOIN role_master roleMast on empProf.role_id = roleMast.role_id '
    + ' LEFT OUTER JOIN department_master dept on empProf.department_id = dept.department_id '
    + ' LEFT OUTER JOIN designation desg on empProf.designation_id = desg.designation_id '
    + ' LEFT OUTER JOIN employee_category empCateg on empProf.employee_category_id = empCateg.employee_category_id '
    + ' LEFT OUTER JOIN employee_education empEdu on empProf.employee_id = empEdu.employee_id '
    + ' LEFT OUTER JOIN qualification_master qualMast on empEdu.qualification_id = qualMast.qualification_id order by empProf.employee_id',(err,result)=>{
if (err) throw err;
console.log(result)
      res.status(httpCodes.OK).json(result);
    })
  }catch(err){
      res.status(httpCodes.InternalServerError).json({
        error_message: "could not get all Employee Profile",
        error: err
      })
  }
  // db.query('SELECT empProf.employee_id, empProf.employee_fname, empProf.employee_mname,empProf.employee_lname,empProf.employee_code, empProf.role_id,roleMast.role_description, empProf.department_id, dept.department_name, empProf.designation_id,desg.designation_name, empProf.reporting_manager_id, '
  //   + ' empProf.date_of_birth, empProf.gender, empProf.joining_date, empProf.nationality, empProf.emp_photo, empProf.marital_status, empProf.blood_group, empProf.employee_status,empProf.payroll_status, empProf.base_location, '
  //   + ' empProf.background_verification_check, empProf.id_proof, empProf.address_proof, empProf.employee_category_id, empCateg.employee_category_name, empProf.aadhar_card_number, empProf.pan_card_number, empProf.passport_number, '
  //   + ' empProf.created_date, empProf.created_by, empProf.updated_date, empProf.updated_by,empProf.background_verification_date, empProf.background_verification_done_by,empEdu.employee_education_id,empEdu.qualification_id, qualMast.qualification,empEdu.year_of_pass,empEdu.specialization, '
  //   + ' empEdu.institute_name, empEdu.university, empEdu.grade '
  //   + ' FROM employee_master empProf LEFT OUTER JOIN role_master roleMast on empProf.role_id = roleMast.role_id '
  //   + ' LEFT OUTER JOIN department_master dept on empProf.department_id = dept.department_id '
  //   + ' LEFT OUTER JOIN designation desg on empProf.designation_id = desg.designation_id '
  //   + ' LEFT OUTER JOIN employee_category empCateg on empProf.employee_category_id = empCateg.employee_category_id '
  //   + ' LEFT OUTER JOIN employee_education empEdu on empProf.employee_id = empEdu.employee_id '
  //   + ' LEFT OUTER JOIN qualification_master qualMast on empEdu.qualification_id = qualMast.qualification_id order by empProf.employee_id'

  //   //+' AND empProf.employee_status="Active" '
  // )
  //   .then(allConditions => {
  //     res.status(httpCodes.OK).json(allConditions.rows);
  //   }).catch(err => {
  //     res.status(httpCodes.InternalServerError).json({
  //       error_message: "could not get all Employee Profile",
  //       error: err
  //     })
  //   })
}
/**********************************************************************************************************************************************************************
Method Type: getemployeeMasterById
Parameter list: employee_id
Purpose: Get Employee Master by employee_id
Created By and Date: Santoshkumar 05-DEC-2020
Modified By and Date:
Version: V.01
************************************************************************************************************************************************************************/
exports.getemployeeMasterById = async (req, res) => {
  try{
    let employee_Id = req.params.employee_id;
    let sql = 'SELECT empProf.employee_id, empProf.employee_fname, empProf.employee_mname,empProf.employee_lname,empProf.employee_code, empProf.role_id,roleMast.role_description, empProf.department_id, dept.department_name, empProf.designation_id,desg.designation_name, empProf.reporting_manager_id, '
      + ' empProf.date_of_birth, empProf.gender, empProf.joining_date, empProf.nationality, empProf.emp_photo, empProf.marital_status, empProf.blood_group, empProf.employee_status,empProf.payroll_status, empProf.base_location, '
      + ' empProf.background_verification_check, empProf.id_proof, empProf.address_proof, empProf.employee_category_id, empCateg.employee_category_name, empProf.aadhar_card_number, empProf.pan_card_number, empProf.passport_number, '
      + ' empProf.created_date, empProf.created_by,empProf.background_verification_date, empProf.background_verification_done_by,empEdu.employee_education_id,empEdu.qualification_id, qualMast.qualification,empEdu.year_of_pass,empEdu.specialization, '
      + ' empEdu.institute_name, empEdu.university, empEdu.grade '
      + ' FROM employee_master empProf LEFT OUTER JOIN role_master roleMast on empProf.role_id = roleMast.role_id '
      + ' LEFT OUTER JOIN department_master dept on empProf.department_id = dept.department_id '
      + ' LEFT OUTER JOIN designation desg on empProf.designation_id = desg.designation_id '
      + ' LEFT OUTER JOIN employee_category empCateg on empProf.employee_category_id = empCateg.employee_category_id '
      + ' LEFT OUTER JOIN employee_education empEdu on empProf.employee_id = empEdu.employee_id '
      + ' LEFT OUTER JOIN qualification_master qualMast on empEdu.qualification_id = qualMast.qualification_id  '
     + ' WHERE empProf.employee_id = ?';
    db.query(sql, [employee_Id],(err,result)=>{
      if (err) throw err;
      if (result == 0) {
        res
          .status(httpCodes.BadRequest)
          .json({ message: "Employee Id does not exists" });
      } else {
        res.status(httpCodes.OK).json(result);
      }
    })
  }catch(err){
    console.log(err.message);
    res.status(httpCodes.InternalServerError).json(err.message);
  }
  // let employee_Id = req.params.employee_id;
  // let sql = 'SELECT empProf.employee_id, empProf.employee_fname, empProf.employee_mname,empProf.employee_lname,empProf.employee_code, empProf.role_id,roleMast.role_description, empProf.department_id, dept.department_name, empProf.designation_id,desg.designation_name, empProf.reporting_manager_id, '
  //   + ' empProf.date_of_birth, empProf.gender, empProf.joining_date, empProf.nationality, empProf.emp_photo, empProf.marital_status, empProf.blood_group, empProf.employee_status,empProf.payroll_status, empProf.base_location, '
  //   + ' empProf.background_verification_check, empProf.id_proof, empProf.address_proof, empProf.employee_category_id, empCateg.employee_category_name, empProf.aadhar_card_number, empProf.pan_card_number, empProf.passport_number, '
  //   + ' empProf.created_date, empProf.created_by, empProf.updated_date, empProf.updated_by,empProf.background_verification_date, empProf.background_verification_done_by,empEdu.employee_education_id,empEdu.qualification_id, qualMast.qualification,empEdu.year_of_pass,empEdu.specialization, '
  //   + ' empEdu.institute_name, empEdu.university, empEdu.grade '
  //   + ' FROM employee_master empProf LEFT OUTER JOIN role_master roleMast on empProf.role_id = roleMast.role_id '
  //   + ' LEFT OUTER JOIN department_master dept on empProf.department_id = dept.department_id '
  //   + ' LEFT OUTER JOIN designation desg on empProf.designation_id = desg.designation_id '
  //   + ' LEFT OUTER JOIN employee_category empCateg on empProf.employee_category_id = empCateg.employee_category_id '
  //   + ' LEFT OUTER JOIN employee_education empEdu on empProf.employee_id = empEdu.employee_id '
  //   + ' LEFT OUTER JOIN qualification_master qualMast on empEdu.qualification_id = qualMast.qualification_id  '

  //   // +' AND empProf.employee_status="Active" '
  //   + ' WHERE empProf.employee_id = $1';
  // db.query(sql, [employee_Id])
    // .then((result) => {
      // if (result == null) {
      //   res
      //     .status(httpCodes.BadRequest)
      //     .json({ message: "Employee Id does not exists" });
      // } else {
      //   res.status(httpCodes.OK).json(result.rows);
      // }
    // })
    // .catch((err) => {
      // console.log(err.message);
      // res.status(httpCodes.InternalServerError).json(err.message);
    // });
}
/****************************************************************************************************************************************************************************************************** 
Method Type: updateemployeeMasterById
Parameter list: employee_id
Purpose: Update Employee Master by employee_id
Created By and Date: Santoshkumar 05-DEC-2020
Modified By and Date:
Version: V.01
*******************************************************************************************************************************************************************************************************/
exports.updateemployeeMasterById = async (req, res) => {
  try {
    var selectEmpIdQuery = 'SELECT employee_id FROM employee_education WHERE employee_id = ?';
    var empData = req.params.employee_id;
    await db.query(selectEmpIdQuery, [empData], (err, result) => {
      if (err) throw err;
      console.log(result)
      if (result == 0) {
        var employee_Id=req.params.employee_id;
        var insertQuery = 'INSERT INTO employee_education(employee_id, qualification_id, year_of_pass, specialization, institute_name, university, grade) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [employee_Id, req.body.qualification_id, req.body.year_of_pass,
          req.body.specialization, req.body.institute_name, req.body.university, req.body.grade], (err, r1) => {
            if (err) throw err;
            console.log('insert'+r1)
          })
      }
      else {
        var updatedata = [
          req.body.qualification_id,
          req.body.year_of_pass,
          req.body.specialization,
          req.body.institute_name,
          req.body.university,
          req.body.grade,
          employee_Id]
        var updateQuery1 = 'UPDATE employee_education SET  qualification_id= ?, year_of_pass= ?, specialization= ?, institute_name= ?, university=?, grade= ? WHERE employee_id=?';
        db.query(updateQuery1, updatedata, (err, r2) => {
          if (err) throw err;
          console.log('update'+r2)
        })
      }//else end
      var employee_Id = req.params.employee_id;

      var created_date = new Date();
      var data = [req.body.employee_fname, req.body.employee_mname, req.body.employee_lname, req.body.role_id, req.body.department_id, req.body.designation_id, req.body.reporting_manager_id, req.body.date_of_birth,
      req.body.gender, req.body.joining_date, req.body.nationality, req.body.emp_photo, req.body.marital_status, req.body.blood_group, req.body.employee_status, req.body.payroll_status, req.body.base_location, req.body.background_verification_check,
      req.body.id_proof, req.body.address_proof, req.body.employee_category_id, req.body.aadhar_card_number, req.body.pan_card_number, req.body.passport_number,
        created_date, req.body.created_by, req.body.background_verification_date, req.body.background_verification_done_by,
        employee_Id]
        var updateQuery = 'UPDATE employee_master SET employee_fname=?, employee_mname=?, employee_lname=?, role_id=?, department_id=?, designation_id=?, reporting_manager_id=?, date_of_birth=?, gender=?, joining_date=?, nationality=?, '
        + ' emp_photo=?, marital_status=?, blood_group=?, employee_status=?, payroll_status=?, base_location=?, background_verification_check=?, id_proof=?, address_proof=?, employee_category_id=?, aadhar_card_number=?, pan_card_number=?, '
        + ' passport_number=?, created_date=?, created_by=?, background_verification_date=?, background_verification_done_by=? where employee_id=?';
            
      db.query(updateQuery, data, (err, r3) => {
        if (err) throw err;
        res.status(httpCodes.OK).json({
          message: 'Employee Data updated Successfully',
          body: {
            data: { data }
          }
        })
      })
    })
    ///  
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }
  // var employee_Id = req.params.employee_id;

  // var updated_date = new Date();
  // var data = [req.body.employee_fname, req.body.employee_mname, req.body.employee_lname, req.body.role_id, req.body.department_id, req.body.designation_id, req.body.reporting_manager_id, req.body.date_of_birth,
  // req.body.gender, req.body.joining_date, req.body.nationality, req.body.emp_photo, req.body.marital_status, req.body.blood_group, req.body.employee_status, req.body.payroll_status, req.body.base_location, req.body.background_verification_check,
  // req.body.id_proof, req.body.address_proof, req.body.employee_category_id, req.body.aadhar_card_number, req.body.pan_card_number, req.body.passport_number,
  //   updated_date, req.body.updated_by, req.body.background_verification_date, req.body.background_verification_done_by,
  //   employee_Id]

  // var updateQuery = 'UPDATE employee_master SET employee_fname=$1, employee_mname=$2, employee_lname=$3, role_id=$4, department_id=$5, designation_id=$6, reporting_manager_id=$7, date_of_birth=$8, gender=$9, joining_date=$10, nationality=$11, '
  //   + ' emp_photo=$12, marital_status=$13, blood_group=$14, employee_status=$15, payroll_status=$16, base_location=$17, background_verification_check=$18, id_proof=$19, address_proof=$20, employee_category_id=$21, aadhar_card_number=$22, pan_card_number=$23, '
  //   + ' passport_number=$24, updated_date=$25, updated_by=$26, background_verification_date=$27, background_verification_done_by=$28 where employee_id=$29 RETURNING *';

  // var selectEmpIdQuery = 'SELECT employee_id FROM employee_education WHERE employee_id = $1';
  // var empData = req.params.employee_id;
  // db.query(selectEmpIdQuery, [empData])
  //   .then(result2 => {

  //     if (result2.rows.length == 0) {
  //       var insertQuery = 'INSERT INTO employee_education(employee_id, qualification_id, year_of_pass, specialization, institute_name, university, grade) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  //       db.query(insertQuery, [employee_Id, req.body.qualification_id, req.body.year_of_pass,
  //         req.body.specialization, req.body.institute_name, req.body.university, req.body.grade])
  //         .then(result => {

  //         })
  //         .catch(err => {
  //           console.log(err)

  //         })
  //     }
  //     else {
  //       var updatedata = [
  //         req.body.qualification_id,
  //         req.body.year_of_pass,
  //         req.body.specialization,
  //         req.body.institute_name,
  //         req.body.university,
  //         req.body.grade,
  //         employee_Id]

  //       var updateQuery1 = 'UPDATE employee_education SET  qualification_id= $1, year_of_pass= $2, specialization= $3, institute_name= $4, university= $5, grade= $6 WHERE employee_id=$7 RETURNING *';
  //       db.query(updateQuery1, updatedata)
  //         .then(result => {
  //         })
  //         .catch(err => {
  //           console.log(err)
  //           //  res.status(httpCodes.NotFound).json(err)
  //         })

  //     }//else end          

  //     db.query(updateQuery, data)
  //       .then(result => {

  //         res.status(httpCodes.OK).json({
  //           message: 'Employee Data updated Successfully',
  //           body: {
  //             data: { data }
  //           }
  //         })

  //       }) //result end
  //       .catch(err => {
  //         console.log(err.message)
  //         res.status(httpCodes.InternalServerError).json(err.message)
  //       })
  //   })
}
/****************************************************************************************************************************************************************************************************** 
Method Type: getEmployeeCode
Parameter list: NA
Purpose: get latest employee code from employee master 
Created By and Date: Garima 06-DEC-2020
Modified By and Date:
Version: V.01
*******************************************************************************************************************************************************************************************************/

exports.getEmployeeCode =async (req, res) => {
  try{
    var employee_code;
    await db.query('SELECT employee_code FROM employee_master ORDER BY employee_id  DESC',(err,result)=>{
      if (err) throw err;
      if (result.length > 0 && result[0].employee_code != null) {
        let lastId = parseInt(result[0].employee_code);
        employee_code = lastId + 1;
        res.status(httpCodes.OK).json(employee_code)
      } else {
        employee_code = 1;
        res.status(httpCodes.OK).json(employee_code)
      }

    })
      // .then((result1) => {
      //   if (result1.rows.length > 0 && result1.rows[0].employee_code != null) {
      //     let lastId = parseInt(result1.rows[0].employee_code);
      //     employee_code = lastId + 1;
      //     res.status(httpCodes.OK).json(employee_code)
      //   } else {
      //     employee_code = 1000001;
      //     res.status(httpCodes.OK).json(employee_code)
      //   }
      // })
  }catch(err){
    console.log(err)
        res.status(httpCodes.NotFound).json(err)
  }
  // var employee_code;
  // db.query('SELECT employee_code FROM employee_master ORDER BY employee_id  DESC')
  //   .then((result1) => {
  //     if (result1.rows.length > 0 && result1.rows[0].employee_code != null) {
  //       let lastId = parseInt(result1.rows[0].employee_code);
  //       employee_code = lastId + 1;
  //       res.status(httpCodes.OK).json(employee_code)
  //     } else {
  //       employee_code = 1000001;
  //       res.status(httpCodes.OK).json(employee_code)
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.status(httpCodes.NotFound).json(err)
  //   })
}

exports.deletemployeeMasterById =async (req,res) =>{
  try{
      var empId = req.params.employee_id;
      var data=[
      empId]
      var deleteQuery = 'DELETE FROM employee_master WHERE employee_id=?';
      await db.query(deleteQuery, data,(err,result)=>{
        if (err) throw err;
          console.log("employee deleted succesfully");
          res.status(httpCodes.Created).json({message:"Employee record deleted Successfully"})
      })
  }catch(err){
      console.log(err.message)
      res.status(httpCodes.InternalServerError).json(err.message)
  }
}