const httpCodes = require('../helper/httpCodes');
const db = require('../db');

/************************************************************************************************************ 
Method Type: addemployeeAddress
Parameter list: employee_category_name,created_by,created_date
Purpose: Create Employee categories
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/
exports.addemployeeAddress = async (req, res) => {
    try {
        const data = [req.body.employee_id, req.body.address_type, req.body.address_status, req.body.address_line1, req.body.address_line2,
        req.body.address_line3, req.body.city, req.body.state, req.body.country, req.body.pincode];
        var insertQuery = 'INSERT INTO employee_address(employee_id, address_type, address_status, address_line1, address_line2, address_line3, city, state, country, pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await db.query(insertQuery, data, (err, result) => {
            if (err) return res.send(err);
            res.status(httpCodes.Created).json({ message: "Employee Address record added Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }

    // .then(result =>{
    //     res.status(httpCodes.Created).json({message:"Employee Address record added Successfully"})
    // })
    // .catch(err =>{
    //     console.log(err.message)
    //     res.status(httpCodes.InternalServerError).json(err.message)
    // })
}


exports.addemployeeAddress = async (req, res) => {
    try {
        var employee_addressid;
        db.query("select * from employee_address ORDER BY employee_address_id DESC", (err, result) => {
            if (result.length > 0 && result[0].employee_address_id != null) {
                let lastId = (result[0].employee_address_id);
                let id = (lastId.match(/(\d+)/));
                let intid = parseInt(id) + 1;
                employee_addressid = 'EAD000000' + intid;

            } else {
                employee_addressid = 'EAD0000001';
            }
            var data = [employee_addressid,
                req.body.employee_id, 
                req.body.address_type, 
                req.body.address_status, 
                req.body.address_line1, 
                req.body.address_line2,
                req.body.address_line3, 
                req.body.city, 
                req.body.state, 
                req.body.country, 
                req.body.pincode
                ]
                var insertQuery = 'INSERT INTO employee_address(employee_address_id, employee_id, address_type, address_status, address_line1, address_line2, address_line3, city, state, country, pincode) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(insertQuery, data, (err, result) => {
                if (err) return res.send(err);
                console.log(data)
                res.status(httpCodes.Created).json({ message: "Employee Addess record added Successfully" })
            })

        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }

}




















/***************************************************************************************************************************************************************************************** 
Method Type: getemployeeAddress
Parameter list: NA
Purpose: Get all Employee Address
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
**********************************************************************************************************************************************************************************************/
exports.getemployeeAddress = async (req, res) => {
    try {
        await db.query('SELECT empAddr.employee_address_id, empAddr.employee_id, empAddr.address_type, empAddr.address_status, empAddr.address_line1, empAddr.address_line2,'
            + ' empAddr.address_line3, empAddr.city, empAddr.state, empAddr.country, empAddr.pincode'
            + ' FROM employee_address empAddr, employee_master empProf'
            + ' WHERE empAddr.employee_id = empProf.employee_id ORDER BY empAddr.employee_address_id DESC', (err, result) => {
                if (err) return res.send(err);
                console.log(result)
                res.status(httpCodes.OK).json(result);
            })
    } catch (err) {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all Employee Address",
            error: err
        })
    }
    // db.query('SELECT empAddr.employee_address_id, empAddr.employee_id, empAddr.address_type, empAddr.address_status, empAddr.address_line1, empAddr.address_line2,'
    // +' empAddr.address_line3, empAddr.city, empAddr.state, empAddr.country, empAddr.pincode'
    // +' FROM employee_address empAddr, employee_master empProf'
    // +' WHERE empAddr.employee_id = empProf.employee_id').then(allConditions => {
    //     res.status(httpCodes.OK).json(allConditions.rows);
    // }).catch(err => {
    //     res.status(httpCodes.InternalServerError).json({
    //         error_message: "could not get all Employee Address",
    //         error: err
    //     })
    // })
}
/**********************************************************************************************************************************************************************
Method Type: getemployeeAddressById
Parameter list: employee_address_id
Purpose: Get Employee Address by employee_address_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************************************************************************/
exports.getemployeeAddressById = async (req, res) => {
    try {
        let employee_AddressId = req.params.employee_address_id;
        let sql = ' SELECT empAddr.employee_address_id, empAddr.employee_id, empAddr.address_type, empAddr.address_status, empAddr.address_line1, empAddr.address_line2, '
            + ' empAddr.address_line3, empAddr.city, empAddr.state, empAddr.country, empAddr.pincode'
            + ' FROM employee_address empAddr, employee_master empProf'
            + ' WHERE empAddr.employee_id = empProf.employee_id '
            + ' AND empAddr.employee_address_id = ?';
        await db.query(sql, [employee_AddressId], (err, result) => {
            if (err) return res.send(err);
            res.status(httpCodes.OK).json(result);
        })
    } catch (err) {
        console.log(err.message);
        res.status(httpCodes.InternalServerError).json(err.message);
    }
    // let employee_AddressId = req.params.employee_address_id;  
    // let sql = ' SELECT empAddr.employee_address_id, empAddr.employee_id, empAddr.address_type, empAddr.address_status, empAddr.address_line1, empAddr.address_line2, '
    // +' empAddr.address_line3, empAddr.city, empAddr.state, empAddr.country, empAddr.pincode'
    // +' FROM employee_address empAddr, employee_master empProf'
    // +' WHERE empAddr.employee_id = empProf.employee_id ' 	
    // +' AND empAddr.employee_address_id = $1';
    // db.query(sql, [employee_AddressId])
    // .then((result) => {            
    //     if (result == null) {
    //         res
    //             .status(httpCodes.BadRequest)
    //             .json({ message: "Employee Address Id does not exists" });
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
Method Type: updateemployeeAddressById
Parameter list: employee_address_id
Purpose: Update Employee Address by employee_address_id
Created By and Date: Santoshkumar 12-NOV-2020
Modified By and Date:
Version: V.01
************************************************************************************************************/
exports.updateemployeeAddressById = async (req, res) => {
    try {
        var employee_AddressId = req.params.employee_address_id;
        var data = [
            req.body.employee_id,
            req.body.address_type,
            req.body.address_status,
            req.body.address_line1,
            req.body.address_line2,
            req.body.address_line3,
            req.body.city,
            req.body.state,
            req.body.country,
            req.body.pincode,
            employee_AddressId]

        var updateQuery = 'UPDATE employee_address SET employee_id=?, address_type=?, address_status=?, address_line1=?, address_line2=?, address_line3=?, city=?, state=?, country=?, pincode=? WHERE employee_address_id=?';
        await db.query(updateQuery, data, (err, result) => {
            if (err) return res.send(err);
            res.status(httpCodes.Created).json({ message: "Employee Address record updated Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
    // var employee_AddressId = req.params.employee_address_id;
    //   var data = [
    //     req.body.employee_id,
    //     req.body.address_type, 
    //     req.body.address_status, 
    //     req.body.address_line1,
    //     req.body.address_line2,
    //     req.body.address_line3,
    //     req.body.city,
    //     req.body.state,
    //     req.body.country,
    //     req.body.pincode, 
    //     employee_AddressId]

    // var updateQuery = 'UPDATE employee_address SET employee_id=$1, address_type=$2, address_status=$3, address_line1=$4, address_line2=$5, address_line3=$6, city=$7, state=$8, country=$9, pincode=$10 WHERE employee_address_id=$11 RETURNING *';
    // db.query(updateQuery, data)
    // .then(result =>{
    // res.status(httpCodes.Created).json({message:"Employee Address record updated Successfully"})
    // })
    // .catch(err =>{
    //     console.log(err.message)
    //     res.status(httpCodes.InternalServerError).json(err.message)
    // })
}
exports.deleteemployeeAddressById = async (req, res) => {
    try {
        var Id = req.params.employee_address_id;
        var data = [
            Id]
        var deleteQuery = 'DELETE FROM employee_address WHERE employee_address_id=?';
        await db.query(deleteQuery, data, (err, result) => {
            console.log("Employee adress deleted succesfully");
            res.status(httpCodes.Created).json({ message: "Employee adress record deleted Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }
}

