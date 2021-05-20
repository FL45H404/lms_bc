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

// app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

// const storage = multer.diskStorage({
//    destination: (req, file, callback) => {
//     callback(null, 'uploads');
//   },

//   filename:  (  req, file, callback) => {
//     avatarFile = file.originalname;
//    // let date_var= new Date().toLocaleString("en-GB",{ timeZone: "Asia/Kolkata" });
//     let date_var= new Date().toLocaleDateString();

//     date_var= date_var.replace('/', '-');
//     date_var= date_var.replace('/', '-');
//     console.log(date_var);

//    callback(null, avatarFile+"_" + date_var );
//   }
// });

// const fileFilter = (req,file,callback) => {
//   if(file.mimetype == 'image/jpeg'  || file.mimetype == 'image/png' ){
//     callback(null,true);
//   }else{
//     callback(null,false);
//   }
// }

// const upload = multer({ storage: storage, limits : {fileSize : 1000000}, fileFilter: fileFilter});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.addRole = async (req, res) => {
try{
    var roleid;
    db.query("select * from role_master ORDER BY role_id DESC",(err,result)=>{
        if(result.length>0 && result[0].role_id!=null){
            let lastId=(result[0].role_id);
            let id=(lastId.match(/(\d+)/));
            let intid= parseInt(id)+1;
            roleid='ROL000000'+intid;

        }else{
            roleid='ROL0000001';
        }
        var data=[roleid,req.body.role_name,req.body.role_description, 'vipul', new Date()]
                var insertQuery = 'INSERT INTO role_master(role_id,role_name,role_description, created_by, created_date) VALUES (?,?,?,?,?)';
                db.query(insertQuery, data,(err,result)=>{
                    if (err) return res.send(err);
                    console.log(data)
                    res.status(httpCodes.Created).json({message:"Role record added Successfully"})
                })
        
    })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }

}



// exports.addRole = async (req, res) => {
//     try {
//         var roleid;
//         db.query("select * from role_master ORDER BY role_id DESC", (err, result) => {
//             if (result.length > 0 && result[0].role_id!= null) {
//                 let lastId = (result[0].role_id);
//                 let id = (lastId.match(/(\d+)/));
//                 let intid = parseInt(id) + 1;
//                 roleid = 'ROLE00000' + intid;
//                 console.log(roleid)
//             } else {
//                 roleid = 'ROLE00001';
//             }
//         })
//         console.log(roleid)
//         var data = [roleid, req.body.role_name, req.body.role_description, 'vipul', new Date()]
//         var insertQuery = 'INSERT INTO role_master(role_id, role_name, role_description, created_by, created_date) VALUES (?,?,?,?,?)';
//         await db.query(insertQuery, data, (err, result) => {
//             if (err) return res.send(err);
//             console.log(result)
//             res.status(httpCodes.Created).json({ message: "Role record added Successfully" })
//         })
//     } catch (err) {
//         console.log(err.message)
//         res.status(httpCodes.InternalServerError).json(err.message)
//     }

// }
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

    // .then((result) => {            
    //     if (result == null) {
    //         res
    //             .status(httpCodes.BadRequest)
    //             .json({ message: "Role Id does not exists" });
    //     } else {
    //         res.status(httpCodes.OK).json(result.rows);
    //     }
    // })
    // .catch((err) => {
    //     console.log(err.message);
    //     res.status(httpCodes.InternalServerError).json(err.message);
    // });
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

    // .then(result =>{
    //     res.status(httpCodes.Created).json({message:"Role record updated Successfully"})
    // })
    // .catch(err =>{
    //     console.log(err.message)
    //     res.status(httpCodes.InternalServerError).json(err.message)
    // })
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