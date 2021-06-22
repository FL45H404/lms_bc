const httpCodes = require('../helper/httpCodes');
const db = require('../db');
// const express = require("express");
// var app = express();
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// let avatarFile;

/************************************************************************************************************ 
Method Type: addRole
Parameter list: role_description,created_by,created_date
Purpose: Create Role
Created By and Date: Santoshkumar 1-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.addRole = async (req, res) => {
    try {
        db.query("select * from role_master ORDER BY role_id DESC LIMIT 1", (err, result) => {
            if (result.length > 0 && result[0].role_id != null) {
                var keyid = result[0].role_id;
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
                console.log(id)

            } else {
                id = 'ROL0000001';
            }
            var data = [id, req.body.role_name, req.body.role_description, 'vipul', new Date()]
            var insertQuery = 'INSERT INTO role_master(role_id,role_name,role_description, created_by, created_date) VALUES (?,?,?,?,?)';
            db.query(insertQuery, data, (err, result) => {
                if (err) return res.send(err);
                console.log(data)
                res.status(httpCodes.Created).json({ message: "Role record added Successfully" })
            })

        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }

}


/************************************************************************************************************ 
Method Type: getRole
Parameter list: NA
Purpose: Get all Roles
Created By and Date: Santoshkumar 1-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/
exports.getRole = async (req, res) => {
    try {
        await db.query('SELECT * FROM role_master ORDER BY role_id DESC', (err, result) => {
            if (err) return res.send(err);
            console.log(result)
            res.status(httpCodes.OK).json(result);
        })
    } catch (err) {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Role",
            error: err
        })
    }
    // db.query('SELECT * FROM role_master').then(allConditions => {
    //     res.status(httpCodes.OK).json(allConditions.rows);
    // }).catch(err => {
    //     res.status(httpCodes.InternalServerError).json({
    //         error_message: "could not get all Role",
    //         error: err
    //     })
    // })
}
/************************************************************************************************************ 
Method Type: getRoleById
Parameter list: role_id
Purpose: Get Role by role_id
Created By and Date: Santoshkumar 1-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/
exports.getRoleById = async (req, res) => {
    try {
        roleId = [req.params.role_id];
        let sql = "SELECT * FROM role_master where role_id=?";
        db.query(sql, roleId, (err, result) => {
            if (err) return res.send(err);
            if (result == 0) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Role Id does not exists" });
            } else {
                res.status(httpCodes.OK).json(result);
            }
        })

    } catch (err) {
        console.log(err.message);
        res.status(httpCodes.InternalServerError).json(err.message);
    }
}
/************************************************************************************************************ 
Method Type: updateRoleById
Parameter list: role_id
Purpose: Update Role by role_id
Created By and Date: Santoshkumar 1-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/
exports.updateRoleById = async (req, res) => {
    try {
        var roleId = req.params.role_id;
        var updated_date = new Date();
        var data = [
            req.body.role_name,
            req.body.role_description,
            updated_date,
            roleId]
        var updateQuery = 'UPDATE role_master SET role_name=?, role_description=?, updated_date=? WHERE role_id=?';
        await db.query(updateQuery, data, (err, result) => {
            res.status(httpCodes.Created).json({ message: "Role record updated Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}

exports.deleteRoleById = async (req, res) => {
    try {
        var roleId = req.params.role_id;
        var data = [
            roleId]
        var deleteQuery = 'DELETE FROM role_master WHERE role_id=?';
        await db.query(deleteQuery, data, (err, result) => {
            console.log("role deleted succesfully");
            res.status(httpCodes.Created).json({ message: "Role record deleted Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}