const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/************************************************************************************************************ 
Method Type: addQualificationType
Parameter list: qualification_type,created_by,created_date
Purpose: Create Qualification Type
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.addQualificationType =async (req,res) =>{
    try{
        var insertQuery = 'INSERT INTO qualification_type(qualification_type, created_by, created_date) VALUES (?,?,?)';
        await db.query(insertQuery, [req.body.qualification_type, req.body.created_by, new Date()],(err,data)=>{
            if (err) return res.send(err);
            res.status(httpCodes.Created).json({message:"Qualification Type record added Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}
/************************************************************************************************************ 
Method Type: getQualificationType
Parameter list: NA
Purpose: Get all Qualification Type
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getQualificationType = async (req, res) => {
    try{
        await db.query('SELECT * FROM qualification_type',(err,result)=>{
            if (err) return res.send(err);
            res.status(httpCodes.OK).json(result);
        })
    }catch(err){
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Qualification Type",
            error: err
        })
    }
}
 /************************************************************************************************************ 
Method Type: getQualificationTypeById
Parameter list: qualification_type_id
Purpose: Get Qualification Type by qualification_type_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getQualificationTypeById =async (req, res) => {
    try{
        let qualificationTypeId = req.params.qualification_type_id;  
        let sql = "SELECT * FROM qualification_type where qualification_type_id=?";
        await db.query(sql, [qualificationTypeId],(err,result)=>{
            if (err) return res.send(err);
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Qualification Type Id does not exists" });
            } else {
                res.status(httpCodes.OK).json(result);
            }
        })
    }catch(err){
        console.log(err.message);
        res.status(httpCodes.InternalServerError).json(err.message);
    }
} 
  /************************************************************************************************************ 
Method Type: updateQualificationTypeById
Parameter list: qualification_type_id
Purpose: Update Qualification Type by qualification_type_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateQualificationTypeById =async (req,res) =>{
    try{
        var qualificationTypeId = req.params.qualification_type_id;
        var updated_date=new Date();
        var data=[
        req.body.qualification_type,
        'vipul',
        updated_date ,
        qualificationTypeId]
    
        var updateQuery = 'UPDATE qualification_type SET qualification_type=?, created_by=?, updated_date=? WHERE qualification_type_id=?';
        await db.query(updateQuery, data,(err,result)=>{
            if (err) return res.send(err);
            res.status(httpCodes.Created).json({message:"Qualification Type record updated Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}  
/************************************************************************************************************ 
Method Type: getAllQualifications
Parameter list: NA
Purpose: Get all Qualification from qualificatiom master table
Created By and Date: Santoshkumar 12-Dec-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getAllQualifications = async (req, res) => {
    try{
        await db.query('SELECT * FROM qualification_master',(err,result)=>{
            if (err) return res.send(err);
            console.log(result)
            res.status(httpCodes.OK).json(result);
        })
    }catch(err){
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Qualifications",
            error: err
        })
    }
}
exports.deleteQualificationTypeById =async (req,res) =>{
    try{
        var Id = req.params.qualification_type_id;
        var data=[
        Id]
        var deleteQuery = 'DELETE FROM qualification_type WHERE qualification_type_id=?';
        await db.query(deleteQuery, data,(err,result)=>{
            console.log("qualification deleted succesfully");
            res.status(httpCodes.Created).json({message:"qualification record deleted Successfully"})
        })
    }catch(err){
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}