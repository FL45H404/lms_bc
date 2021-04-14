const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/****************************************************************************************************************************************************
Method Type: addEmployeePromotion
Parameter list: employee_id, designation_id, effective_promotion_date, compensation_percentage
Purpose: Create Employee Promotion 
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
**************************************************************************************************************************************************/ 
exports.addEmployeePromotion = (req,res) =>{
    var insertQuery = 'INSERT INTO employee_promotion(employee_id, designation_id, effective_promotion_date, compensation_percentage) VALUES ($1, $2, $3, $4)';
    db.query(insertQuery, [req.body.employee_id,req.body.designation_id, req.body.effective_promotion_date, req.body.compensation_percentage ])
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Employee Promotion record added Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}
/********************************************************************************************************************************************************* 
Method Type: getEmployeePromotion
Parameter list: NA
Purpose: Get all Employee Promotion details
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getEmployeePromotion =  (req, res) => {
    db.query('SELECT empPromotion.promotion_id, empPromotion.employee_id,empProf.employee_fname, empPromotion.designation_id, desig.designation_name, empPromotion.effective_promotion_date, empPromotion.compensation_percentage'
	+' FROM employee_promotion empPromotion, employee_master empProf, designation desig'
	+' WHERE empPromotion.employee_id = empProf.employee_id AND empPromotion.designation_id = desig.designation_id ')
   // db.query('select * from employee_promotion')
    .then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Employee Promotion details",
            error: err
        })
    })
}
 /************************************************************************************************************ 
Method Type: getEmployeePromotionById
Parameter list: promotion_id
Purpose: Get Employee Promotion by promotion_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getEmployeePromotionById = (req, res) => {
    let employeePromotionId = req.params.promotion_id;  
    let sql = 'SELECT empPromotion.promotion_id, empPromotion.employee_id, empPromotion.designation_id, desig.designation_name, empPromotion.effective_promotion_date, empPromotion.compensation_percentage'
    +' FROM employee_promotion empPromotion, employee_master empProf, designation desig'
    +' WHERE empPromotion.employee_id = empProf.employee_id AND empPromotion.designation_id = desig.designation_id ' 	
    +' AND empPromotion.promotion_id = $1';
    db.query(sql, [employeePromotionId])
        .then((result) => {            
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Employee Promotion Id does not exists" });
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
Method Type: updateEmployeePromotionById
Parameter list: promotion_id
Purpose: Update Employee Promotion by promotion_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateEmployeePromotionById = (req,res) =>{
    var employeePromotionId = req.params.promotion_id;   
    var data=[
        req.body.employee_id, 
        req.body.designation_id, 
        req.body.effective_promotion_date,
        req.body.compensation_percentage,
        employeePromotionId ]

    var updateQuery = 'UPDATE employee_promotion SET employee_id=$1, designation_id=$2, effective_promotion_date=$3, compensation_percentage=$4 WHERE promotion_id=$5 RETURNING *';
    db.query(updateQuery, data)
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Employee Promotion record updated Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}  
  