const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/****************************************************************************************************************************************************
Method Type: addEmployeePerformance
Parameter list: employee_id, assessment_year, performance_rating, increment_percentage, bonus_percentage
Purpose: Create Employee Performance 
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
**************************************************************************************************************************************************/ 
exports.addEmployeePerformance = (req,res) =>{
    var insertQuery = 'INSERT INTO employee_performance(employee_id, assessment_year, performance_rating, increment_percentage, bonus_percentage) VALUES ($1, $2, $3, $4, $5)';
    db.query(insertQuery, [ req.body.employee_id, req.body.assessment_year, req.body.performance_rating, req.body.increment_percentage, req.body.bonus_percentage])
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Employee Performance record added Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}
/************************************************************************************************************ 
Method Type: getEmployeePerformance
Parameter list: NA
Purpose: Get all Employee Performance details
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getEmployeePerformance =  (req, res) => {
    db.query('SELECT empPerform.employee_id,empProf.employee_name, empPerform.employee_performance_id, empPerform.assessment_year, empPerform.performance_rating, empPerform.increment_percentage, empPerform.bonus_percentage'
	+' FROM employee_performance empPerform, employee_profile empProf '
	+' WHERE empPerform.employee_id = empProf.employee_id ')
    .then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Employee Performance details",
            error: err
        })
    })
}
 /************************************************************************************************************ 
Method Type: getEmployeePerformanceById
Parameter list: employee_performance_id
Purpose: Get Employee Performance by employee_performance_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getEmployeePerformanceById = (req, res) => {
    let employeePerformanceId = req.params.employee_performance_id;  
    let sql = 'SELECT empPerform.employee_id, empPerform.employee_performance_id, empPerform.assessment_year, empPerform.performance_rating, empPerform.increment_percentage, empPerform.bonus_percentage'
    +' FROM employee_performance empPerform, employee_profile empProf '
    +' WHERE empPerform.employee_id = empProf.employee_id ' 	
    +' AND empPerform.employee_performance_id=$1';
    db.query(sql, [employeePerformanceId])
        .then((result) => {            
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Employee Performance Id does not exists" });
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
Method Type: updateEmployeePerformanceById
Parameter list: employee_performance_id
Purpose: Update Employee Performance by employee_performance_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateEmployeePerformanceById = (req,res) =>{
    var employee_performanceId = req.params.employee_performance_id;   
    var data=[
        req.body.employee_id, 
        req.body.assessment_year, 
        req.body.performance_rating,
        req.body.increment_percentage,
        req.body.bonus_percentage,
        employee_performanceId ]

    var updateQuery = 'UPDATE employee_performance SET employee_id=$1, assessment_year=$2, performance_rating=$3, increment_percentage=$4, bonus_percentage=$5 WHERE employee_performance_id=$6 RETURNING *';
    db.query(updateQuery, data)
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Employee Performance record updated Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}  
exports.deleteEmployeePerformanceById =async (req,res) =>{
    try{
        var empId = req.params.employee_performance_id;
        var data=[
        empId]
        var deleteQuery = 'DELETE FROM employee_experience WHERE employee_performance_id=?';
        await db.query(deleteQuery, data,(err,result)=>{
          if (err) throw err;
            console.log("employee performance record deleted succesfully");
            res.status(httpCodes.Created).json({message:"Employee performance record record deleted Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
  }

  