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
exports.addQualificationType = (req,res) =>{
    var insertQuery = 'INSERT INTO qualification_type(qualification_type, created_by, created_date) VALUES ($1, $2, $3)';
    db.query(insertQuery, [req.body.qualification_type, req.body.created_by, new Date()])
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Qualification Type record added Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}
/************************************************************************************************************ 
Method Type: getQualificationType
Parameter list: NA
Purpose: Get all Qualification Type
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getQualificationType =  (req, res) => {
    db.query('SELECT * FROM qualification_type').then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Qualification Type",
            error: err
        })
    })
}
 /************************************************************************************************************ 
Method Type: getQualificationTypeById
Parameter list: qualification_type_id
Purpose: Get Qualification Type by qualification_type_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getQualificationTypeById = (req, res) => {
    let qualificationTypeId = req.params.qualification_type_id;  
    let sql = "SELECT * FROM qualification_type where qualification_type_id=$1";
    db.query(sql, [qualificationTypeId])
        .then((result) => {            
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Qualification Type Id does not exists" });
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
Method Type: updateQualificationTypeById
Parameter list: qualification_type_id
Purpose: Update Qualification Type by qualification_type_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateQualificationTypeById = (req,res) =>{
    var qualificationTypeId = req.params.qualification_type_id;
    var updated_date=new Date();
    var data=[
    req.body.qualification_type,
    req.body.updated_by,
    updated_date ,
    qualificationTypeId]

    var updateQuery = 'UPDATE qualification_type SET qualification_type=$1, updated_by=$2, updated_date=$3 WHERE qualification_type_id=$4 RETURNING *';
    db.query(updateQuery, data)
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Qualification Type record updated Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}  
/************************************************************************************************************ 
Method Type: getAllQualifications
Parameter list: NA
Purpose: Get all Qualification from qualificatiom master table
Created By and Date: Santoshkumar 12-Dec-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getAllQualifications =  (req, res) => {
    db.query('SELECT * FROM qualification_master').then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Qualifications",
            error: err
        })
    })
}
