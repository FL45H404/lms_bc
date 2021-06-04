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
    db.query("select * from employee_master ORDER BY created_date DESC LIMIT 1", (err, result) => {
      if (result.length > 0 && result[0].employee_id != null) {
        var keyid = (result[0].employee_id);
        var keyLength = keyid.length;
        var previousKey = keyid.substring(0, 3)
        var lastKey = parseInt(keyid.substring(3, keyLength))
        var nextKey = String(lastKey + 1);
        var id = previousKey;
        var lengthofnextkey = nextKey.length;
        while (lengthofnextkey < keyLength - 3) {
            nextKey = "0" + nextKey;
            lengthofnextkey += 1;
    
        }
        id += nextKey
        // 
      } else {
        id = 'EMP0000001';
      }
      var created_date = new Date();
      var data = [id,
        req.body.employee_fname, req.body.employee_mname, req.body.employee_lname, req.body.employee_code, req.body.role_id, req.body.department_id, req.body.designation_id, req.body.reporting_manager_id, req.body.date_of_birth,
        req.body.gender, req.body.joining_date, req.body.nationality, req.body.emp_photo, req.body.marital_status, req.body.blood_group, req.body.employee_status, req.body.payroll_status, req.body.base_location, req.body.background_verification_check,
        req.body.id_proof, req.body.address_proof, req.body.employee_category_id, req.body.aadhar_card_number, req.body.pan_card_number, req.body.passport_number, created_date, 'vipul', req.body.background_verification_date, req.body.background_verification_done_by,req.body.email_id
      ]
      db.query('INSERT INTO employee_master (employee_id,employee_fname, employee_mname, employee_lname, employee_code, role_id, department_id, designation_id, reporting_manager_id, date_of_birth, gender, joining_date, nationality, emp_photo, marital_status, '
        + ' blood_group, employee_status, payroll_status, base_location, background_verification_check, id_proof, address_proof, employee_category_id, aadhar_card_number, pan_card_number, passport_number,  '
        + ' created_date, created_by, background_verification_date,background_verification_done_by,email_id) VALUES (?,?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)',
        data, (err, result) => {
          if (err) return res.send(err);
          console.log(data)
          console.log(id)
          if (req.body.qualification_id != "" || null) {
            var insertQuery = 'INSERT INTO employee_education(employee_id, qualification_id, year_of_pass, specialization, institute_name, university, grade) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.query(insertQuery, [id, req.body.qualification_id, req.body.year_of_pass,
              req.body.specialization, req.body.institute_name, req.body.university, req.body.grade], (err, result1) => {
                if (err) return res.send(err);
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
    })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.NotFound).json(err)
  }

}




/***********************************************************************************************************************************************************************************************************************************************************************************************************
Method Type: getemployeeMaster
Parameter list: NA
Purpose: Get all Employee Master
Created By and Date: Santoshkumar 05-DEC-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************************************************************************************************************************/
exports.getemployeeMaster = async (req, res) => {
  try {
    await db.query('SELECT empProf.employee_id, empProf.employee_fname, empProf.employee_mname,empProf.employee_lname,empProf.employee_code, empProf.role_id,roleMast.role_description, empProf.department_id, dept.department_name, empProf.designation_id,desg.designation_name, empProf.reporting_manager_id, '
      + ' empProf.date_of_birth, empProf.gender, empProf.joining_date, empProf.nationality, empProf.emp_photo, empProf.marital_status, empProf.blood_group, empProf.employee_status,empProf.payroll_status, empProf.base_location, '
      + ' empProf.background_verification_check, empProf.id_proof, empProf.address_proof, empProf.employee_category_id, empCateg.employee_category_name, empProf.aadhar_card_number, empProf.pan_card_number, empProf.passport_number, empProf.email_id,'
      + ' empProf.created_date, empProf.created_by,empProf.updated_date,empProf.background_verification_date, empProf.background_verification_done_by,empEdu.employee_education_id,empEdu.qualification_id, qualMast.qualification,empEdu.year_of_pass,empEdu.specialization, '
      + ' empEdu.institute_name, empEdu.university, empEdu.grade '
      + ' FROM employee_master empProf LEFT OUTER JOIN role_master roleMast on empProf.role_id = roleMast.role_id '
      + ' LEFT OUTER JOIN department_master dept on empProf.department_id = dept.department_id '
      + ' LEFT OUTER JOIN designation desg on empProf.designation_id = desg.designation_id '
      + ' LEFT OUTER JOIN employee_category empCateg on empProf.employee_category_id = empCateg.employee_category_id '
      + ' LEFT OUTER JOIN employee_education empEdu on empProf.employee_id = empEdu.employee_id '
      + ' LEFT OUTER JOIN qualification_master qualMast on empEdu.qualification_id = qualMast.qualification_id order by empProf.created_date DESC', (err, result) => {
        if (err) return res.send(err);
        console.log(result)
        res.status(httpCodes.OK).json(result);
      })
  } catch (err) {
    res.status(httpCodes.InternalServerError).json({
      error_message: "could not get all Employee Profile",
      error: err
    })
  }
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
  try {
    let employee_Id = req.params.employee_id;
    let sql = 'SELECT empProf.employee_id, empProf.employee_fname, empProf.employee_mname,empProf.employee_lname,empProf.employee_code, empProf.role_id,roleMast.role_description, empProf.department_id, dept.department_name, empProf.designation_id,desg.designation_name, empProf.reporting_manager_id, '
      + ' empProf.date_of_birth, empProf.gender, empProf.joining_date, empProf.nationality, empProf.emp_photo, empProf.marital_status, empProf.blood_group, empProf.employee_status,empProf.payroll_status, empProf.base_location, '
      + ' empProf.background_verification_check, empProf.id_proof, empProf.address_proof, empProf.employee_category_id, empCateg.employee_category_name, empProf.aadhar_card_number, empProf.pan_card_number, empProf.passport_number, empProf.email_id, '
      + ' empProf.created_date, empProf.created_by,empProf.updated_date,empProf.background_verification_date, empProf.background_verification_done_by,empEdu.employee_education_id,empEdu.qualification_id, qualMast.qualification,empEdu.year_of_pass,empEdu.specialization, '
      + ' empEdu.institute_name, empEdu.university, empEdu.grade '
      + ' FROM employee_master empProf LEFT OUTER JOIN role_master roleMast on empProf.role_id = roleMast.role_id '
      + ' LEFT OUTER JOIN department_master dept on empProf.department_id = dept.department_id '
      + ' LEFT OUTER JOIN designation desg on empProf.designation_id = desg.designation_id '
      + ' LEFT OUTER JOIN employee_category empCateg on empProf.employee_category_id = empCateg.employee_category_id '
      + ' LEFT OUTER JOIN employee_education empEdu on empProf.employee_id = empEdu.employee_id '
      + ' LEFT OUTER JOIN qualification_master qualMast on empEdu.qualification_id = qualMast.qualification_id  '
      + ' WHERE empProf.employee_id = ?';
    db.query(sql, [employee_Id], (err, result) => {
      if (err) return res.send(err);
      if (result == 0) {
        res
          .status(httpCodes.BadRequest)
          .json({ message: "Employee Id does not exists" });
      } else {
        res.status(httpCodes.OK).json(result);
      }
    })
  } catch (err) {
    console.log(err.message);
    res.status(httpCodes.InternalServerError).json(err.message);
  }
  
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
    var employee_Id = req.params.employee_id;

    var updated_date = new Date();
    var data = [req.body.employee_fname, req.body.employee_mname, req.body.employee_lname, req.body.role_id, req.body.department_id, req.body.designation_id, req.body.reporting_manager_id, req.body.date_of_birth,
    req.body.gender, req.body.joining_date, req.body.nationality, req.body.emp_photo, req.body.marital_status, req.body.blood_group, req.body.employee_status, req.body.payroll_status, req.body.base_location, req.body.background_verification_check,
    req.body.id_proof, req.body.address_proof, req.body.employee_category_id, req.body.aadhar_card_number, req.body.pan_card_number, req.body.passport_number,
      updated_date, req.body.created_by, req.body.background_verification_date, req.body.background_verification_done_by,req.body.email_id,
      employee_Id]
    var updateQuery = 'UPDATE employee_master SET employee_fname=?, employee_mname=?, employee_lname=?, role_id=?, department_id=?, designation_id=?, reporting_manager_id=?, date_of_birth=?, gender=?, joining_date=?, nationality=?, '
      + ' emp_photo=?, marital_status=?, blood_group=?, employee_status=?, payroll_status=?, base_location=?, background_verification_check=?, id_proof=?, address_proof=?, employee_category_id=?, aadhar_card_number=?, pan_card_number=?, '
      + ' passport_number=?, updated_date=?, created_by=?, background_verification_date=?, background_verification_done_by=? where employee_id=?';
    var selectEmpIdQuery = 'SELECT employee_id FROM employee_education WHERE employee_id = ?';
    var empData = req.params.employee_id;
    await db.query(selectEmpIdQuery, [empData], (err, result) => {
      if (err) return res.send(err);
      console.log(result)
      if (result == 0) {
        var employee_Id = req.params.employee_id;
        var insertQuery = 'INSERT INTO employee_education(employee_id, qualification_id, year_of_pass, specialization, institute_name, university, grade) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [employee_Id, req.body.qualification_id, req.body.year_of_pass,
          req.body.specialization, req.body.institute_name, req.body.university, req.body.grade], (err, r1) => {
            if (err) return res.send(err);
            console.log('insert')
          })
      }
      else {
        var employee_Id = req.params.employee_id;
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
          if (err) return res.send(err);
          console.log('update')
        })
      }//else end       
      db.query(updateQuery, data, (err, r3) => {
        if (err) return res.send(err);
        console.log('Employee Data updated Successfully')
        res.status(httpCodes.OK).json({
          message: 'Employee Data updated Successfully'
        })
      })
    })
    ///  
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }
}
/****************************************************************************************************************************************************************************************************** 
Method Type: getEmployeeCode
Parameter list: NA
Purpose: get latest employee code from employee master 
Created By and Date: Garima 06-DEC-2020
Modified By and Date:
Version: V.01
*******************************************************************************************************************************************************************************************************/

exports.getEmployeeCode = async (req, res) => {
  try {
    var employee_code;
    await db.query('SELECT employee_code FROM employee_master ORDER BY created_date  DESC', (err, result) => {
      if (err) return res.send(err);
      if (result.length > 0 && result[0].employee_code != null) {
        let lastId = parseInt(result[0].employee_code);
        employee_code = lastId + 1;
        res.status(httpCodes.OK).json(employee_code)
      } else {
        employee_code = 1000001;
        res.status(httpCodes.OK).json(employee_code)
      }

    })
  } catch (err) {
    console.log(err)
    res.status(httpCodes.NotFound).json(err)
  }
 
}

exports.deletemployeeMasterById = async (req, res) => {
  try {
    var empId = req.params.employee_id;
    var data = [
      empId]
    var deleteQuery = 'DELETE FROM employee_master WHERE employee_id=?';
    await db.query(deleteQuery, data, (err, result) => {
      if (err) return res.send(err);
      console.log("employee deleted succesfully");
      res.status(httpCodes.Created).json({ message: "Employee record deleted Successfully" })
    })
  } catch (err) {
    console.log(err.message)
    res.status(httpCodes.InternalServerError).json(err.message)
  }
}
