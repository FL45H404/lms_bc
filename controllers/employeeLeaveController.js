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
exports.getEmployeeLeave = async (req, res) => {
    try {
        var sql = "SELECT * FROM employeeleave ORDER BY employee_leave_id DESC";
        await db.query(sql, (err, result) => {

            console.log(result)
            return res.status(httpCodes.OK).json(result)
        });

    } catch (err) {
        console.log(err);
        res.status(httpCodes.InternalServerError).json({
            success: false,
            message: err.message
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
exports.getEmployeeLeaveById = async (req, res) => {
    try {
        let data = [req.params.employee_leave_id];
        let sql = "SELECT * FROM employeeleave where employee_leave_id=?";
        await db.query(sql, data, (err, result) => {
            console.log(result)
            return res.status(httpCodes.OK).json(result)
        })
    } catch (err) {
        console.log(err);
        res.status(httpCodes.InternalServerError).json({
            success: false,
            message: err.message
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
exports.addEmployeeLeave = async (req, res) => {
    try {
        var created_date = new Date();
        const data = [
        req.body.employee_id,

        req.body.manager_id,
        req.body.date_of_applied,
        req.body.number_of_leaves,
        req.body.from_date,
        req.body.to_date,
        req.body.comments,
        req.body.status,
            created_date
        ]
        var insertQuery = "INSERT INTO employeeleave (employee_id, manager_id, date_of_applied, number_of_leaves, from_date, to_date, comments, status, created_date) VALUES (?,?,?,?,?,?,?,?,?)";
        await db.query(insertQuery, data, (err, result) => {
            console.log(err)
            console.log("Employee leave record added Successfully")
            res.status(httpCodes.Created).json({ message: "Employee leave record added Successfully" })
      
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
exports.updateEmployeeLeaveById = async (req, res) => {
    try {

        var employee_leaveId = req.params.employee_leave_id;
        var updated_date = new Date();
        var data = [
            req.body.employee_id,
        
            req.body.manager_id,
            req.body.date_of_applied,
            req.body.number_of_leaves,
            req.body.from_date,
            req.body.to_date,
            req.body.comments,
            req.body.status,
            updated_date,
            employee_leaveId]
        console.log(data)
        var updateQuery = "UPDATE employeeleave SET employee_id=? , manager_id=?, date_of_applied=?, number_of_leaves=?, from_date=?, to_date=?, comments=?, status=?, updated_date=? WHERE employee_leave_id=?";
        await db.query(updateQuery, data, (err, result) => {
            console.log(result)
            return res.status(httpCodes.OK).json('Rows affected: ' + result.affectedRows);
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
   
}


// exports.getDepartmentCode = async (req, res) => {
//     try {
//         var department_code;
//         await db.query('SELECT department_code FROM department_master ORDER BY department_id  DESC', (err, result) => {
//             if (err) throw err;
//             if (result.length > 0 && result[0].department_code != null) {
//                 let lastId = parseInt(result[0].department_code);
//                 department_code = lastId + 1;
//                 res.status(httpCodes.OK).json(department_code)
//             } else {
//                 department_code = 100001;
//                 res.status(httpCodes.OK).json(department_code)
//             }
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(httpCodes.InternalServerError).json(err)
//     }
//     // .then((result1) => {
//     //     if (result1.rows.length > 0 && result1.rows[0].department_code!=null ) {
//     //         let lastId = parseInt(result1.rows[0].department_code);
//     //         department_code=lastId+1;
//     //         res.status(httpCodes.OK).json(department_code)
//     //     } else {
//     //         department_code = 1000001; 
//     //       res.status(httpCodes.OK).json(department_code)
//     //     }
//     //   })
//     //   .catch(err => {
//     //     console.log(err)
//     //     res.status(httpCodes.NotFound).json(err)
//     //   })
// }







exports.deleteEmployeeLeaveById = async (req, res) => {
    try {
        var id = req.params.employee_leave_id;
        var data = [
            id]
        var deleteQuery = 'DELETE FROM employeeleave WHERE employee_leave_id=?';
        await db.query(deleteQuery, data, (err, result) => {
            console.log("Employee leave deleted succesfully");
            res.status(httpCodes.Created).json({ message: "Employee leave record deleted Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}













exports.getEmployeeLeaveByManagerId = async (req, res) => {
    try {
        let data = [req.params.manager_id];
        let sql = "SELECT employee_leave_id,employee_id, date_of_applied, manager_id, number_of_leaves, from_date, to_date, comments, status, created_date, updated_date FROM employeeleave where manager_id=?";
        await db.query(sql, data, (err, result) => {
            console.log(result)
            return res.status(httpCodes.OK).json(result)
        })
    } catch (err) {
        console.log(err);
        res.status(httpCodes.InternalServerError).json({
            success: false,
            message: err.message
        })
    }
};

exports.getEmployeeLeaveByEmployeeId = async (req, res) => {
    try {
        let data = [req.params.employee_id];
        let sql = "SELECT employee_leave_id, employee_id, manager_id, date_of_applied, number_of_leaves, from_date, to_date, comments, status, created_date, updated_date FROM employeeleave where employee_id=?";
        await db.query(sql, data, (err, result) => {
            console.log(result)
            return res.status(httpCodes.OK).json(result)
        })
    } catch (err) {
        console.log(err);
        res.status(httpCodes.InternalServerError).json({
            success: false,
            message: err.message
        })
    }
};




