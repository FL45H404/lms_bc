const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/*************************************************************************************************************************************************************** 
Method Type: addemployeeExperience
Parameter list: employee_id,previous_company_name,previous_company_designation,prevoius_experience_start_date,prevoius_experience_end_date
Purpose: Create Employee Experience
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
****************************************************************************************************************************************************************/ 
exports.addemployeeExperience = (req,res) =>{
    var insertQuery = 'INSERT INTO employee_experience(employee_id, previous_company_name, previous_company_designation, prevoius_experience_start_date, prevoius_experience_end_date) VALUES ($1, $2, $3, $4, $5)';
    db.query(insertQuery, [req.body.employee_id, req.body.previous_company_name, req.body.previous_company_designation, req.body.prevoius_experience_start_date, req.body.prevoius_experience_end_date])
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Employee Experience record added Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}
/****************************************************************************************************************************************************************** 
Method Type: getemployeeExperience
Parameter list: NA
Purpose: Get all Employee Experience
Created By and Date: Santoshkumar: 12-NOV-2020
Modified By and Date:
Version: V.01
*****************************************************************************************************************************************************************/   
exports.getemployeeExperience =  (req, res) => {
    db.query('SELECT empExper.employee_experience_id,empProf.employee_fname, empExper.employee_id, empExper.previous_company_name, empExper.previous_company_designation, empExper.prevoius_experience_start_date, empExper.prevoius_experience_end_date '
    + 'FROM employee_experience empExper, employee_master empProf WHERE empExper.employee_id = empProf.employee_id')
   // db.query('select * from employee_experience')
      .then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Employee Experience",
            error: err
        })
    })
}
 /************************************************************************************************************ 
Method Type: getemployeeExperienceById
Parameter list: employee_experience_id
Purpose: Get Employee Experience by employee_experience_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getemployeeExperienceById = (req, res) => {
    let employee_experienceId = req.params.employee_experience_id;  
    let sql = 'SELECT empExper.employee_id, empExper.previous_company_name, empExper.previous_company_designation, empExper.prevoius_experience_start_date, empExper.prevoius_experience_end_date '
    +' FROM employee_experience empExper, employee_master empProf WHERE empExper.employee_id = empProf.employee_id' 	
    +' AND empExper.employee_experience_id = $1';
    db.query(sql, [employee_experienceId])
        .then((result) => {            
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Employee Experience Id does not exists" });
            } else {
                res.status(httpCodes.OK).json(result.rows);
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(httpCodes.InternalServerError).json(err.message);
        });
}
/************************************************************************************************************ 
Method Type: updateemployeeExperienceById
Parameter list: employee_experience_id
Purpose: Update Employee Experience by employee_experience_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateemployeeExperienceById = (req,res) =>{
    var employee_experienceId = req.params.employee_experience_id;    
    var data=[
        req.body.employee_id,   
        req.body.previous_company_name, 
        req.body.previous_company_designation, 
        req.body.prevoius_experience_start_date,
        req.body.prevoius_experience_end_date,
         employee_experienceId]

    var updateQuery = 'UPDATE employee_experience SET employee_id=$1, previous_company_name=$2, previous_company_designation=$3, prevoius_experience_start_date=$4, prevoius_experience_end_date=$5 WHERE employee_experience_id=$6 RETURNING *';
    db.query(updateQuery, data)
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Employee Experience record updated Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}  

