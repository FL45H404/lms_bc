const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/*************************************************************************************************************************************************************** 
Method Type: addemployeeExperience
Parameter list: employee_id,previous_company_name,previous_company_designation,previous_experience_start_date,previous_experience_end_date
Purpose: Create Employee Experience
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
****************************************************************************************************************************************************************/ 
exports.addemployeeExperience = async(req,res) =>{
    try{
        var insertQuery = 'INSERT INTO employee_experience(employee_id, previous_company_name, previous_company_designation, previous_experience_start_date, previous_experience_end_date) VALUES (?, ?, ?, ?, ?)';
        await db.query(insertQuery, [req.body.employee_id, req.body.previous_company_name, req.body.previous_company_designation, req.body.previous_experience_start_date, req.body.previous_experience_end_date],(err,result)=>{
            if (err) throw err;
            res.status(httpCodes.Created).json({message:"Employee Experience record added Successfully"})    
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}
/****************************************************************************************************************************************************************** 
Method Type: getemployeeExperience
Parameter list: NA
Purpose: Get all Employee Experience
Created By and Date: Santoshkumar: 12-NOV-2020
Modified By and Date:
Version: V.01
*****************************************************************************************************************************************************************/   
exports.getemployeeExperience = async (req, res) => {
    try{
        await db.query('SELECT empExper.employee_experience_id,empProf.employee_fname, empExper.employee_id, empExper.previous_company_name, empExper.previous_company_designation, empExper.previous_experience_start_date, empExper.previous_experience_end_date '
        + 'FROM employee_experience empExper, employee_master empProf WHERE empExper.employee_id = empProf.employee_id',(err,result)=>{
            if (err) throw err;
            console.log(result)
            res.status(httpCodes.OK).json(result);
        })
    }catch(err){
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Employee Experience",
            error: err
        })
    }
    
   // db.query('select * from employee_experience')
}
 /************************************************************************************************************ 
Method Type: getemployeeExperienceById
Parameter list: employee_experience_id
Purpose: Get Employee Experience by employee_experience_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getemployeeExperienceById = async (req, res) => {
    try{
        let employee_experienceId = req.params.employee_experience_id;  
        let sql = 'SELECT empExper.employee_id, empExper.previous_company_name, empExper.previous_company_designation, empExper.previous_experience_start_date, empExper.previous_experience_end_date '
        +' FROM employee_experience empExper, employee_master empProf WHERE empExper.employee_id = empProf.employee_id' 	
        +' AND empExper.employee_experience_id = ?';
        await db.query(sql, [employee_experienceId],(err,result)=>{
            if (err) throw err;
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Employee Experience Id does not exists" });
            } else {
                console.log(result)
                res.status(httpCodes.OK).json(result);
            }

        })
    }catch(err){
        console.log(err.message);
        res.status(httpCodes.InternalServerError).json(err.message);
    }
}
/************************************************************************************************************ 
Method Type: updateemployeeExperienceById
Parameter list: employee_experience_id
Purpose: Update Employee Experience by employee_experience_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateemployeeExperienceById =async(req,res) =>{
    try{
        var employee_experienceId = req.params.employee_experience_id;    
        var data=[
            req.body.employee_id,   
            req.body.previous_company_name, 
            req.body.previous_company_designation, 
            req.body.previous_experience_start_date,
            req.body.previous_experience_end_date,
             employee_experienceId]
    
        var updateQuery = 'UPDATE employee_experience SET employee_id=?, previous_company_name=?, previous_company_designation=?, previous_experience_start_date=?, previous_experience_end_date=? WHERE employee_experience_id=?';
        await db.query(updateQuery, data,(err,result)=>{
            if (err) throw err;
            res.status(httpCodes.Created).json({message:"Employee Experience record updated Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}  

