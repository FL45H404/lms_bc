const httpCodes = require('../helper/httpCodes');
const db = require('../db');
const express = require("express"); 
const router = express.Router(); 

/************************************************************************************************************ 
Method Type: getDepartmentMaster
Parameter list: NA
Purpose: Get all Department names
Created By and Date: Santoshkumar 02-Dec-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.getDepartmentMaster =  async (req, res) => {
    try{
        var sql="SELECT * FROM department_master ORDER BY created_date DESC";
    await db.query(sql,(err,result)=>{

        console.log(result)
        return res.status(httpCodes.OK).json(result)
    });
  
    }catch(err){
        console.log(err);
        res.status(httpCodes.InternalServerError).json({
            success:false,
            message:err.message
        })
    }
}
/************************************************************************************************************ 
Method Type: getDepartmentMasterById
Parameter list: department_id
Purpose: Get Department name by department_id
Created By and Date: Santoshkumar 02-Dec-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.getDepartmentMasterById = async(req, res) => {
    try{
        let data = [req.params.department_id];   
        let sql = "SELECT * FROM department_master where department_id=?";
        await db.query(sql, data,(err,result)=>{
            console.log(result)
            return res.status(httpCodes.OK).json(result)
        })
    }catch(err){
        console.log(err);
        res.status(httpCodes.InternalServerError).json({
            success:false,
            message:err.message
        })
    }
    
        // .then((result) => {            
        //     if (result == null) {
        //         res
        //             .status(httpCodes.BadRequest)
        //             .json({ message: "Department does not exists" });
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
Method Name: addDepartmentMaster
Parameter list: department_name,department_code, department_head, department_type, department_location, created_by, created_date
Purpose: Add record to department master table
Created By and Date: Santoshkumar 03-Dec-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************/

exports.addDepartmentMaster = async (req, res) => {
    try {
      db.query("select * from department_master ORDER BY created_date DESC LIMIT 1", (err, result) => {
        if (result.length > 0 && result[0].department_id != null) {
            var keyid = (result[0].department_id);
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
        } else {
          id = 'DPT0000001';
        }
        console.log(id)
        var data = [
            id, 
            req.body.department_name,
            req.body.department_code,
            req.body.department_head,
            req.body.department_type,
            req.body.department_location, 
            'neel',
            new Date()]
         var insertQuery = "INSERT INTO department_master (department_id, department_name,department_code, department_head, department_type, department_location, created_by, created_date) VALUES (?,?,?,?,?,?,?,?)";
        db.query(insertQuery, data, (err, result) => {
          if (err) return res.send(err);
          console.log(data)
           return res.status(httpCodes.Created).json({ message: "Department record added Successfully" })
        })
  
      })
    } catch (err) {
      console.log(err.message)
      res.status(httpCodes.InternalServerError).json(err.message)
    }
  
  }




















/************************************************************************************************************
Method Name: updateDepartmentMasterById
Parameter list: department_name,department_code, department_head, department_type, department_location, created_by, created_date
Purpose: Add record to department table
Created By and Date: Santoshkumar 03-Dec-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************/
exports.updateDepartmentMasterById = async (req,res) =>{
    try{

        var departmentId = req.params.department_id;
        var updated_date=new Date();
        var data=[
        req.body.department_name,
        req.body.department_code,
        req.body.department_head,
        req.body.department_type,
        req.body.department_location,
        'vipul',
        updated_date,
        departmentId]
        console.log(data)
        var updateQuery = "UPDATE department_master SET department_name=? ,department_code=?, department_head=?, department_type=?, department_location=?, created_by=?, updated_date=? WHERE department_id=?";
        await db.query(updateQuery, data ,(err,result)=>{
            if (err) return res.send(err);
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


exports.getDepartmentCode= async(req,res)=>{
    try{
        var department_code;
        await db.query('SELECT department_code FROM department_master ORDER BY department_id  DESC',(err,result)=>{
            if (err) return res.send(err);
            if (result.length > 0 && result[0].department_code!=null ) {
                        let lastId = parseInt(result[0].department_code);
                        department_code=lastId+1;
                        res.status(httpCodes.OK).json(department_code)
                    } else {
                        department_code = 100001; 
                      res.status(httpCodes.OK).json(department_code)
                    }
        })
    }catch(err){
        console.log(err);
        res.status(httpCodes.InternalServerError).json(err)
    }
        // .then((result1) => {
        //     if (result1.rows.length > 0 && result1.rows[0].department_code!=null ) {
        //         let lastId = parseInt(result1.rows[0].department_code);
        //         department_code=lastId+1;
        //         res.status(httpCodes.OK).json(department_code)
        //     } else {
        //         department_code = 1000001; 
        //       res.status(httpCodes.OK).json(department_code)
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err)
        //     res.status(httpCodes.NotFound).json(err)
        //   })
  }
  exports.deleteDepartmentMasterById =async (req,res) =>{
    try{
        var id =req.params.department_id;
        var data=[
        id]
        var deleteQuery = 'DELETE FROM department_master WHERE department_id=?';
        await db.query(deleteQuery, data,(err,result)=>{
            if (err) return res.send(err);
            console.log("Department deleted succesfully");
            res.status(httpCodes.Created).json({message:"Department record deleted Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}