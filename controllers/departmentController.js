const httpCodes = require('../helper/httpCodes');
const db = require('../db');
const express = require("express"); 
const router = express.Router(); 

/************************************************************************************************************ 
Method Type: getDepartments
Parameter list: NA
Purpose: Get all Department names
Created By and Date: Santoshkumar 04-Nov-2020
Modified By   and Date:
Version: V.01
************************************************************************************************************/ 
exports.getDepartments = async (req, res) => {
   //let query = deptDao.getgetDepartmentDao;
   //console.log(query);
   try{
    var sql="SELECT * FROM department";
await db.query(sql,(err,result)=>{

    console.log(result)
    return res.status(httpCodes.OK).json(result)
});
}catch(err){
    console.log(err);
    res.status(httpCodes.InternalServerError).json({
        success:false,
        message:"could not get all departments",
        error:err
    })
}
    // db.query('SELECT * FROM department').then(allConditions => {
    //     res.status(httpCodes.OK).json(allConditions.rows);
    // }).catch(err => {
    //     res.status(httpCodes.InternalServerError).json({
    //         error_message: "could not get all departments",
    //         error: err
    //     })
    // })
}
/************************************************************************************************************ 
Method Type: getDepartmentById
Parameter list: department_id
Purpose: Get Department name by department_id
Created By and Date: Santoshkumar 4-Nov-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.getDepartmentById =async (req, res) => {
    try{
    const data=[req.params.department_id]
        //let departmentId= model.department_id;
        let sql = "SELECT * FROM department where department_id=?";
        await db.query(sql,data,(err,result)=>{
            console.log(result)
            return res.status(httpCodes.OK).json(result)
        })
    }catch(err){
        console.log(err.message);
         res.status(httpCodes.InternalServerError).json(err.message);

    }
        // .then((result) => {            
        //     if (result == null) {
        //         res
        //             .status(httpCodes.BadRequest)
        //             .json({ message: "DepartmentId does not exists" });
        //     } else {
        //         res.status(httpCodes.OK).json(result.rows);
        //     }
        // })
        // .catch((err) => {
        //     console.log(err.message);
        //     res.status(httpCodes.InternalServerError).json(err.message);
        // });
};

/************************************************************************************************************
Method Name: addDepartment
Parameter list: department_name,created_by,created_date
Purpose: Add record to department table
Created By and Date: Santoshkumar 03-Nov-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************/
//console.log("hii")
exports.addDepartment =async (req,res) =>{
    try{

        // console.log("hii")
        // console.log(req.body.department_name+"depname");
        // console.log(req.body.created_by+"createdby");
        const data= [req.body.department_name, req.body.created_by, new Date()]
        var insertQuery = 'INSERT INTO department(department_name, created_by, created_date) VALUES (?,?,?)'; 
        await db.query(insertQuery,data,(err,result)=>{
            console.log('Data created for id '+result.insertId)
            return res.status(httpCodes.OK).json('Data succesfully created for id '+result.insertId)
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
    // .then(result =>{
    // })
    // .catch(err =>{
    //     console.log(err.message)
    //     res.status(httpCodes.InternalServerError).json(err.message)
    // })
}
/************************************************************************************************************
Method Name: updateDepartmentById
Parameter list: 

Purpose: Add record to department table
Created By and Date: Santoshkumar 03-Nov-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************/
exports.updateDepartmentById = async(req,res) =>{
    try{
        var departmentId = req.params.department_id;
        var created_date=new Date();
        var data=[
        req.body.department_name,
        req.body.created_by,
        created_date ,
        departmentId]
        console.log(data)
        var updateQuery = 'UPDATE department SET department_name=?, created_by=?, created_date=? WHERE department_id=?';
        await db.query(updateQuery, data,(err,result)=>{
            console.log(result)
            return res.status(httpCodes.OK).json('Rows affected: '+result.affectedRows);
        })
    }catch(err){
        
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
    // .then(result =>{
    //     res.status(httpCodes.Created).json({message:"Department record updated Successfully"})
    // })
    // .catch(err =>{
    //     console.log(err.message)
    //     res.status(httpCodes.InternalServerError).json(err.message)
    // })
}

/* module.exports = {
    getDepartments : getDepartments,
    getDepartment : getDepartment,
    addDepartment : addDepartment
} */