const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/************************************************************************************************************ 
Method Type: addemployeeCategory
Parameter list: employee_category_name,created_by,created_date
Purpose: Create Employee categories
Created By and Date: Santoshkumar 1-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.addemployeeCategory = async (req,res) =>{
    try{
        const data=[req.body.employee_category_name, req.body.created_by, new Date()]
        var insertQuery = 'INSERT INTO employee_category(employee_category_name, created_by, created_date) VALUES (?,?,?)';
        await db.query(insertQuery, data,(err,result)=>{
            if (err) throw err;
            res.status(httpCodes.Created).json({message:"Employee Category record added Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
    // var insertQuery = 'INSERT INTO employee_category(employee_category_name, created_by, created_date) VALUES ($1, $2, $3)';
    // await db.query(insertQuery, [req.body.employee_category_name, req.body.created_by, new Date()])
    // .then(result =>{
        // res.status(httpCodes.Created).json({message:"Employee Category record added Successfully"})
    // })
    // .catch(err =>{
        // console.log(err.message)
        // res.status(httpCodes.InternalServerError).json(err.message)
    // })
}
/************************************************************************************************************ 
Method Type: getemployeeCategory
Parameter list: NA
Purpose: Get all Employee categories
Created By and Date: Santoshkumar 1-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getemployeeCategory = async (req, res) => {
    try{
    await db.query('SELECT * FROM employee_category',(err,result)=>{
if (err) throw err;
            res.status(httpCodes.OK).json(result);
        })
    }catch(err){
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Employee Category",
            error: err
        })
    }
    // db.query('SELECT * FROM employee_category').then(allConditions => {
        // res.status(httpCodes.OK).json(allConditions.rows);
    // }).catch(err => {
        // res.status(httpCodes.InternalServerError).json({
        //     error_message: "could not get all Employee Category",
        //     error: err
        // })
    // })
}
 /************************************************************************************************************ 
Method Type: getemployeeCategoryById
Parameter list: employee_category_id
Purpose: Get Employee Category by employee_category_id
Created By and Date: Santoshkumar 1-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getemployeeCategoryById = async (req, res) => {
    try{

        let employee_categoryId = req.params.employee_category_id;  
        let sql = "SELECT * FROM employee_category where employee_category_id=?";
        await db.query(sql, [employee_categoryId],(err,result)=>{
            if (err) throw err;
            res.status(httpCodes.OK).json(result);
        })
    }catch(err){
        console.log(err.message);
        res.status(httpCodes.InternalServerError).json(err.message);
    }
        // .then((result) => {            
            // if (result == null) {
                // res
                    // .status(httpCodes.BadRequest)
                    // .json({ message: "Employee Category Id does not exists" });
            // } else {
                // res.status(httpCodes.OK).json(result.rows);
            // }
        // })
        // .catch((err) => {
            // console.log(err.message);
            // res.status(httpCodes.InternalServerError).json(err.message);
        // });
}
/************************************************************************************************************ 
Method Type: updateemployeeCategoryById
Parameter list: employee_category_id
Purpose: Update Employee Category by employee_category_id
Created By and Date: Santoshkumar 1-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateemployeeCategoryById =async (req,res) =>{
    try{
        var employee_categoryId = req.params.employee_category_id;
        var created_date=new Date();
        var data=[
        req.body.employee_category_name,
        req.body.created_by,
        created_date ,
        employee_categoryId]
    
        var updateQuery = 'UPDATE employee_category SET employee_category_name=?, created_by=?, created_date=? WHERE employee_category_id=?';
        await db.query(updateQuery, data,(err,result)=>{
            if (err) throw err;
            res.status(httpCodes.Created).json({message:"Employee Category record updated Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
    // var employee_categoryId = req.params.employee_category_id;
    // var updated_date=new Date();
    // var data=[
    // req.body.employee_category_name,
    // req.body.updated_by,
    // updated_date ,
    // employee_categoryId]

    // var updateQuery = 'UPDATE employee_category SET employee_category_name=$1, updated_by=$2, updated_date=$3 WHERE employee_category_id=$4 RETURNING *';
    // await db.query(updateQuery, data)
    // .then(result =>{
        // res.status(httpCodes.Created).json({message:"Employee Category record updated Successfully"})
    // })
    // .catch(err =>{  
        // console.log(err.message)
        // res.status(httpCodes.InternalServerError).json(err.message)
    // })
}  

