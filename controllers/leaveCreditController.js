const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/************************************************************************************************************ 
Method Type: getLeaveCreditData
Parameter list: NA
Purpose: Get all Leave Credit data
Created By and Date: Santoshkumar 24-Nov-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.getLeaveCreditData =  (req, res) => {   
    db.query('SELECT leavCrd.leave_credit_id, leavCrd.employee_id,empProf.employee_name, leavCrd.cl_sl, leavCrd.pl, '
    +' leavCrd.rh, leavCrd.remarks '
    +' FROM leave_credit leavCrd, employee_master empProf'
    +' WHERE leavCrd.employee_id = empProf.employee_id ORDER BY leaveCrd.leave_credit_id DESC')
    .then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all leave credit data",
            error: err
        })
    })
}
/************************************************************************************************************ 
Method Type: getLeaveCreditDataByLeaveId
Parameter list: leave_credit_id
Purpose: Get Leave Credit data by leave_credit_id
Created By and Date: Santoshkumar 24-Nov-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.getLeaveCreditDataByLeaveCrId = (req, res) => {
    let leaveCrId = req.params.leave_credit_id;    
    let sql = 'SELECT leavCrd.leave_credit_id, leavCrd.employee_id,empProf.employee_name, leavCrd.cl_sl, leavCrd.pl, '
    +' leavCrd.rh, leavCrd.remarks '
    +' FROM leave_credit leavCrd, employee_master empProf'
    +' WHERE leavCrd.employee_id = empProf.employee_id AND leavCrd.leave_credit_id=$1';
    db.query(sql, [leaveCrId])
        .then((result) => {            
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Leave Credit Id does not exists" });
            } else {
                res.status(httpCodes.OK).json(result.rows);
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(httpCodes.InternalServerError).json(err.message);
        });
};

/************************************************************************************************************
Method Name: addLeaveCreditData
Parameter list:  employee_id, CLorSL, PL, RH, Remarks
Purpose: Add record to Leave Credit table
Created By and Date: Santoshkumar 24-Nov-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************/
exports.addLeaveCreditData = (req,res) =>{
    var insertQuery = 'INSERT INTO leave_credit(employee_id, cl_sl, pl, rh, remarks)  '
        +' VALUES ($1, $2, $3, $4, $5)';
    db.query(insertQuery, [req.body.employee_id, req.body.cl_sl, req.body.pl, req.body.rh, 
        req.body.remarks])
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Leave Credit added Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}
/************************************************************************************************************
Method Name: updateLeaveCreditDataByLeaveCrId
Parameter list: employee_id, CLorSL, PL, RH, Remarks
Purpose: update record to leave Credit table
Created By and Date: Santoshkumar 24-Nov-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************/
exports.updateLeaveCreditDataByLeaveCrId = (req,res) =>{
    var leaveCrId = req.params.leave_credit_id;    
    var data=[
        req.body.employee_id, req.body.cl_sl, req.body.pl, req.body.rh, req.body.remarks ,leaveCrId]
    var updateQuery = 'UPDATE leave_credit SET employee_id=$1, cl_sl=$2, pl=$3, rh=$4, remarks=$5 WHERE leave_credit_id=$6 RETURNING *';
    db.query(updateQuery, data)
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Leave Credit updated Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}
