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
exports.addEmployeePromotion = async (req,res) =>{
    try{
        var insertQuery = 'INSERT INTO employee_promotion(employee_id, designation_id, effective_promotion_date, compensation_percentage) VALUES (?,?,?,?)';
        await db.query(insertQuery, [req.body.employee_id,req.body.designation_id, req.body.effective_promotion_date, req.body.compensation_percentage],(err,result)=>{
            if (err) throw err;
            res.status(httpCodes.Created).json({message:"Employee Promotion record added Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}
/********************************************************************************************************************************************************* 
Method Type: getEmployeePromotion
Parameter list: NA
Purpose: Get all Employee Promotion details
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getEmployeePromotion = async (req, res) => {
    try{
        await db.query('SELECT empPromotion.promotion_id, empPromotion.employee_id,empProf.employee_fname, empPromotion.designation_id, desig.designation_name, empPromotion.effective_promotion_date, empPromotion.compensation_percentage'
        +' FROM employee_promotion empPromotion, employee_master empProf, designation desig'
        +' WHERE empPromotion.employee_id = empProf.employee_id AND empPromotion.designation_id = desig.designation_id ',(err,result)=>{
            if (err) throw err;
            console.log(result);
            res.status(httpCodes.OK).json(result);
        })
    }catch(err){
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Employee Promotion details",
            error: err
        })
    }
    // db.query('select * from employee_promotion')
}
 /************************************************************************************************************ 
Method Type: getEmployeePromotionById
Parameter list: promotion_id
Purpose: Get Employee Promotion by promotion_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getEmployeePromotionById = async (req, res) => {
    try{

        let employeePromotionId = req.params.promotion_id;  
        let sql = 'SELECT empPromotion.promotion_id, empPromotion.employee_id, empPromotion.designation_id, desig.designation_name, empPromotion.effective_promotion_date, empPromotion.compensation_percentage'
        +' FROM employee_promotion empPromotion, employee_master empProf, designation desig'
        +' WHERE empPromotion.employee_id = empProf.employee_id AND empPromotion.designation_id = desig.designation_id ' 	
        +' AND empPromotion.promotion_id = ?';
        await db.query(sql, [employeePromotionId],(err,result)=>{
            if (err) throw err;
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Employee Promotion Id does not exists" });
            } else {
                res.status(httpCodes.OK).json(result);
            }   
        })
    }catch(err){
        console.log(err.message);
            res.status(httpCodes.InternalServerError).json(err.message);
    }
        // .then((result) => {            
            
        // })
        // .catch((err) => {
        //     console.log(err.message);
        //     res.status(httpCodes.InternalServerError).json(err.message);
        // });
} 
  /************************************************************************************************************ 
Method Type: updateEmployeePromotionById
Parameter list: promotion_id
Purpose: Update Employee Promotion by promotion_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateEmployeePromotionById = async (req,res) =>{
    try{
        var employeePromotionId = req.params.promotion_id;   
        var data=[
            req.body.employee_id, 
            req.body.designation_id, 
            req.body.effective_promotion_date,
            req.body.compensation_percentage,
            employeePromotionId ]
    
        var updateQuery = 'UPDATE employee_promotion SET employee_id=?, designation_id=?, effective_promotion_date=?, compensation_percentage=? WHERE promotion_id=?';
        await db.query(updateQuery, data,(err,result)=>{
            res.status(httpCodes.Created).json({message:"Employee Promotion record updated Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}  
  