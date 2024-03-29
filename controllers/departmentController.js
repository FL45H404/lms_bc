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
    var sql="SELECT * FROM department ORDER BY created_date DESC";
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
        let sql = "SELECT * FROM department where department_id=?";
        await db.query(sql,data,(err,result)=>{
            console.log(result)
            return res.status(httpCodes.OK).json(result)
        })
    }catch(err){
        console.log(err.message);
         res.status(httpCodes.InternalServerError).json(err.message);

    }
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
        const data= [req.body.department_name, 'vipul', new Date()]
        var insertQuery = 'INSERT INTO department(department_name, created_by, created_date) VALUES (?,?,?)'; 
        await db.query(insertQuery,data,(err,result)=>{
            if (err) return res.send(err);
            console.log('Data created for id '+result.insertId)
            return res.status(httpCodes.OK).json('Data succesfully created for id '+result.insertId)
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
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
        var updated_date=new Date();
        var data=[
        req.body.department_name,
        'vipul',
        updated_date ,
        departmentId]
        console.log(data)
        var updateQuery = 'UPDATE department SET department_name=?, created_by=?, updated_date=? WHERE department_id=?';
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
exports.deleteDepartmentById =async (req,res) =>{
    try{
        var Id = req.params.department_id;
        var data=[
        Id]
        var deleteQuery = 'DELETE FROM role_master WHERE department_id=?';
        await db.query(deleteQuery, data,(err,result)=>{
            console.log("Department deleted succesfully");
            res.status(httpCodes.Created).json({message:"Department record deleted Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}