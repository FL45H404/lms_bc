const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/************************************************************************************************************ 
Method Type: addemployeeDependents
Parameter list: employee_category_name,created_by,created_date
Purpose: Create Employee Dependents
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.addemployeeDependents = (req,res) =>{
    var insertQuery = 'INSERT INTO employee_dependents(employee_id, relation_type, relation_name, relation_age, relation_gender) VALUES ($1, $2, $3, $4, $5)';
    db.query(insertQuery, [ req.body.employee_id, req.body.relation_type,req.body.relation_name, req.body.relation_age,req.body.relation_gender ] )
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Employee Dependents record added Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}




/************************************************************************************************************ 
Method Type: getemployeeDependents
Parameter list: NA
Purpose: Get all Employee Dependents
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getemployeeDependents =  (req, res) => {
    db.query('SELECT empDependt.employee_dependent_id, empDependt.employee_id, empDependt.relation_type, empDependt.relation_name, empDependt.relation_age, empDependt.relation_gender'
	+' FROM employee_dependents empDependt, employee_master empProf'
	+' WHERE empDependt.employee_id = empProf.employee_id ').then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Employee Dependents",
            error: err
        })
    })
}
 /************************************************************************************************************ 
Method Type: getemployeeDependentsById
Parameter list: employee_dependent_id
Purpose: Get Employee Dependents by employee_dependent_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getemployeeDependentsById = (req, res) => {
    let employee_dependentId = req.params.employee_dependent_id;  
    let sql = 'SELECT empDependt.employee_dependent_id, empDependt.employee_id, empDependt.relation_type, empDependt.relation_name, empDependt.relation_age, empDependt.relation_gender'
    +' FROM employee_dependents empDependt, employee_master empProf'
    +' WHERE empDependt.employee_id = empProf.employee_id ' 	
    +' AND empDependt.employee_dependent_id = $1';
    db.query(sql, [employee_dependentId])
        .then((result) => {            
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Employee Dependents Id does not exists" });
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
Method Type: updateemployeeDependentsById
Parameter list: employee_dependent_id
Purpose: Update Employee Dependents by employee_dependent_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateemployeeDependentsById = (req,res) =>{
    var employee_dependentId = req.params.employee_dependent_id;
    var updated_date=new Date();
    var data=[
        req.body.employee_id,   
        req.body.relation_type, 
        req.body.relation_name, 
        req.body.relation_age,
        req.body.relation_gender,
        employee_dependentId]

    var updateQuery = 'UPDATE employee_dependents SET employee_id=$1, relation_type=$2, relation_name=$3, relation_age=$4, relation_gender=$5 WHERE employee_dependent_id=$6 RETURNING *';
    db.query(updateQuery, data)
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Employee Dependents record updated Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}  

