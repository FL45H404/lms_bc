const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/************************************************************************************************************ 
Method Type: getLeaveData
Parameter list: NA
Purpose: Get all Leave data
Created By and Date: Santoshkumar 23-Nov-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.getLeaveData =  (req, res) => {   
    db.query('SELECT leavMas.leave_id, leavMas.employee_id,empProf.employee_name, leavMas.leave_apply_date, leavMas.days, '
    +' leavMas.day_type, leavMas.from_date,leavMas.to_date, leavMas.leave_type, leavMas.leave_status, leavMas.leave_reason, leavMas.approved_by, '
    +' leavMas.approved_date, leavMas.remarks '
    +' FROM leave_master leavMas, employee_profile empProf'
    +' WHERE leavMas.employee_id = empProf.employee_id')
    .then(allConditions => {
        res.status(httpCodes.OK).json(allConditions.rows);
    }).catch(err => {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all leave data",
            error: err
        })
    })
}
/************************************************************************************************************ 
Method Type: getLeaveDataByLeaveId
Parameter list: leave_id
Purpose: Get Leave data by leave_id
Created By and Date: Santoshkumar 23-Nov-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/ 
exports.getLeaveDataByLeaveId = (req, res) => {
    let leaveId = req.params.leave_id;    
    let sql = 'SELECT leavMas.leave_id, leavMas.employee_id,empProf.employee_name, leavMas.leave_apply_date, leavMas.days, '
    +' leavMas.day_type, leavMas.from_date,leavMas.to_date, leavMas.leave_type, leavMas.leave_status, leavMas.leave_reason, leavMas.approved_by, '
    +' leavMas.approved_date, leavMas.remarks '
    +' FROM leave_master leavMas, employee_profile empProf '
    +' WHERE leavMas.employee_id = empProf.employee_id AND leavMas.leave_id=$1';
    db.query(sql, [leaveId])
        .then((result) => {            
            if (result == null) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Leave Id does not exists" });
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
Method Name: addLeaveData
Parameter list:  employee_id, leave_apply_date, days, day_type, from_date, to_date, 
leave_type, leave_status, leave_reason, approved_by, approved_date, remarks
Purpose: Add record to Leave master table
Created By and Date: Santoshkumar 21-Nov-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************/
exports.addLeaveData = (req,res) =>{
    var insertQuery = 'INSERT INTO leave_master(employee_id, leave_apply_date, days, day_type,  '
        +' leave_type, leave_status, leave_reason, approved_by, remarks, from_date, to_date, approved_date) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12)';
    db.query(insertQuery, [req.body.employee_id, req.body.leave_apply_date, req.body.days, req.body.day_type, 
        req.body.leave_type, req.body.leave_status,req.body.leave_reason,req.body.approved_by, req.body.remarks,req.body.from_date, req.body.to_date, req.body.approved_date])
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Leave record added Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}
/************************************************************************************************************
Method Name: updateLeaveDataByLeaveId
Parameter list: leave_id, employee_id, leave_apply_date, days, day_type, from_date, to_date, 
leave_type, leave_status, leave_reason, approved_by, approved_date, remarks
Purpose: update record to leave master table
Created By and Date: Santoshkumar 21-Nov-2020
Modified By and Date:
Version: V.01
*************************************************************************************************************/
exports.updateLeaveDataByLeaveId = (req,res) =>{
    var leaveId = req.params.leave_id;    
    var data=[
    req.body.employee_id,
    req.body.leave_apply_date,
    req.body.days ,
    req.body.day_type,
    req.body.from_date,
    req.body.to_date ,
    req.body.leave_type,
    req.body.leave_status,
    req.body.leave_reason ,
    req.body.approved_by,
    req.body.approved_date,
    req.body.remarks ,
    leaveId]
    var updateQuery = 'UPDATE leave_master SET employee_id=$1, leave_apply_date=$2, days=$3, day_type=$4, from_date=$5, to_date=$6, leave_type=$7, '
    +' leave_status=$8, leave_reason=$9, approved_by=$10, approved_date=$11, remarks=$12 WHERE leave_id=$13 RETURNING *';
    db.query(updateQuery, data)
    .then(result =>{
        res.status(httpCodes.Created).json({message:"Leave record updated Successfully"})
    })
    .catch(err =>{
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    })
}
