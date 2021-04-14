const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/************************************************************************************************************ 
Method Type: addQualificationSpec
Parameter list: qualification_type,created_by,created_date
Purpose: Create Qualification Specialization
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.addQualificationSpec = (req,res) =>{
    var insertQuery = 'INSERT INTO qualification_specialization(qualification_specialization_type, qualification_type_id) VALUES ($1, $2)';
    db.query(insertQuery, [req.body.qualification_specialization_type, req.body.qualification_type_id])
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Qualification Specialization record added Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}
/************************************************************************************************************ 
Method Type: getQualificationSpec
Parameter list: NA
Purpose: Get all Qualification Specialization
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getQualificationSpec =  (req, res) => {
    db.query('SELECT qualSpec.qualification_Specialization_id,qualSpec.qualification_specialization_type,qualSpec.qualification_type_id,qualType.qualification_type FROM qualification_specialization qualSpec,qualification_type qualType WHERE qualSpec.qualification_type_id = qualType.qualification_type_id')
      .then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Qualification Specialization",
            error: err
        })
    })
}
 /************************************************************************************************************ 
Method Type: getQualificationSpecById
Parameter list: qualification_specialization_id
Purpose: Get Qualification Specialization by qualification_specialization_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/   
exports.getQualificationSpecById = (req, res) => {
    let qualificationSpecId = req.params.qualification_specialization_id;  
    let sql = "SELECT qualSpec.qualification_Specialization_id,qualSpec.qualification_specialization_type,qualSpec.qualification_type_id,qualType.qualification_type FROM qualification_specialization qualSpec,qualification_type qualType WHERE qualSpec.qualification_type_id=qualType.qualification_type_id AND qualification_specialization_id=$1";
    db.query(sql, [qualificationSpecId])
        .then((result) => {            
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Qualification Specialization Id does not exists" });
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
Method Type: updateQualificationSpecById
Parameter list: qualification_specialization_id
Purpose: Update Qualification Specialization by qualification_specialization_id
Created By and Date: Santoshkumar 11-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/  
exports.updateQualificationSpecById = (req,res) =>{
    var qualificationSpecId = req.params.qualification_specialization_id;   
    var data=[
        req.body.qualification_specialization_type,
        req.body.qualification_type_id,  
        qualificationSpecId]

    var updateQuery = 'UPDATE qualification_specialization SET qualification_specialization_type=$1,qualification_type_id=$2 WHERE qualification_specialization_id=$3 RETURNING *';
    db.query(updateQuery, data)
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Qualification Specialization record updated Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}  
  